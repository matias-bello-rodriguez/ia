import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SupabaseService } from '../../supabase.service';

/**
 * Guard asíncrono que espera a que Supabase confirme el estado
 * de autenticación antes de decidir. Esto evita redirecciones
 * falsas cuando la sesión aún se está restaurando desde localStorage.
 */
export const authGuard: CanActivateFn = async () => {
  const sb = inject(SupabaseService);
  const router = inject(Router);

  // Espera el evento INITIAL_SESSION de Supabase
  const session = await sb.waitForSession();

  // Si waitForSession ya se resolvió en una ejecución anterior,
  // getSession() devuelve el dato en caliente sin latencia.
  if (!session) {
    const fresh = await sb.getSession();
    return fresh ? true : router.createUrlTree(['/login']);
  }

  return true;
};
