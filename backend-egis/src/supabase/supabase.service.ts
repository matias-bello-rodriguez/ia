import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService implements OnModuleInit {
  private client!: SupabaseClient;

  constructor(private readonly config: ConfigService) {}

  onModuleInit(): void {
    const url = this.config.getOrThrow<string>('SUPABASE_URL');
    const serviceKey = this.config.getOrThrow<string>('SUPABASE_SERVICE_ROLE_KEY');

    this.client = createClient(url, serviceKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });
  }

  /**
   * Acceso al cliente con SERVICE_ROLE_KEY.
   * ⚠️  Este cliente se salta RLS — los servicios de negocio DEBEN
   * filtrar por usuario_id o empresa_id antes de devolver datos.
   */
  getClient(): SupabaseClient {
    return this.client;
  }
}
