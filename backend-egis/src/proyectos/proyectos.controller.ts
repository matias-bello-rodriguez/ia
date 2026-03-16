import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { SupabaseAuthGuard } from '../auth/supabase-auth.guard.js';
import { ProyectosService } from './proyectos.service.js';
import type { JwtPayload } from '../auth/jwt.strategy.js';

@Controller('proyectos')
export class ProyectosController {
  constructor(private readonly proyectosService: ProyectosService) {}

  /**
   * GET /api/proyectos
   * Retorna los proyectos filtrados según el rol del usuario autenticado.
   */
  @UseGuards(SupabaseAuthGuard)
  @Get()
  async obtenerProyectos(@Req() req: { user: JwtPayload }) {
    return this.proyectosService.obtenerProyectosPorUsuario(req.user.sub);
  }
}
