import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  imports: [CommonModule],
  templateUrl: './egis-documentos.component.html',
})
export class EgisDocumentosComponent implements OnInit {
  proyectos: ProyectoConRelaciones[] = [];
  documentos: DocumentoConRelaciones[] = [];
  cargando = true;

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
      // 1. Obtener proyectos del EGIS
      this.proyectos = await new Promise<ProyectoConRelaciones[]>((resolve, reject) => {
        this.proyectosService.obtenerProyectosPorUsuario(empresaId, rol).subscribe({
          next: resolve,
          error: reject,
        });
      });

      // 2. Obtener documentos de todos los proyectos
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
      this.alertService.error('Error al cargar documentos: ' + (err.message ?? err));
    } finally {
      this.cargando = false;
    }
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
