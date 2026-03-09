import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

const MODULE_TITLES: Record<string, { title: string; description: string }> = {
  dashboard: { title: 'Dashboard Global', description: 'Visión general del estado de la EGIS' },
  documentos: { title: 'Documentos EGIS', description: 'Solicitar, revisar y aprobar documentación' },
  comites: { title: 'Comités y Fichas Técnicas', description: 'Gestión de proyectos y beneficiarios' },
  visado: { title: 'Visado Inteligente OCR', description: 'Validación de documentos con IA' },
  semaforo: { title: 'Semáforo de Proyectos', description: 'Estado de carpetas por proyecto (Constructora)' },
  documento: { title: 'Visor de Documento', description: 'PDF + Análisis IA lado a lado' },
  'firma-digital': { title: 'Firma Digital HITO', description: 'Firma electrónica de cierre de carpeta' },
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
    // URL: /egis/comites → segments after 'egis'
    const segments = url.replace(/^\//, '').split('/');
    const key = segments.length > 1 ? segments[1] : 'dashboard';
    const info = MODULE_TITLES[key] ?? MODULE_TITLES['dashboard'];
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
