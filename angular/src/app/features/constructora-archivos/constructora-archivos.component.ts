import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { AuthService } from '../../core/services/auth.service';
import { DocumentosService } from '../../core/services/documentos.service';
import { ProyectosService } from '../../core/services/proyectos.service';
import { AlertService } from '../../core/services/alert.service';
import type {
  DocumentoConRelaciones,
  ProyectoConRelaciones,
  EstadoSemaforo,
} from '../../shared/models/database.types';
import { SEMAFORO_LABELS, SEMAFORO_COLORS } from '../../shared/models/database.types';

interface ProgresoArchivo {
  nombre: string;
  estado: 'pendiente' | 'subiendo' | 'ok' | 'error';
  mensaje?: string;
}

@Component({
  selector: 'app-constructora-archivos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './constructora-archivos.component.html',
})
export class ConstructoraArchivosComponent implements OnInit, OnDestroy {
  proyectos: ProyectoConRelaciones[] = [];
  documentos: DocumentoConRelaciones[] = [];
  cargando = true;
  cargandoDocumentos = false;
  subiendo = false;

  /** Proyecto seleccionado */
  proyectoSeleccionadoId = '';
  tipoDocumento = '';

  /** Archivos seleccionados para subida masiva */
  archivosSeleccionados: File[] = [];
  progresoSubida: ProgresoArchivo[] = [];

  readonly semaforoLabels = SEMAFORO_LABELS;
  readonly semaforoColors = SEMAFORO_COLORS;

  private subs = new Subscription();

  constructor(
    private auth: AuthService,
    private documentosService: DocumentosService,
    private proyectosService: ProyectosService,
    private alertService: AlertService,
  ) {}

  ngOnInit(): void {
    this.subs.add(
      this.auth.ready$.pipe(filter((ready) => ready), take(1)).subscribe(() => {
        this.cargarProyectos();
      }),
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  /** Carga la lista de proyectos de la constructora */
  private async cargarProyectos(): Promise<void> {
    const empresaId = this.auth.getEmpresaId();
    const rol = this.auth.getRol();

    if (!empresaId || !rol) {
      this.alertService.error('No se pudo obtener la sesión del usuario.');
      this.cargando = false;
      return;
    }

    try {
      this.proyectos = await new Promise<ProyectoConRelaciones[]>((resolve, reject) => {
        this.proyectosService.obtenerProyectosPorUsuario(empresaId, rol).subscribe({
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

  /** Al cambiar el proyecto, carga los documentos de ese proyecto */
  onProyectoChange(): void {
    this.documentos = [];
    this.archivosSeleccionados = [];
    this.progresoSubida = [];

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

  /** Captura múltiples archivos seleccionados del input */
  onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = input.files;
    if (!files || files.length === 0) return;

    this.archivosSeleccionados = Array.from(files);
    this.progresoSubida = this.archivosSeleccionados.map((f) => ({
      nombre: f.name,
      estado: 'pendiente' as const,
    }));

    // Reset input para permitir re-seleccionar los mismos archivos
    input.value = '';
  }

  /** Limpia la lista de archivos seleccionados */
  limpiarSeleccion(): void {
    this.archivosSeleccionados = [];
    this.progresoSubida = [];
  }

  /**
   * Sube los archivos seleccionados de forma secuencial (for...of)
   * para no saturar la API de Supabase Storage.
   */
  async subirLote(): Promise<void> {
    if (!this.proyectoSeleccionadoId) {
      this.alertService.error('Seleccione un proyecto antes de subir archivos.');
      return;
    }
    if (!this.tipoDocumento.trim()) {
      this.alertService.error('Ingrese el tipo de documento antes de subir.');
      return;
    }
    if (this.archivosSeleccionados.length === 0) {
      this.alertService.error('No hay archivos seleccionados.');
      return;
    }

    this.subiendo = true;
    let exitosos = 0;
    let fallidos = 0;

    for (const [index, file] of this.archivosSeleccionados.entries()) {
      this.progresoSubida[index].estado = 'subiendo';

      try {
        await new Promise<void>((resolve, reject) => {
          this.documentosService
            .subirDocumento(file, this.proyectoSeleccionadoId, this.tipoDocumento.trim())
            .subscribe({
              next: () => {
                this.progresoSubida[index].estado = 'ok';
                this.progresoSubida[index].mensaje = 'Subido correctamente';
                exitosos++;
                resolve();
              },
              error: (err) => {
                this.progresoSubida[index].estado = 'error';
                this.progresoSubida[index].mensaje = err.message ?? 'Error desconocido';
                fallidos++;
                resolve(); // No rechazamos para continuar con el resto del lote
              },
            });
        });
      } catch {
        this.progresoSubida[index].estado = 'error';
        this.progresoSubida[index].mensaje = 'Error inesperado';
        fallidos++;
      }
    }

    this.subiendo = false;

    // Resumen final
    if (fallidos === 0) {
      this.alertService.success(`✅ ${exitosos} archivo(s) subido(s) correctamente.`);
    } else {
      this.alertService.error(`${exitosos} subido(s), ${fallidos} con error.`);
    }

    // Recargar documentos del proyecto
    this.documentosService.obtenerDocumentosPorProyecto(this.proyectoSeleccionadoId).subscribe({
      next: (docs) => {
        this.documentos = docs;
      },
    });
  }

  descargarDocumento(doc: DocumentoConRelaciones): void {
    if (!doc.ruta_almacenamiento) {
      this.alertService.error('No hay archivo asociado para descargar.');
      return;
    }
    this.documentosService.descargarYGuardar(doc.ruta_almacenamiento, doc.nombre_archivo ?? 'documento').subscribe({
      next: () => this.alertService.success('Descarga iniciada.'),
      error: (err) => this.alertService.error('Error al descargar: ' + (err.message ?? err)),
    });
  }

  getNombreProyecto(doc: DocumentoConRelaciones): string {
    return doc.proyecto?.tipo_subsidio ?? 'Sin proyecto';
  }

  esAprobado(estado: EstadoSemaforo): boolean {
    return estado === 'aprobado_verde';
  }
}
