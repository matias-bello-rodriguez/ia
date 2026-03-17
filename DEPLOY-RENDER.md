# Desplegar solo el frontend Angular en Render (Supabase)

Solo se despliega el **Static Site** de Angular. Los datos, auth y storage siguen en **Supabase** (ya en la nube).

---

## Con el Blueprint (recomendado)

1. Entra en [dashboard.render.com](https://dashboard.render.com).
2. **New +** → **Blueprint**.
3. Conecta GitHub/GitLab y elige este repo.
4. Render usará el `render.yaml` (un solo servicio: **egis-app**).
5. **Apply**. No hace falta configurar variables: Supabase ya está en `environment.prod.ts`.

Cuando termine el deploy tendrás una URL como:  
`https://egis-app.onrender.com`

---

## A mano (sin Blueprint)

1. **New +** → **Static Site**.
2. Conecta el repo.
3. **Root Directory**: `angular`.
4. **Build Command**: `npm ci && npx ng build --configuration=production`
5. **Publish Directory**: `dist/egis-pro`
6. **Create Static Site**.

Para que las rutas de Angular no den 404: en el sitio → **Redirects/Rewrites** → **Rewrite**: source `/*`, destination `/index.html`.

---

## Configuración

Todo lo que usa el frontend (Supabase URL, anon key, bucket) está en **`angular/src/environments/environment.prod.ts`**. Si cambias de proyecto Supabase, edita ese archivo y vuelve a desplegar (push al repo o redeploy en Render).
