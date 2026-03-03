from rest_framework import serializers

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


# ── Organizaciones ───────────────────────────────────────────

class OrganizacionSerializer(serializers.ModelSerializer):
    tipo_display = serializers.CharField(source="get_tipo_display", read_only=True)

    class Meta:
        model = Organizacion
        fields = [
            "id", "nombre", "rut", "tipo", "tipo_display",
            "direccion", "comuna", "region", "telefono", "email", "activa",
        ]


# ── Perfil de usuario ────────────────────────────────────────

class PerfilUsuarioSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username", read_only=True)
    email = serializers.CharField(source="user.email", read_only=True)
    organizacion_nombre = serializers.CharField(source="organizacion.nombre", read_only=True)
    rol_display = serializers.CharField(source="get_rol_display", read_only=True)

    class Meta:
        model = PerfilUsuario
        fields = [
            "id", "username", "email", "organizacion", "organizacion_nombre",
            "rol", "rol_display", "es_egis", "es_hito", "es_constructora", "activo",
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
    firma_hito_usuario_nombre = serializers.SerializerMethodField()

    class Meta:
        model = Carpeta
        fields = [
            "id", "beneficiario", "estado", "estado_subsidio", "monto_uf",
            "monto_contrato_uf", "monto_resolucion_uf", "alerta_monto_inconsistente",
            "visto_bueno_ito", "check_seremi", "resolucion",
            "informe_universidad", "listo_para_facturar",
            "firma_hito_usuario", "firma_hito_usuario_nombre", "firma_hito_en",
        ]

    def get_firma_hito_usuario_nombre(self, obj) -> str:
        if obj.firma_hito_usuario:
            return obj.firma_hito_usuario.get_full_name() or obj.firma_hito_usuario.username
        return ""


# ── Documentos ───────────────────────────────────────────────

class DocumentoSerializer(serializers.ModelSerializer):
    semaforo = serializers.CharField(read_only=True)
    revisado_por_hito_nombre = serializers.SerializerMethodField()

    class Meta:
        model = Documento
        fields = [
            "id", "carpeta", "nombre_archivo", "ruta_archivo",
            "tipo_documento", "folio",
            "estado", "vigencia", "semaforo",
            "fecha_emision", "fecha_vencimiento", "dias_restantes",
            "extraccion_json", "resumen_ejecutivo",
            "score_confianza", "validacion_humana", "ia_procesado",
            "nota_rechazo",
            "revisado_por_hito", "revisado_por_hito_nombre", "fecha_visado",
            "creado_en",
        ]

    def get_revisado_por_hito_nombre(self, obj) -> str:
        if obj.revisado_por_hito:
            return obj.revisado_por_hito.get_full_name() or obj.revisado_por_hito.username
        return ""


class CarpetaArchivoSerializer(serializers.ModelSerializer):
    semaforo = serializers.CharField(read_only=True)

    class Meta:
        model = Documento
        fields = [
            "id", "nombre_archivo", "tipo_documento", "folio",
            "estado", "vigencia", "semaforo",
            "score_confianza", "validacion_humana",
            "fecha_emision", "fecha_vencimiento", "dias_restantes",
            "ia_procesado",
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


# ── Auditoría de estados ────────────────────────────────────

class AuditoriaEstadoSerializer(serializers.ModelSerializer):
    usuario_nombre = serializers.SerializerMethodField()
    organizacion_nombre = serializers.CharField(
        source="organizacion.nombre", read_only=True
    )

    class Meta:
        model = AuditoriaEstado
        fields = [
            "id", "tipo_entidad", "entidad_id",
            "estado_anterior", "estado_nuevo",
            "usuario", "usuario_nombre",
            "organizacion", "organizacion_nombre",
            "detalle", "metadata", "ip_address", "creado_en",
        ]
        read_only_fields = ["creado_en"]

    def get_usuario_nombre(self, obj) -> str:
        if obj.usuario:
            return obj.usuario.get_full_name() or obj.usuario.username
        return "Sistema"


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


# ── Semáforo del proyecto (constructora) ─────────────────────

class SemaforoProyectoSerializer(serializers.Serializer):
    """Vista del semáforo por proyecto para la Constructora."""
    proyecto_id = serializers.UUIDField()
    proyecto_nombre = serializers.CharField()
    total_carpetas = serializers.IntegerField()
    carpetas_verde = serializers.IntegerField()
    carpetas_amarillo = serializers.IntegerField()
    carpetas_rojo = serializers.IntegerField()
    avance_pct = serializers.IntegerField()
    alerta_monto = serializers.BooleanField()


# ── Firma HITO ───────────────────────────────────────────────

class FirmaHitoRequestSerializer(serializers.Serializer):
    """Request para firma HITO de aprobación SERVIU."""
    token_firma = serializers.CharField(
        required=False,
        allow_blank=True,
        help_text="Token de firma digital (opcional para firma simple).",
    )
    observacion = serializers.CharField(required=False, allow_blank=True)


class FirmaHitoResponseSerializer(serializers.Serializer):
    ok = serializers.BooleanField()
    mensaje = serializers.CharField()
    carpeta_id = serializers.UUIDField()
    firmado_por = serializers.CharField()
    firmado_en = serializers.DateTimeField()


# ── Documentación OpenAPI: request/response para visado ──────

class VisarDocumentoRequestSerializer(serializers.Serializer):
    """Cuerpo multipart: archivo PDF o imagen para extracción con IA."""
    file = serializers.FileField(required=False, allow_null=True)
    tipo_documento = serializers.CharField(
        required=False,
        allow_blank=True,
        help_text="Tipo de documento: contrato, resolucion, informe_universidad, etc.",
    )
    carpeta_id = serializers.UUIDField(
        required=False,
        allow_null=True,
        help_text="UUID de carpeta para asociar el documento procesado.",
    )


class ResultadoExtraccionSerializer(serializers.Serializer):
    label = serializers.CharField()
    value = serializers.CharField()
    status = serializers.ChoiceField(choices=["approved", "rejected", "alert"])
    note = serializers.CharField(required=False, allow_null=True)


class VisarDocumentoResponseSerializer(serializers.Serializer):
    resultados = ResultadoExtraccionSerializer(many=True)
    resumen_ejecutivo = serializers.CharField(required=False)
    score_confianza = serializers.FloatField(required=False)
    alertas_monto = serializers.ListField(
        child=serializers.CharField(), required=False
    )

