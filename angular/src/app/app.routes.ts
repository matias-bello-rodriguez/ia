import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  {
    path: '',
    loadComponent: () => import('./layout/layout.component').then((m) => m.LayoutComponent),
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./dashboard/dashboard.component').then((m) => m.DashboardComponent),
      },
      {
        path: 'comites',
        loadComponent: () =>
          import('./comites/comites.component').then((m) => m.ComitesComponent),
      },
      {
        path: 'visado',
        loadComponent: () =>
          import('./visado/visado.component').then((m) => m.VisadoComponent),
      },
      {
        path: 'reportes',
        loadComponent: () =>
          import('./reportes/reportes.component').then((m) => m.ReportesComponent),
      },
      {
        path: 'notificaciones',
        loadComponent: () =>
          import('./notificaciones/notificaciones.component').then(
            (m) => m.NotificacionesComponent
          ),
      },
      {
        path: 'configuracion',
        loadComponent: () =>
          import('./configuracion/configuracion.component').then(
            (m) => m.ConfiguracionComponent
          ),
      },
    ],
  },
];
