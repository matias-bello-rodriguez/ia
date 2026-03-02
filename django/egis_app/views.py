from __future__ import annotations

from django.db.models import Count, Q
from django.utils import timezone
from drf_spectacular.utils import extend_schema
from rest_framework import generics, status, views
from rest_framework.response import Response

from .models import (
    Alerta,
    Beneficiario,
    Carpeta,
    Documento,
    InformeTercero,
    LogVisado,
    ModuloIA,
    Organizacion,
    Proyecto,
    ReglaDocumento,
    ReglaSubsidio,
    RegistroContacto,
)
from .serializers import (
    AlertaSerializer,
    BeneficiarioSerializer,
    CarpetaArchivoSerializer,
    CarpetaResumenSerializer,
    ContactoPendienteSerializer,
    InformeTerceroSerializer,
    ModuloIASerializer,
    ProyectoSerializer,
    ReglaDocumentoSerializer,
    ReglaSubsidioSerializer,
    VisarDocumentoRequestSerializer,
    VisarDocumentoResponseSerializer,
)


@extend_schema(tags=["Dashboard"])
class DashboardView(views.APIView):
    """
    GET /api/dashboard
    Devuelve métricas, estado de carpetas, subsidios activos y alertas.
    """

    def get(self, request, *args, **kwargs):
        total_uf_proceso = Carpeta.objects.exclude(monto_uf__isnull=True).count() * 100  # mock simple
        carpetas_listas = Carpeta.objects.filter(estado="listo_serviu").count()
        proyectos_construccion = Proyecto.objects.filter(estado="activo").count()
        alertas_criticas = Alerta.objects.filter(severidad="critical").count()

        # Distribución por estado de carpeta
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

        # Distribución de subsidios (por nombre)
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
            },
            "estadoCarpetas": estado_carpetas,
            "subsidiosActivos": subsidios_activos,
            "alertas": alertas,
        }
        return Response(data)


@extend_schema(tags=["Proyectos"])
class ProyectoListView(generics.ListCreateAPIView):
    """
    GET/POST /api/proyectos
    """

    queryset = Proyecto.objects.all()
    serializer_class = ProyectoSerializer


@extend_schema(tags=["Beneficiarios"])
class BeneficiarioListView(generics.ListCreateAPIView):
    """
    GET/POST /api/beneficiarios
    """

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
    """
    GET /api/documentos/cola?vigencia=
    """

    serializer_class = CarpetaArchivoSerializer

    def get_queryset(self):
        qs = Documento.objects.select_related("carpeta", "carpeta__beneficiario")
        vigencia = self.request.query_params.get("vigencia")
        if vigencia and vigencia in {"vigente", "por_vencer", "vencido"}:
            qs = qs.filter(vigencia=vigencia)
        return qs.order_by("-creado_en")[:100]


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
    description="Envía un archivo (PDF o imagen) para extracción OCR y validación con OpenAI Vision. "
    "Devuelve campos extraídos (RUT, nombre, fechas, vigencia, monto ahorro) con estado approved/rejected/alert.",
    request=VisarDocumentoRequestSerializer,
    responses={200: VisarDocumentoResponseSerializer},
)
class VisarDocumentoView(views.APIView):
    """
    POST /api/documentos/visar
    Acepta opcionalmente un archivo (PDF o imagen). Si hay OPENAI_API_KEY y archivo,
    usa OpenAI Vision para extraer y validar campos. Si no, devuelve mock.
    """

    def post(self, request, *args, **kwargs):
        uploaded_file = request.FILES.get("file")
        resultados = []

        if uploaded_file:
            try:
                file_content = uploaded_file.read()
                nombre_archivo = uploaded_file.name or "documento.pdf"
            except Exception:
                file_content = b""
                nombre_archivo = "documento.pdf"

            if file_content:
                from django.conf import settings

                vigencia_max_dias = 90
                ahorro_minimo_uf = 15.0
                # Reglas desde BD si existen
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

                resultados = extraer_y_validar_con_openai(
                    file_content,
                    nombre_archivo,
                    vigencia_max_dias=vigencia_max_dias,
                    ahorro_minimo_uf=ahorro_minimo_uf,
                )

        if not resultados:
            resultados = _mock_resultados_visado()

        return Response({"resultados": resultados})


