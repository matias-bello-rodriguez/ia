from django.contrib import admin

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


@admin.register(Proyecto)
class ProyectoAdmin(admin.ModelAdmin):
    list_display = ("nombre", "ubicacion", "tipo", "clasificacion", "avance_pct", "estado")
    search_fields = ("nombre", "ubicacion")


@admin.register(Beneficiario)
class BeneficiarioAdmin(admin.ModelAdmin):
    list_display = ("nombre", "rut", "proyecto", "estado", "subsidio_sugerido")
    search_fields = ("nombre", "rut")
    list_filter = ("estado", "proyecto")


admin.site.register(Carpeta)
admin.site.register(Documento)
admin.site.register(InformeTercero)
admin.site.register(ReglaSubsidio)
admin.site.register(ReglaDocumento)
admin.site.register(ModuloIA)
admin.site.register(RegistroContacto)
admin.site.register(Alerta)

