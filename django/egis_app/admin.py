from django.contrib import admin

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


@admin.register(Organizacion)
class OrganizacionAdmin(admin.ModelAdmin):
    list_display = ("nombre", "rut", "tipo", "comuna", "activa")
    list_filter = ("tipo", "activa")
    search_fields = ("nombre", "rut")


@admin.register(Proyecto)
class ProyectoAdmin(admin.ModelAdmin):
    list_display = ("nombre", "egis", "constructora", "ubicacion", "tipo", "avance_pct", "estado")
    search_fields = ("nombre", "ubicacion")
    list_filter = ("estado", "egis", "constructora")


@admin.register(Beneficiario)
class BeneficiarioAdmin(admin.ModelAdmin):
    list_display = ("nombre", "rut", "proyecto", "ahorro_uf", "rsh_pct", "estado")
    search_fields = ("nombre", "rut")
    list_filter = ("estado", "proyecto")


@admin.register(Documento)
class DocumentoAdmin(admin.ModelAdmin):
    list_display = ("nombre_archivo", "tipo_documento", "estado", "score_confianza", "validacion_humana")
    list_filter = ("estado", "vigencia", "validacion_humana")


@admin.register(LogVisado)
class LogVisadoAdmin(admin.ModelAdmin):
    list_display = ("documento", "accion", "origen", "usuario", "creado_en")
    list_filter = ("accion", "origen")
    readonly_fields = ("documento", "accion", "origen", "usuario", "detalle", "score_ia", "metadata", "creado_en")


@admin.register(InformeTercero)
class InformeTerceroAdmin(admin.ModelAdmin):
    list_display = ("tipo_informe", "carpeta", "entidad_emisora", "fecha_emision", "seremi_aprobado")
    list_filter = ("tipo_informe", "seremi_aprobado")


admin.site.register(Carpeta)
admin.site.register(ReglaSubsidio)
admin.site.register(ReglaDocumento)
admin.site.register(ModuloIA)
admin.site.register(RegistroContacto)
admin.site.register(Alerta)