@extend_schema(tags=["Reportes"])
class ReporteEjecutivoView(generics.ListAPIView):
    """
    GET /api/reportes/ejecutivo
    """

    serializer_class = CarpetaResumenSerializer

    def get_queryset(self):
        return (
            Carpeta.objects.select_related("beneficiario", "beneficiario__proyecto")
            .all()
            .order_by("beneficiario__nombre")
        )


@extend_schema(tags=["Reportes"])
class CarpetaArchivosView(generics.ListAPIView):
    """
    GET /api/carpetas/<id>/archivos
    """

    serializer_class = CarpetaArchivoSerializer

    def get_queryset(self):
        carpeta_id = self.kwargs["pk"]
        return Documento.objects.filter(carpeta_id=carpeta_id).order_by("folio")


@extend_schema(tags=["Reportes"])
class CarpetaInformesTercerosView(generics.ListAPIView):
    """
    GET /api/carpetas/<id>/informes-terceros
    """

    serializer_class = InformeTerceroSerializer

    def get_queryset(self):
        carpeta_id = self.kwargs["pk"]
        return InformeTercero.objects.filter(carpeta_id=carpeta_id)


@extend_schema(
    tags=["Reportes"],
    summary="Marcar carpeta listo para facturar",
    description="Marca la carpeta como listo_para_facturar y estado listo_serviu.",
    responses={200: {"description": "ok: true"}, 404: {"description": "Carpeta no encontrada"}},
)
class MarcarListoFacturarView(views.APIView):
    """
    PATCH /api/carpetas/<id>/listo-facturar
    """

    def patch(self, request, pk: int, *args, **kwargs):
        try:
            carpeta = Carpeta.objects.get(pk=pk)
        except Carpeta.DoesNotExist:
            return Response({"detail": "Carpeta no encontrada"}, status=status.HTTP_404_NOT_FOUND)

        carpeta.listo_para_facturar = True
        carpeta.estado = "listo_serviu"
        carpeta.save(update_fields=["listo_para_facturar", "estado", "actualizado_en"])
        return Response({"ok": True})


@extend_schema(tags=["Notificaciones"])
class ContactosPendientesView(generics.ListAPIView):
    """
    GET /api/notificaciones/contactos-pendientes
    """

    serializer_class = ContactoPendienteSerializer

    def get_queryset(self):
        return RegistroContacto.objects.select_related("beneficiario", "beneficiario__proyecto")


@extend_schema(tags=["Configuración"])
class ReglasSubsidioListView(generics.ListCreateAPIView):
    """
    GET/POST /api/configuracion/reglas-subsidio
    """

    queryset = ReglaSubsidio.objects.all()
    serializer_class = ReglaSubsidioSerializer


@extend_schema(tags=["Configuración"])
class ReglaSubsidioDetailView(generics.RetrieveUpdateAPIView):
    """
    GET/PUT/PATCH /api/configuracion/reglas-subsidio/<id>
    """

    queryset = ReglaSubsidio.objects.all()
    serializer_class = ReglaSubsidioSerializer


@extend_schema(tags=["Configuración"])
class ReglasDocumentoListView(generics.ListAPIView):
    """
    GET /api/configuracion/reglas-documento
    """

    queryset = ReglaDocumento.objects.all()
    serializer_class = ReglaDocumentoSerializer


@extend_schema(tags=["Configuración"])
class ModulosIAListView(generics.ListAPIView):
    """
    GET /api/configuracion/modulos-ia
    """

    queryset = ModuloIA.objects.all()
    serializer_class = ModuloIASerializer


@extend_schema(
    tags=["Notificaciones"],
    summary="Marcar contacto enviado",
    description="Registra que se envió mensaje al contacto (actualiza mensaje_enviado_en y ultimo_contacto_en).",
    responses={200: {"description": "ok: true"}, 404: {"description": "Contacto no encontrado"}},
)
class MarcaContactoEnviadoView(views.APIView):
    """
    POST /api/notificaciones/contactos-pendientes/<id>/enviar
    Marca el contacto como enviado (actualiza timestamps).
    """

    def post(self, request, pk: int, *args, **kwargs):
        try:
            contacto = RegistroContacto.objects.get(pk=pk)
        except RegistroContacto.DoesNotExist:
            return Response({"detail": "Contacto no encontrado"}, status=status.HTTP_404_NOT_FOUND)

        now = timezone.now()
        contacto.mensaje_enviado_en = now
        contacto.ultimo_contacto_en = now
        contacto.save(update_fields=["mensaje_enviado_en", "ultimo_contacto_en", "actualizado_en"])
        return Response({"ok": True})

