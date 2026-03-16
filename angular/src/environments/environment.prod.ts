export const environment = {
  production: true,

  /** URL base de la API NestJS (en producción ajustar al dominio real) */
  apiUrl: '/api',

  /** Supabase project URL */
  supabaseUrl: 'https://ibdpqqjywqsuwrnuruad.supabase.co',

  /** Supabase anon/public key — segura para el cliente (RLS protege los datos) */
  supabaseAnonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImliZHBxcWp5d3FzdXdybnVydWFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI0MDcyMTksImV4cCI6MjA4Nzk4MzIxOX0.I_SBYTwu5UjgUyPphNgcSOGp2Go0iRnPxd1NGYs_WgQ',
  /** OpenAI URL — en producción debería apuntar a una Edge Function o backend proxy */
  openaiUrl: 'https://api.openai.com/v1/chat/completions',
  openaiApiKey: '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',
  /** Nombre del bucket de Storage para documentos */
  storageBucket: 'documentos_proyectos',
};

