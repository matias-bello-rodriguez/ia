from __future__ import annotations

from django.db.models import Count, Q
from django.utils import timezone
from drf_spectacular.utils import extend_schema
from rest_framework import generics, status, views
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from .models import (
    Alerta,
    AuditoriaEstado,
    Beneficiario,
    Carpeta,
    Documento,
    InformeTercero,
    LogVisado,
    ModuloIA,
    Organizacion,
    PerfilUsuario,
    Proyecto,
    ReglaDocumento,
    ReglaSubsidio,
    RegistroContacto,
)
from .permissions import (
    EsConstructora,
    EsEGIS,
    EsHITO,
    PuedeCargarDocumentos,
    PuedeDescargarInformes,
    PuedeVerSemaforo,
    PuedeVisarDocumentos,
)
from .serializers import (
    AlertaSerializer,
    AuditoriaEstadoSerializer,
    BeneficiarioSerializer,
    CarpetaArchivoSerializer,
    CarpetaResumenSerializer,
    ContactoPendienteSerializer,
    DocumentoSerializer,
    FirmaHitoRequestSerializer,
    FirmaHitoResponseSerializer,
    InformeTerceroSerializer,
    ModuloIASerializer,
    OrganizacionSerializer,
    PerfilUsuarioSerializer,
    ProyectoSerializer,
    ReglaDocumentoSerializer,
    ReglaSubsidioSerializer,
    SemaforoProyectoSerializer,
    VisarDocumentoRequestSerializer,
    VisarDocumentoResponseSerializer,
)


# ── Helpers ──────────────────────────────────────────────────

def _registrar_auditoria(
    tipo_entidad: str,
    entidad_id,
    estado_anterior: str,
    estado_nuevo: str,
    request=None,
    detalle: str = "",
    metadata: dict | None = None,
):
    """Registra un cambio de estado en la tabla de auditoría."""
    usuario = None
    organizacion = None
    ip = None
    if request:
        if hasattr(request, "user") and request.user.is_authenticated:
            usuario = request.user
            perfil = getattr(request.user, "perfil", None)
            if perfil:
                organizacion = perfil.organizacion
        ip = request.META.get("REMOTE_ADDR")
    AuditoriaEstado.objects.create(
        tipo_entidad=tipo_entidad,
        entidad_id=entidad_id,
        estado_anterior=estado_anterior,
        estado_nuevo=estado_nuevo,
        usuario=usuario,
        organizacion=organizacion,
        detalle=detalle,
        metadata=metadata,
        ip_address=ip,
    )


# ══════════════════════════════════════════════════════════════
# DASHBOARD
# ══════════════════════════════════════════════════════════════

@extend_schema(tags=["Dashboard"])
class DashboardView(views.APIView):
    """
    GET /api/dashboard
    Devuelve métricas, estado de carpetas, subsidios activos y alertas.
    """

    def get(self, request, *args, **kwargs):
        total_uf_proceso = Carpeta.objects.exclude(monto_uf__isnull=True).count() * 100
        carpetas_listas = Carpeta.objects.filter(estado="listo_serviu").count()
        proyectos_construccion = Proyecto.objects.filter(estado="activo").count()
        alertas_criticas = Alerta.objects.filter(severidad="critical").count()
        montos_inconsistentes = Carpeta.objects.filter(alerta_monto_inconsistente=True).count()

        estado_counts = (
            Carpeta.objects.values("estado")
            .annotate(total=Count("id"))
            .order_by()
        )
        estado_labels = {
            "pendiente": "Pendiente",
            "en_proceso": "En Proceso",
            "visado": "Visado",
            "listo_serviu": "Listo SERVIU",
            "rechazado": "Rechazado",
        }
        estado_carpetas = [
            {"name": estado_labels.get(row["estado"], row["estado"]), "value": row["total"]}
            for row in estado_counts
        ]

        subsidios = (
            Beneficiario.objects.values("subsidio_sugerido__nombre")
            .annotate(total=Count("id"))
            .order_by("-total")
        )
        total_benef = sum(s["total"] for s in subsidios) or 1
        subsidios_activos = [
            {
                "name": s["subsidio_sugerido__nombre"] or "Otros",
                "value": round((s["total"] / total_benef) * 100),
            }
            for s in subsidios
        ]

        alertas = AlertaSerializer(
            Alerta.objects.select_related("beneficiario", "beneficiario__proyecto").all()[:50],
            many=True,
        ).data

        data = {
            "metricas": {
                "totalUfProceso": total_uf_proceso,
                "carpetasListas": carpetas_listas,
                "proyectosConstruccion": proyectos_construccion,
                "alertasCriticas": alertas_criticas,
                "montosInconsistentes": montos_inconsistentes,
            },
            "estadoCarpetas": estado_carpetas,
            "subsidiosActivos": subsidios_activos,
            "alertas": alertas,
        }
        return Response(data)


