from __future__ import annotations

from django.db.models import Count, Q
from django.utils import timezone
from rest_framework import generics, status, views
from rest_framework.response import Response

from .models import (
    Alerta,
    Beneficiario,
    Carpeta,
    Documento,
    InformeTercero,
    ModuloIA,
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
)


class DashboardView(views.APIView):
    """
    GET /api/dashboard
    Devuelve métricas, estado de carpetas, subsidios activos y alertas.
    """

    def get(self, request, *args, **kwargs):
        total_uf_proceso = Carpeta.objects.exclude(monto_uf="").count() * 100  # mock simple
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


class ProyectoListView(generics.ListCreateAPIView):
    """
    GET/POST /api/proyectos
    """

    queryset = Proyecto.objects.all()
    serializer_class = ProyectoSerializer


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


class VisarDocumentoView(views.APIView):
    """
    POST /api/documentos/visar
    Por ahora devuelve un mock de resultados de extracción IA.
    """

    def post(self, request, *args, **kwargs):
        # En una implementación real se procesaría el archivo PDF/imagen aquí.
        mock_results = [
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
        return Response({"resultados": mock_results})


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


class CarpetaArchivosView(generics.ListAPIView):
    """
    GET /api/carpetas/<id>/archivos
    """

    serializer_class = CarpetaArchivoSerializer

    def get_queryset(self):
        carpeta_id = self.kwargs["pk"]
        return Documento.objects.filter(carpeta_id=carpeta_id).order_by("folio")


class CarpetaInformesTercerosView(generics.ListAPIView):
    """
    GET /api/carpetas/<id>/informes-terceros
    """

    serializer_class = InformeTerceroSerializer

    def get_queryset(self):
        carpeta_id = self.kwargs["pk"]
        return InformeTercero.objects.filter(carpeta_id=carpeta_id)


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


class ContactosPendientesView(generics.ListAPIView):
    """
    GET /api/notificaciones/contactos-pendientes
    """

    serializer_class = ContactoPendienteSerializer

    def get_queryset(self):
        return RegistroContacto.objects.select_related("beneficiario", "beneficiario__proyecto")


class ReglasSubsidioListView(generics.ListCreateAPIView):
    """
    GET/POST /api/configuracion/reglas-subsidio
    """

    queryset = ReglaSubsidio.objects.all()
    serializer_class = ReglaSubsidioSerializer


class ReglaSubsidioDetailView(generics.RetrieveUpdateAPIView):
    """
    GET/PUT/PATCH /api/configuracion/reglas-subsidio/<id>
    """

    queryset = ReglaSubsidio.objects.all()
    serializer_class = ReglaSubsidioSerializer


class ReglasDocumentoListView(generics.ListAPIView):
    """
    GET /api/configuracion/reglas-documento
    """

    queryset = ReglaDocumento.objects.all()
    serializer_class = ReglaDocumentoSerializer


class ModulosIAListView(generics.ListAPIView):
    """
    GET /api/configuracion/modulos-ia
    """

    queryset = ModuloIA.objects.all()
    serializer_class = ModuloIASerializer


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

