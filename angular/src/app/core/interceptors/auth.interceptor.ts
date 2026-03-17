import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, from, switchMap, throwError } from 'rxjs';
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

  console.debug('[AuthInterceptor] Interceptando:', req.url);

  const supabase = getSupabaseClient();

  return from(supabase.auth.getSession()).pipe(
    switchMap(({ data }) => {
      const token = data.session?.access_token;

      console.debug('[AuthInterceptor] Token encontrado:', !!token);

      if (token) {
        try {
          const payloadPart = token.split('.')[1];
          const payload = JSON.parse(atob(payloadPart)) as {
            exp?: number;
            ref?: string;
            sub?: string;
          };
          const expMs = (payload.exp ?? 0) * 1000;
          const expiresInSec = Math.floor((expMs - Date.now()) / 1000);
          console.debug('[AuthInterceptor] JWT payload:', {
            ref: payload.ref,
            sub: payload.sub,
            expiresInSec,
            isExpired: expiresInSec <= 0,
          });
        } catch {
          console.debug('[AuthInterceptor] No se pudo decodificar payload JWT');
        }
      }

      if (token) {
        const cloned = req.clone({
          setHeaders: { Authorization: `Bearer ${token}` },
        });
        return next(cloned).pipe(
          catchError((error) => {
            // Si el access token venció, intentamos refrescar una vez y reintentamos.
            if (error?.status !== 401) {
              return throwError(() => error);
            }

            return from(supabase.auth.refreshSession()).pipe(
              switchMap(({ data }) => {
                const refreshedToken = data.session?.access_token;

                if (!refreshedToken) {
                  return throwError(() => error);
                }

                const retried = req.clone({
                  setHeaders: { Authorization: `Bearer ${refreshedToken}` },
                });

                return next(retried);
              }),
              catchError(() => throwError(() => error)),
            );
          }),
        );
      }

      // Sin sesión activa → enviar sin token (NestJS Guard devuelve 401)
      return next(req);
    }),
  );
};
