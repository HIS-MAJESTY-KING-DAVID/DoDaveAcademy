import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { handleApiError } from '@/lib/exceptions';

async function getOwnedExam(reference: string) {
  const session = await getSession();
  if (!session) return { session: null, exam: null };
  const exam = await prisma.exam.findFirst({ where: { reference, userId: session.userId }, include: { category: true, class: true } });
  return { session, exam };
}

export async function GET(_req: Request, { params }: { params: Promise<{ reference: string }> }) {
  try {
    const { reference } = await params;
    const result = await getOwnedExam(reference);
    if (!result.session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    if (!result.exam) return NextResponse.json({ message: 'Exam not found' }, { status: 404 });
    return NextResponse.json({ exam: result.exam });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ reference: string }> }) {
  try {
    const { reference } = await params;
    const result = await getOwnedExam(reference);
    if (!result.session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    if (!result.exam) return NextResponse.json({ message: 'Exam not found' }, { status: 404 });
    const body = await req.json();
    const data: Record<string, unknown> = {};
    for (const field of ['title', 'subject', 'description', 'duration', 'language', 'correction', 'imageFile']) {
      if (body[field] !== undefined) data[field] = typeof body[field] === 'string' ? body[field].trim() : body[field];
    }
    if (body.categoryId !== undefined) data.categoryId = body.categoryId ? Number(body.categoryId) : null;
    if (body.classId !== undefined) data.classId = body.classId ? Number(body.classId) : null;
    const exam = await prisma.exam.update({ where: { id: result.exam.id }, data, include: { category: true, class: true } });
    return NextResponse.json({ exam });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(req: Request, { params }: { params: Promise<{ reference: string }> }) {
  try {
    const { reference } = await params;
    const result = await getOwnedExam(reference);
    if (!result.session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    if (!result.exam) return NextResponse.json({ message: 'Exam not found' }, { status: 404 });
    const body = await req.json().catch(() => ({}));
    if (!result.exam.isValidated) return NextResponse.json({ message: 'Exam must be validated by an administrator before publishing' }, { status: 409 });
    const exam = await prisma.exam.update({ where: { id: result.exam.id }, data: { isPublished: body.published === false ? false : true }, include: { category: true, class: true } });
    return NextResponse.json({ exam });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ reference: string }> }) {
  try {
    const { reference } = await params;
    const result = await getOwnedExam(reference);
    if (!result.session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    if (!result.exam) return NextResponse.json({ message: 'Exam not found' }, { status: 404 });
    await prisma.exam.delete({ where: { id: result.exam.id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return handleApiError(error);
  }
}
