import { Injectable } from '@angular/core';
import { createClient, Session, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../environments/environment';

// ══════════════════════════════════════════════════════════════
// CLIENTE INICIALIZADO FUERA DE LA CLASE (evita LockManager)
// ══════════════════════════════════════════════════════════════
const GLOBAL_KEY = '__supabase_client__';

const supabase: SupabaseClient = (() => {
  const existing = (globalThis as Record<string, unknown>)[GLOBAL_KEY] as
    | SupabaseClient
    | undefined;
  if (existing) return existing;

  const client = createClient(environment.supabaseUrl, environment.supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storage: localStorage,
    },
  });

  (globalThis as Record<string, unknown>)[GLOBAL_KEY] = client;
  return client;
})();

// ══════════════════════════════════════════════════════════════
// SERVICIO
// ══════════════════════════════════════════════════════════════

@Injectable({ providedIn: 'root' })
export class SupabaseService {

  /**
   * Promesa que se resuelve cuando Supabase confirma el estado
   * de autenticación inicial (sesión restaurada o ausente).
   * El Guard espera esta promesa antes de tomar decisiones.
   */
  private _authReady: Promise<Session | null>;

  constructor() {
    this._authReady = new Promise<Session | null>((resolve) => {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (_event, session) => {
          resolve(session);
          subscription.unsubscribe();
        },
      );
    });
  }

  /** Espera a que Supabase confirme el estado de auth y devuelve la sesión */
  waitForSession(): Promise<Session | null> {
    return this._authReady;
  }

  /** Inicia sesión con correo y contraseña */
  async signIn(email: string, password: string): Promise<void> {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  }

  /** Retorna la sesión activa o null si no hay usuario logueado */
  async getSession() {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
  }

  /** Cierra la sesión activa */
  async signOut(): Promise<void> {
    await supabase.auth.signOut();
  }

  /** Acceso directo al cliente Supabase para otros servicios */
  get client(): SupabaseClient {
    return supabase;
  }
}
