/**
 * Script de diagnóstico — ejecutar con: node --loader ts-node/esm src/debug-jwt.ts
 * Verifica si el JWT secret puede validar un token de Supabase.
 */
import pkg from 'jsonwebtoken';
const { verify } = pkg;

// Load .env manually
import { config } from 'dotenv';
config();

const SUPABASE_ANON_KEY = process.env['SUPABASE_ANON_KEY']!;
const JWT_SECRET = process.env['SUPABASE_JWT_SECRET']!;

console.log('=== Diagnóstico JWT ===');
console.log('JWT_SECRET length:', JWT_SECRET.length);
console.log('JWT_SECRET (primeros 10):', JWT_SECRET.substring(0, 10) + '...');
console.log('ANON_KEY (primeros 20):', SUPABASE_ANON_KEY.substring(0, 20) + '...');

// Intento 1: secret como string plano
console.log('\n--- Intento 1: STRING plano ---');
try {
  const decoded = verify(SUPABASE_ANON_KEY, JWT_SECRET, { algorithms: ['HS256'] });
  console.log('✅ ÉXITO:', JSON.stringify(decoded));
} catch (err: any) {
  console.log('❌ FALLÓ:', err.message);
}

// Intento 2: secret como Buffer base64
console.log('\n--- Intento 2: Buffer.from(secret, "base64") ---');
try {
  const decoded = verify(SUPABASE_ANON_KEY, Buffer.from(JWT_SECRET, 'base64'), { algorithms: ['HS256'] });
  console.log('✅ ÉXITO:', JSON.stringify(decoded));
} catch (err: any) {
  console.log('❌ FALLÓ:', err.message);
}
