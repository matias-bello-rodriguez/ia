import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DocumentosService } from '../../core/services/documentos.service';
import { AuthService } from '../../core/services/auth.service';
import { AlertService } from '../../core/services/alert.service';
import { OpenaiService } from '../../core/services/openai.service';
import type { Documento, EstadoSemaforo } from '../../shared/models/database.types';
import { SEMAFORO_LABELS } from '../../shared/models/database.types';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';

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

  // ── Análisis IA (proyecto_egis) ───────────────────────────
  analizando = false;
  resumenIA = '';
  errorAnalisis = '';

  // ── Cola de documentos ────────────────────────────────────
  documentQueue: Documento[] = [];
  loadingQueue = true;

  constructor(
    private documentosService: DocumentosService,
    private auth: AuthService,
    private alert: AlertService,
    private openai: OpenaiService,
  ) {}

  ngOnInit(): void {
    if (typeof GlobalWorkerOptions?.workerSrc === 'undefined' || !GlobalWorkerOptions.workerSrc) {
      GlobalWorkerOptions.workerSrc = 'https://unpkg.com/pdfjs-dist@4.10.38/build/pdf.worker.min.mjs';
    }
    this.loadQueue();
  }

  /** Extrae el texto de un PDF usando PDF.js */
  private async extraerTextoPdf(file: File): Promise<string> {
    const data = new Uint8Array(await file.arrayBuffer());
    const pdf = await getDocument({ data }).promise;
    const numPages = pdf.numPages;
    const partes: string[] = [];
    for (let i = 1; i <= numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const texto = content.items
        .map((item) => ('str' in item && typeof (item as { str: string }).str === 'string' ? (item as { str: string }).str : ''))
        .join(' ');
      if (texto.trim()) partes.push(texto.trim());
    }
    return partes.join('\n\n') || '';
  }

  // ── Carga de archivos ─────────────────────────────────────

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];
      this.selectedFileName = this.selectedFile.name;
      this.showResults = false;
      this.errorMsg = '';
      this.resumenIA = '';
      this.errorAnalisis = '';
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
      this.resumenIA = '';
      this.errorAnalisis = '';
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
    this.resumenIA = '';
    this.errorAnalisis = '';
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

  /** Analiza el documento seleccionado con IA (proyecto_egis) y muestra el resumen en Resultado. */
  analizarConIA(): void {
    if (!this.selectedFile) {
      this.alert.warning('Seleccione un documento.');
      return;
    }
    const nombre = this.selectedFileName || this.selectedFile.name;
    const esPdf = this.selectedFile.type === 'application/pdf' || nombre.toLowerCase().endsWith('.pdf');
    if (!esPdf) {
      this.errorAnalisis = 'El análisis con IA solo está disponible para archivos PDF.';
      this.showResults = true;
      this.resumenIA = '';
      return;
    }
    this.analizando = true;
    this.errorAnalisis = '';
    this.resumenIA = '';
    this.showResults = true;

    this.extraerTextoPdf(this.selectedFile)
      .then((texto) => {
        if (!texto || texto.length < 10) {
          this.resumenIA = 'No se pudo extraer texto del PDF (por ejemplo, puede ser un escaneo). Sube una imagen de una página para analizarla con IA.';
          this.analizando = false;
          return;
        }
        this.openai.extraerInformacionDocumento(texto, nombre).subscribe({
          next: (resumen) => {
            this.resumenIA = resumen || 'Sin resumen generado.';
            this.analizando = false;
          },
          error: (err: Error) => {
            this.errorAnalisis = err?.message ?? 'Error al llamar a la IA.';
            this.analizando = false;
          },
        });
      })
      .catch((err: Error) => {
        this.errorAnalisis = err?.message ?? 'Error al leer el PDF.';
        this.analizando = false;
      });
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