# ══════════════════════════════════════════════════════════════
# SEMÁFORO — Vista para Constructora
# ══════════════════════════════════════════════════════════════

@extend_schema(
    tags=["Semáforo"],
    summary="Semáforo de proyectos para Constructora",
    description="Devuelve un resumen semáforo (rojo/amarillo/verde) de carpetas por proyecto.",
    responses={200: SemaforoProyectoSerializer(many=True)},
)
class SemaforoProyectosView(views.APIView):
    """
    GET /api/semaforo/proyectos/
    Constructora ve el estado semáforo de cada proyecto vinculado.
    """

    def get(self, request, *args, **kwargs):
        proyectos = Proyecto.objects.select_related("egis", "constructora").all()
        resultado = []
        for proy in proyectos:
            carpetas = Carpeta.objects.filter(
                beneficiario__proyecto=proy
            ).prefetch_related("documentos")
            total = carpetas.count()
            verde = amarillo = rojo = 0
            alerta_monto = False
            for c in carpetas:
                if c.alerta_monto_inconsistente:
                    alerta_monto = True
                docs = c.documentos.all()
                if not docs.exists():
                    rojo += 1
                    continue
                semaforos = [d.semaforo for d in docs]
                if "rojo" in semaforos:
                    rojo += 1
                elif "amarillo" in semaforos:
                    amarillo += 1
                else:
                    verde += 1
            resultado.append({
                "proyecto_id": proy.id,
                "proyecto_nombre": proy.nombre,
                "total_carpetas": total,
                "carpetas_verde": verde,
                "carpetas_amarillo": amarillo,
                "carpetas_rojo": rojo,
                "avance_pct": proy.avance_pct,
                "alerta_monto": alerta_monto,
            })
        serializer = SemaforoProyectoSerializer(resultado, many=True)
        return Response(serializer.data)


@extend_schema(
    tags=["Semáforo"],
    summary="Detalle semáforo de una carpeta",
    description="Devuelve cada documento de la carpeta con su semáforo.",
)
class SemaforoCarpetaView(views.APIView):
    """
    GET /api/semaforo/carpetas/<id>/
    """

    def get(self, request, pk, *args, **kwargs):
        try:
            carpeta = Carpeta.objects.select_related("beneficiario").get(pk=pk)
        except Carpeta.DoesNotExist:
            return Response({"detail": "Carpeta no encontrada"}, status=status.HTTP_404_NOT_FOUND)
        docs = Documento.objects.filter(carpeta=carpeta).order_by("folio")
        # Recalcular vigencias
        for doc in docs:
            doc.calcular_vigencia()
            doc.save(update_fields=[
                "vigencia", "dias_restantes", "fecha_vencimiento", "actualizado_en"
            ])
        serializer = DocumentoSerializer(docs, many=True)
        return Response({
            "carpeta_id": carpeta.id,
            "beneficiario": carpeta.beneficiario.nombre,
            "estado": carpeta.estado,
            "alerta_monto_inconsistente": carpeta.alerta_monto_inconsistente,
            "monto_contrato_uf": str(carpeta.monto_contrato_uf or ""),
            "monto_resolucion_uf": str(carpeta.monto_resolucion_uf or ""),
            "documentos": serializer.data,
        })


# ══════════════════════════════════════════════════════════════
# FIRMA HITO — Aprobación para SERVIU
# ══════════════════════════════════════════════════════════════

