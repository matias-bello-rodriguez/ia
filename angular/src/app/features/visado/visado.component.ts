import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DocumentosService } from '../../core/services/documentos.service';
import type { DocQueueItem, ExtractedField, VisadoResponse } from '../../shared/models';

/** Tipos de documento que el backend entiende */
const TIPOS_DOCUMENTO = [
  { value: 'contrato', label: 'Contrato de Construcción' },
  { value: 'resolucion_exenta', label: 'Resolución Exenta' },
  { value: 'informe_universidad', label: 'Informe Universidad (Silófagos)' },
  { value: 'certificado_dominio', label: 'Certificado de Dominio Vigente' },
  { value: 'certificado_hipoteca', label: 'Certificado de Hipotecas y Gravámenes' },
  { value: 'permiso_edificacion', label: 'Permiso de Edificación' },
  { value: 'recepcion_municipal', label: 'Recepción Municipal' },
  { value: 'tasacion', label: 'Tasación' },
  { value: 'otro', label: 'Otro' },
] as const;

type VigenciaDoc = 'vigente' | 'por_vencer' | 'vencido';

@Component({
  selector: 'app-visado',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './visado.component.html',
})
export class VisadoComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  readonly tiposDocumento = TIPOS_DOCUMENTO;

  // ── Estado de formulario ──────────────────────────────────
  selectedFile: File | null = null;
  selectedFileName = '';
  tipoDocumento = '';
  carpetaId: string | null = null;

  // ── Resultado IA ──────────────────────────────────────────
  extractionResults: ExtractedField[] = [];
  resumenEjecutivo = '';
  scoreConfianza = 0;
  alertasMonto: string[] = [];
  isScanning = false;
  showResults = false;
  errorMsg = '';

  // ── Cola ──────────────────────────────────────────────────
  documentQueue: DocQueueItem[] = [];
  vigenciaFilter: 'todos' | VigenciaDoc = 'todos';
  loadingQueue = true;

  constructor(private documentosService: DocumentosService) {}

  ngOnInit(): void {
    this.loadQueue();
  }

  // ── Carga de archivos ─────────────────────────────────────

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];
      this.selectedFileName = this.selectedFile.name;
      this.showResults = false;
      this.errorMsg = '';
    }
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    const file = event.dataTransfer?.files[0];
    if (file) {
      this.selectedFile = file;
      this.selectedFileName = file.name;
      this.showResults = false;
      this.errorMsg = '';
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  triggerFileInput(): void {
    this.fileInput?.nativeElement?.click();
  }

  clearFile(): void {
    this.selectedFile = null;
    this.selectedFileName = '';
    this.showResults = false;
    this.errorMsg = '';
    if (this.fileInput) this.fileInput.nativeElement.value = '';
  }

  // ── Cola de documentos ────────────────────────────────────

  loadQueue(): void {
    const vigencia = this.vigenciaFilter === 'todos' ? undefined : this.vigenciaFilter;
    this.loadingQueue = true;
    this.documentosService.getCola(vigencia).subscribe({
      next: (list) => {
        this.documentQueue = list;
        this.loadingQueue = false;
      },
      error: () => {
        this.loadingQueue = false;
      },
    });
  }

  get filteredQueue(): DocQueueItem[] {
    return this.documentQueue;
  }

  onFilterChange(): void {
    this.loadQueue();
  }

  // ── Visado con IA ─────────────────────────────────────────

  get canScan(): boolean {
    return !!this.selectedFile && !!this.tipoDocumento && !this.isScanning;
  }

  scan(): void {
    if (!this.canScan) return;
    this.isScanning = true;
    this.showResults = false;
    this.errorMsg = '';

    this.documentosService
      .visar(this.selectedFile!, this.tipoDocumento, this.carpetaId ?? undefined)
      .subscribe({
        next: (res: VisadoResponse) => {
          this.extractionResults = res.resultados;
          this.resumenEjecutivo = res.resumen_ejecutivo ?? '';
          this.scoreConfianza = res.score_confianza ?? 0;
          this.alertasMonto = res.alertas_monto ?? [];
          this.isScanning = false;
          this.showResults = true;
          this.loadQueue();
        },
        error: (err) => {
          this.isScanning = false;
          this.showResults = false;
          this.errorMsg = err?.error?.detail ?? 'Error al procesar documento con IA.';
        },
      });
  }

  // ── Helpers de UI ─────────────────────────────────────────

  get approvedCount(): number {
    return this.extractionResults.filter((f) => f.status === 'approved').length;
  }
  get rejectedCount(): number {
    return this.extractionResults.filter((f) => f.status === 'rejected').length;
  }
  get alertCount(): number {
    return this.extractionResults.filter((f) => f.status === 'alert').length;
  }

  statusLabel(s: ExtractedField['status']): string {
    if (s === 'approved') return 'Aprobado';
    if (s === 'rejected') return 'Rechazado';
    return 'Alerta';
  }

  semaforoClass(s?: string): string {
    if (s === 'verde') return 'text-bg-success';
    if (s === 'amarillo') return 'text-bg-warning';
    if (s === 'rojo') return 'text-bg-danger';
    return 'text-bg-secondary';
  }

  semaforoIcon(s?: string): string {
    if (s === 'verde') return 'bi-check-circle-fill';
    if (s === 'amarillo') return 'bi-exclamation-triangle-fill';
    if (s === 'rojo') return 'bi-x-circle-fill';
    return 'bi-question-circle';
  }

  scoreColor(): string {
    if (this.scoreConfianza >= 0.8) return 'text-success';
    if (this.scoreConfianza >= 0.5) return 'text-warning';
    return 'text-danger';
  }
}
