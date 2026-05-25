import { NextResponse } from 'next/server';
import { sign, verify } from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';
import { handleApiError } from '@/lib/exceptions';
import { rateLimit, rateLimitResponse, getClientIp } from '@/lib/rate-limit';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const REFRESH_SECRET = process.env.REFRESH_SECRET || 'your-refresh-secret-key';

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
    const rl = rateLimit(`refresh:${ip}`, { max: 10, windowMs: 15 * 60 * 1000 });
    if (!rl.success) return rateLimitResponse(rl.headers);

    const { refreshToken } = await req.json();

    if (!refreshToken) {
      return NextResponse.json(
        { message: 'Refresh token is required' },
        { status: 400 }
      );
    }

    const stored = await prisma.refreshToken.findUnique({
      where: { refreshToken },
    });

    if (!stored) {
      return NextResponse.json(
        { message: 'Invalid refresh token' },
        { status: 401 }
      );
    }

    if (new Date() > stored.valid) {
      await prisma.refreshToken.delete({ where: { id: stored.id } });
      return NextResponse.json(
        { message: 'Refresh token expired' },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: stored.username },
    });

    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    const newToken = sign(
      { userId: user.id, email: user.email, roles: user.roles },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    await prisma.refreshToken.delete({ where: { id: stored.id } });

    const newRefreshToken = generateRefreshToken();
    const validUntil = new Date();
    validUntil.setDate(validUntil.getDate() + 7);

    await prisma.refreshToken.create({
      data: {
        refreshToken: newRefreshToken,
        username: user.email,
        valid: validUntil,
      },
    });

    const response = NextResponse.json(
      {
        message: 'Token refreshed',
        token: newToken,
        refreshToken: newRefreshToken,
      },
      { status: 200 }
    );

    response.cookies.set('token', newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600,
      path: '/',
    });

    return response;
  } catch (error) {
    return handleApiError(error);
  }
}
