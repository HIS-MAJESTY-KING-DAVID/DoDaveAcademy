import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { distributeNetworkRewards } from '@/lib/services/network';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { reference, status, transactionId } = body as {
      reference?: string;
      status?: string;
      transactionId?: string;
    };

    if (!reference) {
      return NextResponse.json({ message: 'Missing reference' }, { status: 400 });
    }

    const payment = await prisma.payment.findFirst({
      where: { reference },
      include: { subscription: true, student: true },
    });
    if (!payment) {
      return NextResponse.json({ message: 'Payment not found' }, { status: 404 });
    }

    if (payment.status === 'SUCCESS') {
      return NextResponse.json({ received: true, reference, status: 'SUCCESS', duplicate: true });
    }

    const normalizedStatus = status?.toUpperCase() === 'SUCCESS' ? 'SUCCESS' : status?.toUpperCase() || 'FAILED';
    if (normalizedStatus !== 'SUCCESS') {
      await prisma.payment.update({
        where: { id: payment.id },
        data: {
          status: normalizedStatus,
          ...(transactionId ? { transactionReference: transactionId } : {}),
        },
      });
      return NextResponse.json({ received: true, reference, transactionId, status: normalizedStatus });
    }

    await prisma.$transaction(async (tx) => {
      await tx.payment.update({
        where: { id: payment.id },
        data: {
          status: 'SUCCESS',
          transactionReference: transactionId || null,
          paidAt: new Date(),
        },
      });

      if (payment.courseId) {
        await tx.studentCourse.upsert({
          where: {
            studentId_courseId: { studentId: payment.studentId, courseId: payment.courseId },
          },
          create: { studentId: payment.studentId, courseId: payment.courseId },
          update: {},
        });
      }

      if (payment.subscriptionId && payment.subscription) {
        const expiredAt = new Date(Date.now() + payment.subscription.duration * 86400000);
        await tx.student.update({
          where: { id: payment.studentId },
          data: { isPremium: true },
        });
        await tx.payment.update({
          where: { id: payment.id },
          data: { expiredAt },
        });
      }
    });

    if (payment.subscriptionId && payment.student?.userId) {
      await distributeNetworkRewards(
        payment.student.userId,
        payment.subscription?.pointsCount || (await prisma.networkConfig.findFirst({ orderBy: { id: 'asc' } }))?.pointsPerInvitation || 0,
      );
    }

    return NextResponse.json({ received: true, reference, transactionId, status: 'SUCCESS' });
  } catch {
    return NextResponse.json({ message: 'Invalid callback payload' }, { status: 400 });
  }
}

export async function GET(req: NextRequest) {
  const reference = req.nextUrl.searchParams.get('reference');
  if (!reference) {
    return NextResponse.json({ message: 'Missing reference' }, { status: 400 });
  }

  const payment = await prisma.payment.findFirst({ where: { reference } });
  if (!payment) {
    return NextResponse.json({ reference, status: 'UNKNOWN' });
  }

  return NextResponse.json({ reference, status: payment.status, amount: payment.amount });
}
