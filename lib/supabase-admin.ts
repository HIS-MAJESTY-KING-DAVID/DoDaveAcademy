import jwt from 'jsonwebtoken';

function getSupabaseJwtSecret() {
  const secret = process.env.SUPABASE_JWT_SECRET;
  if (!secret) {
    throw new Error('SUPABASE_JWT_SECRET is not defined');
  }
  return secret;
}

export function signSupabaseToken(user: { id: number; email: string; role?: string }) {
  const payload = {
    aud: 'authenticated',
    role: 'authenticated',
    sub: user.id.toString(),
    app_user_id: user.id,
    email: user.email,
    app_role: user.role || 'user',
  };

  return jwt.sign(payload, getSupabaseJwtSecret(), {
    expiresIn: '1h',
  });
}
