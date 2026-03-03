import { Routes } from '@angular/router';
import { authGuard, egisGuard, constructoraGuard, publicOnlyGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'inicio' },

  // ── Públicas (redirigen al dashboard si ya hay sesión) ────
  {
    path: 'inicio',
    canActivate: [publicOnlyGuard],
    loadComponent: () =>
      import('./features/inicio/inicio.component').then((m) => m.InicioComponent),
  },
  {
    path: 'login',
    canActivate: [publicOnlyGuard],
    loadComponent: () => import('./features/auth/login.component').then((m) => m.LoginComponent),
  },

  // ── Dashboard EGIS (protegido: autenticado + rol egis) ────
  {
    path: 'dashboard-egis',
    canActivate: [authGuard, egisGuard],
    loadComponent: () => import('./core/layout/layout.component').then((m) => m.LayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/dashboard/dashboard.component').then((m) => m.DashboardComponent),
      },
      {
        path: 'comites',
        loadComponent: () =>
          import('./features/comites/comites.component').then((m) => m.ComitesComponent),
      },
      {
        path: 'visado',
        loadComponent: () =>
          import('./features/visado/visado.component').then((m) => m.VisadoComponent),
      },
      {
        path: 'semaforo',
        loadComponent: () =>
          import('./features/semaforo/semaforo.component').then((m) => m.SemaforoComponent),
      },
      {
        path: 'documento/:id',
        loadComponent: () =>
          import('./features/document-viewer/document-viewer.component').then(
            (m) => m.DocumentViewerComponent
          ),
      },
      {
        path: 'firma-digital',
        loadComponent: () =>
          import('./features/firma-digital/firma-digital.component').then(
            (m) => m.FirmaDigitalComponent
          ),
      },
      {
        path: 'reportes',
        loadComponent: () =>
          import('./features/reportes/reportes.component').then((m) => m.ReportesComponent),
      },
      {
        path: 'notificaciones',
        loadComponent: () =>
          import('./features/notificaciones/notificaciones.component').then(
            (m) => m.NotificacionesComponent
          ),
      },
      {
        path: 'configuracion',
        loadComponent: () =>
          import('./features/configuracion/configuracion.component').then(
            (m) => m.ConfiguracionComponent
          ),
      },
    ],
  },

  // ── Dashboard Constructora (protegido: autenticado + rol constructora) ─
  {
    path: 'dashboard-constructora',
    canActivate: [authGuard, constructoraGuard],
    loadComponent: () =>
      import('./core/layout-constructora/layout-constructora.component').then(
        (m) => m.LayoutConstructoraComponent
      ),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/dashboard-constructora/dashboard-constructora.component').then(
            (m) => m.DashboardConstructoraComponent
          ),
      },
      {
        path: 'semaforo',
        loadComponent: () =>
          import('./features/semaforo/semaforo.component').then((m) => m.SemaforoComponent),
      },
      {
        path: 'firma-digital',
        loadComponent: () =>
          import('./features/firma-digital/firma-digital.component').then(
            (m) => m.FirmaDigitalComponent
          ),
      },
      {
        path: 'reportes',
        loadComponent: () =>
          import('./features/reportes/reportes.component').then((m) => m.ReportesComponent),
      },
      {
        path: 'configuracion',
        loadComponent: () =>
          import('./features/configuracion/configuracion.component').then(
            (m) => m.ConfiguracionComponent
          ),
      },
    ],
  },

  // ── Fallback ──────────────────────────────────────────────
  { path: '**', redirectTo: 'inicio' },
];
