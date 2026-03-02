"""
settings.py — Configuración principal del backend EGIS.

Conexión a Supabase (PostgreSQL) mediante DATABASE_URL.
Usa python-decouple para leer variables de entorno desde .env.
"""

import os
from pathlib import Path

import dj_database_url
from decouple import Csv, config

BASE_DIR = Path(__file__).resolve().parent.parent

# ──────────────────────────────────────────────────────────────
# Seguridad
# ──────────────────────────────────────────────────────────────
SECRET_KEY = config("SECRET_KEY", default="dev-secret-key-change-me-in-production")

DEBUG = config("DEBUG", default=True, cast=bool)

ALLOWED_HOSTS: list[str] = config(
    "ALLOWED_HOSTS",
    default="*",
    cast=Csv(),
)

# ──────────────────────────────────────────────────────────────
# Aplicaciones instaladas
# ──────────────────────────────────────────────────────────────
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    # Third-party
    "rest_framework",
    "django_filters",
    "graphene_django",
    "drf_spectacular",
    "corsheaders",
    # Local
    "egis_app",
]

# ──────────────────────────────────────────────────────────────
# Middleware
# ──────────────────────────────────────────────────────────────
MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

# CORS — permitir el frontend Angular en desarrollo
CORS_ALLOWED_ORIGINS = config(
    "CORS_ALLOWED_ORIGINS",
    default="http://localhost:4200",
    cast=Csv(),
)

ROOT_URLCONF = "egis_backend.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "egis_backend.wsgi.application"

# ──────────────────────────────────────────────────────────────
# Base de datos — Supabase (PostgreSQL)
# ──────────────────────────────────────────────────────────────
# DATABASE_URL debe tener la forma:
#   postgres://postgres.<ref>:<password>@aws-0-<region>.pooler.supabase.com:6543/postgres
#
# En desarrollo se puede usar SQLite como fallback si no hay URL.
# ──────────────────────────────────────────────────────────────
DATABASE_URL = config("DATABASE_URL", default="")

if DATABASE_URL:
    DATABASES = {
        "default": dj_database_url.parse(
            DATABASE_URL,
            conn_max_age=600,
            conn_health_checks=True,
            ssl_require=config("DB_SSL_REQUIRE", default=True, cast=bool),
        )
    }
else:
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.sqlite3",
            "NAME": BASE_DIR / "db.sqlite3",
        }
    }

AUTH_PASSWORD_VALIDATORS = []

LANGUAGE_CODE = "es-cl"

TIME_ZONE = "America/Santiago"

USE_I18N = True
USE_TZ = True

STATIC_URL = "static/"
STATIC_ROOT = BASE_DIR / "staticfiles"

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# Django REST Framework
REST_FRAMEWORK = {
    "DEFAULT_FILTER_BACKENDS": ["django_filters.rest_framework.DjangoFilterBackend"],
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.PageNumberPagination",
    "PAGE_SIZE": 50,
    "DEFAULT_SCHEMA_CLASS": "drf_spectacular.openapi.AutoSchema",
}

# drf-spectacular (OpenAPI / Swagger)
SPECTACULAR_SETTINGS = {
    "TITLE": "EGIS Backend API",
    "DESCRIPTION": "API REST para gestión habitacional: dashboard, proyectos, beneficiarios, visado de documentos con IA, reportes SERVIU, notificaciones y configuración.",
    "VERSION": "1.0.0",
    "SERVE_INCLUDE_SCHEMA": False,
    "COMPONENT_SPLIT_REQUEST": True,
    "SCHEMA_PATH_PREFIX": r"/api/",
    "TAGS": [
        {"name": "Dashboard", "description": "Métricas y panel principal"},
        {"name": "Proyectos", "description": "Proyectos habitacionales"},
        {"name": "Beneficiarios", "description": "Beneficiarios por proyecto"},
        {"name": "Documentos", "description": "Cola de documentos y visado con IA"},
        {"name": "Reportes", "description": "Reporte ejecutivo SERVIU y carpetas"},
        {"name": "Notificaciones", "description": "Contactos pendientes y envío"},
        {"name": "Configuración", "description": "Reglas de subsidio, documento y módulos IA"},
    ],
}

# GraphQL
GRAPHENE = {
    "SCHEMA": "egis_app.schema.schema",
}

# OpenAI (conexión a API para IA: extracción OCR, validación, etc.)
OPENAI_API_KEY = config("OPENAI_API_KEY", default="")

