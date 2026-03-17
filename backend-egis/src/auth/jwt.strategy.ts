import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptionsWithoutRequest } from 'passport-jwt';

/**
 * Payload que Supabase Auth codifica en el JWT.
 */
export interface JwtPayload {
  /** UUID del usuario (auth.users.id) */
  sub: string;
  email?: string;
  role?: string;
  aud?: string;
  iat?: number;
  exp?: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'supabase-jwt') {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor(config: ConfigService) {
    const secret = config.getOrThrow<string>('SUPABASE_JWT_SECRET');

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // El JWT secret de Supabase se usa como string plano (HS256)
      secretOrKey: secret,
      algorithms: ['HS256'],
    } satisfies StrategyOptionsWithoutRequest);

    // Log de diagnóstico (no muestra el secreto, solo su longitud)
    this.logger.log(
      `JWT Strategy inicializada — secret length: ${secret.length} chars`,
    );
  }

  /**
   * Passport llama a este método tras validar la firma del JWT.
   * Lo que retorna se adjunta a `req.user`.
   */
  validate(payload: JwtPayload): JwtPayload {
    this.logger.debug(`JWT validado para usuario: ${payload.sub}`);
    return payload;
  }
}
