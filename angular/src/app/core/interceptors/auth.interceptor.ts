import { HttpInterceptorFn } from '@angular/common/http';
import { from, switchMap } from 'rxjs';
import { getSupabaseClient } from '../services/supabase-client';
import { environment } from '../../../environments/environment';

/**
 * Interceptor funcional (Angular standalone) que adjunta el token
 * JWT de Supabase Auth como cabecera `Authorization: Bearer <token>`
 * a todas las peticiones que van dirigidas a la API de NestJS.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Solo interceptar peticiones al backend NestJS
  if (!req.url.startsWith(environment.apiUrl)) {
    return next(req);
  }

  const supabase = getSupabaseClient();

  return from(supabase.auth.getSession()).pipe(
    switchMap(({ data }) => {
      const token = data.session?.access_token;

      if (token) {
        const cloned = req.clone({
          setHeaders: { Authorization: `Bearer ${token}` },
        });
        return next(cloned);
      }

      // Sin sesión activa → enviar sin token (NestJS Guard devuelve 401)
      return next(req);
    }),
  );
};
