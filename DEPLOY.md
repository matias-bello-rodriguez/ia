# Guía de despliegue — EGIS (Angular + Django + Supabase)

Esta guía te permite llevar la aplicación a producción: frontend Angular, backend Django y Supabase ya en la nube.

---

## Resumen de la arquitectura

| Parte      | Tecnología | Dónde desplegar              |
|-----------|------------|------------------------------|
| Frontend  | Angular    | Vercel, Netlify o Firebase   |
| Backend   | Django     | Railway, Render o Fly.io     |
| Base de datos + Auth + Storage | Supabase | Ya en la nube (solo configurar env) |

---

## 1. Supabase (ya está en la nube)

- Tu proyecto ya usa Supabase. En producción solo necesitas:
  - **URL y anon key** en el frontend (en `environment.prod.ts` o variables de build).
  - **DATABASE_URL** en el backend (Connection string en Supabase → Settings → Database).
- Asegúrate de tener el bucket `documentos_proyectos` creado en Storage y las políticas RLS que uses.

---

## 2. Desplegar el backend (Django)

### Opción A: Railway

1. Crea cuenta en [railway.app](https://railway.app).
2. **New Project** → **Deploy from GitHub** y elige este repo.
3. Configura el **root directory**: `django`.
4. Variables de entorno en Railway → **Variables**:

   ```env
   DATABASE_URL=postgres://postgres.xxx:YYY@aws-0-sa-east-1.pooler.supabase.com:6543/postgres
   SECRET_KEY=<genera una con: python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())">
   DEBUG=False
   ALLOWED_HOSTS=*.railway.app,tu-dominio.com
   CORS_ALLOWED_ORIGINS=https://tu-frontend.vercel.app,https://tu-dominio.com
   OPENAI_API_KEY=sk-...   # opcional, para IA en el backend
   DB_SSL_REQUIRE=True
   ```

5. **Build Command**: `pip install -r requirements.txt`
6. **Start Command**: `gunicorn egis_backend.wsgi:application --bind 0.0.0.0:$PORT`
7. Añade **gunicorn** a `django/requirements.txt` (ver más abajo).
8. Tras el deploy, copia la URL pública (ej. `https://egis-api.up.railway.app`). La usarás en el frontend como **API base**.

### Opción B: Render

1. [render.com](https://render.com) → **New** → **Web Service**.
2. Conecta el repo y pon **Root Directory**: `django`.
3. **Build**: `pip install -r requirements.txt`
4. **Start**: `gunicorn egis_backend.wsgi:application --bind 0.0.0.0:$PORT`
5. Añade las mismas variables de entorno que en Railway (Render usa `PORT` automáticamente).
6. En **Environment** añade `PYTHON_VERSION=3.11` si lo necesitas.

### Añadir Gunicorn al backend

En `django/requirements.txt` agrega al final:

```txt
# Producción
gunicorn>=22.0,<23.0
```

Luego en la plataforma el **Start Command** será:

```bash
gunicorn egis_backend.wsgi:application --bind 0.0.0.0:$PORT
```

(En Railway y Render `$PORT` lo define la plataforma.)

---

## 3. Desplegar el frontend (Angular)

### Build de producción

Desde la raíz del repo:

```bash
cd angular
npm ci
npx ng build --configuration=production
```

La salida queda en `angular/dist/egis-pro/` (archivos estáticos listos para cualquier hosting).

### Configuración para producción

En **`angular/src/environments/environment.prod.ts`** debes tener:

- `supabaseUrl` y `supabaseAnonKey`: los de tu proyecto Supabase.
- `storageBucket`: `documentos_proyectos` (o el que uses).
- **OpenAI en producción** (elegir una opción):

  - **Recomendado (backend como proxy):**  
    En `environment.prod.ts` define solo:
    - `apiBaseUrl`: `'https://tu-backend.railway.app'` (sin barra final).
    - Deja `openaiApiKey` vacío: `''`.
    El frontend usará `apiBaseUrl + '/api/openai/v1/responses'` y no enviará la API key (el backend usa `OPENAI_API_KEY`).

  - **Alternativa (llamada directa a OpenAI):**  
    Deja `apiBaseUrl` vacío y configura `openaiUrl` y `openaiApiKey` (menos recomendable: la key queda en el build del frontend).

### Opción A: Vercel

1. [vercel.com](https://vercel.com) → **Add New** → **Project** e importa el repo.
2. **Root Directory**: `angular`.
3. **Build Command**: `npm ci && npx ng build --configuration=production`
4. **Output Directory**: `dist/egis-pro` (Vercel sirve el contenido de esta carpeta).
5. **Environment variables** (opcional): si usas env en build (sustitución en `environment.prod.ts`), configúralas en Vercel.

### Opción B: Netlify

1. [netlify.com](https://netlify.com) → **Add new site** → **Import from Git**.
2. **Base directory**: `angular`.
3. **Build command**: `npm ci && npx ng build --configuration=production`
4. **Publish directory**: `angular/dist/egis-pro` (o `dist/egis-pro` si el base es `angular`).
5. Variables de entorno en **Site settings** → **Environment variables** si las usas en el build.

### Opción C: Firebase Hosting

```bash
cd angular
npm install -g firebase-tools
firebase login
firebase init hosting   # directorio: dist/egis-pro
npx ng build --configuration=production
firebase deploy
```

---

## 4. Variables de entorno resumidas

### Backend (Django)

| Variable           | Obligatoria | Descripción |
|--------------------|-------------|-------------|
| `DATABASE_URL`     | Sí          | Connection string de Supabase (PostgreSQL). |
| `SECRET_KEY`       | Sí          | Clave secreta de Django (generar una segura). |
| `DEBUG`            | Sí          | `False` en producción. |
| `ALLOWED_HOSTS`    | Sí          | Dominios permitidos (ej. `tu-api.railway.app`). |
| `CORS_ALLOWED_ORIGINS` | Sí     | URL del frontend (ej. `https://tu-app.vercel.app`). |
| `OPENAI_API_KEY`   | Opcional    | Para proxy de OpenAI/IA en el backend. |
| `DB_SSL_REQUIRE`   | Recomendado | `True` para Supabase. |

### Frontend (Angular) — build / env

| Variable / archivo        | Descripción |
|---------------------------|-------------|
| `environment.prod.ts`     | `supabaseUrl`, `supabaseAnonKey`, `storageBucket`. |
| `openaiUrl` / `apiBaseUrl`| URL del backend (proxy OpenAI) o de OpenAI directo. |
| `openaiApiKey`            | Mejor vacío en prod si usas backend como proxy. |

---

## 5. Checklist antes de ir a producción

- [ ] Backend: `DEBUG=False`, `SECRET_KEY` segura, `ALLOWED_HOSTS` y `CORS_ALLOWED_ORIGINS` con las URLs reales.
- [ ] Backend: `DATABASE_URL` de Supabase con SSL (`DB_SSL_REQUIRE=True`).
- [ ] Backend: `OPENAI_API_KEY` en el servidor si usas IA por el backend.
- [ ] Frontend: `environment.prod.ts` con Supabase y, si aplica, URL del backend para OpenAI.
- [ ] Supabase: políticas RLS y bucket de Storage configurados.
- [ ] Build Angular: `npx ng build --configuration=production` sin errores.
- [ ] Backend: migraciones aplicadas (`python manage.py migrate`) en el entorno de producción (Railway/Render suelen hacerlo en el build o con un comando de release).

---

## 6. Aplicar migraciones en producción (Django)

En Railway/Render suele añadirse un paso de **release** o **post-build**:

```bash
python manage.py migrate --noinput
```

O ejecutarlo una vez por consola en el servicio desplegado (Railway → **Shell**, Render → **Shell**).

---

Si indicas en qué plataforma quieres desplegar primero (por ejemplo “solo frontend en Vercel” o “backend en Railway y frontend en Vercel”), se puede bajar esto a pasos concretos con los nombres de proyecto y URLs que vayas a usar.
