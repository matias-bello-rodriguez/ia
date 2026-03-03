/**
 * Auth Guards — protegen rutas según autenticación y rol.
 *
 * authGuard:          requiere sesión activa.
 * egisGuard:          requiere rol "egis".
 * constructoraGuard:  requiere rol "constructora".
 * publicOnlyGuard:    redirige al dashboard si ya está logueado.
 *
 * Todos esperan a que AuthService termine la carga inicial (ready$)
 * para evitar race-conditions en refresh de página.
 */
import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { filter, map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService, UserRole } from '../services/auth.service';
import { AlertService } from '../services/alert.service';

// ── Helper: esperar a que el servicio termine la init ────────
function whenReady(fn: () => boolean | UrlTree): Observable<boolean | UrlTree> {
  const auth = inject(AuthService);
  return auth.ready$.pipe(
    filter((ready) => ready),
    take(1),
    map(() => fn())
  );
}

// ── Guard: requiere sesión ──────────────────────────────────
export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const alert = inject(AlertService);
  return whenReady(() => {
    if (auth.isLoggedIn()) return true;
    alert.warning('Debe iniciar sesión para acceder.');
    return router.createUrlTree(['/']);
  });
};

// ── Guard: requiere rol específico ──────────────────────────
function roleGuard(expected: UserRole): CanActivateFn {
  return () => {
    const auth = inject(AuthService);
    const router = inject(Router);
    const alert = inject(AlertService);
    return whenReady(() => {
      if (!auth.isLoggedIn()) {
        alert.warning('Debe iniciar sesión para acceder.');
        return router.createUrlTree(['/']);
      }
      const role = auth.getRole();
      if (role === expected) return true;
      alert.error('Acceso no autorizado para su perfil.');
      return router.createUrlTree([auth.getDashboardPath()]);
    });
  };
}

export const egisGuard: CanActivateFn = roleGuard('egis');
export const constructoraGuard: CanActivateFn = roleGuard('constructora');

// ── Guard: solo para usuarios NO logueados (login/inicio) ───
export const publicOnlyGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  return whenReady(() => {
    if (!auth.isLoggedIn()) return true;
    // ya logueado → redirigir a su dashboard
    return router.createUrlTree([auth.getDashboardPath()]);
  });
};
