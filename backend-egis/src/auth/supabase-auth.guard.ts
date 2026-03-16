import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Guard reutilizable: protege cualquier ruta con el JWT de Supabase.
 *
 * Uso:
 *   @UseGuards(SupabaseAuthGuard)
 *   @Get()
 *   miRuta(@Req() req) { req.user.sub; }
 */
@Injectable()
export class SupabaseAuthGuard extends AuthGuard('supabase-jwt') {}
