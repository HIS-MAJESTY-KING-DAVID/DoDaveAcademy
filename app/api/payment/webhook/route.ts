import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { reference, status, transactionId } = body;

    if (!reference) {
      return NextResponse.json({ message: 'Missing reference' }, { status: 400 });
    }

    const payment = await prisma.payment.findFirst({ where: { reference } });
    if (!payment) {
      return NextResponse.json({ message: 'Payment not found' }, { status: 404 });
    }

    if (status === 'SUCCESS') {
      await prisma.payment.update({
        where: { id: payment.id },
        data: {
          status: 'SUCCESS',
          transactionReference: transactionId || null,
        },
      });

      if (payment.courseId) {
        await prisma.studentCourse.upsert({
          where: {
            studentId_courseId: { studentId: payment.studentId, courseId: payment.courseId },
          },
          create: { studentId: payment.studentId, courseId: payment.courseId },
          update: {},
        });
      }

      if (payment.subscriptionId) {
        const sub = await prisma.subscription.findUnique({ where: { id: payment.subscriptionId } });
        const expiredAt = sub ? new Date(Date.now() + sub.duration * 86400000) : null;
        await prisma.student.update({
          where: { id: payment.studentId },
          data: { isPremium: true },
        });
        await prisma.payment.update({
          where: { id: payment.id },
          data: { expiredAt },
        });
      }
    } else {
      await prisma.payment.update({
        where: { id: payment.id },
        data: { status: status || 'FAILED' },
      });
    }

    return NextResponse.json({ received: true, reference, transactionId, status });
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
