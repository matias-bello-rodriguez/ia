from django.urls import path

from . import views

urlpatterns = [
    # ── Dashboard ────────────────────────────────────────────
    path("dashboard/", views.DashboardView.as_view(), name="dashboard"),

    # ── Perfil de usuario ────────────────────────────────────
    path("perfil/", views.PerfilUsuarioView.as_view(), name="perfil"),

    # ── Organizaciones ───────────────────────────────────────
    path("organizaciones/", views.OrganizacionListView.as_view(), name="organizaciones-list"),

    # ── Proyectos ────────────────────────────────────────────
    path("proyectos/", views.ProyectoListView.as_view(), name="proyectos-list"),

    # ── Beneficiarios ────────────────────────────────────────
    path("beneficiarios/", views.BeneficiarioListView.as_view(), name="beneficiarios-list"),

    # ── Documentos ───────────────────────────────────────────
    path("documentos/cola/", views.DocumentosColaView.as_view(), name="documentos-cola"),
    path("documentos/visar/", views.VisarDocumentoView.as_view(), name="documentos-visar"),
    path("documentos/<uuid:pk>/", views.DocumentoDetailView.as_view(), name="documento-detail"),

    # ── Semáforo (Constructora) ──────────────────────────────
    path("semaforo/proyectos/", views.SemaforoProyectosView.as_view(), name="semaforo-proyectos"),
    path("semaforo/carpetas/<uuid:pk>/", views.SemaforoCarpetaView.as_view(), name="semaforo-carpeta"),

    # ── Firma HITO ───────────────────────────────────────────
    path("carpetas/<uuid:pk>/firma-hito/", views.FirmaHitoView.as_view(), name="firma-hito"),

    # ── Reportes / Carpetas ──────────────────────────────────
    path("reportes/ejecutivo/", views.ReporteEjecutivoView.as_view(), name="reportes-ejecutivo"),
    path("carpetas/<uuid:pk>/archivos/", views.CarpetaArchivosView.as_view(), name="carpeta-archivos"),
    path(
        "carpetas/<uuid:pk>/informes-terceros/",
        views.CarpetaInformesTercerosView.as_view(),
        name="carpeta-informes-terceros",
    ),
    path(
        "carpetas/<uuid:pk>/listo-facturar/",
        views.MarcarListoFacturarView.as_view(),
        name="carpeta-listo-facturar",
    ),

    # ── Auditoría ────────────────────────────────────────────
    path("auditoria/", views.AuditoriaListView.as_view(), name="auditoria-list"),

    # ── Notificaciones ───────────────────────────────────────
    path(
        "notificaciones/contactos-pendientes/",
        views.ContactosPendientesView.as_view(),
        name="contactos-pendientes",
    ),
    path(
        "notificaciones/contactos-pendientes/<uuid:pk>/enviar/",
        views.MarcaContactoEnviadoView.as_view(),
        name="contactos-enviar",
    ),

    # ── Configuración ────────────────────────────────────────
    path(
        "configuracion/reglas-subsidio/",
        views.ReglasSubsidioListView.as_view(),
        name="reglas-subsidio-list",
    ),
    path(
        "configuracion/reglas-subsidio/<uuid:pk>/",
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

