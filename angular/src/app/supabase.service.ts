import { Injectable } from '@angular/core';
import { createClient, Session, SupabaseClient } from '@supabase/supabase-js';
import { processLock } from '@supabase/auth-js';
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
      // En desarrollo usamos processLock (in-process) para evitar el error
      // "Acquiring an exclusive Navigator LockManager lock" causado por HMR.
      // En producción dejamos undefined → Supabase usa navigatorLock (multi-tab sync).
      ...(environment.production ? {} : { lock: processLock }),
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
   * Flag + promesa que garantizan que el Guard espere a que
   * Supabase termine de restaurar la sesión desde localStorage
   * antes de evaluar. Una vez inicializado, las llamadas
   * posteriores pasan directo a getSession() sin espera.
   */
  private _initialized = false;
  private _initPromise: Promise<void>;

  constructor() {
    this._initPromise = new Promise<void>((resolve) => {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        () => {
          this._initialized = true;
          resolve();
          // Defer unsubscribe para evitar referencia circular
          // síncrona con la variable `subscription`.
          setTimeout(() => subscription.unsubscribe());
        },
      );
    });
  }

  /**
   * Espera la inicialización de Supabase Auth y luego devuelve
   * la sesión **actual** (no un valor cacheado).
   */
  async getSessionWhenReady(): Promise<Session | null> {
    if (!this._initialized) {
      await this._initPromise;
    }
    const { data: { session } } = await supabase.auth.getSession();
    return session;
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
