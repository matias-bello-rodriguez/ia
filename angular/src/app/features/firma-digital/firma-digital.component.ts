import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DocumentosService } from '../../core/services/documentos.service';
import type { FirmaHitoResponse, SemaforoCarpetaDetalle } from '../../shared/models';

@Component({
  selector: 'app-firma-digital',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './firma-digital.component.html',
})
export class FirmaDigitalComponent {
  // ── Búsqueda de carpeta ───────────────────────────────────
  carpetaIdInput: string | null = null;
  carpeta: SemaforoCarpetaDetalle | null = null;
  loadingCarpeta = false;
  carpetaError = '';

  // ── Firma ─────────────────────────────────────────────────
  observacion = '';
  tokenFirma = '';
  usarToken = false;
  signing = false;
  firmaResult: FirmaHitoResponse | null = null;
  firmaError = '';

  constructor(private documentosService: DocumentosService) {}

  // ── Cargar carpeta ────────────────────────────────────────

  buscarCarpeta(): void {
    if (!this.carpetaIdInput) return;
    this.loadingCarpeta = true;
    this.carpetaError = '';
    this.carpeta = null;
    this.firmaResult = null;
    this.firmaError = '';

    this.documentosService.getSemaforoCarpeta(this.carpetaIdInput).subscribe({
      next: (det) => {
        this.carpeta = det;
        this.loadingCarpeta = false;
      },
      error: (err) => {
        this.carpetaError = err?.error?.detail ?? 'No se pudo cargar la carpeta.';
        this.loadingCarpeta = false;
      },
    });
  }

  // ── Validaciones para habilitar firma ─────────────────────

  get allIaProcesado(): boolean {
    if (!this.carpeta) return false;
    return this.carpeta.documentos.every((d) => d.iaProcesado);
  }

  get allAprobado(): boolean {
    if (!this.carpeta) return false;
    return this.carpeta.documentos.every((d) => d.estado === 'aprobado');
  }

  get noAlertaMonto(): boolean {
    return !!this.carpeta && !this.carpeta.alertaMontoInconsistente;
  }

  get canSign(): boolean {
    return !!this.carpeta && this.allIaProcesado && this.allAprobado && this.noAlertaMonto && !this.signing;
  }

  get checksummary(): { label: string; ok: boolean }[] {
    return [
      { label: 'Todos los documentos procesados por IA', ok: this.allIaProcesado },
      { label: 'Todos los documentos aprobados', ok: this.allAprobado },
      { label: 'Sin inconsistencia de montos', ok: this.noAlertaMonto },
    ];
  }

  // ── Firmar ────────────────────────────────────────────────

  firmar(): void {
    if (!this.canSign || !this.carpeta) return;
    this.signing = true;
    this.firmaError = '';
    this.firmaResult = null;

    const token = this.usarToken ? this.tokenFirma : undefined;
    this.documentosService.firmaHito(this.carpeta.carpetaId, this.observacion || undefined, token).subscribe({
      next: (res) => {
        this.firmaResult = res;
        this.signing = false;
      },
      error: (err) => {
        this.firmaError = err?.error?.detail ?? err?.error?.error ?? 'Error al firmar.';
        this.signing = false;
      },
    });
  }
}
