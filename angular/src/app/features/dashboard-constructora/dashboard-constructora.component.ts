import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { DashboardService, DashboardData } from '../../core/services/dashboard.service';
import { DocumentosService } from '../../core/services/documentos.service';
import { AuthService } from '../../core/services';
import type { SemaforoProyecto } from '../../shared/models';

@Component({
  selector: 'app-dashboard-constructora',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard-constructora.component.html',
})
export class DashboardConstructoraComponent implements OnInit {
  // KPIs
  totalProyectos = 0;
  carpetasCompletas = 0;
  carpetasPorVencer = 0;
  carpetasCriticas = 0;

  // Semáforo resumen
  proyectos: SemaforoProyecto[] = [];
  loadingSemaforo = true;

  // Dashboard data
  loading = true;

  constructor(
    private dashboardService: DashboardService,
    private documentosService: DocumentosService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadSemaforo();
  }

  private loadSemaforo(): void {
    this.loadingSemaforo = true;
    this.documentosService.getSemaforoProyectos().subscribe({
      next: (list) => {
        this.proyectos = list;
        this.totalProyectos = list.length;
        this.carpetasCompletas = list.reduce((s, p) => s + p.carpetasVerde, 0);
        this.carpetasPorVencer = list.reduce((s, p) => s + p.carpetasAmarillo, 0);
        this.carpetasCriticas = list.reduce((s, p) => s + p.carpetasRojo, 0);
        this.loadingSemaforo = false;
        this.loading = false;
      },
      error: () => {
        this.loadingSemaforo = false;
        this.loading = false;
      },
    });
  }

  get totalCarpetas(): number {
    return this.proyectos.reduce((s, p) => s + p.totalCarpetas, 0);
  }

  get avanceGlobal(): number {
    if (this.proyectos.length === 0) return 0;
    const total = this.proyectos.reduce((s, p) => s + p.avancePct, 0);
    return Math.round(total / this.proyectos.length);
  }

  get totalAlertaMonto(): number {
    return this.proyectos.filter((p) => p.alertaMonto).length;
  }

  avanceBarClass(pct: number): string {
    if (pct >= 80) return 'bg-success';
    if (pct >= 50) return 'bg-primary';
    if (pct >= 25) return 'bg-warning';
    return 'bg-danger';
  }

  volverInicio(): void {
    this.router.navigate(['/inicio']);
  }

  logout(): void {
    this.auth.logout();
  }
}
