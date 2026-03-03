/**
 * Configuración de entorno — desarrollo.
 *
 * IMPORTANTE: En producción, reemplazar las claves por variables de entorno
 * inyectadas en tiempo de build (fileReplacements en angular.json).
 *
 * Las claves de Supabase anon/public son seguras para el cliente:
 * la Row-Level Security (RLS) de Supabase protege los datos.
 */
export const environment = {
  production: false,

  /** URL base del backend Django */
  apiBaseUrl: 'http://localhost:8000/api',

  /** Supabase project URL (ej: https://<ref>.supabase.co) */
  supabaseUrl: 'https://YOUR_PROJECT_REF.supabase.co',

  /** Supabase anon/public key — segura para el cliente */
  supabaseAnonKey: 'YOUR_SUPABASE_ANON_KEY',
};
