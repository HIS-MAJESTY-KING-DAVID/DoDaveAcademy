import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { distributeNetworkRewards } from '@/lib/services/network';
import { isPaymentWebhookConfigured, verifyPaymentWebhookSignature } from '@/lib/services/payment';

const ALLOWED_FAILURE_STATUSES = new Set(['FAILED', 'CANCELLED', 'EXPIRED', 'PENDING']);

export async function POST(req: Request) {
  try {
    if (!isPaymentWebhookConfigured()) {
      console.error('[payment-webhook] PAYMENT_WEBHOOK_SECRET is not configured');
      return NextResponse.json({ message: 'Payment webhook is not configured' }, { status: 503 });
    }

    const rawBody = await req.text();
    const signature = req.headers.get('x-payment-signature')
      || req.headers.get('x-signature')
      || req.headers.get('x-webhook-signature');

    if (!verifyPaymentWebhookSignature(rawBody, signature)) {
      return NextResponse.json({ message: 'Invalid webhook signature' }, { status: 401 });
    }

    const body = JSON.parse(rawBody) as {
      reference?: string;
      status?: string;
      transactionId?: string;
      amount?: number | string;
      currency?: string;
    };
    const { reference, status, transactionId } = body;

    if (!reference || reference.length > 120) {
      return NextResponse.json({ message: 'Missing or invalid reference' }, { status: 400 });
    }

    const payment = await prisma.payment.findFirst({
      where: { reference },
      include: { subscription: true, student: true, course: true },
    });
    if (!payment) {
      return NextResponse.json({ message: 'Payment not found' }, { status: 404 });
    }

    if (payment.status === 'SUCCESS') {
      return NextResponse.json({ received: true, reference, status: 'SUCCESS', duplicate: true });
    }

    const normalizedStatus = status?.toUpperCase();
    if (!normalizedStatus || (!ALLOWED_FAILURE_STATUSES.has(normalizedStatus) && normalizedStatus !== 'SUCCESS')) {
      return NextResponse.json({ message: 'Unsupported payment status' }, { status: 400 });
    }

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

    const callbackAmount = body.amount === undefined ? null : Number(body.amount);
    if (callbackAmount !== null && (!Number.isFinite(callbackAmount) || payment.amount === null || callbackAmount !== payment.amount)) {
      return NextResponse.json({ message: 'Payment amount mismatch' }, { status: 400 });
    }
    if (body.currency !== undefined && body.currency.toUpperCase() !== 'XAF') {
      return NextResponse.json({ message: 'Unsupported payment currency' }, { status: 400 });
    }
    if (!transactionId || transactionId.length > 160) {
      return NextResponse.json({ message: 'Missing or invalid transaction ID' }, { status: 400 });
    }

    await prisma.$transaction(async (tx) => {
      await tx.payment.update({
        where: { id: payment.id },
        data: {
          status: 'SUCCESS',
          transactionReference: transactionId,
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
  } catch (error) {
    console.error('[payment-webhook] callback processing failed', error);
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
