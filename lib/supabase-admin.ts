
import jwt from 'jsonwebtoken';

const SUPABASE_JWT_SECRET = process.env.SUPABASE_JWT_SECRET;

if (!SUPABASE_JWT_SECRET) {
  throw new Error('SUPABASE_JWT_SECRET is not defined');
}

export function signSupabaseToken(user: { id: number; email: string; role?: string }) {
  // Payload must align with what Supabase expects and what our RLS policies check
  const payload = {
    aud: 'authenticated', // Required for Supabase Auth to treat as logged in
    role: 'authenticated', // Required for RLS 'authenticated' role
    sub: user.id.toString(), // Standard Subject claim
    app_user_id: user.id, // Custom claim for our integer-based IDs
    email: user.email,
    app_role: user.role || 'user'
  };

  return jwt.sign(payload, SUPABASE_JWT_SECRET!, {
    expiresIn: '1h', // Short lived for security
  });
}
