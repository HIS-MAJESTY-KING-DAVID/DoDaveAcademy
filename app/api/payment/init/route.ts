import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { initCoursePayment, initSubscriptionPayment } from '@/lib/services/payment';

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { type, amount, phone, customerName, customerEmail, itemLabel } = body;

    if (!amount || !phone || !customerName || !customerEmail) {
      return NextResponse.json(
        { message: 'Missing required fields: amount, phone, customerName, customerEmail' },
        { status: 400 }
      );
    }

    let result;
    if (type === 'course') {
      result = await initCoursePayment({ courseTitle: itemLabel || 'Course', amount, phone, customerName, customerEmail });
    } else if (type === 'subscription') {
      result = await initSubscriptionPayment({ planLabel: itemLabel || 'Subscription', amount, phone, customerName, customerEmail });
    } else {
      return NextResponse.json({ message: 'Invalid payment type. Use "course" or "subscription"' }, { status: 400 });
    }

    if (!result.success) {
      return NextResponse.json({ message: result.message || 'Payment initiation failed' }, { status: 502 });
    }

    return NextResponse.json({ transactionId: result.transactionId, reference: result.reference });
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
