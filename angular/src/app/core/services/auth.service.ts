import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, from, of } from 'rxjs';
import { map, tap, catchError, switchMap } from 'rxjs/operators';
import { Session, User as SupaUser } from '@supabase/supabase-js';
import { getSupabaseClient } from './supabase-client';

// ── Tipos de perfil ─────────────────────────────────────────
export type UserRole = 'egis' | 'constructora';

export interface User {
  id: string;
  email: string;
  nombre?: string;
  /** Rol seleccionado por el usuario en la pantalla de inicio */
  role: UserRole;
}

export interface LoginRequest {
  email: string;
  password: string;
}

// ── Claves de storage ───────────────────────────────────────
const ROLE_KEY = 'egis_selected_role';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private supabase = getSupabaseClient();

  /** Stream reactivo del usuario autenticado (null = no logueado) */
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  /** Indica que la verificación inicial de sesión terminó */
  private readySubject = new BehaviorSubject<boolean>(false);
  ready$ = this.readySubject.asObservable();

  constructor(private router: Router) {
    this.initSession();
  }

  // ── Inicialización: restaurar sesión tras refresh ──────────
  private async initSession(): Promise<void> {
    try {
      const { data } = await this.supabase.auth.getSession();
      if (data.session) {
        this.setUserFromSession(data.session);
      }
    } catch {
      // sin sesión: no-op
    } finally {
      this.readySubject.next(true);
    }

    // Escuchar cambios de sesión (refresh token, logout en otra tab)
    this.supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        this.setUserFromSession(session);
      } else {
        this.userSubject.next(null);
        localStorage.removeItem(ROLE_KEY);
      }
    });
  }

  private setUserFromSession(session: Session): void {
    const su = session.user;
    const savedRole = localStorage.getItem(ROLE_KEY) as UserRole | null;
    const user: User = {
      id: su.id,
      email: su.email ?? '',
      nombre: su.user_metadata?.['nombre'] ?? su.email?.split('@')[0] ?? '',
      role: savedRole ?? 'egis',
    };
    this.userSubject.next(user);
  }

  // ── Getters sincrónicos ───────────────────────────────────
  getUser(): User | null {
    return this.userSubject.value;
  }

  getToken(): string | null {
    // se obtiene asíncronamente; para el interceptor usar getSessionToken()
    return null;
  }

  async getSessionToken(): Promise<string | null> {
    const { data } = await this.supabase.auth.getSession();
    return data.session?.access_token ?? null;
  }

  isLoggedIn(): boolean {
    return !!this.userSubject.value;
  }

  getRole(): UserRole | null {
    return this.userSubject.value?.role ?? (localStorage.getItem(ROLE_KEY) as UserRole | null);
  }

  // ── Seleccionar rol (paso 1 del flujo) ─────────────────────
  selectRole(role: UserRole): void {
    localStorage.setItem(ROLE_KEY, role);
    // si ya hay sesión activa, actualizar el usuario
    const current = this.userSubject.value;
    if (current) {
      this.userSubject.next({ ...current, role });
    }
  }

  // ── Login con Supabase (paso 2) ───────────────────────────
  login(email: string, password: string): Observable<User> {
    return from(
      this.supabase.auth.signInWithPassword({ email, password })
    ).pipe(
      map((res) => {
        if (res.error) throw res.error;
        const session = res.data.session;
        if (!session) throw new Error('No se obtuvo sesión.');
        this.setUserFromSession(session);
        return this.userSubject.value!;
      })
    );
  }

  // ── Registro ──────────────────────────────────────────────
  register(email: string, password: string, nombre?: string): Observable<User> {
    return from(
      this.supabase.auth.signUp({
        email,
        password,
        options: { data: { nombre: nombre ?? email.split('@')[0] } },
      })
    ).pipe(
      map((res) => {
        if (res.error) throw res.error;
        const session = res.data.session;
        if (!session) throw new Error('Revise su correo para confirmar la cuenta.');
        this.setUserFromSession(session);
        return this.userSubject.value!;
      })
    );
  }

  // ── Logout ────────────────────────────────────────────────
  async logout(): Promise<void> {
    await this.supabase.auth.signOut();
    this.userSubject.next(null);
    localStorage.removeItem(ROLE_KEY);
    this.router.navigate(['/']);
  }

  // ── Dashboard path según rol ──────────────────────────────
  getDashboardPath(): string {
    const role = this.getRole();
    return role === 'constructora' ? '/dashboard-constructora' : '/dashboard-egis';
  }
}
