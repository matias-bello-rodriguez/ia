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
        path: 'documentos',
        loadComponent: () =>
          import('./features/egis-documentos/egis-documentos.component').then(
            (m) => m.EgisDocumentosComponent,
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
    ],
  },

  // ── Fallback genérico ─────────────────────────────────────
  { path: '**', redirectTo: 'login' },
];
