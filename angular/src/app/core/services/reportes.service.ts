import { Injectable } from '@angular/core';
import { from, map, Observable } from 'rxjs';
import { getSupabaseClient } from './supabase-client';
import type {
  Proyecto,
  ProyectoConRelaciones,
  Documento,
  EstadoSemaforo,
} from '../../shared/models/database.types';
import { SEMAFORO_LABELS, ESTADO_PROYECTO_LABELS } from '../../shared/models/database.types';

/** Fila de resumen para la vista de reportes */
export interface ReporteProyectoRow {
  proyectoId: string;
  codigoProyecto: string | null;
  beneficiarioNombre: string;
  beneficiarioRut: string;
  tipoSubsidio: string;
  montoUf: number;
  estadoProyecto: string;
  estadoProyectoLabel: string;
  totalDocumentos: number;
  documentosAprobados: number;
  documentosRechazados: number;
  documentosPendientes: number;
}

@Injectable({ providedIn: 'root' })
export class ReportesService {
  private supabase = getSupabaseClient();

  /** Obtener reporte ejecutivo de todos los proyectos con sus documentos */
  getReporteEjecutivo(): Observable<ReporteProyectoRow[]> {
    return from(
      this.supabase
        .from('proyectos')
        .select('*, beneficiario:beneficiarios(nombre_completo, rut), documentos(id, estado_actual)')
        .order('fecha_creacion', { ascending: false })
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return (data ?? []).map((p: any) => {
          const docs = (p.documentos ?? []) as Array<{ id: string; estado_actual: EstadoSemaforo }>;
          return {
            proyectoId: p.id,
            codigoProyecto: p.codigo_proyecto,
            beneficiarioNombre: p.beneficiario?.nombre_completo ?? '',
            beneficiarioRut: p.beneficiario?.rut ?? '',
            tipoSubsidio: p.tipo_subsidio,
            montoUf: Number(p.monto_uf),
            estadoProyecto: p.estado_actual,
            estadoProyectoLabel: ESTADO_PROYECTO_LABELS[p.estado_actual as keyof typeof ESTADO_PROYECTO_LABELS] ?? p.estado_actual,
            totalDocumentos: docs.length,
            documentosAprobados: docs.filter(d => d.estado_actual === 'aprobado_verde').length,
            documentosRechazados: docs.filter(d => d.estado_actual === 'rechazado_rojo').length,
            documentosPendientes: docs.filter(d => d.estado_actual === 'pendiente_amarillo').length,
          } as ReporteProyectoRow;
        });
      })
    );
  }

  /** Obtener documentos de un proyecto específico */
  getDocumentosProyecto(proyectoId: string): Observable<Documento[]> {
    return from(
      this.supabase
        .from('documentos')
        .select('*')
        .eq('proyecto_id', proyectoId)
        .order('fecha_subida', { ascending: true })
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return (data ?? []) as Documento[];
      })
    );
  }
}
