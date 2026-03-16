import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { DocumentosService } from '../../core/services/documentos.service';
import { ProyectosService } from '../../core/services/proyectos.service';
import { AuthService } from '../../core/services/auth.service';
import { AlertService } from '../../core/services/alert.service';
import { OpenaiService } from '../../core/services/openai.service';
import type {
  DocumentoConRelaciones,
  ProyectoConRelaciones,
  EstadoSemaforo,
} from '../../shared/models/database.types';
import { SEMAFORO_LABELS, SEMAFORO_COLORS } from '../../shared/models/database.types';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';

@Component({
  selector: 'app-visado',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './visado.component.html',
})
export class VisadoComponent implements OnInit, OnDestroy {
  proyectos: ProyectoConRelaciones[] = [];
  documentos: DocumentoConRelaciones[] = [];
  cargando = true;
  cargandoDocumentos = false;

  /** Proyecto seleccionado en el dropdown */
  proyectoSeleccionadoId = '';

  /** ID del documento cuyo resumen IA está expandido */
  resumenExpandidoId: string | null = null;

  /** ID del documento que se está analizando con IA */
  analizandoDocId: string | null = null;

  /** ID del último documento cuyo análisis terminó (para mantener el panel abierto) */
  ultimoDocAnalizadoId: string | null = null;

  /** Resumen generado en vivo por la IA (mientras se analiza) */
  resumenEnVivo = '';
  errorAnalisis = '';

  readonly semaforoLabels = SEMAFORO_LABELS;
  readonly semaforoColors = SEMAFORO_COLORS;

  private subs = new Subscription();

  /** Escala para renderizar PDF a imagen */
  private readonly PDF_RENDER_SCALE = 2;
  /** Máximo de páginas a enviar a visión */
  private readonly MAX_PAGINAS_VISION = 10;

  constructor(
    private documentosService: DocumentosService,
    private proyectosService: ProyectosService,
    private auth: AuthService,
    private alertService: AlertService,
    private openai: OpenaiService,
  ) {}

