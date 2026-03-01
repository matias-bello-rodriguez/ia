import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  {
    path: '',
    loadComponent: () => import('./core/layout/layout.component').then((m) => m.LayoutComponent),
    children: [
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
];
