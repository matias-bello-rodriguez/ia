import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy.js';
import { SupabaseAuthGuard } from './supabase-auth.guard.js';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'supabase-jwt' })],
  providers: [JwtStrategy, SupabaseAuthGuard],
  exports: [PassportModule, SupabaseAuthGuard],
})
export class AuthModule {}
