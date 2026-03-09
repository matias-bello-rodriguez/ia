import { Injectable, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, from, of, throwError } from 'rxjs';
import { map, switchMap, tap, catchError } from 'rxjs/operators';
import { getSupabaseClient } from './supabase-client';
import type {
  Usuario,
  UsuarioConEmpresa,
  RolUsuario,
  TipoEmpresa,
  Empresa,
  esRolEgis,
  esRolConstructora,
  esRolServiu,
} from '../../shared/models/database.types';

// ── Tipo de sesión activa ───────────────────────────────────
export interface SesionActiva {
  /** UUID del usuario (auth.users.id = usuarios.id) */
  id: string;
  email: string;
  /** Datos de perfil desde la tabla public.usuarios */
  perfil: Usuario;
  /** Empresa asociada al usuario */
  empresa: Empresa | null;
}

// Re-exportar helpers de roles para uso en componentes
export {
  RolUsuario,
  TipoEmpresa,
  esRolEgis,
  esRolConstructora,
  esRolServiu,
} from '../../shared/models/database.types';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private supabase = getSupabaseClient();

  /** Stream reactivo de la sesión activa (null = no logueado) */
  private sesionSubject = new BehaviorSubject<SesionActiva | null>(null);
  sesion$ = this.sesionSubject.asObservable();

  /** Indica que la verificación inicial de sesión terminó */
  private readySubject = new BehaviorSubject<boolean>(false);
  ready$ = this.readySubject.asObservable();

  // ── Signals para uso reactivo en templates ────────────────
  private _sesion = signal<SesionActiva | null>(null);
  readonly sesion = this._sesion.asReadonly();
  readonly isLoggedIn = computed(() => !!this._sesion());
  readonly rol = computed(() => this._sesion()?.perfil.rol ?? null);
  readonly empresaId = computed(() => this._sesion()?.perfil.empresa_id ?? null);
  readonly empresaTipo = computed(() => this._sesion()?.empresa?.tipo ?? null);

  constructor(private router: Router) {
    this.inicializarSesion();
  }

  // ══════════════════════════════════════════════════════════
  // INICIALIZACIÓN — Restaurar sesión al cargar la app
  // ══════════════════════════════════════════════════════════
  private async inicializarSesion(): Promise<void> {
    try {
      const { data: { session } } = await this.supabase.auth.getSession();

      if (session?.user) {
        const sesion = await this.cargarPerfilUsuario(session.user.id, session.user.email!);
        this.establecerSesion(sesion);
      }
    } catch (err) {
      console.error('[AuthService] Error al restaurar sesión:', err);
    } finally {
      this.readySubject.next(true);
    }

    // Escuchar cambios de auth (login, logout, token refresh)
    this.supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        const sesion = await this.cargarPerfilUsuario(session.user.id, session.user.email!);
        this.establecerSesion(sesion);
      } else if (event === 'SIGNED_OUT') {
        this.limpiarSesion();
      }
    });
  }

  // ══════════════════════════════════════════════════════════
  // CONSULTA DE PERFIL — Tabla public.usuarios + empresa
  // ══════════════════════════════════════════════════════════
  private async cargarPerfilUsuario(authUserId: string, email: string): Promise<SesionActiva> {
    // Consultar perfil con join a empresa
    const { data: perfil, error } = await this.supabase
      .from('usuarios')
      .select('*, empresa:empresas(*)')
      .eq('id', authUserId)
      .single();

    if (error || !perfil) {
      throw new Error(
        `No se encontró perfil de usuario en la tabla "usuarios" para id=${authUserId}. ` +
        `Asegúrese de que el usuario fue registrado correctamente.`
      );
    }

    const empresa = (perfil as any).empresa as Empresa | null;

    return {
      id: authUserId,
      email,
      perfil: {
        id: perfil.id,
        empresa_id: perfil.empresa_id,
        rut: perfil.rut,
        nombre_completo: perfil.nombre_completo,
        correo: perfil.correo,
        rol: perfil.rol as RolUsuario,
        fecha_registro: perfil.fecha_registro,
      },
      empresa,
    };
  }

  private establecerSesion(sesion: SesionActiva): void {
    this.sesionSubject.next(sesion);
    this._sesion.set(sesion);
  }

  private limpiarSesion(): void {
    this.sesionSubject.next(null);
    this._sesion.set(null);
  }

  // ══════════════════════════════════════════════════════════
  // LOGIN — Supabase Auth + carga de perfil
  // ══════════════════════════════════════════════════════════
  login(email: string, password: string): Observable<SesionActiva> {
    return from(
      this.supabase.auth.signInWithPassword({ email, password })
    ).pipe(
      switchMap(({ data, error }) => {
        if (error) return throwError(() => error);
        if (!data.user) return throwError(() => new Error('No se recibió usuario'));
        return from(this.cargarPerfilUsuario(data.user.id, data.user.email!));
      }),
      tap((sesion) => this.establecerSesion(sesion)),
      catchError((err) => {
        this.limpiarSesion();
        return throwError(() => err);
      }),
    );
  }

  // ══════════════════════════════════════════════════════════
  // REGISTRO — Crear cuenta en Supabase Auth
  // (El registro en la tabla usuarios se debe hacer con un
  //  trigger o manualmente después de confirmar email)
  // ══════════════════════════════════════════════════════════
  register(email: string, password: string): Observable<{ message: string }> {
    return from(
      this.supabase.auth.signUp({ email, password })
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return { message: 'Cuenta creada. Revise su correo para confirmar.' };
      }),
    );
  }

  // ══════════════════════════════════════════════════════════
  // LOGOUT
  // ══════════════════════════════════════════════════════════
  async logout(): Promise<void> {
    await this.supabase.auth.signOut();
    this.limpiarSesion();
    this.router.navigate(['/']);
  }

  // ══════════════════════════════════════════════════════════
  // GETTERS SINCRÓNICOS
  // ══════════════════════════════════════════════════════════
  getSesion(): SesionActiva | null {
    return this.sesionSubject.value;
  }

  getUsuarioId(): string | null {
    return this.sesionSubject.value?.id ?? null;
  }

  getRol(): RolUsuario | null {
    return this.sesionSubject.value?.perfil.rol ?? null;
  }

  getEmpresaId(): string | null {
    return this.sesionSubject.value?.perfil.empresa_id ?? null;
  }

  getEmpresaTipo(): TipoEmpresa | null {
    return this.sesionSubject.value?.empresa?.tipo ?? null;
  }

  estaLogueado(): boolean {
    return !!this.sesionSubject.value;
  }

  /** Determina si el usuario logueado pertenece a una EGIS */
  esEgis(): boolean {
    const rol = this.getRol();
    return rol === 'egis' || rol === 'hito_egis';
  }

  /** Determina si el usuario logueado pertenece a una Constructora */
  esConstructora(): boolean {
    const rol = this.getRol();
    return rol === 'dueño_constructora' || rol === 'constructora';
  }

  /** Determina si el usuario logueado pertenece a SERVIU */
  esServiu(): boolean {
    const rol = this.getRol();
    return rol === 'oficina_partes_serviu' || rol === 'hito_serviu';
  }

  // ══════════════════════════════════════════════════════════
  // NAVEGACIÓN SEGÚN ROL
  // ══════════════════════════════════════════════════════════
  getDashboardPath(): string {
    if (this.esConstructora()) return '/constructora/dashboard';
    // EGIS y SERVIU usan el dashboard principal
    return '/egis/dashboard';
  }

  // ══════════════════════════════════════════════════════════
  // TOKEN DE ACCESO (para peticiones custom si fueran necesarias)
  // ══════════════════════════════════════════════════════════
  async getAccessToken(): Promise<string | null> {
    const { data } = await this.supabase.auth.getSession();
    return data.session?.access_token ?? null;
  }
}
