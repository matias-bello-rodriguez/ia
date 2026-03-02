from rest_framework import serializers

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


# ── Organizaciones ───────────────────────────────────────────

class OrganizacionSerializer(serializers.ModelSerializer):
    tipo_display = serializers.CharField(source="get_tipo_display", read_only=True)

    class Meta:
        model = Organizacion
        fields = [
            "id", "nombre", "rut", "tipo", "tipo_display",
            "direccion", "comuna", "region", "telefono", "email", "activa",
        ]


# ── Proyectos ────────────────────────────────────────────────

class ProyectoSerializer(serializers.ModelSerializer):
    egis_nombre = serializers.CharField(source="egis.nombre", read_only=True)
    constructora_nombre = serializers.CharField(source="constructora.nombre", read_only=True)

    class Meta:
        model = Proyecto
        fields = [
            "id", "nombre", "egis", "egis_nombre",
            "constructora", "constructora_nombre",
            "ubicacion", "comuna", "tipo", "clasificacion",
            "cantidad_beneficiarios", "avance_pct", "estado",
        ]


# ── Beneficiarios ────────────────────────────────────────────

class BeneficiarioSerializer(serializers.ModelSerializer):
    proyecto = ProyectoSerializer(read_only=True)
    proyecto_id = serializers.PrimaryKeyRelatedField(
        source="proyecto", queryset=Proyecto.objects.all(), write_only=True
    )
    subsidio_sugerido_nombre = serializers.CharField(
        source="subsidio_sugerido.nombre", read_only=True
    )

    class Meta:
        model = Beneficiario
        fields = [
            "id", "proyecto", "proyecto_id",
            "nombre", "rut", "telefono", "email",
            "rsh_pct", "ahorro_uf", "ahorro_minimo_uf",
            "subsidio_sugerido", "subsidio_sugerido_nombre",
            "puntaje_match", "estado",
        ]


# ── Reglas ───────────────────────────────────────────────────

class ReglaSubsidioSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReglaSubsidio
        fields = "__all__"


class ReglaDocumentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReglaDocumento
        fields = "__all__"


# ── Módulos IA ───────────────────────────────────────────────

class ModuloIASerializer(serializers.ModelSerializer):
    class Meta:
        model = ModuloIA
        fields = "__all__"


# ── Carpeta ──────────────────────────────────────────────────

class CarpetaResumenSerializer(serializers.ModelSerializer):
    beneficiario = BeneficiarioSerializer(read_only=True)

    class Meta:
        model = Carpeta
        fields = [
            "id", "beneficiario", "estado", "estado_subsidio", "monto_uf",
            "visto_bueno_ito", "check_seremi", "resolucion",
            "informe_universidad", "listo_para_facturar",
        ]


# ── Documentos ───────────────────────────────────────────────

class CarpetaArchivoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Documento
        fields = [
            "id", "nombre_archivo", "tipo_documento", "folio",
            "estado", "vigencia", "score_confianza", "validacion_humana",
        ]


# ── Informes de terceros ────────────────────────────────────

class InformeTerceroSerializer(serializers.ModelSerializer):
    entidad_emisora_nombre = serializers.CharField(
        source="entidad_emisora.nombre", read_only=True
    )

    class Meta:
        model = InformeTercero
        fields = [
            "id", "tipo_informe", "entidad_emisora", "entidad_emisora_nombre",
            "nombre_archivo", "ruta_archivo",
            "fecha_emision", "fecha_vencimiento", "resultado", "seremi_aprobado",
        ]


# ── Log de visado (auditoría) ────────────────────────────────

class LogVisadoSerializer(serializers.ModelSerializer):
    accion_display = serializers.CharField(source="get_accion_display", read_only=True)
    origen_display = serializers.CharField(source="get_origen_display", read_only=True)

    class Meta:
        model = LogVisado
        fields = [
            "id", "documento", "accion", "accion_display",
            "origen", "origen_display", "usuario",
            "detalle", "score_ia", "metadata", "creado_en",
        ]
        read_only_fields = ["creado_en"]


# ── Contactos pendientes ────────────────────────────────────

class ContactoPendienteSerializer(serializers.ModelSerializer):
    beneficiario_nombre = serializers.CharField(source="beneficiario.nombre", read_only=True)
    rut = serializers.CharField(source="beneficiario.rut", read_only=True)
    telefono = serializers.CharField(source="beneficiario.telefono", read_only=True)
    committee = serializers.CharField(source="beneficiario.proyecto.nombre", read_only=True)

    class Meta:
        model = RegistroContacto
        fields = [
            "id", "beneficiario_nombre", "rut", "telefono",
            "documentos_faltantes", "urgencia", "ultimo_contacto_en", "committee",
        ]


# ── Alertas ──────────────────────────────────────────────────

class AlertaSerializer(serializers.ModelSerializer):
    beneficiario_nombre = serializers.CharField(source="beneficiario.nombre", read_only=True)
    rut = serializers.CharField(source="beneficiario.rut", read_only=True)
    committee = serializers.CharField(source="beneficiario.proyecto.nombre", read_only=True)

    class Meta:
        model = Alerta
        fields = [
            "id", "beneficiario_nombre", "rut",
            "nombre_documento", "dias_restantes", "committee", "severidad",
        ]


# ── Documentación OpenAPI: request/response para visado ──────

class VisarDocumentoRequestSerializer(serializers.Serializer):
    """Cuerpo multipart: archivo PDF o imagen para extracción con IA."""
    file = serializers.FileField(required=False, allow_null=True)


class ResultadoExtraccionSerializer(serializers.Serializer):
    label = serializers.CharField()
    value = serializers.CharField()
    status = serializers.ChoiceField(choices=["approved", "rejected", "alert"])
    note = serializers.CharField(required=False, allow_null=True)


class VisarDocumentoResponseSerializer(serializers.Serializer):
    resultados = ResultadoExtraccionSerializer(many=True)

