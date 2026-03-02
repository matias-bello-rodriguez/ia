from django.urls import path

from . import views

urlpatterns = [
    path("dashboard/", views.DashboardView.as_view(), name="dashboard"),
    path("proyectos/", views.ProyectoListView.as_view(), name="proyectos-list"),
    path("beneficiarios/", views.BeneficiarioListView.as_view(), name="beneficiarios-list"),
    path("documentos/cola/", views.DocumentosColaView.as_view(), name="documentos-cola"),
    path("documentos/visar/", views.VisarDocumentoView.as_view(), name="documentos-visar"),
    path("reportes/ejecutivo/", views.ReporteEjecutivoView.as_view(), name="reportes-ejecutivo"),
    path("carpetas/<int:pk>/archivos/", views.CarpetaArchivosView.as_view(), name="carpeta-archivos"),
    path(
        "carpetas/<int:pk>/informes-terceros/",
        views.CarpetaInformesTercerosView.as_view(),
        name="carpeta-informes-terceros",
    ),
    path(
        "carpetas/<int:pk>/listo-facturar/",
        views.MarcarListoFacturarView.as_view(),
        name="carpeta-listo-facturar",
    ),
    path(
        "notificaciones/contactos-pendientes/",
        views.ContactosPendientesView.as_view(),
        name="contactos-pendientes",
    ),
    path(
        "notificaciones/contactos-pendientes/<int:pk>/enviar/",
        views.MarcaContactoEnviadoView.as_view(),
        name="contactos-enviar",
    ),
    path(
        "configuracion/reglas-subsidio/",
        views.ReglasSubsidioListView.as_view(),
        name="reglas-subsidio-list",
    ),
    path(
        "configuracion/reglas-subsidio/<int:pk>/",
        views.ReglaSubsidioDetailView.as_view(),
        name="reglas-subsidio-detail",
    ),
    path(
        "configuracion/reglas-documento/",
        views.ReglasDocumentoListView.as_view(),
        name="reglas-documento-list",
    ),
    path(
        "configuracion/modulos-ia/",
        views.ModulosIAListView.as_view(),
        name="modulos-ia-list",
    ),
]

