import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { initCoursePayment, initSubscriptionPayment, generateReference } from '@/lib/services/payment';

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { type, amount, phone, customerName, customerEmail, itemLabel, courseId, subscriptionId } = body;

    if (!amount || !phone || !customerName || !customerEmail) {
      return NextResponse.json(
        { message: 'Missing required fields: amount, phone, customerName, customerEmail' },
        { status: 400 }
      );
    }

    const student = await prisma.student.findUnique({ where: { userId: session.userId } });
    if (!student) {
      return NextResponse.json({ message: 'Student profile not found' }, { status: 404 });
    }

    const paymentMethod = await prisma.paymentMethod.findFirst();
    if (!paymentMethod) {
      return NextResponse.json({ message: 'No payment method configured' }, { status: 500 });
    }

    const ref = generateReference();

    await prisma.payment.create({
      data: {
        studentId: student.id,
        paymentMethodId: paymentMethod.id,
        subscriptionId: type === 'subscription' && subscriptionId ? parseInt(subscriptionId, 10) : null,
        courseId: type === 'course' && courseId ? parseInt(courseId, 10) : null,
        reference: ref,
        amount,
        status: 'PENDING',
        paidAt: new Date(),
        isExpired: false,
      },
    });

    let result;
    if (type === 'course') {
      result = await initCoursePayment({ courseTitle: itemLabel || 'Course', amount, phone, customerName, customerEmail });
    } else if (type === 'subscription') {
      result = await initSubscriptionPayment({ planLabel: itemLabel || 'Subscription', amount, phone, customerName, customerEmail });
    } else {
      return NextResponse.json({ message: 'Invalid payment type. Use "course" or "subscription"' }, { status: 400 });
    }

    if (!result.success) {
      await prisma.payment.updateMany({
        where: { reference: ref },
        data: { status: 'FAILED' },
      });
      return NextResponse.json({ message: result.message || 'Payment initiation failed' }, { status: 502 });
    }

    return NextResponse.json({ transactionId: result.transactionId, reference: ref });
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
