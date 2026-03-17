export const environment = {
  production: false,

  /** Supabase project URL */
  supabaseUrl: 'https://ibdpqqjywqsuwrnuruad.supabase.co',

  /** Supabase anon/public key — segura para el cliente (RLS protege los datos) */
  supabaseAnonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImliZHBxcWp5d3FzdXdybnVydWFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI0MDcyMTksImV4cCI6MjA4Nzk4MzIxOX0.I_SBYTwu5UjgUyPphNgcSOGp2Go0iRnPxd1NGYs_WgQ',

  /** Nombre del bucket de Storage para documentos */
  storageBucket: 'documentos_proyectos',

  /** En desarrollo vacío; con proxy local /api va a Django. En prod poner URL del backend. */
  apiBaseUrl: '',
  /** OpenAI: en dev llamada directa (o proxy si usas backend local). */
  openaiUrl: 'https://api.openai.com/v1/chat/completions',
  openaiApiKey: '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',
};
