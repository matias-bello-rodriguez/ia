from rest_framework import serializers

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


class ProyectoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Proyecto
        fields = [
            "id",
            "nombre",
            "ubicacion",
            "tipo",
            "clasificacion",
            "cantidad_beneficiarios",
            "avance_pct",
            "estado",
        ]


class BeneficiarioSerializer(serializers.ModelSerializer):
    proyecto = ProyectoSerializer(read_only=True)
    proyecto_id = serializers.PrimaryKeyRelatedField(
        source="proyecto", queryset=Proyecto.objects.all(), write_only=True
    )
    subsidio_sugerido_nombre = serializers.CharField(source="subsidio_sugerido.nombre", read_only=True)

    class Meta:
        model = Beneficiario
        fields = [
            "id",
            "proyecto",
            "proyecto_id",
            "nombre",
            "rut",
            "telefono",
            "rsh_pct",
            "ahorro_uf",
            "ahorro_minimo_uf",
            "subsidio_sugerido",
            "subsidio_sugerido_nombre",
            "puntaje_match",
            "estado",
        ]


class ReglaSubsidioSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReglaSubsidio
        fields = "__all__"


class ReglaDocumentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReglaDocumento
        fields = "__all__"


class ModuloIASerializer(serializers.ModelSerializer):
    class Meta:
        model = ModuloIA
        fields = "__all__"


class CarpetaResumenSerializer(serializers.ModelSerializer):
    beneficiario = BeneficiarioSerializer(read_only=True)

    class Meta:
        model = Carpeta
        fields = [
            "id",
            "beneficiario",
            "estado_subsidio",
            "monto_uf",
            "visto_bueno_ito",
            "check_seremi",
            "resolucion",
            "informe_universidad",
            "listo_para_facturar",
        ]


class CarpetaArchivoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Documento
        fields = ["id", "nombre_archivo", "tipo_documento", "folio", "estado"]


class InformeTerceroSerializer(serializers.ModelSerializer):
    class Meta:
        model = InformeTercero
        fields = ["id", "tipo_informe", "nombre_archivo", "ruta_archivo", "seremi_aprobado"]


class ContactoPendienteSerializer(serializers.ModelSerializer):
    beneficiario_nombre = serializers.CharField(source="beneficiario.nombre", read_only=True)
    rut = serializers.CharField(source="beneficiario.rut", read_only=True)
    telefono = serializers.CharField(source="beneficiario.telefono", read_only=True)
    committee = serializers.CharField(source="beneficiario.proyecto.nombre", read_only=True)

    class Meta:
        model = RegistroContacto
        fields = [
            "id",
            "beneficiario_nombre",
            "rut",
            "telefono",
            "documentos_faltantes",
            "urgencia",
            "ultimo_contacto_en",
            "committee",
        ]


class AlertaSerializer(serializers.ModelSerializer):
    beneficiario_nombre = serializers.CharField(source="beneficiario.nombre", read_only=True)
    rut = serializers.CharField(source="beneficiario.rut", read_only=True)
    committee = serializers.CharField(source="beneficiario.proyecto.nombre", read_only=True)

    class Meta:
        model = Alerta
        fields = [
            "id",
            "beneficiario_nombre",
            "rut",
            "nombre_documento",
            "dias_restantes",
            "committee",
            "severidad",
        ]

