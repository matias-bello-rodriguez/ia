import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SupabaseService } from '../../supabase.service';

/**
 * Guard asíncrono que:
 * 1. Espera a que Supabase termine de restaurar la sesión desde localStorage.
 * 2. Consulta la sesión ACTUAL (no un valor cacheado).
 * 3. Permite el paso si existe sesión, redirige a /login si no.
 */
export const authGuard: CanActivateFn = async () => {
  const sb = inject(SupabaseService);
  const router = inject(Router);

  const session = await sb.getSessionWhenReady();
  return session ? true : router.createUrlTree(['/login']);
};
