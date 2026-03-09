/**
 * Singleton del cliente Supabase para Angular.
 * Importar desde aquí en toda la app.
 *
 * Se almacena en globalThis para sobrevivir al Hot Module Replacement
 * de Angular y evitar el error "Acquiring an exclusive Navigator
 * LockManager lock … immediately failed" causado por múltiples
 * llamadas a createClient().
 */
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';

const GLOBAL_KEY = '__supabase_client__';

export function getSupabaseClient(): SupabaseClient {
  const existing = (globalThis as Record<string, unknown>)[GLOBAL_KEY] as SupabaseClient | undefined;
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
}
