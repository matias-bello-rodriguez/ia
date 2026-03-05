import { Injectable } from '@angular/core';
import { from, map, Observable } from 'rxjs';
import type { Beneficiary } from '../../shared/models';
import {
  type ApiBeneficiario,
  mapBeneficiario,
  mapBeneficiarios,
  mapBeneficiarioToApi,
} from '../../shared/mappers';
import { getSupabaseClient } from './supabase-client';

export interface BeneficiariosQuery {
  proyectoId?: string;
  q?: string;
}

// Tabla creada por Django para el modelo Beneficiario
const TABLE = 'egis_app_beneficiario';

@Injectable({ providedIn: 'root' })
export class BeneficiariosService {
  private supabase = getSupabaseClient();

  getAll(query?: BeneficiariosQuery): Observable<Beneficiary[]> {
    let q = this.supabase
      .from(TABLE)
      .select('*, proyecto:proyecto_id (nombre)')
      .order('id', { ascending: true });

    if (query?.proyectoId) {
      q = q.eq('proyecto_id', query.proyectoId);
    }
    if (query?.q) {
      const term = `%${query.q}%`;
      q = q.or(`nombre.ilike.${term},rut.ilike.${term}`);
    }

    return from(q).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        const rows = (data ?? []) as ApiBeneficiario[];
        return mapBeneficiarios(rows);
      })
    );
  }

  getById(id: string): Observable<Beneficiary> {
    return from(
      this.supabase
        .from(TABLE)
        .select('*, proyecto:proyecto_id (nombre)')
        .eq('id', id)
        .single()
    ).pipe(
      map(({ data, error }) => {
        if (error || !data) throw error ?? new Error('Beneficiario no encontrado');
        return mapBeneficiario(data);
      })
    );
  }

  create(beneficiary: Partial<Beneficiary>, proyectoId: string): Observable<Beneficiary> {
    const payload = mapBeneficiarioToApi(beneficiary, proyectoId);
    return from(
      this.supabase
        .from(TABLE)
        .insert(payload)
        .select('*, proyecto:proyecto_id (nombre)')
        .single()
    ).pipe(
      map(({ data, error }) => {
        if (error || !data) throw error ?? new Error('Error al crear beneficiario');
        return mapBeneficiario(data);
      })
    );
  }

  update(id: string, beneficiary: Partial<Beneficiary>, proyectoId: string): Observable<Beneficiary> {
    const payload = mapBeneficiarioToApi(beneficiary, proyectoId);
    return from(
      this.supabase
        .from(TABLE)
        .update(payload)
        .eq('id', id)
        .select('*, proyecto:proyecto_id (nombre)')
        .single()
    ).pipe(
      map(({ data, error }) => {
        if (error || !data) throw error ?? new Error('Error al actualizar beneficiario');
        return mapBeneficiario(data);
      })
    );
  }
}
