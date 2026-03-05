import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ProyectosService } from '../../core/services/proyectos.service';
import { DocumentosService } from '../../core/services/documentos.service';
import { AuthService } from '../../core/services/auth.service';
import { forkJoin } from 'rxjs';
import type { ProyectoConRelaciones, EstadoSemaforo } from '../../shared/models/database.types';

/** Modelo de vista local para la tabla semáforo */
interface SemaforoProyectoView {
  proyectoId: string;
  proyectoNombre: string;
  totalCarpetas: number;
  carpetasVerde: number;
  carpetasAmarillo: number;
  carpetasRojo: number;
  avancePct: number;
  alertaMonto: boolean;
}

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
  proyectos: SemaforoProyectoView[] = [];
  loadingSemaforo = true;

  // Dashboard data
  loading = true;

  constructor(
    private proyectosService: ProyectosService,
    private documentosService: DocumentosService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadSemaforo();
  }

  private loadSemaforo(): void {
    this.loadingSemaforo = true;
    this.proyectosService.getAllConRelaciones().subscribe({
      next: (proyectos) => {
        if (proyectos.length === 0) {
          this.proyectos = [];
          this.loadingSemaforo = false;
          this.loading = false;
          return;
        }

        // Cargar estadísticas de semáforo para cada proyecto
        const stats$ = proyectos.map(p =>
          this.documentosService.getEstadisticasSemaforo(p.id)
        );

        forkJoin(stats$).subscribe({
          next: (allStats) => {
            this.proyectos = proyectos.map((p, i) => {
              const s = allStats[i];
              const total = s.aprobado_verde + s.pendiente_amarillo + s.en_proceso_naranja + s.rechazado_rojo;
              const pct = total > 0 ? Math.round((s.aprobado_verde / total) * 100) : 0;
              return {
                proyectoId: p.id,
                proyectoNombre: p.codigo_proyecto ?? p.tipo_subsidio,
                totalCarpetas: total,
                carpetasVerde: s.aprobado_verde,
                carpetasAmarillo: s.pendiente_amarillo + s.en_proceso_naranja,
                carpetasRojo: s.rechazado_rojo,
                avancePct: pct,
                alertaMonto: false,
              };
            });
            this.totalProyectos = proyectos.length;
            this.carpetasCompletas = this.proyectos.reduce((s, p) => s + p.carpetasVerde, 0);
            this.carpetasPorVencer = this.proyectos.reduce((s, p) => s + p.carpetasAmarillo, 0);
            this.carpetasCriticas = this.proyectos.reduce((s, p) => s + p.carpetasRojo, 0);
            this.loadingSemaforo = false;
            this.loading = false;
          },
          error: () => {
            this.loadingSemaforo = false;
            this.loading = false;
          },
        });
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
