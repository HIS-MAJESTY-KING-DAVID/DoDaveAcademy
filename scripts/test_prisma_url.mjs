// Simulate what lib/prisma.ts does
const decodeIfPossible = (value) => {
  try { return decodeURIComponent(value); } catch { return value; }
};

const normalizeDatabaseUrl = (value) => {
  if (!value) return value;
  const trimmed = value.trim().replace(/^['"]|['"]$/g, '');
  try {
    new URL(trimmed);
    return trimmed;
  } catch {
    const schemeIndex = trimmed.indexOf('://');
    const atIndex = trimmed.lastIndexOf('@');
    if (schemeIndex === -1 || atIndex === -1) return trimmed;
    const scheme = trimmed.slice(0, schemeIndex);
    const credentials = trimmed.slice(schemeIndex + 3, atIndex);
    const colonIndex = credentials.indexOf(':');
    if (colonIndex === -1) return trimmed;
    const user = credentials.slice(0, colonIndex);
    const password = credentials.slice(colonIndex + 1);
    const hostAndPath = trimmed.slice(atIndex + 1);
    const normalizedPassword = encodeURIComponent(decodeIfPossible(password));
    const rebuilt = `${scheme}://${user}:${normalizedPassword}@${hostAndPath}`;
    try { new URL(rebuilt); return rebuilt; } catch { return trimmed; }
  }
};

// Also load .env to see what the env vars look like
import { readFileSync } from 'fs';

const envContent = readFileSync('.env', 'utf-8');
const envLocalContent = readFileSync('.env.local', 'utf-8');

console.log('=== .env DATABASE_URL ===');
console.log('  raw:', envContent.split('\n').find(l => l.startsWith('DATABASE_URL=')));
console.log('=== .env DATABASE_URL_IPV4 ===');
console.log('  raw:', envContent.split('\n').find(l => l.startsWith('DATABASE_URL_IPV4=')));
console.log('=== .env.local DATABASE_URL ===');
console.log('  raw:', envLocalContent.split('\n').find(l => l.startsWith('DATABASE_URL=')));

// Now test what normalizeDatabaseUrl produces
const testUrl = 'postgresql://postgres.qpxjcuvlyvaopexqdthb:Q7%21vZ9%23P2x%40L%5EDkM%24S4F8eH@aws-1-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1';
console.log('\n=== normalizeDatabaseUrl test ===');
console.log('  input:', testUrl);
console.log('  output:', normalizeDatabaseUrl(testUrl));
console.log('  URL valid:', (() => { try { new URL(normalizeDatabaseUrl(testUrl)); return true; } catch { return false; } })());
