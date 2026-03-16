import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service.js';

/** Roles que pertenecen a EGIS */
const ROLES_EGIS = ['egis', 'hito_egis'] as const;
/** Roles que pertenecen a Constructora */
const ROLES_CONSTRUCTORA = ['dueño_constructora', 'constructora'] as const;

@Injectable()
export class ProyectosService {
  private readonly logger = new Logger(ProyectosService.name);

  constructor(private readonly supabase: SupabaseService) {}

  /**
   * Obtiene los proyectos filtrados por empresa según el rol del usuario.
   *
   * 1. Busca al usuario en la tabla `usuarios` por su `authUserId` (JWT sub).
   * 2. Determina su `empresa_id` y `rol`.
   * 3. Filtra proyectos:
   *    - Roles EGIS       → `egis_id = empresa_id`
   *    - Roles Constructora → `constructora_id = empresa_id`
   *    - Otros             → todos los proyectos (sin filtro extra)
   */
  async obtenerProyectosPorUsuario(authUserId: string): Promise<unknown[]> {
    const client = this.supabase.getClient();

    // ── 1. Obtener perfil del usuario ───────────────────────
    const { data: usuario, error: errUsr } = await client
      .from('usuarios')
      .select('empresa_id, rol')
      .eq('id', authUserId)
      .single();

    if (errUsr || !usuario) {
      this.logger.warn(`Usuario no encontrado: ${authUserId}`);
      throw new NotFoundException(
        `No se encontró el perfil del usuario con id=${authUserId}`,
      );
    }

    const { empresa_id, rol } = usuario as { empresa_id: string; rol: string };

    // ── 2. Construir query de proyectos ─────────────────────
    let query = client
      .from('proyectos')
      .select(
        '*, beneficiario:beneficiarios(*), egis:empresas!egis_id(*), constructora:empresas!constructora_id(*)',
      )
      .order('fecha_creacion', { ascending: false });

    if ((ROLES_EGIS as readonly string[]).includes(rol)) {
      query = query.eq('egis_id', empresa_id);
    } else if ((ROLES_CONSTRUCTORA as readonly string[]).includes(rol)) {
      query = query.eq('constructora_id', empresa_id);
    }

    // ── 3. Ejecutar ─────────────────────────────────────────
    const { data, error } = await query;

    if (error) {
      this.logger.error('Error al obtener proyectos', error.message);
      throw error;
    }

    return data ?? [];
  }
}
