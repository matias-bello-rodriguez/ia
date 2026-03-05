import { Injectable } from '@angular/core';
import { from, map, Observable } from 'rxjs';
import type { Project } from '../../shared/models';
import { type ApiProyecto, mapProyecto, mapProyectos, mapProjectToApi } from '../../shared/mappers';
import { getSupabaseClient } from './supabase-client';

// Tabla creada por Django para el modelo Proyecto
const TABLE = 'egis_app_proyecto';

@Injectable({ providedIn: 'root' })
export class ProyectosService {
  private supabase = getSupabaseClient();

  getAll(): Observable<Project[]> {
    return from(
      this.supabase
        .from(TABLE)
        .select('*')
        .order('id', { ascending: true })
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        const rows = (data ?? []) as ApiProyecto[];
        return mapProyectos(rows);
      })
    );
  }

  getById(id: string): Observable<Project> {
    return from(
      this.supabase
        .from(TABLE)
        .select('*')
        .eq('id', id)
        .single()
    ).pipe(
      map(({ data, error }) => {
        if (error || !data) throw error ?? new Error('Proyecto no encontrado');
        return mapProyecto(data);
      })
    );
  }

  create(project: Partial<Project>): Observable<Project> {
    const payload = mapProjectToApi(project);
    return from(
      this.supabase
        .from(TABLE)
        .insert(payload)
        .select('*')
        .single()
    ).pipe(
      map(({ data, error }) => {
        if (error || !data) throw error ?? new Error('Error al crear proyecto');
        return mapProyecto(data);
      })
    );
  }

  update(id: string, project: Partial<Project>): Observable<Project> {
    const payload = mapProjectToApi(project);
    return from(
      this.supabase
        .from(TABLE)
        .update(payload)
        .eq('id', id)
        .select('*')
        .single()
    ).pipe(
      map(({ data, error }) => {
        if (error || !data) throw error ?? new Error('Error al actualizar proyecto');
        return mapProyecto(data);
      })
    );
  }
}
