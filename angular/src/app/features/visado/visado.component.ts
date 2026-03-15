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

  /** Escala para renderizar PDF a imagen (calidad tipo 300 DPI) */
  private readonly PDF_RENDER_SCALE = 2;
  /** Máximo de páginas a enviar a visión cuando el PDF no tiene texto (límite coste API) */
  private readonly MAX_PAGINAS_VISION = 10;

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

  /** Renderiza una página del PDF a imagen PNG (base64). */
  private async renderizarPaginaPdfComoImagen(
    pdf: { getPage(i: number): Promise<{ getViewport(o: { scale: number }): { width: number; height: number }; render(o: object): { promise: Promise<void> } }> },
    pageNum: number
  ): Promise<string> {
    const page = await pdf.getPage(pageNum);
    const viewport = page.getViewport({ scale: this.PDF_RENDER_SCALE });
    const canvas = document.createElement('canvas');
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('No se pudo obtener contexto 2d');
    const renderTask = page.render({
      canvasContext: ctx,
      viewport,
    });
    await renderTask.promise;
    const dataUrl = canvas.toDataURL('image/png');
    return dataUrl.replace(/^data:image\/png;base64,/, '');
  }

  /** Convierte las páginas del PDF a imágenes (base64). Máximo MAX_PAGINAS_VISION. */
  private async pdfPaginasAImagenes(file: File): Promise<string[]> {
    const data = new Uint8Array(await file.arrayBuffer());
    const pdf = await getDocument({ data }).promise;
    const numPages = Math.min(pdf.numPages, this.MAX_PAGINAS_VISION);
    const bases: string[] = [];
    for (let i = 1; i <= numPages; i++) {
      const base64 = await this.renderizarPaginaPdfComoImagen(pdf, i);
      bases.push(base64);
    }
    return bases;
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
    const file = this.selectedFile;
    if (!file) {
      this.alert.warning('Seleccione un documento.');
      return;
    }
    const nombre = this.selectedFileName || file.name;
    const esPdf = file.type === 'application/pdf' || nombre.toLowerCase().endsWith('.pdf');
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

    const hacerResumenConTexto = (texto: string) => {
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
    };

    this.extraerTextoPdf(file)
      .then((texto) => {
        if (texto && texto.length >= 50) {
          hacerResumenConTexto(texto);
          return;
        }
        // PDF sin texto extraíble (escaneo, imagen): convertir páginas a imagen y analizar con visión
        this.pdfPaginasAImagenes(file)
          .then((imagenesBase64) => {
            if (imagenesBase64.length === 0) {
              this.resumenIA = 'No se pudieron generar imágenes del PDF.';
              this.analizando = false;
              return;
            }
            this.analizarImagenesConVision(imagenesBase64, nombre, hacerResumenConTexto);
          })
          .catch((err: Error) => {
            this.errorAnalisis = err?.message ?? 'Error al convertir el PDF a imágenes.';
            this.analizando = false;
          });
      })
      .catch((err: Error) => {
        this.errorAnalisis = err?.message ?? 'Error al leer el PDF.';
        this.analizando = false;
      });
  }

  /**
   * Envía cada imagen al modelo de visión, concatena el texto extraído y luego pide el resumen (proyecto_egis).
   */
  private analizarImagenesConVision(
    imagenesBase64: string[],
    nombreArchivo: string,
    onTextoCompleto: (texto: string) => void
  ): void {
    const partes: string[] = [];
    let index = 0;

    const siguiente = () => {
      if (index >= imagenesBase64.length) {
        const textoCompleto = partes.join('\n\n');
        if (textoCompleto.trim()) {
          onTextoCompleto(textoCompleto);
        } else {
          this.resumenIA = 'No se pudo extraer texto de las imágenes del PDF.';
          this.analizando = false;
        }
        return;
      }
      this.openai
        .extraerTextoDeImagen(
          imagenesBase64[index],
          `${nombreArchivo} (página ${index + 1})`,
          `Eres un asistente del proyecto proyecto_egis. Esta imagen es la página ${index + 1} del documento "${nombreArchivo}". Extrae TODO el texto visible y los datos importantes (fechas, montos, partes, tablas). Responde en español, sin inventar datos.`
        )
        .subscribe({
          next: (texto) => {
            if (texto?.trim()) partes.push(`--- Página ${index + 1} ---\n${texto.trim()}`);
            index++;
            siguiente();
          },
          error: (err: Error) => {
            this.errorAnalisis = err?.message ?? 'Error al analizar la imagen con IA.';
            this.analizando = false;
          },
        });
    };

    siguiente();
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
