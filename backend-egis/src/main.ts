import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ── Prefijo global: todas las rutas empiezan con /api ────
  app.setGlobalPrefix('api');

  // ── CORS: permitir peticiones desde Angular dev server ───
  app.enableCors({
    origin: process.env['CORS_ALLOWED_ORIGINS']?.split(',') ?? [
      'http://localhost:4200',
    ],
    credentials: true,
  });

  const port = process.env['PORT'] ?? 3000;
  await app.listen(port);
  console.log(`🚀 Backend EGIS escuchando en http://localhost:${port}/api`);
}
bootstrap();