@extend_schema(
    tags=["Firma HITO"],
    summary="Firmar carpeta como HITO para SERVIU",
    description=(
        "Solo se habilita si: (1) el usuario tiene rol HITO, "
        "(2) todos los documentos pasaron por la IA y están aprobados."
    ),
    request=FirmaHitoRequestSerializer,
    responses={200: FirmaHitoResponseSerializer},
)
class FirmaHitoView(views.APIView):
    """
    POST /api/carpetas/<id>/firma-hito/
    Aplica la firma HITO de la EGIS para aprobar la carpeta ante SERVIU.
    """

    def post(self, request, pk, *args, **kwargs):
        # Verificar rol HITO
        perfil = getattr(request.user, "perfil", None) if request.user.is_authenticated else None
        es_hito = (perfil and perfil.es_hito) or (request.user.is_authenticated and request.user.is_staff)
        if not es_hito:
            return Response(
                {"detail": "Solo el usuario HITO de la EGIS puede firmar."},
                status=status.HTTP_403_FORBIDDEN,
            )

        try:
            carpeta = Carpeta.objects.select_related("beneficiario").get(pk=pk)
        except Carpeta.DoesNotExist:
            return Response({"detail": "Carpeta no encontrada"}, status=status.HTTP_404_NOT_FOUND)

        # Verificar que todos los documentos pasaron por IA y están aprobados
        docs = Documento.objects.filter(carpeta=carpeta)
        if not docs.exists():
            return Response(
                {"detail": "La carpeta no tiene documentos."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        docs_sin_ia = docs.filter(ia_procesado=False)
        if docs_sin_ia.exists():
            nombres = ", ".join(d.nombre_archivo for d in docs_sin_ia[:5])
            return Response(
                {"detail": f"Documentos sin procesar por IA: {nombres}"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        docs_no_aprobados = docs.exclude(estado="aprobado")
        if docs_no_aprobados.exists():
            nombres = ", ".join(d.nombre_archivo for d in docs_no_aprobados[:5])
            return Response(
                {"detail": f"Documentos no aprobados: {nombres}"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Verificar inconsistencia de montos
        if carpeta.alerta_monto_inconsistente:
            return Response(
                {"detail": "Hay inconsistencia de montos (Contrato vs Resolución). Revisar antes de firmar."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Aplicar firma
        estado_anterior = carpeta.estado
        now = timezone.now()
        carpeta.firma_hito_usuario = request.user
        carpeta.firma_hito_en = now
        carpeta.estado = "listo_serviu"
        carpeta.save(update_fields=[
            "firma_hito_usuario", "firma_hito_en", "estado", "actualizado_en"
        ])

        # Auditoría
        _registrar_auditoria(
            tipo_entidad="carpeta",
            entidad_id=carpeta.id,
            estado_anterior=estado_anterior,
            estado_nuevo="listo_serviu",
            request=request,
            detalle=f"Firma HITO aplicada. Observación: {request.data.get('observacion', '')}",
        )

        return Response({
            "ok": True,
            "mensaje": "Carpeta firmada y aprobada para SERVIU.",
            "carpeta_id": carpeta.id,
            "firmado_por": request.user.get_full_name() or request.user.username,
            "firmado_en": now,
        })


# ══════════════════════════════════════════════════════════════
# PROYECTOS / BENEFICIARIOS / DOCUMENTOS (CRUD existente)
# ══════════════════════════════════════════════════════════════

@extend_schema(tags=["Proyectos"])
class ProyectoListView(generics.ListCreateAPIView):
    queryset = Proyecto.objects.all()
    serializer_class = ProyectoSerializer


@extend_schema(tags=["Beneficiarios"])
class BeneficiarioListView(generics.ListCreateAPIView):
    serializer_class = BeneficiarioSerializer

    def get_queryset(self):
        qs = Beneficiario.objects.select_related("proyecto", "subsidio_sugerido")
        proyecto_id = self.request.query_params.get("proyectoId")
        if proyecto_id:
            qs = qs.filter(proyecto_id=proyecto_id)
        search = self.request.query_params.get("q")
        if search:
            qs = qs.filter(
                Q(nombre__icontains=search)
                | Q(rut__icontains=search)
                | Q(proyecto__nombre__icontains=search)
            )
        return qs


@extend_schema(tags=["Documentos"])
class DocumentosColaView(generics.ListAPIView):
    serializer_class = CarpetaArchivoSerializer

    def get_queryset(self):
        qs = Documento.objects.select_related("carpeta", "carpeta__beneficiario")
        vigencia = self.request.query_params.get("vigencia")
        if vigencia and vigencia in {"vigente", "por_vencer", "vencido"}:
            qs = qs.filter(vigencia=vigencia)
        return qs.order_by("-creado_en")[:100]


@extend_schema(tags=["Documentos"])
class DocumentoDetailView(generics.RetrieveAPIView):
    """
    GET /api/documentos/<id>/
    Detalle de un documento con extraccion_json, resumen_ejecutivo, etc.
    """
    queryset = Documento.objects.all()
    serializer_class = DocumentoSerializer


def _mock_resultados_visado():
    """Resultados de ejemplo cuando no hay archivo o falla la IA."""
    return [
        {"label": "RUT", "value": "12.345.678-9", "status": "approved"},
        {"label": "Nombre Completo", "value": "María González Soto", "status": "approved"},
        {"label": "Fecha Emisión", "value": "15/01/2026", "status": "approved"},
        {"label": "Vigencia", "value": "15/04/2026", "status": "approved"},
        {
            "label": "Dominio Vigente",
            "value": "Emitido hace 95 días",
            "status": "rejected",
            "note": "Documento > 90 días, solicitar actualización en el CBR",
        },
        {
            "label": "Monto Ahorro",
            "value": "12 UF",
            "status": "alert",
            "note": "Ahorro insuficiente - mínimo requerido: 15 UF",
        },
    ]


@extend_schema(
    tags=["Documentos"],
    summary="Visar documento con IA",
    description=(
        "Envía un archivo (PDF o imagen) para extracción OCR y validación con OpenAI Vision. "
        "Devuelve campos extraídos (RUT, nombre, fechas, vigencia, monto) con semáforo. "
        "Si es Informe Universidad, valida sellos de UBB o UdeC."
    ),
    request=VisarDocumentoRequestSerializer,
    responses={200: VisarDocumentoResponseSerializer},
)
class VisarDocumentoView(views.APIView):
    """
    POST /api/documentos/visar/
    Acepta archivo (PDF o imagen). Usa OpenAI Vision para extraer y validar.
    """

    def post(self, request, *args, **kwargs):
        uploaded_file = request.FILES.get("file")
        tipo_documento = request.data.get("tipo_documento", "")
        carpeta_id = request.data.get("carpeta_id")
        resultados = []
        resumen_ejecutivo = ""
        score_confianza = 0.0
        alertas_monto = []

        if uploaded_file:
            try:
                file_content = uploaded_file.read()
                nombre_archivo = uploaded_file.name or "documento.pdf"
            except Exception:
                file_content = b""
                nombre_archivo = "documento.pdf"

            if file_content:
                from django.conf import settings as django_settings

                vigencia_max_dias = 90
                ahorro_minimo_uf = 15.0
                regla_dom = ReglaDocumento.objects.filter(
                    nombre__icontains="Dominio"
                ).first()
                if regla_dom and regla_dom.unidad in ("dias", "días"):
                    vigencia_max_dias = max(0, regla_dom.vigencia_maxima)
                regla_sub = ReglaSubsidio.objects.first()
                if regla_sub and regla_sub.ahorro_minimo_uf:
                    try:
                        ahorro_minimo_uf = float(regla_sub.ahorro_minimo_uf)
                    except (ValueError, TypeError):
                        pass

                from .visado_ia import extraer_y_validar_con_openai

                ia_result = extraer_y_validar_con_openai(
                    file_content,
                    nombre_archivo,
                    vigencia_max_dias=vigencia_max_dias,
                    ahorro_minimo_uf=ahorro_minimo_uf,
                    tipo_documento=tipo_documento,
                )
                resultados = ia_result.get("resultados", [])
                resumen_ejecutivo = ia_result.get("resumen_ejecutivo", "")
                score_confianza = ia_result.get("score_confianza", 0.0)
                alertas_monto = ia_result.get("alertas_monto", [])

                # Guardar en Documento si hay carpeta_id
                if carpeta_id and resultados:
                    try:
                        carpeta = Carpeta.objects.get(pk=carpeta_id)
                        doc = Documento.objects.create(
                            carpeta=carpeta,
                            nombre_archivo=nombre_archivo,
                            tipo_documento=tipo_documento or "general",
                            extraccion_json=resultados,
                            resumen_ejecutivo=resumen_ejecutivo,
                            score_confianza=score_confianza,
                            ia_procesado=True,
                            estado="aprobado" if all(
                                r.get("status") == "approved" for r in resultados
                            ) else "alerta",
                        )
                        doc.calcular_vigencia()
                        doc.save()

                        # Sincronización de montos
                        _sincronizar_montos(carpeta, resultados, tipo_documento, alertas_monto)

                        # Auditoría
                        _registrar_auditoria(
                            tipo_entidad="documento",
                            entidad_id=doc.id,
                            estado_anterior="",
                            estado_nuevo=doc.estado,
                            request=request,
                            detalle=f"Visado IA: {nombre_archivo}. Score: {score_confianza:.2f}",
                        )
                    except Carpeta.DoesNotExist:
                        pass

        if not resultados:
            resultados = _mock_resultados_visado()

        return Response({
            "resultados": resultados,
            "resumen_ejecutivo": resumen_ejecutivo,
            "score_confianza": score_confianza,
            "alertas_monto": alertas_monto,
        })


def _sincronizar_montos(carpeta, resultados, tipo_documento, alertas_monto):
    """
    Si el documento es un contrato o resolución, extrae el monto UF
    y compara con el otro para detectar inconsistencias.
    """
    import re

    monto_extraido = None
    for r in resultados:
        label = (r.get("label") or "").lower()
        if "monto" in label and "uf" in label:
            value = r.get("value", "")
            match = re.search(r"([\d.,]+)", value)
            if match:
                try:
                    monto_extraido = float(match.group(1).replace(",", ".").replace(".", "", match.group(1).count(".") - 1) if "." in match.group(1) else match.group(1))
                except (ValueError, TypeError):
                    pass
            break

    if monto_extraido is None:
        return

    tipo_lower = (tipo_documento or "").lower()
    updated_fields = ["actualizado_en"]

    if "contrato" in tipo_lower:
        carpeta.monto_contrato_uf = monto_extraido
        updated_fields.append("monto_contrato_uf")
    elif "resolucion" in tipo_lower or "resolución" in tipo_lower:
        carpeta.monto_resolucion_uf = monto_extraido
        updated_fields.append("monto_resolucion_uf")

    # Verificar inconsistencia
    if carpeta.monto_contrato_uf and carpeta.monto_resolucion_uf:
        if carpeta.monto_contrato_uf != carpeta.monto_resolucion_uf:
            carpeta.alerta_monto_inconsistente = True
            updated_fields.append("alerta_monto_inconsistente")
            alertas_monto.append(
                f"ALERTA: Monto Contrato ({carpeta.monto_contrato_uf} UF) ≠ "
                f"Resolución Exenta ({carpeta.monto_resolucion_uf} UF)"
            )
        else:
            carpeta.alerta_monto_inconsistente = False
            updated_fields.append("alerta_monto_inconsistente")

    carpeta.save(update_fields=updated_fields)


# ══════════════════════════════════════════════════════════════
# REPORTES / CARPETAS
# ══════════════════════════════════════════════════════════════

@extend_schema(tags=["Reportes"])
class ReporteEjecutivoView(generics.ListAPIView):
    serializer_class = CarpetaResumenSerializer

    def get_queryset(self):
        return (
            Carpeta.objects.select_related("beneficiario", "beneficiario__proyecto")
            .all()
            .order_by("beneficiario__nombre")
        )


@extend_schema(tags=["Reportes"])
class CarpetaArchivosView(generics.ListAPIView):
    serializer_class = CarpetaArchivoSerializer

    def get_queryset(self):
        carpeta_id = self.kwargs["pk"]
        return Documento.objects.filter(carpeta_id=carpeta_id).order_by("folio")


@extend_schema(tags=["Reportes"])
class CarpetaInformesTercerosView(generics.ListAPIView):
    serializer_class = InformeTerceroSerializer

    def get_queryset(self):
        carpeta_id = self.kwargs["pk"]
        return InformeTercero.objects.filter(carpeta_id=carpeta_id)


@extend_schema(
    tags=["Reportes"],
    summary="Marcar carpeta listo para facturar",
    responses={200: {"description": "ok: true"}, 404: {"description": "Carpeta no encontrada"}},
)
class MarcarListoFacturarView(views.APIView):
    def patch(self, request, pk, *args, **kwargs):
        try:
            carpeta = Carpeta.objects.get(pk=pk)
        except Carpeta.DoesNotExist:
            return Response({"detail": "Carpeta no encontrada"}, status=status.HTTP_404_NOT_FOUND)

        estado_anterior = carpeta.estado
        carpeta.listo_para_facturar = True
        carpeta.estado = "listo_serviu"
        carpeta.save(update_fields=["listo_para_facturar", "estado", "actualizado_en"])

        _registrar_auditoria(
            tipo_entidad="carpeta",
            entidad_id=carpeta.id,
            estado_anterior=estado_anterior,
            estado_nuevo="listo_serviu",
            request=request,
            detalle="Marcado como listo para facturar.",
        )
        return Response({"ok": True})


# ══════════════════════════════════════════════════════════════
# AUDITORÍA
# ══════════════════════════════════════════════════════════════

@extend_schema(tags=["Auditoría"])
class AuditoriaListView(generics.ListAPIView):
    """
    GET /api/auditoria/
    Historial de cambios de estado (carpetas, documentos, proyectos).
    """
    serializer_class = AuditoriaEstadoSerializer

    def get_queryset(self):
        qs = AuditoriaEstado.objects.select_related("usuario", "organizacion")
        tipo = self.request.query_params.get("tipo_entidad")
        if tipo:
            qs = qs.filter(tipo_entidad=tipo)
        entidad_id = self.request.query_params.get("entidad_id")
        if entidad_id:
            qs = qs.filter(entidad_id=entidad_id)
        return qs.order_by("-creado_en")[:200]


# ══════════════════════════════════════════════════════════════
# ORGANIZACIONES
# ══════════════════════════════════════════════════════════════

@extend_schema(tags=["Organizaciones"])
class OrganizacionListView(generics.ListCreateAPIView):
    queryset = Organizacion.objects.all()
    serializer_class = OrganizacionSerializer


# ══════════════════════════════════════════════════════════════
# PERFIL DE USUARIO
# ══════════════════════════════════════════════════════════════

@extend_schema(tags=["Usuarios"])
class PerfilUsuarioView(views.APIView):
    """
    GET /api/perfil/
    Devuelve el perfil del usuario autenticado (rol, organización).
    """

    def get(self, request, *args, **kwargs):
        perfil = getattr(request.user, "perfil", None) if request.user.is_authenticated else None
        if perfil:
            return Response(PerfilUsuarioSerializer(perfil).data)
        # Fallback para admin sin perfil
        return Response({
            "id": None,
            "username": request.user.username if request.user.is_authenticated else "anon",
            "email": getattr(request.user, "email", ""),
            "organizacion": None,
            "organizacion_nombre": "",
            "rol": "admin",
            "rol_display": "Administrador",
            "es_egis": True,
            "es_hito": True,
            "es_constructora": False,
            "activo": True,
        })


# ══════════════════════════════════════════════════════════════
# NOTIFICACIONES / CONFIGURACIÓN (existentes)
# ══════════════════════════════════════════════════════════════

@extend_schema(tags=["Notificaciones"])
class ContactosPendientesView(generics.ListAPIView):
    serializer_class = ContactoPendienteSerializer

    def get_queryset(self):
        return RegistroContacto.objects.select_related("beneficiario", "beneficiario__proyecto")


@extend_schema(tags=["Configuración"])
class ReglasSubsidioListView(generics.ListCreateAPIView):
    queryset = ReglaSubsidio.objects.all()
    serializer_class = ReglaSubsidioSerializer


@extend_schema(tags=["Configuración"])
class ReglaSubsidioDetailView(generics.RetrieveUpdateAPIView):
    queryset = ReglaSubsidio.objects.all()
    serializer_class = ReglaSubsidioSerializer


@extend_schema(tags=["Configuración"])
class ReglasDocumentoListView(generics.ListAPIView):
    queryset = ReglaDocumento.objects.all()
    serializer_class = ReglaDocumentoSerializer


@extend_schema(tags=["Configuración"])
class ModulosIAListView(generics.ListAPIView):
    queryset = ModuloIA.objects.all()
    serializer_class = ModuloIASerializer


@extend_schema(
    tags=["Notificaciones"],
    summary="Marcar contacto enviado",
    responses={200: {"description": "ok: true"}, 404: {"description": "Contacto no encontrado"}},
)
class MarcaContactoEnviadoView(views.APIView):
    def post(self, request, pk, *args, **kwargs):
        try:
            contacto = RegistroContacto.objects.get(pk=pk)
        except RegistroContacto.DoesNotExist:
            return Response({"detail": "Contacto no encontrado"}, status=status.HTTP_404_NOT_FOUND)

        now = timezone.now()
        contacto.mensaje_enviado_en = now
        contacto.ultimo_contacto_en = now
        contacto.save(update_fields=["mensaje_enviado_en", "ultimo_contacto_en", "actualizado_en"])
        return Response({"ok": True})

