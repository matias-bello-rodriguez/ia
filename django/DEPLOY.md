# 🏗️ Guía de Despliegue — EGIS Backend → Supabase

> Django como fuente de verdad (IaC) para PostgreSQL en Supabase.
> Las migraciones de Django actúan como "Terraform para la base de datos".

---

## Prerrequisitos

| Herramienta      | Versión mínima | Notas                                     |
|------------------|----------------|--------------------------------------------|
| Python           | 3.11+          | `python --version`                         |
| pip / venv       | —              | Incluido con Python                        |
| Supabase Project | —              | Cuenta gratuita en https://supabase.com    |
| Git              | —              | Para control de versiones                  |

---

## Paso 1 — Configurar el entorno local

```bash
cd django/

# Crear y activar virtualenv
python -m venv .venv

# Windows (PowerShell)
.\.venv\Scripts\Activate.ps1

# Linux / macOS
source .venv/bin/activate
```

---

## Paso 2 — Instalar dependencias

```bash
pip install -r requirements.txt
```

Librerías clave:
- **django** — Framework web / ORM.
- **psycopg2-binary** — Driver PostgreSQL.
- **dj-database-url** — Parsea `DATABASE_URL` en formato Supabase.
- **python-decouple** — Lee `.env` de forma segura.
- **django-cors-headers** — Habilita CORS para Angular.

---

## Paso 3 — Configurar variables de entorno

```bash
# Copiar plantilla
cp .env.example .env
```

Editar `.env` con los valores reales:

```ini
# Obtener de: Supabase Dashboard → Settings → Database → Connection string (URI)
DATABASE_URL=postgres://postgres.<ref>:<password>@aws-0-sa-east-1.pooler.supabase.com:6543/postgres

SECRET_KEY=una-clave-segura-generada-con-get-random-secret-key
DEBUG=True
```

> **Tip:** Genera una SECRET_KEY segura:
> ```python
> python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
> ```

---

## Paso 4 — Generar migraciones (plan)

Este paso es análogo a `terraform plan`: Django compara los modelos Python
con el estado actual de las migraciones y genera los archivos de cambio.

```bash
python manage.py makemigrations egis_app
```

Salida esperada:
```
Migrations for 'egis_app':
  egis_app/migrations/0001_initial.py
    - Create model Organizacion
    - Create model ReglaSubsidio
    - Create model ReglaDocumento
    - Create model Proyecto
    - Create model Beneficiario
    - Create model Carpeta
    - Create model Documento
    - Create model InformeTercero
    - Create model LogVisado
    - Create model RegistroContacto
    - Create model Alerta
    - Create model ModuloIA
```

> **Revisar siempre** los archivos generados en `egis_app/migrations/` antes
> de aplicar, como se haría con un plan de Terraform.

---

## Paso 5 — Aplicar migraciones (apply)

Análogo a `terraform apply`: ejecuta los DDL contra la base de datos
PostgreSQL de Supabase.

```bash
python manage.py migrate
```

Esto crea todas las tablas en Supabase. Puedes verificarlas en:

> **Supabase Dashboard → Table Editor** o **SQL Editor**:
> ```sql
> SELECT table_name
> FROM information_schema.tables
> WHERE table_schema = 'public'
> ORDER BY table_name;
> ```

---

## Paso 6 — Crear superusuario (admin)

```bash
python manage.py createsuperuser
```

Acceder al panel de administración: `http://localhost:8000/admin/`

---

## Paso 7 — Ejecutar servidor de desarrollo

```bash
python manage.py runserver
```

Endpoints disponibles:
- **Admin:** http://localhost:8000/admin/
- **API REST:** http://localhost:8000/api/
- **Swagger:** http://localhost:8000/api/docs/
- **GraphQL:** http://localhost:8000/graphql/

---

## Flujo de cambios en el esquema (día a día)

Cada vez que se modifique `models.py`:

```bash
# 1. Generar migración (plan)
python manage.py makemigrations egis_app

# 2. Revisar el archivo generado en egis_app/migrations/

# 3. Aplicar contra Supabase (apply)
python manage.py migrate

# 4. Verificar en Supabase Dashboard
```

> **Regla de oro:** Nunca edites las tablas directamente en Supabase.
> Siempre usa Django como fuente de verdad. Si necesitas un cambio,
> modifica `models.py` y genera la migración correspondiente.

---

## Esquema de modelos (resumen)

```
Organizacion (EGIS / Constructora / Lab)
    │
    ├── Proyecto ──────── Beneficiario ──── Carpeta
    │   (egis + constr.)      │                │
    │                         │                ├── Documento ──── LogVisado (auditoría)
    │                         │                │   (IA: extraccion_json,
    │                         │                │    score_confianza,
    │                         │                │    validacion_humana)
    │                         │                │
    │                         │                └── InformeTercero
    │                         │                    (universidad / SEREMI)
    │                         │
    │                         ├── RegistroContacto
    │                         └── Alerta
    │
    ├── ReglaSubsidio (DS49, DS1, etc.)
    ├── ReglaDocumento (vigencias)
    └── ModuloIA (OCR, clasificador, etc.)
```

---

## Consideraciones de producción

1. **`DEBUG=False`** y configurar `ALLOWED_HOSTS` correctamente.
2. **`SECRET_KEY`** único y seguro (nunca commitear al repo).
3. **`DB_SSL_REQUIRE=True`** para conexiones cifradas a Supabase.
4. **Collectstatic:** `python manage.py collectstatic` si se sirven archivos estáticos.
5. **Gunicorn** como servidor WSGI: `gunicorn egis_backend.wsgi:application`.
6. **Backups:** Supabase incluye backups automáticos en planes Pro.

---

## Troubleshooting

| Problema | Solución |
|----------|----------|
| `django.db.utils.OperationalError: could not connect` | Verificar `DATABASE_URL` y que la IP esté en la allowlist de Supabase |
| `ModuleNotFoundError: No module named 'decouple'` | `pip install python-decouple` |
| `relation already exists` | Migración ya aplicada; ejecutar `python manage.py showmigrations` |
| `SSL connection is required` | Agregar `DB_SSL_REQUIRE=True` al `.env` |
