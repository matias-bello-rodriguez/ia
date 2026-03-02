import graphene
from graphene_django import DjangoObjectType

from .models import (
    Alerta,
    Beneficiario,
    Carpeta,
    Documento,
    ModuloIA,
    Proyecto,
    ReglaDocumento,
    ReglaSubsidio,
)


class ProyectoType(DjangoObjectType):
    class Meta:
        model = Proyecto
        fields = ("id", "nombre", "ubicacion", "tipo", "clasificacion", "cantidad_beneficiarios", "avance_pct", "estado")


class BeneficiarioType(DjangoObjectType):
    class Meta:
        model = Beneficiario
        fields = (
            "id",
            "proyecto",
            "nombre",
            "rut",
            "telefono",
            "rsh_pct",
            "ahorro_uf",
            "ahorro_minimo_uf",
            "subsidio_sugerido",
            "puntaje_match",
            "estado",
        )


class CarpetaType(DjangoObjectType):
    class Meta:
        model = Carpeta
        fields = (
            "id",
            "beneficiario",
            "estado",
            "estado_subsidio",
            "monto_uf",
            "visto_bueno_ito",
            "check_seremi",
            "resolucion",
            "informe_universidad",
            "listo_para_facturar",
        )


class DocumentoType(DjangoObjectType):
    class Meta:
        model = Documento
        fields = ("id", "carpeta", "nombre_archivo", "tipo_documento", "folio", "estado", "vigencia")


class ReglaSubsidioType(DjangoObjectType):
    class Meta:
        model = ReglaSubsidio
        fields = "__all__"


class ReglaDocumentoType(DjangoObjectType):
    class Meta:
        model = ReglaDocumento
        fields = "__all__"


class ModuloIAType(DjangoObjectType):
    class Meta:
        model = ModuloIA
        fields = "__all__"


class AlertaType(DjangoObjectType):
    class Meta:
        model = Alerta
        fields = ("id", "beneficiario", "nombre_documento", "dias_restantes", "severidad")


class DashboardMetricsType(graphene.ObjectType):
    total_uf_proceso = graphene.Int()
    carpetas_listas = graphene.Int()
    proyectos_construccion = graphene.Int()
    alertas_criticas = graphene.Int()


class DashboardType(graphene.ObjectType):
    metricas = graphene.Field(DashboardMetricsType)
    estado_carpetas = graphene.List(graphene.JSONString)
    subsidios_activos = graphene.List(graphene.JSONString)
    alertas = graphene.List(AlertaType)


class Query(graphene.ObjectType):
    proyectos = graphene.List(ProyectoType)
    beneficiarios = graphene.List(
        BeneficiarioType,
        proyecto_id=graphene.Int(required=False),
        search=graphene.String(required=False),
    )
    carpetas = graphene.List(CarpetaType)
    documentos = graphene.List(DocumentoType, carpeta_id=graphene.Int(required=False))
    reglas_subsidio = graphene.List(ReglaSubsidioType)
    reglas_documento = graphene.List(ReglaDocumentoType)
    modulos_ia = graphene.List(ModuloIAType)
    dashboard = graphene.Field(DashboardType)

    def resolve_proyectos(root, info):
        return Proyecto.objects.all()

    def resolve_beneficiarios(root, info, proyecto_id=None, search=None):
        qs = Beneficiario.objects.select_related("proyecto", "subsidio_sugerido")
        if proyecto_id is not None:
            qs = qs.filter(proyecto_id=proyecto_id)
        if search:
            qs = qs.filter(
                graphene.Q(nombre__icontains=search)
                | graphene.Q(rut__icontains=search)
                | graphene.Q(proyecto__nombre__icontains=search)
            )
        return qs

    def resolve_carpetas(root, info):
        return Carpeta.objects.select_related("beneficiario", "beneficiario__proyecto")

    def resolve_documentos(root, info, carpeta_id=None):
        qs = Documento.objects.select_related("carpeta")
        if carpeta_id is not None:
            qs = qs.filter(carpeta_id=carpeta_id)
        return qs

    def resolve_reglas_subsidio(root, info):
        return ReglaSubsidio.objects.all()

    def resolve_reglas_documento(root, info):
        return ReglaDocumento.objects.all()

    def resolve_modulos_ia(root, info):
        return ModuloIA.objects.all()

    def resolve_dashboard(root, info):
        from .views import DashboardView
        from rest_framework.test import APIRequestFactory

        # Reutilizamos la lógica de DashboardView para no duplicar
        factory = APIRequestFactory()
        request = factory.get("/api/dashboard/")
        response = DashboardView.as_view()(request)
        data = response.data
        metricas = data.get("metricas", {})
        return DashboardType(
            metricas=DashboardMetricsType(
                total_uf_proceso=metricas.get("totalUfProceso", 0),
                carpetas_listas=metricas.get("carpetasListas", 0),
                proyectos_construccion=metricas.get("proyectosConstruccion", 0),
                alertas_criticas=metricas.get("alertasCriticas", 0),
            ),
            estado_carpetas=data.get("estadoCarpetas", []),
            subsidios_activos=data.get("subsidiosActivos", []),
            alertas=Alerta.objects.all()[:50],
        )


schema = graphene.Schema(query=Query)