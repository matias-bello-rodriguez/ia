import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DocumentosService } from '../../core/services/documentos.service';
import { ProyectosService } from '../../core/services/proyectos.service';
import type { Documento, ProyectoConRelaciones, EstadoSemaforo } from '../../shared/models/database.types';
import { SEMAFORO_LABELS, SEMAFORO_COLORS } from '../../shared/models/database.types';

/** Resultado local de la firma */
interface FirmaResultado {
  ok: boolean;
  mensaje: string;
  firmadoPor?: string;
  firmadoEn?: string;
}

@Component({
  selector: 'app-firma-digital',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './firma-digital.component.html',
})
export class FirmaDigitalComponent {
  // ── Búsqueda de proyecto ──────────────────────────────────
  proyectoIdInput: string | null = null;
  proyecto: ProyectoConRelaciones | null = null;
  documentos: Documento[] = [];
  loadingProyecto = false;
  proyectoError = '';

  // ── Firma ─────────────────────────────────────────────────
  observacion = '';
  tokenFirma = '';
  usarToken = false;
  signing = false;
  firmaResult: FirmaResultado | null = null;
  firmaError = '';

  readonly semaforoLabels = SEMAFORO_LABELS;
  readonly semaforoColors = SEMAFORO_COLORS;

  constructor(
    private documentosService: DocumentosService,
    private proyectosService: ProyectosService,
  ) {}

  // ── Cargar proyecto ───────────────────────────────────────

  buscarProyecto(): void {
    if (!this.proyectoIdInput) return;
    this.loadingProyecto = true;
    this.proyectoError = '';
    this.proyecto = null;
    this.documentos = [];
    this.firmaResult = null;
    this.firmaError = '';

    this.proyectosService.getById(this.proyectoIdInput).subscribe({
      next: (proy) => {
        this.proyecto = proy;
        // Load documents for this project
        this.documentosService.getByProyecto(proy.id).subscribe({
          next: (docs) => {
            this.documentos = docs;
            this.loadingProyecto = false;
          },
          error: () => {
            this.loadingProyecto = false;
          },
        });
      },
      error: (err) => {
        this.proyectoError = err?.message ?? 'No se pudo cargar el proyecto.';
        this.loadingProyecto = false;
      },
    });
  }

  // ── Validaciones para habilitar firma ─────────────────────

  get allAprobado(): boolean {
    return this.documentos.length > 0 && this.documentos.every((d) => d.estado_actual === 'aprobado_verde');
  }

  get tieneDocumentos(): boolean {
    return this.documentos.length > 0;
  }

  get canSign(): boolean {
    return !!this.proyecto && this.tieneDocumentos && this.allAprobado && !this.signing;
  }

  get checksummary(): { label: string; ok: boolean }[] {
    return [
      { label: 'Proyecto tiene documentos cargados', ok: this.tieneDocumentos },
      { label: 'Todos los documentos aprobados (semáforo verde)', ok: this.allAprobado },
    ];
  }

  estadoLabel(estado: EstadoSemaforo): string {
    return this.semaforoLabels[estado] ?? estado;
  }

  estadoColor(estado: EstadoSemaforo): string {
    return this.semaforoColors[estado] ?? '#6c757d';
  }

  // ── Firmar ────────────────────────────────────────────────

  firmar(): void {
    if (!this.canSign || !this.proyecto) return;
    this.signing = true;
    this.firmaError = '';
    this.firmaResult = null;

    // Approve all docs as a "firma" action by recording in historial
    // In a real app this would call a Supabase Edge Function for digital signing
    const comentario = this.observacion || 'Firma digital HITO aprobada';

    // Since all docs are already approved, we just mark the project as complete
    this.proyectosService.cambiarEstado(this.proyecto.id, 'finalizado').subscribe({
      next: () => {
        this.firmaResult = {
          ok: true,
          mensaje: `Proyecto ${this.proyecto?.codigo_proyecto ?? this.proyecto?.tipo_subsidio} firmado exitosamente. Estado cambiado a Finalizado.`,
          firmadoPor: 'Usuario actual',
          firmadoEn: new Date().toLocaleString('es-CL'),
        };
        this.signing = false;
      },
      error: (err) => {
        this.firmaError = err?.message ?? 'Error al firmar.';
        this.signing = false;
      },
    });
  }
}
