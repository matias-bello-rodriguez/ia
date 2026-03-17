import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService implements OnModuleInit {
  private client!: SupabaseClient;
  private url!: string;
  private anonKey!: string;
  private readonly logger = new Logger(SupabaseService.name);

  constructor(private readonly config: ConfigService) {}

  onModuleInit(): void {
    this.url = this.config.getOrThrow<string>('SUPABASE_URL');
    this.anonKey = this.config.getOrThrow<string>('SUPABASE_ANON_KEY');
    const serviceKey = this.config.getOrThrow<string>('SUPABASE_SERVICE_ROLE_KEY');

    const isSecretKey = serviceKey.startsWith('sb_secret_');
    const role = this.decodeJwtRole(serviceKey);
    const isLegacyServiceRoleJwt = role === 'service_role';

    if (!isSecretKey && !isLegacyServiceRoleJwt) {
      throw new Error(
        `SUPABASE_SERVICE_ROLE_KEY invalida. Detectado role=${role ?? 'N/A'} y formato no sb_secret_.`,
      );
    }

    if (isSecretKey) {
      this.logger.log('Usando SUPABASE_SERVICE_ROLE_KEY en formato sb_secret_.');
    }

    this.client = createClient(this.url, serviceKey, {
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

  /**
   * Cliente asociado al usuario autenticado (RLS activo).
   * Usa anon key + Authorization Bearer <accessToken>.
   */
  getUserClient(accessToken: string): SupabaseClient {
    return createClient(this.url, this.anonKey, {
      auth: { autoRefreshToken: false, persistSession: false },
      global: {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    });
  }

  private decodeJwtRole(token: string): string | null {
    try {
      const payload = token.split('.')[1];
      if (!payload) return null;
      const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
      const normalized = base64.padEnd(Math.ceil(base64.length / 4) * 4, '=');
      const decoded = Buffer.from(normalized, 'base64').toString('utf8');
      const parsed = JSON.parse(decoded) as { role?: string };
      return parsed.role ?? null;
    } catch {
      return null;
    }
  }
}
