import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { processLock } from '@supabase/auth-js';
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
      // En desarrollo usamos processLock (in-process) para evitar el error
      // "Acquiring an exclusive Navigator LockManager lock" causado por HMR.
      // En producción dejamos undefined → Supabase usa navigatorLock (multi-tab sync).
      ...(environment.production ? {} : { lock: processLock }),
    },
  });

  (globalThis as Record<string, unknown>)[GLOBAL_KEY] = client;
  return client;
}
