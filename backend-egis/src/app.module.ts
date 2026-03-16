import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SupabaseModule } from './supabase/supabase.module.js';
import { AuthModule } from './auth/auth.module.js';
import { ProyectosModule } from './proyectos/proyectos.module.js';

@Module({
  imports: [
    // ── Variables de entorno (.env) ─────────────────────────
    ConfigModule.forRoot({ isGlobal: true }),

    // ── Infraestructura ─────────────────────────────────────
    SupabaseModule,
    AuthModule,

    // ── Módulos de negocio ──────────────────────────────────
    ProyectosModule,
  ],
})
export class AppModule {}
