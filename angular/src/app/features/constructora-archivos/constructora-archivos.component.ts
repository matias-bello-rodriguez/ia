import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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

@Component({
  selector: 'app-constructora-archivos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './constructora-archivos.component.html',
})
export class ConstructoraArchivosComponent implements OnInit {
  proyectos: ProyectoConRelaciones[] = [];
  documentos: DocumentoConRelaciones[] = [];
  cargando = true;
  subiendo = false;

  /** Proyecto seleccionado para subir un archivo */
  proyectoSeleccionadoId = '';
  tipoDocumento = '';

  readonly semaforoLabels = SEMAFORO_LABELS;
  readonly semaforoColors = SEMAFORO_COLORS;

  constructor(
    private auth: AuthService,
    private documentosService: DocumentosService,
    private proyectosService: ProyectosService,
    private alertService: AlertService,
  ) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  private async cargarDatos(): Promise<void> {
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

      const docsPromises = this.proyectos.map(
        (p) =>
          new Promise<DocumentoConRelaciones[]>((resolve, reject) => {
            this.documentosService.obtenerDocumentosPorProyecto(p.id).subscribe({
              next: resolve,
              error: reject,
            });
          }),
      );
      const docsArrays = await Promise.all(docsPromises);
      this.documentos = docsArrays.flat();
    } catch (err: any) {
      this.alertService.error('Error al cargar datos: ' + (err.message ?? err));
    } finally {
      this.cargando = false;
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    if (!this.proyectoSeleccionadoId) {
      this.alertService.error('Seleccione un proyecto antes de subir un archivo.');
      input.value = '';
      return;
    }

    if (!this.tipoDocumento.trim()) {
      this.alertService.error('Ingrese el tipo de documento antes de subir.');
      input.value = '';
      return;
    }

    this.subiendo = true;

    this.documentosService
      .subirDocumento(file, this.proyectoSeleccionadoId, this.tipoDocumento.trim())
      .subscribe({
        next: (nuevoDoc) => {
          this.alertService.success(`Archivo "${nuevoDoc.nombre_archivo}" subido correctamente.`);
          // Recargar documentos del proyecto
          this.documentosService.obtenerDocumentosPorProyecto(this.proyectoSeleccionadoId).subscribe({
            next: (docs) => {
              // Reemplazar solo los docs de este proyecto
              this.documentos = this.documentos
                .filter((d) => d.proyecto_id !== this.proyectoSeleccionadoId)
                .concat(docs);
            },
          });
          this.subiendo = false;
          this.tipoDocumento = '';
          input.value = '';
        },
        error: (err) => {
          this.alertService.error('Error al subir archivo: ' + (err.message ?? err));
          this.subiendo = false;
          input.value = '';
        },
      });
  }

  getNombreProyecto(doc: DocumentoConRelaciones): string {
    return doc.proyecto?.tipo_subsidio ?? 'Sin proyecto';
  }

  esAprobado(estado: EstadoSemaforo): boolean {
    return estado === 'aprobado_verde';
  }
}
