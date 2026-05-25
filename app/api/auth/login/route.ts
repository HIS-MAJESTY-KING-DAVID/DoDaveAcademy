import { NextResponse } from 'next/server';
import { compare } from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { sign } from 'jsonwebtoken';
import { userAuthSchema } from '@/lib/validations/auth';
import { handleApiError } from '@/lib/exceptions';
import { rateLimit, rateLimitResponse, getClientIp } from '@/lib/rate-limit';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

function generateRefreshToken(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  for (let i = 0; i < 64; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
}

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);
    const rl = rateLimit(`login:${ip}`, { max: 5, windowMs: 15 * 60 * 1000 });
    if (!rl.success) return rateLimitResponse(rl.headers);

    const body = await req.json();
    const { email, password } = userAuthSchema.parse(body);

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const isValid = await compare(password, user.password);

    if (!isValid) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Generate JWT (1h expiry)
    const token = sign(
      { userId: user.id, email: user.email, roles: user.roles },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Generate refresh token (7d expiry)
    const refreshToken = generateRefreshToken();
    const validUntil = new Date();
    validUntil.setDate(validUntil.getDate() + 7);

    await prisma.refreshToken.create({
      data: {
        refreshToken,
        username: user.email,
        valid: validUntil,
      },
    });

    const response = NextResponse.json(
      {
        message: 'Login successful',
        token,
        refreshToken,
        user: { id: user.id, email: user.email, roles: user.roles },
      },
      { status: 200 }
    );

    // Set HTTP-only JWT cookie
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600, // 1 hour
      path: '/',
    });

    // Set HTTP-only refresh token cookie
    response.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 604800, // 7 days
      path: '/',
    });

    return response;
  } catch (error: unknown) {
    return handleApiError(error);
  }
}
