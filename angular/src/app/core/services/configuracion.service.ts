import { Injectable } from '@angular/core';
import { from, map, Observable } from 'rxjs';
import { getSupabaseClient } from './supabase-client';
import type { Empresa, EmpresaInsert, Usuario } from '../../shared/models/database.types';

/**
 * Servicio de configuración del sistema.
 * Administra empresas y usuarios desde Supabase.
 */
@Injectable({ providedIn: 'root' })
export class ConfiguracionService {
  private supabase = getSupabaseClient();

  // ── Empresas ──────────────────────────────────────────────

  getEmpresas(): Observable<Empresa[]> {
    return from(
      this.supabase
        .from('empresas')
        .select('*')
        .order('razon_social', { ascending: true })
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return (data ?? []) as Empresa[];
      })
    );
  }

  getEmpresa(id: string): Observable<Empresa> {
    return from(
      this.supabase
        .from('empresas')
        .select('*')
        .eq('id', id)
        .single()
    ).pipe(
      map(({ data, error }) => {
        if (error || !data) throw error ?? new Error('Empresa no encontrada');
        return data as Empresa;
      })
    );
  }

  updateEmpresa(id: string, cambios: Partial<Empresa>): Observable<Empresa> {
    return from(
      this.supabase
        .from('empresas')
        .update(cambios)
        .eq('id', id)
        .select('*')
        .single()
    ).pipe(
      map(({ data, error }) => {
        if (error || !data) throw error ?? new Error('Error al actualizar empresa');
        return data as Empresa;
      })
    );
  }

  // ── Usuarios ──────────────────────────────────────────────

  getUsuarios(): Observable<Usuario[]> {
    return from(
      this.supabase
        .from('usuarios')
        .select('*, empresa:empresas(razon_social, tipo)')
        .order('nombre_completo', { ascending: true })
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return (data ?? []) as Usuario[];
      })
    );
  }

  getUsuariosByEmpresa(empresaId: string): Observable<Usuario[]> {
    return from(
      this.supabase
        .from('usuarios')
        .select('*')
        .eq('empresa_id', empresaId)
        .order('nombre_completo', { ascending: true })
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return (data ?? []) as Usuario[];
      })
    );
  }
}
