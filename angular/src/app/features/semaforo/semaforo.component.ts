import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProyectosService } from '../../core/services/proyectos.service';
import { DocumentosService } from '../../core/services/documentos.service';
import { AlertService } from '../../core/services/alert.service';
import type {
  ProyectoConRelaciones,
  Documento,
  EstadoSemaforo,
} from '../../shared/models/database.types';
import { SEMAFORO_LABELS, SEMAFORO_COLORS } from '../../shared/models/database.types';

/** Vista resumida de un proyecto con conteo de semáforos */
interface SemaforoProyectoView {
  proyecto: ProyectoConRelaciones;
  totalDocumentos: number;
  docsVerde: number;
  docsAmarillo: number;
  docsNaranja: number;
  docsRojo: number;
  avancePct: number;
}

@Component({
  selector: 'app-semaforo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './semaforo.component.html',
})
export class SemaforoComponent implements OnInit {
  proyectos: SemaforoProyectoView[] = [];
  loading = true;
  errorMsg = '';

  // Drill-down
  selectedProyecto: SemaforoProyectoView | null = null;
  documentosDetalle: Documento[] = [];
  loadingDocumentos = false;

  constructor(
    private proyectosService: ProyectosService,
    private documentosService: DocumentosService,
    private alertService: AlertService,
  ) {}

  ngOnInit(): void {
    this.loadProyectos();
  }

  loadProyectos(): void {
    this.loading = true;
    this.errorMsg = '';
    this.proyectosService.getAllConRelaciones().subscribe({
      next: (proyectos: ProyectoConRelaciones[]) => {
        // Para cada proyecto, cargar estadísticas de documentos
        const views: SemaforoProyectoView[] = proyectos.map(p => ({
          proyecto: p,
          totalDocumentos: 0,
          docsVerde: 0,
          docsAmarillo: 0,
          docsNaranja: 0,
          docsRojo: 0,
          avancePct: 0,
        }));

        // Cargar estadísticas de documentos para todos los proyectos
        for (const view of views) {
          this.documentosService.getEstadisticasSemaforo(view.proyecto.id).subscribe({
            next: (stats) => {
              view.docsVerde = stats.aprobado_verde;
              view.docsAmarillo = stats.pendiente_amarillo;
              view.docsNaranja = stats.en_proceso_naranja;
              view.docsRojo = stats.rechazado_rojo;
              view.totalDocumentos = view.docsVerde + view.docsAmarillo + view.docsNaranja + view.docsRojo;
              view.avancePct = view.totalDocumentos > 0
                ? Math.round((view.docsVerde / view.totalDocumentos) * 100)
                : 0;
            },
          });
        }

        this.proyectos = views;
        this.loading = false;
      },
      error: () => {
        this.errorMsg = 'Error al cargar semáforo de proyectos.';
        this.loading = false;
      },
    });
  }

  selectProyecto(p: SemaforoProyectoView): void {
    this.selectedProyecto = p;
    this.documentosDetalle = [];
    this.loadingDocumentos = true;
    this.documentosService.getByProyecto(p.proyecto.id).subscribe({
      next: (docs: Documento[]) => {
        this.documentosDetalle = docs;
        this.loadingDocumentos = false;
      },
      error: () => {
        this.loadingDocumentos = false;
      },
    });
  }

  backToList(): void {
    this.selectedProyecto = null;
    this.documentosDetalle = [];
  }

  descargarDocumento(doc: Documento): void {
    if (!doc.ruta_almacenamiento) {
      this.alertService.error('No hay archivo asociado para descargar.');
      return;
    }
    this.documentosService.descargarYGuardar(doc.ruta_almacenamiento, doc.nombre_archivo ?? 'documento').subscribe({
      next: () => this.alertService.success('Descarga iniciada.'),
      error: (err) => this.alertService.error('Error al descargar: ' + (err.message ?? err)),
    });
  }

  // ── Helpers de UI ─────────────────────────────────────────

  semaforoBg(estado: EstadoSemaforo | string): string {
    if (estado === 'aprobado_verde') return 'text-bg-success';
    if (estado === 'pendiente_amarillo') return 'text-bg-warning';
    if (estado === 'en_proceso_naranja') return 'text-bg-info';
    if (estado === 'rechazado_rojo') return 'text-bg-danger';
    return 'text-bg-secondary';
  }

  semaforoIcon(estado: EstadoSemaforo | string): string {
    if (estado === 'aprobado_verde') return 'bi-check-circle-fill';
    if (estado === 'pendiente_amarillo') return 'bi-exclamation-triangle-fill';
    if (estado === 'en_proceso_naranja') return 'bi-hourglass-split';
    if (estado === 'rechazado_rojo') return 'bi-x-circle-fill';
    return 'bi-question-circle';
  }

  semaforoLabel(estado: EstadoSemaforo): string {
    return SEMAFORO_LABELS[estado] ?? estado;
  }

  avanceBarClass(pct: number): string {
    if (pct >= 80) return 'bg-success';
    if (pct >= 50) return 'bg-primary';
    if (pct >= 25) return 'bg-warning';
    return 'bg-danger';
  }

  get totalDocumentos(): number {
    return this.proyectos.reduce((s, p) => s + p.totalDocumentos, 0);
  }
  get totalVerde(): number {
    return this.proyectos.reduce((s, p) => s + p.docsVerde, 0);
  }
  get totalAmarillo(): number {
    return this.proyectos.reduce((s, p) => s + p.docsAmarillo, 0);
  }
  get totalRojo(): number {
    return this.proyectos.reduce((s, p) => s + p.docsRojo, 0);
  }
}
