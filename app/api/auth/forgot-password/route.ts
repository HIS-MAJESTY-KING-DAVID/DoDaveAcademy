import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';
import { forgotPasswordSchema } from '@/lib/validations/auth';
import { handleApiError } from '@/lib/exceptions';
import { rateLimit, rateLimitResponse, getClientIp } from '@/lib/rate-limit';
import { sendEmail, emailTemplates } from '@/lib/email';

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);
    const rl = rateLimit(`forgot-password:${ip}`, { max: 3, windowMs: 15 * 60 * 1000 });
    if (!rl.success) return rateLimitResponse(rl.headers);

    const body = await req.json();
    const { email } = forgotPasswordSchema.parse(body);

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // Don't reveal if user exists or not for security
      return NextResponse.json(
        { message: 'If an account exists with this email, you will receive a password reset link.' },
        { status: 200 }
      );
    }

    // Generate reset token
    const token = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const expiresAt = new Date(Date.now() + 3600000); // 1 hour from now

    // Save token to database
    await prisma.resetPasswordRequest.create({
      data: {
        userId: user.id,
        selector: token.substring(0, 8), // Can be used for lookup if needed, but we use token in link
        hashedToken: hashedToken,
        requestedAt: new Date(),
        expiresAt: expiresAt,
      },
    });

    // Send email
    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/reset-password?token=${token}`;
    sendEmail({
      to: email,
      ...emailTemplates.resetPassword(resetLink),
    }).catch((err) => console.error('[RESET EMAIL FAILED]', err));

    return NextResponse.json(
      { message: 'If an account exists with this email, you will receive a password reset link.' },
      { status: 200 }
    );
  } catch (error) {
    return handleApiError(error);
  }
}
