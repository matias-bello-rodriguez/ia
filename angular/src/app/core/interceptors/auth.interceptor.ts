import { HttpInterceptorFn } from '@angular/common/http';

/**
 * Interceptor de desarrollo: no añade ningún header de auth.
 * Deja pasar todas las peticiones tal cual.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => next(req);
