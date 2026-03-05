/**
 * Interceptor HTTP — ya no se usa.
 * Toda la comunicación pasa por @supabase/supabase-js.
 * Este archivo se conserva vacío por si se necesita HttpClient en el futuro.
 */
import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => next(req);
