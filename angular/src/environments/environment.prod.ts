export const environment = {
  production: true,

  /** Supabase project URL */
  supabaseUrl: 'https://ibdpqqjywqsuwrnuruad.supabase.co',

  /** Supabase anon/public key — segura para el cliente (RLS protege los datos) */
  supabaseAnonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImliZHBxcWp5d3FzdXdybnVydWFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI0MDcyMTksImV4cCI6MjA4Nzk4MzIxOX0.I_SBYTwu5UjgUyPphNgcSOGp2Go0iRnPxd1NGYs_WgQ',

  /**
   * URL base del backend Django en producción.
   * Si está definida, el frontend usa el proxy de IA en el backend.
   * Ejemplo: 'https://egis-api.onrender.com'
   */
  apiBaseUrl: '' as string,

  openaiUrl: 'https://api.openai.com/v1/chat/completions',
  openaiApiKey: '' as string,

  /** Nombre del bucket de Storage para documentos */
  storageBucket: 'documentos_proyectos',
};
