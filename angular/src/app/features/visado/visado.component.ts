import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DocumentosService } from '../../core/services/documentos.service';
import { AuthService } from '../../core/services/auth.service';
import { AlertService } from '../../core/services/alert.service';
import type { Documento, EstadoSemaforo } from '../../shared/models/database.types';
import { SEMAFORO_LABELS, SEMAFORO_COLORS } from '../../shared/models/database.types';

/** Tipos de documento reconocidos por el sistema */
const TIPOS_DOCUMENTO = [
  { value: 'Contrato', label: 'Contrato de Construcción' },
  { value: 'Resolución Exenta', label: 'Resolución Exenta' },
  { value: 'Informe Universidad', label: 'Informe Universidad (Xilófagos)' },
  { value: 'Certificado Dominio', label: 'Certificado de Dominio Vigente' },
  { value: 'Certificado Hipoteca', label: 'Certificado de Hipotecas y Gravámenes' },
  { value: 'Permiso Edificación', label: 'Permiso de Edificación' },
  { value: 'Recepción Municipal', label: 'Recepción Municipal' },
  { value: 'Boleta de Garantía', label: 'Boleta de Garantía' },
  { value: 'Tasación', label: 'Tasación' },
  { value: 'Otro', label: 'Otro' },
] as const;

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
  proyectoId = '';

  // ── Resultado de subida ───────────────────────────────────
  isUploading = false;
  showResults = false;
  uploadedDoc: Documento | null = null;
  errorMsg = '';

  // ── Cola de documentos ────────────────────────────────────
  documentQueue: Documento[] = [];
  loadingQueue = true;

  constructor(
    private documentosService: DocumentosService,
    private auth: AuthService,
    private alert: AlertService,
  ) {}

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

  // ── Cola de documentos (todos los que el usuario puede ver) ──

  loadQueue(): void {
    this.loadingQueue = true;
    this.documentosService.getAll().subscribe({
      next: (list: Documento[]) => {
        this.documentQueue = list;
        this.loadingQueue = false;
      },
      error: () => {
        this.loadingQueue = false;
      },
    });
  }

  get filteredQueue(): Documento[] {
    return this.documentQueue;
  }

  // ── Subir documento ───────────────────────────────────────

  get canUpload(): boolean {
    return !!this.selectedFile && !!this.tipoDocumento && !!this.proyectoId && !this.isUploading;
  }

  upload(): void {
    if (!this.canUpload) return;
    this.isUploading = true;
    this.showResults = false;
    this.errorMsg = '';

    this.documentosService
      .subirDocumento(this.selectedFile!, this.proyectoId, this.tipoDocumento)
      .subscribe({
        next: (doc: Documento) => {
          this.uploadedDoc = doc;
          this.isUploading = false;
          this.showResults = true;
          this.alert.success('Documento subido exitosamente con estado "Pendiente".');
          this.loadQueue();
        },
        error: (err: Error) => {
          this.isUploading = false;
          this.showResults = false;
          this.errorMsg = err?.message ?? 'Error al subir documento.';
        },
      });
  }

  // ── Helpers de UI ─────────────────────────────────────────

  semaforoClass(estado?: EstadoSemaforo): string {
    if (estado === 'aprobado_verde') return 'text-bg-success';
    if (estado === 'pendiente_amarillo') return 'text-bg-warning';
    if (estado === 'en_proceso_naranja') return 'text-bg-info';
    if (estado === 'rechazado_rojo') return 'text-bg-danger';
    return 'text-bg-secondary';
  }

  semaforoLabel(estado?: EstadoSemaforo): string {
    return estado ? SEMAFORO_LABELS[estado] : '—';
  }

  semaforoIcon(estado?: EstadoSemaforo): string {
    if (estado === 'aprobado_verde') return 'bi-check-circle-fill';
    if (estado === 'pendiente_amarillo') return 'bi-exclamation-triangle-fill';
    if (estado === 'en_proceso_naranja') return 'bi-hourglass-split';
    if (estado === 'rechazado_rojo') return 'bi-x-circle-fill';
    return 'bi-question-circle';
  }
}
