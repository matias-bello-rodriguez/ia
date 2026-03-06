import { Injectable } from '@angular/core';
import { from, map, Observable } from 'rxjs';
import { getSupabaseClient } from './supabase-client';
import type { Beneficiario, BeneficiarioInsert } from '../../shared/models/database.types';

export interface BeneficiariosQuery {
  proyectoId?: string;
  q?: string;
  comuna?: string;
}

@Injectable({ providedIn: 'root' })
export class BeneficiariosService {
  private supabase = getSupabaseClient();

  /** Obtener todos los beneficiarios con filtros opcionales */
  getAll(query?: BeneficiariosQuery): Observable<Beneficiario[]> {
    let q = this.supabase
      .from('beneficiarios')
      .select('*')
      .order('fecha_registro', { ascending: false });

    if (query?.q) {
      const term = `%${query.q}%`;
      q = q.or(`nombre_completo.ilike.${term},rut.ilike.${term}`);
    }
    if (query?.comuna) {
      q = q.eq('comuna', query.comuna);
    }

    return from(q).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return (data ?? []) as Beneficiario[];
      })
    );
  }

  /** Obtener un beneficiario por ID */
  getById(id: string): Observable<Beneficiario> {
    return from(
      this.supabase
        .from('beneficiarios')
        .select('*')
        .eq('id', id)
        .single()
    ).pipe(
      map(({ data, error }) => {
        if (error || !data) throw error ?? new Error('Beneficiario no encontrado');
        return data as Beneficiario;
      })
    );
  }

  /** Buscar beneficiario por RUT */
  getByRut(rut: string): Observable<Beneficiario | null> {
    return from(
      this.supabase
        .from('beneficiarios')
        .select('*')
        .eq('rut', rut)
        .maybeSingle()
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return data as Beneficiario | null;
      })
    );
  }

  /** Crear nuevo beneficiario */
  create(beneficiario: BeneficiarioInsert): Observable<Beneficiario> {
    return from(
      this.supabase
        .from('beneficiarios')
        .insert(beneficiario)
        .select('*')
        .single()
    ).pipe(
      map(({ data, error }) => {
        if (error || !data) throw error ?? new Error('Error al crear beneficiario');
        return data as Beneficiario;
      })
    );
  }

  /** Actualizar un beneficiario existente */
  update(id: string, cambios: Partial<Beneficiario>): Observable<Beneficiario> {
    return from(
      this.supabase
        .from('beneficiarios')
        .update(cambios)
        .eq('id', id)
        .select('*')
        .single()
    ).pipe(
      map(({ data, error }) => {
        if (error || !data) throw error ?? new Error('Error al actualizar beneficiario');
        return data as Beneficiario;
      })
    );
  }
}
