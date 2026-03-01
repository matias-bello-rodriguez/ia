import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

const MODULE_TITLES: Record<string, { title: string; description: string }> = {
  dashboard: { title: 'Dashboard Global', description: 'Visión general del estado de la EGIS' },
  comites: { title: 'Comités y Fichas Técnicas', description: 'Gestión de proyectos y beneficiarios' },
  visado: { title: 'Visado Inteligente OCR', description: 'Validación de documentos con IA' },
  reportes: { title: 'Reportes y Carpeta SERVIU', description: 'Generación de informes y exportación' },
  notificaciones: { title: 'Centro de Notificaciones', description: 'Comunicación con beneficiarios' },
  configuracion: { title: 'Configuración del Sistema', description: 'Parámetros y reglas de la IA' },
};

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './layout.component.html',
})
export class LayoutComponent implements OnInit {
  currentTitle = MODULE_TITLES['dashboard'].title;
  currentDescription = MODULE_TITLES['dashboard'].description;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.updateTitleFromUrl(this.router.url);
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => this.updateTitleFromUrl(e.urlAfterRedirects));
  }

  private updateTitleFromUrl(url: string): void {
    const key = url.replace(/^\//, '').split('/')[0] || 'dashboard';
    const info = MODULE_TITLES[key] ?? MODULE_TITLES['dashboard'];
    this.currentTitle = info.title;
    this.currentDescription = info.description;
  }

  onActivate(): void {
    this.updateTitleFromUrl(this.router.url);
  }
}