  ngOnInit(): void {
    if (typeof GlobalWorkerOptions?.workerSrc === 'undefined' || !GlobalWorkerOptions.workerSrc) {
      GlobalWorkerOptions.workerSrc = 'https://unpkg.com/pdfjs-dist@4.10.38/build/pdf.worker.min.mjs';
    }

    this.subs.add(
      this.auth.ready$.pipe(filter((ready) => ready), take(1)).subscribe(() => {
        this.cargarProyectos();
      }),
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  // ══════════════════════════════════════════════════════════
  // CARGA DE PROYECTOS Y DOCUMENTOS
  // ══════════════════════════════════════════════════════════

  private async cargarProyectos(): Promise<void> {
    try {
      this.proyectos = await new Promise<ProyectoConRelaciones[]>((resolve, reject) => {
        this.proyectosService.obtenerProyectosPorUsuario().subscribe({
          next: resolve,
          error: reject,
        });
      });
    } catch (err: any) {
      this.alertService.error('Error al cargar proyectos: ' + (err.message ?? err));
    } finally {
      this.cargando = false;
    }
  }

  onProyectoSeleccionado(): void {
    this.documentos = [];
    this.resumenExpandidoId = null;
    this.analizandoDocId = null;
    this.ultimoDocAnalizadoId = null;
    this.resumenEnVivo = '';
    this.errorAnalisis = '';

    if (!this.proyectoSeleccionadoId) return;

    this.cargandoDocumentos = true;

    this.documentosService.obtenerDocumentosPorProyecto(this.proyectoSeleccionadoId).subscribe({
      next: (docs) => {
        this.documentos = docs;
        this.cargandoDocumentos = false;
      },
      error: (err) => {
        this.alertService.error('Error al cargar documentos: ' + (err.message ?? err));
        this.cargandoDocumentos = false;
      },
    });
  }

  // ══════════════════════════════════════════════════════════
  // TOGGLE RESUMEN EXISTENTE
  // ══════════════════════════════════════════════════════════

  toggleResumen(docId: string): void {
    this.resumenExpandidoId = this.resumenExpandidoId === docId ? null : docId;
  }

  // ══════════════════════════════════════════════════════════
  // ANÁLISIS IA — Descarga el PDF del bucket y lo analiza
  // ══════════════════════════════════════════════════════════

  /** Inicia el análisis IA para un documento del listado */
  async analizarDocumentoConIA(doc: DocumentoConRelaciones): Promise<void> {
    if (this.analizandoDocId) return; // Solo uno a la vez

    const esPdf = doc.nombre_archivo.toLowerCase().endsWith('.pdf');
    if (!esPdf) {
      this.alertService.error('El análisis con IA solo está disponible para archivos PDF.');
      return;
    }

    this.analizandoDocId = doc.id;
    this.ultimoDocAnalizadoId = null;
    this.resumenEnVivo = '';
    this.errorAnalisis = '';
    this.resumenExpandidoId = doc.id;

    try {
      // 1. Descargar el archivo usando el SDK de Supabase Storage
      const blob = await new Promise<Blob>((resolve, reject) => {
        this.documentosService.descargarArchivo(doc.ruta_almacenamiento).subscribe({
          next: resolve,
          error: reject,
        });
      });
      const file = new File([blob], doc.nombre_archivo, { type: 'application/pdf' });

      // 2. Extraer texto por página
      const textosPorPagina = await this.extraerTextoPdfPorPagina(file);
      const conSuficienteTexto = textosPorPagina.some((t) => t.length >= 50);

      if (conSuficienteTexto) {
        // Resumen con texto extraído
        await this.resumenPorPaginaConTexto(textosPorPagina, doc.nombre_archivo);
      } else {
        // PDF escaneado: usar visión con imágenes
        const imagenesBase64 = await this.pdfPaginasAImagenes(file);
        if (imagenesBase64.length === 0) {
          this.resumenEnVivo = 'No se pudieron generar imágenes del PDF.';
          this.analizandoDocId = null;
          return;
        }
        await this.resumenPorPaginaConVision(imagenesBase64, doc.nombre_archivo);
      }
    } catch (err: any) {
      this.errorAnalisis = err?.message ?? 'Error al analizar el documento.';
      this.analizandoDocId = null;
    }
  }

  // ── Resumen por página (texto) ────────────────────────────

  private resumenPorPaginaConTexto(
    textosPorPagina: string[],
    nombreArchivo: string,
  ): Promise<void> {
    return new Promise<void>((resolve) => {
      const resumenes: string[] = [];
      let index = 0;

      const siguiente = () => {
        if (index >= textosPorPagina.length) {
          this.resumenEnVivo = resumenes.join('\n\n');
          this.ultimoDocAnalizadoId = this.analizandoDocId;
          this.analizandoDocId = null;
          resolve();
          return;
        }
        const textoPagina = textosPorPagina[index];
        const numPagina = index + 1;
        if (!textoPagina || textoPagina.length < 10) {
          resumenes.push(`--- Página ${numPagina} ---\n(Sin texto extraíble en esta página.)`);
          this.resumenEnVivo = resumenes.join('\n\n');
          index++;
          siguiente();
          return;
        }
        this.openai.resumenPaginaDocumento(textoPagina, nombreArchivo, numPagina).subscribe({
          next: (resumen) => {
            resumenes.push(`--- Página ${numPagina} ---\n${resumen?.trim() || '—'}`);
            this.resumenEnVivo = resumenes.join('\n\n');
            index++;
            siguiente();
          },
          error: (err: Error) => {
            this.errorAnalisis = err?.message ?? `Error al resumir la página ${numPagina}.`;
            this.analizandoDocId = null;
            resolve();
          },
        });
      };

      siguiente();
    });
  }

  // ── Resumen por página (visión/imagen) ────────────────────

  private resumenPorPaginaConVision(
    imagenesBase64: string[],
    nombreArchivo: string,
  ): Promise<void> {
    return new Promise<void>((resolve) => {
      const partes: string[] = [];
      let index = 0;

      const siguiente = () => {
        if (index >= imagenesBase64.length) {
          this.resumenEnVivo = partes.length > 0 ? partes.join('\n\n') : 'No se pudo extraer resumen de las imágenes.';
          this.ultimoDocAnalizadoId = this.analizandoDocId;
          this.analizandoDocId = null;
          resolve();
          return;
        }
        const numPagina = index + 1;
        const promptResumen = `Eres un asistente del proyecto proyecto_egis. Esta imagen es la PÁGINA ${numPagina} del documento "${nombreArchivo}".

Tu tarea: haz un RESUMEN de la información más importante de ESTA página (fechas, montos, partes, requisitos, tablas). Responde en español, breve y con viñetas (•). No inventes datos.`;
        this.openai
          .extraerTextoDeImagen(imagenesBase64[index], `${nombreArchivo} (página ${numPagina})`, promptResumen)
          .subscribe({
            next: (resumen) => {
              partes.push(`--- Página ${numPagina} ---\n${resumen?.trim() || '—'}`);
              this.resumenEnVivo = partes.join('\n\n');
              index++;
              siguiente();
            },
            error: (err: Error) => {
              this.errorAnalisis = err?.message ?? 'Error al analizar la imagen con IA.';
              this.analizandoDocId = null;
              resolve();
            },
          });
      };

      siguiente();
    });
  }



  // ══════════════════════════════════════════════════════════
  // PDF.js — Extracción de texto e imágenes
  // ══════════════════════════════════════════════════════════

  private async extraerTextoPdfPorPagina(file: File): Promise<string[]> {
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
      partes.push(texto.trim());
    }
    return partes;
  }

  private async renderizarPaginaPdfComoImagen(
    pdf: { getPage(i: number): Promise<{ getViewport(o: { scale: number }): { width: number; height: number }; render(o: object): { promise: Promise<void> } }> },
    pageNum: number,
  ): Promise<string> {
    const page = await pdf.getPage(pageNum);
    const viewport = page.getViewport({ scale: this.PDF_RENDER_SCALE });
    const canvas = document.createElement('canvas');
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('No se pudo obtener contexto 2d');
    const renderTask = page.render({ canvasContext: ctx, viewport });
    await renderTask.promise;
    const dataUrl = canvas.toDataURL('image/png');
    return dataUrl.replace(/^data:image\/png;base64,/, '');
  }

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

  // ══════════════════════════════════════════════════════════
  // ACCIONES EGIS — Aprobar / Rechazar
  // ══════════════════════════════════════════════════════════

  aprobarDocumento(doc: DocumentoConRelaciones): void {
    this.documentosService.aprobar(doc.id, 'Aprobado por EGIS').subscribe({
      next: (actualizado) => {
        doc.estado_actual = actualizado.estado_actual;
        this.alertService.success('Documento aprobado correctamente.');
      },
      error: (err) => this.alertService.error('Error al aprobar: ' + (err.message ?? err)),
    });
  }

  rechazarDocumento(doc: DocumentoConRelaciones): void {
    const motivo = prompt('Ingrese el motivo del rechazo:');
    if (!motivo) return;

    this.documentosService.rechazar(doc.id, motivo).subscribe({
      next: (actualizado) => {
        doc.estado_actual = actualizado.estado_actual;
        this.alertService.success('Documento rechazado.');
      },
      error: (err) => this.alertService.error('Error al rechazar: ' + (err.message ?? err)),
    });
  }

  esAprobado(doc: DocumentoConRelaciones): boolean {
    return doc.estado_actual === 'aprobado_verde';
  }

  esRechazado(doc: DocumentoConRelaciones): boolean {
    return doc.estado_actual === 'rechazado_rojo';
  }

  semaforoLabel(estado?: EstadoSemaforo): string {
    return estado ? SEMAFORO_LABELS[estado] : '—';
  }
}
