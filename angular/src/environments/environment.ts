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

  /** Supabase project URL */
  supabaseUrl: 'https://ibdpqqjywqsuwrnuruad.supabase.co',

  /** Supabase anon/public key — segura para el cliente (RLS protege los datos) */
  supabaseAnonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImliZHBxcWp5d3FzdXdybnVydWFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI0MDcyMTksImV4cCI6MjA4Nzk4MzIxOX0.I_SBYTwu5UjgUyPphNgcSOGp2Go0iRnPxd1NGYs_WgQ',

  /** Nombre del bucket de Storage para documentos */
  storageBucket: 'documentos',
};
