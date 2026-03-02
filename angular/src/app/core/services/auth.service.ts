import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of, tap, catchError } from 'rxjs';
import { API_BASE_URL } from './api-config';

const TOKEN_KEY = 'egis_token';
const USER_KEY = 'egis_user';

export interface User {
  id: number;
  email: string;
  nombre?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  nombre?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  getToken(): string | null {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  getUser(): User | null {
    const raw = sessionStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  login(email: string, password: string): Observable<{ token: string; user: User }> {
    const url = `${API_BASE_URL}/auth/login/`;
    return this.http.post<{ token: string; user: User }>(url, { email, password }).pipe(
      tap((res) => {
        sessionStorage.setItem(TOKEN_KEY, res.token);
        sessionStorage.setItem(USER_KEY, JSON.stringify(res.user));
      }),
      catchError(() => this.loginLocal(email, password))
    );
  }

  /** Login local cuando el backend no tiene auth. */
  loginLocal(email: string, _password: string): Observable<{ token: string; user: User }> {
    const user: User = { id: 1, email, nombre: email.split('@')[0] };
    const token = 'local-' + Math.random().toString(36).slice(2);
    sessionStorage.setItem(TOKEN_KEY, token);
    sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    return of({ token, user });
  }

  register(payload: RegisterRequest): Observable<{ token: string; user: User }> {
    const url = `${API_BASE_URL}/auth/register/`;
    return this.http.post<{ token: string; user: User }>(url, payload).pipe(
      tap((res) => {
        sessionStorage.setItem(TOKEN_KEY, res.token);
        sessionStorage.setItem(USER_KEY, JSON.stringify(res.user));
      }),
      catchError(() => this.registerLocal(payload))
    );
  }

  /** Registro local cuando el backend no tiene auth. */
  registerLocal(payload: RegisterRequest): Observable<{ token: string; user: User }> {
    const user: User = {
      id: Date.now(),
      email: payload.email,
      nombre: payload.nombre ?? payload.email.split('@')[0],
    };
    const token = 'local-' + Math.random().toString(36).slice(2);
    sessionStorage.setItem(TOKEN_KEY, token);
    sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    return of({ token, user });
  }

  logout(): void {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(USER_KEY);
    this.router.navigate(['/login']);
  }
}
