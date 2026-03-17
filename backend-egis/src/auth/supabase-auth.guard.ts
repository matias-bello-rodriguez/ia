import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service.js';

/**
 * Guard reutilizable: protege cualquier ruta con el JWT de Supabase.
 *
 * Uso:
 *   @UseGuards(SupabaseAuthGuard)
 *   @Get()
 *   miRuta(@Req() req) { req.user.sub; }
 */
@Injectable()
export class SupabaseAuthGuard implements CanActivate {
	private readonly logger = new Logger(SupabaseAuthGuard.name);

	constructor(private readonly supabaseService: SupabaseService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const req = context.switchToHttp().getRequest<{
			headers?: { authorization?: string };
			user?: { sub: string; email?: string; role?: string };
		}>();

		const authHeader = req.headers?.authorization ?? '';
		const token = authHeader.startsWith('Bearer ')
			? authHeader.slice('Bearer '.length).trim()
			: '';

		if (!token) {
			this.logger.warn('JWT rechazado. Motivo: Authorization Bearer ausente');
			throw new UnauthorizedException('Missing Bearer token');
		}

		const tokenClaims = this.decodeJwtClaims(token);
		this.logger.debug(
			`JWT recibido claims: sub=${tokenClaims?.sub ?? 'N/A'} role=${tokenClaims?.role ?? 'N/A'} aud=${tokenClaims?.aud ?? 'N/A'} ref=${tokenClaims?.ref ?? 'N/A'} iss=${tokenClaims?.iss ?? 'N/A'}`,
		);

		const client = this.supabaseService.getUserClient(token);
		const { data, error } = await client.auth.getUser(token);

		if (error || !data.user) {
			this.logger.warn(
				`JWT rechazado por Supabase Auth: ${error?.message ?? 'usuario no encontrado'} | sub=${tokenClaims?.sub ?? 'N/A'} role=${tokenClaims?.role ?? 'N/A'} aud=${tokenClaims?.aud ?? 'N/A'} ref=${tokenClaims?.ref ?? 'N/A'}`,
			);
			throw new UnauthorizedException(error?.message ?? 'Invalid token');
		}

		req.user = {
			sub: data.user.id,
			email: data.user.email,
			role: data.user.role,
		};

		return true;
	}

	private decodeJwtClaims(token: string): {
		sub?: string;
		role?: string;
		aud?: string;
		ref?: string;
		iss?: string;
	} | null {
		try {
			const payload = token.split('.')[1];
			if (!payload) return null;

			const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
			const normalized = base64.padEnd(Math.ceil(base64.length / 4) * 4, '=');
			const decoded = Buffer.from(normalized, 'base64').toString('utf8');
			return JSON.parse(decoded) as {
				sub?: string;
				role?: string;
				aud?: string;
				ref?: string;
				iss?: string;
			};
		} catch {
			return null;
		}
	}
}
