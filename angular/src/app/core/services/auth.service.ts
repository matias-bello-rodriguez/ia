import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';

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
  /** Stream reactivo del usuario autenticado (null = no logueado) */
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  /** Indica que la verificación inicial de sesión terminó */
  private readySubject = new BehaviorSubject<boolean>(false);
  ready$ = this.readySubject.asObservable();

  constructor(private router: Router) {
    // En modo desarrollo sin backend de auth, marcamos como listo inmediato.
    this.readySubject.next(true);
  }

  // ── Getters sincrónicos ───────────────────────────────────
  getUser(): User | null {
    return this.userSubject.value;
  }

  getToken(): string | null {
    // Sin backend de auth: no usamos token.
    return null;
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
    // Modo desarrollo: aceptar cualquier correo/contraseña.
    const savedRole = this.getRole() ?? 'egis';
    const user: User = {
      id: `local-${Date.now()}`,
      email,
      nombre: email.split('@')[0] || email,
      role: savedRole,
    };
    this.userSubject.next(user);
    return of(user);
  }

  // ── Registro ──────────────────────────────────────────────
  register(email: string, password: string, nombre?: string): Observable<User> {
    // Modo desarrollo: simular registro y login inmediato.
    const savedRole = this.getRole() ?? 'egis';
    const user: User = {
      id: `local-${Date.now()}`,
      email,
      nombre: (nombre ?? email.split('@')[0]) || email,
      role: savedRole,
    };
    this.userSubject.next(user);
    return of(user);
  }

  // ── Logout ────────────────────────────────────────────────
  async logout(): Promise<void> {
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
