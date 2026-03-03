import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentosService } from '../../core/services/documentos.service';
import type {
  SemaforoProyecto,
  SemaforoCarpetaDetalle,
  DocumentoDetalle,
  Semaforo,
} from '../../shared/models';

@Component({
  selector: 'app-semaforo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './semaforo.component.html',
})
export class SemaforoComponent implements OnInit {
  proyectos: SemaforoProyecto[] = [];
  loading = true;
  errorMsg = '';

  // Drill-down
  selectedProyecto: SemaforoProyecto | null = null;
  carpetaDetalle: SemaforoCarpetaDetalle | null = null;
  loadingCarpeta = false;

  constructor(private documentosService: DocumentosService) {}

  ngOnInit(): void {
    this.loadProyectos();
  }

  loadProyectos(): void {
    this.loading = true;
    this.errorMsg = '';
    this.documentosService.getSemaforoProyectos().subscribe({
      next: (list) => {
        this.proyectos = list;
        this.loading = false;
      },
      error: () => {
        this.errorMsg = 'Error al cargar semáforo de proyectos.';
        this.loading = false;
      },
    });
  }

  selectProyecto(p: SemaforoProyecto): void {
    this.selectedProyecto = p;
    this.carpetaDetalle = null;
  }

  backToList(): void {
    this.selectedProyecto = null;
    this.carpetaDetalle = null;
  }

  loadCarpeta(carpetaId: string): void {
    this.loadingCarpeta = true;
    this.documentosService.getSemaforoCarpeta(carpetaId).subscribe({
      next: (det) => {
        this.carpetaDetalle = det;
        this.loadingCarpeta = false;
      },
      error: () => {
        this.loadingCarpeta = false;
      },
    });
  }

  closeCarpetaDetalle(): void {
    this.carpetaDetalle = null;
  }

  // ── Helpers de UI ─────────────────────────────────────────

  semaforoBg(s: Semaforo | string): string {
    if (s === 'verde') return 'text-bg-success';
    if (s === 'amarillo') return 'text-bg-warning';
    if (s === 'rojo') return 'text-bg-danger';
    return 'text-bg-secondary';
  }

  semaforoIcon(s: Semaforo | string): string {
    if (s === 'verde') return 'bi-check-circle-fill';
    if (s === 'amarillo') return 'bi-exclamation-triangle-fill';
    if (s === 'rojo') return 'bi-x-circle-fill';
    return 'bi-question-circle';
  }

  avanceBarClass(pct: number): string {
    if (pct >= 80) return 'bg-success';
    if (pct >= 50) return 'bg-primary';
    if (pct >= 25) return 'bg-warning';
    return 'bg-danger';
  }

  get totalCarpetas(): number {
    return this.proyectos.reduce((s, p) => s + p.totalCarpetas, 0);
  }
  get totalVerde(): number {
    return this.proyectos.reduce((s, p) => s + p.carpetasVerde, 0);
  }
  get totalAmarillo(): number {
    return this.proyectos.reduce((s, p) => s + p.carpetasAmarillo, 0);
  }
  get totalRojo(): number {
    return this.proyectos.reduce((s, p) => s + p.carpetasRojo, 0);
  }
  get totalAlertaMonto(): number {
    return this.proyectos.filter((p) => p.alertaMonto).length;
  }

  docEstadoLabel(estado: string): string {
    switch (estado) {
      case 'aprobado': return 'Aprobado';
      case 'rechazado': return 'Rechazado';
      case 'pendiente': return 'Pendiente';
      default: return estado;
    }
  }
}
