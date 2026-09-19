import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { handleApiError } from '@/lib/exceptions';
import { generateReference, sendPayOut } from '@/lib/services/payment';
import { formatPhoneNumber, isValidPhoneNumber } from '@/lib/utils/phone';

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const amount = Number(body.amount);
    const paymentMethodId = Number(body.paymentMethodId);
    const phoneNumber = typeof body.phoneNumber === 'string' ? body.phoneNumber : '';

    if (!Number.isFinite(amount) || amount <= 0) {
      return NextResponse.json({ message: 'Invalid amount' }, { status: 400 });
    }
    if (!isValidPhoneNumber(phoneNumber)) {
      return NextResponse.json({ message: 'Enter a valid Cameroon mobile-money number' }, { status: 400 });
    }
    if (!Number.isInteger(paymentMethodId) || paymentMethodId <= 0) {
      return NextResponse.json({ message: 'Payment method required' }, { status: 400 });
    }

    const [user, networkConfig, paymentMethod] = await Promise.all([
      prisma.user.findUnique({
        where: { id: session.userId },
        include: { person: true },
      }),
      prisma.networkConfig.findFirst({ orderBy: { id: 'asc' } }),
      prisma.paymentMethod.findUnique({ where: { id: paymentMethodId } }),
    ]);

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    if ((user.cash ?? 0) < amount) {
      return NextResponse.json({ message: 'Insufficient balance' }, { status: 400 });
    }
    if (networkConfig && amount < networkConfig.minimumWithdrawable) {
      return NextResponse.json(
        { message: `Minimum withdrawal amount is ${networkConfig.minimumWithdrawable} CFA` },
        { status: 400 },
      );
    }
    if (!paymentMethod) {
      return NextResponse.json({ message: 'Invalid payment method' }, { status: 400 });
    }

    const reference = generateReference();
    const normalizedPhone = formatPhoneNumber(phoneNumber);
    const customerName = user.person
      ? `${user.person.firstName || ''} ${user.person.lastName}`.trim()
      : user.email;

    const withdrawal = await prisma.$transaction(async (tx) => {
      const currentUser = await tx.user.findUnique({ where: { id: session.userId } });
      if (!currentUser || (currentUser.cash ?? 0) < amount) {
        throw new Error('Insufficient balance');
      }

      const created = await tx.withdrawal.create({
        data: {
          userId: session.userId,
          paymentMethodId,
          amount,
          isDone: false,
          phoneNumber: normalizedPhone,
          createdAt: new Date(),
          status: 'processing',
          transactionReference: reference,
        },
      });

      await tx.user.update({
        where: { id: session.userId },
        data: { cash: { decrement: amount } },
      });

      return created;
    });

    const payout = await sendPayOut({
      amount,
      currency: 'XAF',
      reason: 'Retrait de fonds DoDave Academy',
      reference,
      phone: normalizedPhone,
      customerName,
    });

    if (!payout.success) {
      await prisma.$transaction([
        prisma.withdrawal.update({
          where: { id: withdrawal.id },
          data: { status: 'failed', isDone: false },
        }),
        prisma.user.update({
          where: { id: session.userId },
          data: { cash: { increment: amount } },
        }),
      ]);

      return NextResponse.json({ message: payout.message || 'Payout failed' }, { status: 502 });
    }

    await prisma.withdrawal.update({
      where: { id: withdrawal.id },
      data: {
        status: 'completed',
        isDone: true,
        transactionReference: payout.transactionId || reference,
      },
    });

    return NextResponse.json({
      message: 'Withdrawal request submitted and payout confirmed',
      reference: payout.transactionId || reference,
      withdrawalId: withdrawal.id,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
