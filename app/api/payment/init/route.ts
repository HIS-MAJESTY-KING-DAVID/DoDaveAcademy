import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { initCoursePayment, initSubscriptionPayment, generateReference } from '@/lib/services/payment';
import { handleApiError } from '@/lib/exceptions';

function parsePositiveInt(value: unknown): number | null {
  const parsed = typeof value === 'number' ? value : Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
}

function isValidEmail(value: string) {
  return /^\S+@\S+\.\S+$/.test(value);
}

function normalizePhone(value: unknown): string {
  return typeof value === 'string' ? value.replace(/[\s()-]/g, '') : '';
}

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const type = body?.type;
    const phone = normalizePhone(body?.phone);
    const customerName = typeof body?.customerName === 'string' ? body.customerName.trim() : '';
    const customerEmail = typeof body?.customerEmail === 'string' ? body.customerEmail.trim().toLowerCase() : '';

    if (type !== 'course' && type !== 'subscription') {
      return NextResponse.json({ message: 'Invalid payment type. Use "course" or "subscription"' }, { status: 400 });
    }
    if (!phone || !customerName || !customerEmail) {
      return NextResponse.json(
        { message: 'Missing required fields: phone, customerName, customerEmail' },
        { status: 400 },
      );
    }
    if (customerName.length > 120 || !isValidEmail(customerEmail) || !/^\+?[0-9]{8,15}$/.test(phone)) {
      return NextResponse.json({ message: 'Invalid customer or phone details' }, { status: 400 });
    }

    const student = await prisma.student.findUnique({ where: { userId: session.userId } });
    if (!student) {
      return NextResponse.json({ message: 'Student profile not found' }, { status: 404 });
    }

    const paymentMethod = await prisma.paymentMethod.findFirst();
    if (!paymentMethod) {
      return NextResponse.json({ message: 'No payment method configured' }, { status: 503 });
    }

    let amount: number;
    let itemLabel: string;
    let courseId: number | null = null;
    let subscriptionId: number | null = null;

    if (type === 'course') {
      courseId = parsePositiveInt(body?.courseId);
      if (!courseId) {
        return NextResponse.json({ message: 'A valid course is required' }, { status: 400 });
      }

      const course = await prisma.course.findUnique({
        where: { id: courseId },
        select: { id: true, title: true, isFree: true, subscriptionPrice: true },
      });
      if (!course) {
        return NextResponse.json({ message: 'Course not found' }, { status: 404 });
      }
      if (course.isFree) {
        return NextResponse.json({ message: 'Free courses must be enrolled through the enrollment page' }, { status: 400 });
      }
      if (course.subscriptionPrice === null || course.subscriptionPrice <= 0) {
        return NextResponse.json({ message: 'This course is not currently available for paid enrollment' }, { status: 409 });
      }

      const existingEnrollment = await prisma.studentCourse.findUnique({
        where: { studentId_courseId: { studentId: student.id, courseId: course.id } },
      });
      if (existingEnrollment) {
        return NextResponse.json({ message: 'Already enrolled' }, { status: 409 });
      }

      amount = course.subscriptionPrice;
      itemLabel = course.title;
    } else {
      subscriptionId = parsePositiveInt(body?.subscriptionId);
      if (!subscriptionId) {
        return NextResponse.json({ message: 'A valid subscription plan is required' }, { status: 400 });
      }

      const subscription = await prisma.subscription.findUnique({
        where: { id: subscriptionId },
        select: { id: true, label: true, amount: true },
      });
      if (!subscription) {
        return NextResponse.json({ message: 'Subscription plan not found' }, { status: 404 });
      }
      if (!Number.isFinite(subscription.amount) || subscription.amount <= 0) {
        return NextResponse.json({ message: 'This subscription plan is not currently available' }, { status: 409 });
      }

      amount = subscription.amount;
      itemLabel = subscription.label;
    }

    const ref = generateReference();
    await prisma.payment.create({
      data: {
        studentId: student.id,
        paymentMethodId: paymentMethod.id,
        subscriptionId,
        courseId,
        reference: ref,
        amount,
        status: 'PENDING',
        paidAt: new Date(),
        isExpired: false,
      },
    });

    const result = type === 'course'
      ? await initCoursePayment({ courseTitle: itemLabel, amount, phone, customerName, customerEmail, reference: ref })
      : await initSubscriptionPayment({ planLabel: itemLabel, amount, phone, customerName, customerEmail, reference: ref });

    if (!result.success) {
      await prisma.payment.updateMany({ where: { reference: ref }, data: { status: 'FAILED' } });
      return NextResponse.json({ message: result.message || 'Payment initiation failed' }, { status: 502 });
    }

    return NextResponse.json({ transactionId: result.transactionId, reference: ref });
  } catch (error: unknown) {
    return handleApiError(error);
  }
}
