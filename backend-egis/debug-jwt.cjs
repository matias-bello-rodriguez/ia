const jwt = require('jsonwebtoken');
require('dotenv').config();

const ANON_KEY = process.env['SUPABASE_ANON_KEY'];
const SECRET = process.env['SUPABASE_JWT_SECRET'];

console.log('SECRET length:', SECRET.length);

// Test 1: string
try {
  const d = jwt.verify(ANON_KEY, SECRET, { algorithms: ['HS256'] });
  console.log('STRING: OK -', JSON.stringify(d));
} catch (e) {
  console.log('STRING: FAIL -', e.message);
}

// Test 2: base64 buffer
try {
  const d = jwt.verify(ANON_KEY, Buffer.from(SECRET, 'base64'), { algorithms: ['HS256'] });
  console.log('BASE64: OK -', JSON.stringify(d));
} catch (e) {
  console.log('BASE64: FAIL -', e.message);
}
