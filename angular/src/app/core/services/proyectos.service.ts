import { Injectable } from '@angular/core';
import { from, map, Observable } from 'rxjs';
import { getSupabaseClient } from './supabase-client';
import type {
  Proyecto,
  ProyectoInsert,
  ProyectoConRelaciones,
  EstadoProyecto,
} from '../../shared/models/database.types';

@Injectable({ providedIn: 'root' })
export class ProyectosService {
  private supabase = getSupabaseClient();

  /** Obtener todos los proyectos (RLS filtra por empresa) */
  getAll(): Observable<Proyecto[]> {
    return from(
      this.supabase
        .from('proyectos')
        .select('*')
        .order('fecha_creacion', { ascending: false })
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return (data ?? []) as Proyecto[];
      })
    );
  }

  /** Obtener proyectos con relaciones expandidas (beneficiario, egis, constructora) */
  getAllConRelaciones(): Observable<ProyectoConRelaciones[]> {
    return from(
      this.supabase
        .from('proyectos')
        .select('*, beneficiario:beneficiarios(*), egis:empresas!egis_id(*), constructora:empresas!constructora_id(*)')
        .order('fecha_creacion', { ascending: false })
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return (data ?? []) as ProyectoConRelaciones[];
      })
    );
  }

  /** Obtener un proyecto por ID con todas sus relaciones */
  getById(id: string): Observable<ProyectoConRelaciones> {
    return from(
      this.supabase
        .from('proyectos')
        .select('*, beneficiario:beneficiarios(*), egis:empresas!egis_id(*), constructora:empresas!constructora_id(*)')
        .eq('id', id)
        .single()
    ).pipe(
      map(({ data, error }) => {
        if (error || !data) throw error ?? new Error('Proyecto no encontrado');
        return data as ProyectoConRelaciones;
      })
    );
  }

  /** Crear nuevo proyecto */
  create(proyecto: ProyectoInsert): Observable<Proyecto> {
    return from(
      this.supabase
        .from('proyectos')
        .insert(proyecto)
        .select('*')
        .single()
    ).pipe(
      map(({ data, error }) => {
        if (error || !data) throw error ?? new Error('Error al crear proyecto');
        return data as Proyecto;
      })
    );
  }

  /** Actualizar un proyecto existente */
  update(id: string, cambios: Partial<Proyecto>): Observable<Proyecto> {
    return from(
      this.supabase
        .from('proyectos')
        .update(cambios)
        .eq('id', id)
        .select('*')
        .single()
    ).pipe(
      map(({ data, error }) => {
        if (error || !data) throw error ?? new Error('Error al actualizar proyecto');
        return data as Proyecto;
      })
    );
  }

  /** Cambiar el estado de un proyecto */
  cambiarEstado(id: string, nuevoEstado: EstadoProyecto): Observable<Proyecto> {
    return this.update(id, { estado_actual: nuevoEstado });
  }

  /** Asignar constructora a un proyecto */
  asignarConstructora(proyectoId: string, constructoraId: string): Observable<Proyecto> {
    return this.update(proyectoId, { constructora_id: constructoraId });
  }
}
