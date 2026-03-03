import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { AuthService } from '../../core/services';

const MODULE_TITLES: Record<string, { title: string; description: string }> = {
  'dashboard-constructora': { title: 'Dashboard Constructora', description: 'Panel de control de obra y avance de proyectos' },
  semaforo: { title: 'Semáforo de Proyectos', description: 'Estado de carpetas por proyecto de obra' },
  'firma-digital': { title: 'Firma Digital HITO', description: 'Firma electrónica de cierre de carpeta' },
  reportes: { title: 'Reportes de Obra', description: 'Generación de informes y exportación' },
  configuracion: { title: 'Configuración', description: 'Parámetros del sistema' },
};

@Component({
  selector: 'app-layout-constructora',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './layout-constructora.component.html',
})
export class LayoutConstructoraComponent implements OnInit {
  currentTitle = MODULE_TITLES['dashboard-constructora'].title;
  currentDescription = MODULE_TITLES['dashboard-constructora'].description;

  constructor(
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.updateTitleFromUrl(this.router.url);
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => this.updateTitleFromUrl(e.urlAfterRedirects));
  }

  private updateTitleFromUrl(url: string): void {
    // URL: /dashboard-constructora/semaforo → segments[1] = 'semaforo'
    const segments = url.replace(/^\//, '').split('/');
    const key = segments.length > 1 ? segments[1] : 'dashboard-constructora';
    const info = MODULE_TITLES[key] ?? MODULE_TITLES['dashboard-constructora'];
    this.currentTitle = info.title;
    this.currentDescription = info.description;
  }

  onActivate(): void {
    this.updateTitleFromUrl(this.router.url);
  }

  volverInicio(): void {
    this.router.navigate(['/inicio']);
  }

  logout(): void {
    this.auth.logout();
  }
}
