import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { from, switchMap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { environment } from '../../../environments/environment';

/**
 * Interceptor funcional que adjunta el token JWT de Supabase
 * como cabecera `Authorization: Bearer <token>` a toda petición
 * dirigida al backend Django.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);

  // Solo interceptar peticiones al backend propio
  if (!req.url.startsWith(environment.apiBaseUrl)) {
    return next(req);
  }

  return from(auth.getSessionToken()).pipe(
    switchMap((token) => {
      if (token) {
        const authReq = req.clone({
          setHeaders: { Authorization: `Bearer ${token}` },
        });
        return next(authReq);
      }
      return next(req);
    }),
  );
};
