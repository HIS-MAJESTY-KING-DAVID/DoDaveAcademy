import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';
import { hash } from 'bcryptjs';
import { resetPasswordSchema } from '@/lib/validations/auth';
import { handleApiError } from '@/lib/exceptions';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { token, password } = resetPasswordSchema.parse(body);

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    // Find valid request
    const request = await prisma.resetPasswordRequest.findFirst({
      where: {
        hashedToken: hashedToken,
        expiresAt: {
          gt: new Date(),
        },
      },
      include: {
        user: true,
      },
    });

    if (!request || !request.user) {
      return NextResponse.json(
        { message: 'Invalid or expired token' },
        { status: 400 }
      );
    }

    // Hash new password
    const hashedPassword = await hash(password, 12);

    // Update user password
    await prisma.user.update({
      where: { id: request.userId },
      data: { password: hashedPassword },
    });

    // Delete the used request (and potentially other requests for this user)
    await prisma.resetPasswordRequest.deleteMany({
      where: { userId: request.userId },
    });

    return NextResponse.json(
      { message: 'Password has been reset successfully' },
      { status: 200 }
    );
  } catch (error) {
    return handleApiError(error);
  }
}
