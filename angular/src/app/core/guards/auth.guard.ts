/**
 * Auth Guards — protegen rutas según autenticación y rol.
 *
 * authGuard:          requiere sesión activa en Supabase.
 * egisGuard:          requiere rol de EGIS (admin_egis o hito_egis).
 * constructoraGuard:  requiere rol de Constructora (dueño_constructora o admin_constructora).
 * serviuGuard:        requiere rol de SERVIU (oficina_partes_serviu o hito_serviu).
 * publicOnlyGuard:    redirige al dashboard si ya está logueado.
 *
 * Todos esperan a que AuthService termine la carga inicial (ready$)
 * para evitar race-conditions en refresh de página.
 */
import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { filter, map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AlertService } from '../services/alert.service';
import type { RolUsuario } from '../../shared/models/database.types';

// ── Helper: esperar a que el servicio termine la init ────────
function whenReady(fn: () => boolean | UrlTree): Observable<boolean | UrlTree> {
  const auth = inject(AuthService);
  return auth.ready$.pipe(
    filter((ready) => ready),
    take(1),
    map(() => fn())
  );
}

// ── Guard: requiere sesión activa en Supabase ───────────────
export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const alert = inject(AlertService);
  return whenReady(() => {
    if (auth.estaLogueado()) return true;
    alert.warning('Debe iniciar sesión para acceder.');
    return router.createUrlTree(['/']);
  });
};

// ── Guard: requiere uno o más roles específicos ─────────────
function roleGuard(rolesPermitidos: RolUsuario[]): CanActivateFn {
  return () => {
    const auth = inject(AuthService);
    const router = inject(Router);
    const alert = inject(AlertService);
    return whenReady(() => {
      if (!auth.estaLogueado()) {
        alert.warning('Debe iniciar sesión para acceder.');
        return router.createUrlTree(['/']);
      }
      const rolActual = auth.getRol();
      if (rolActual && rolesPermitidos.includes(rolActual)) return true;
      alert.error('Acceso no autorizado para su perfil.');
      return router.createUrlTree([auth.getDashboardPath()]);
    });
  };
}

/** Solo roles EGIS: admin_egis, hito_egis */
export const egisGuard: CanActivateFn = roleGuard(['admin_egis', 'hito_egis']);

/** Solo roles Constructora: dueño_constructora, admin_constructora */
export const constructoraGuard: CanActivateFn = roleGuard(['dueño_constructora', 'admin_constructora']);

/** Solo roles SERVIU: oficina_partes_serviu, hito_serviu */
export const serviuGuard: CanActivateFn = roleGuard(['oficina_partes_serviu', 'hito_serviu']);

/** Solo administradores: admin_egis, dueño_constructora */
export const adminGuard: CanActivateFn = roleGuard(['admin_egis', 'dueño_constructora']);

// ── Guard: solo para usuarios NO logueados (login/inicio) ───
export const publicOnlyGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  return whenReady(() => {
    if (!auth.estaLogueado()) return true;
    // ya logueado → redirigir a su dashboard
    return router.createUrlTree([auth.getDashboardPath()]);
  });
};
