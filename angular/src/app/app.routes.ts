import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },

  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login.component').then((m) => m.LoginComponent),
  },

  // ── EGIS ──────────────────────────────────────────────────
  {
    path: 'egis',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./core/layout/layout.component').then((m) => m.LayoutComponent),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      {
        path: 'dashboard',
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
        path: 'firma-digital',
        loadComponent: () =>
          import('./features/firma-digital/firma-digital.component').then(
            (m) => m.FirmaDigitalComponent,
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
            (m) => m.NotificacionesComponent,
          ),
      },
      {
        path: 'configuracion',
        loadComponent: () =>
          import('./features/configuracion/configuracion.component').then(
            (m) => m.ConfiguracionComponent,
          ),
      },
      {
        path: 'documento/:id',
        loadComponent: () =>
          import('./features/document-viewer/document-viewer.component').then(
            (m) => m.DocumentViewerComponent,
          ),
      },
    ],
  },

  // ── Constructora ──────────────────────────────────────────
  {
    path: 'constructora',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./core/layout-constructora/layout-constructora.component').then(
        (m) => m.LayoutConstructoraComponent,
      ),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard-constructora/dashboard-constructora.component').then(
            (m) => m.DashboardConstructoraComponent,
          ),
      },
      {
        path: 'subir-archivos',
        loadComponent: () =>
          import('./features/constructora-archivos/constructora-archivos.component').then(
            (m) => m.ConstructoraArchivosComponent,
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
            (m) => m.FirmaDigitalComponent,
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
          import('./features/mi-cuenta/mi-cuenta.component').then(
            (m) => m.MiCuentaComponent,
          ),
      },
    ],
  },

  // ── Fallback ──────────────────────────────────────────────
  { path: '**', redirectTo: 'login' },
];
