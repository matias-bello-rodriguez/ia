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

@Component({
  selector: 'app-egis-documentos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './egis-documentos.component.html',
})
export class EgisDocumentosComponent implements OnInit, OnDestroy {
  proyectos: ProyectoConRelaciones[] = [];
  documentos: DocumentoConRelaciones[] = [];
  cargando = true;
  cargandoDocumentos = false;

  proyectoSeleccionadoId = '';
  resumenExpandidoId: string | null = null;

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

  /** Carga solo la lista de proyectos asignados al EGIS */
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

  /** Al cambiar el proyecto seleccionado, carga los documentos de ese proyecto */
  onProyectoSeleccionado(): void {
    this.documentos = [];
    this.resumenExpandidoId = null;

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

  /** Toggle para expandir/colapsar el resumen IA de un documento */
  toggleResumen(docId: string): void {
    this.resumenExpandidoId = this.resumenExpandidoId === docId ? null : docId;
  }

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

  getNombreProyecto(doc: DocumentoConRelaciones): string {
    return doc.proyecto?.tipo_subsidio ?? 'Sin proyecto';
  }
}
