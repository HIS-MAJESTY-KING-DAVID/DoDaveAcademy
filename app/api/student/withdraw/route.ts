import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { handleApiError } from '@/lib/exceptions';

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { amount, phoneNumber, paymentMethodId } = body;

    if (!amount || amount <= 0) {
      return NextResponse.json({ message: 'Invalid amount' }, { status: 400 });
    }
    if (!phoneNumber) {
      return NextResponse.json({ message: 'Phone number required' }, { status: 400 });
    }
    if (!paymentMethodId) {
      return NextResponse.json({ message: 'Payment method required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.userId },
    });

    if (!user || (user.cash ?? 0) < amount) {
      return NextResponse.json({ message: 'Insufficient balance' }, { status: 400 });
    }

    const networkConfig = await prisma.networkConfig.findFirst();
    if (networkConfig && amount < networkConfig.minimumWithdrawable) {
      return NextResponse.json({
        message: `Minimum withdrawal amount is ${networkConfig.minimumWithdrawable} CFA`,
      }, { status: 400 });
    }

    const paymentMethod = await prisma.paymentMethod.findUnique({
      where: { id: parseInt(paymentMethodId, 10) },
    });
    if (!paymentMethod) {
      return NextResponse.json({ message: 'Invalid payment method' }, { status: 400 });
    }

    await prisma.withdrawal.create({
      data: {
        userId: session.userId,
        paymentMethodId: parseInt(paymentMethodId, 10),
        amount: parseFloat(amount),
        isDone: false,
        phoneNumber,
        createdAt: new Date(),
        status: 'pending',
      },
    });

    await prisma.user.update({
      where: { id: session.userId },
      data: { cash: { decrement: amount } },
    });

    return NextResponse.json({ message: 'Withdrawal request submitted' });
  } catch (error) {
    return handleApiError(error);
  }
}
