import { Injectable } from '@angular/core';
import { from, map, Observable } from 'rxjs';
import { getSupabaseClient } from './supabase-client';
import type {
  HistorialConRelaciones,
  HistorialEstadoDocumento,
} from '../../shared/models/database.types';

/**
 * Servicio de notificaciones / historial de actividad.
 * En lugar de un endpoint Django, consulta directamente
 * la tabla historial_estados_documento de Supabase.
 */
@Injectable({ providedIn: 'root' })
export class NotificacionesService {
  private supabase = getSupabaseClient();

  /** Obtener los últimos cambios de estado (actividad reciente) */
  getActividadReciente(limit = 50): Observable<HistorialConRelaciones[]> {
    return from(
      this.supabase
        .from('historial_estados_documento')
        .select('*, usuario_accion:usuarios(nombre_completo, rol), documento:documentos(nombre_archivo, tipo_documento, proyecto_id)')
        .order('fecha_cambio', { ascending: false })
        .limit(limit)
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return (data ?? []) as HistorialConRelaciones[];
      })
    );
  }

  /** Obtener historial de un proyecto específico */
  getActividadProyecto(proyectoId: string): Observable<HistorialConRelaciones[]> {
    return from(
      this.supabase
        .from('historial_estados_documento')
        .select('*, usuario_accion:usuarios(nombre_completo, rol), documento:documentos!inner(nombre_archivo, tipo_documento, proyecto_id)')
        .eq('documento.proyecto_id', proyectoId)
        .order('fecha_cambio', { ascending: false })
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return (data ?? []) as HistorialConRelaciones[];
      })
    );
  }
}
