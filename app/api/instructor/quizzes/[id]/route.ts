import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { handleApiError } from '@/lib/exceptions';

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const instructor = await prisma.instructor.findUnique({
      where: { userId: session.userId },
    });
    if (!instructor) {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    const { id } = await params;
    const quizId = parseInt(id);
    if (isNaN(quizId)) {
      return NextResponse.json({ message: 'Invalid quiz ID' }, { status: 400 });
    }

    const quiz = await prisma.quiz.findUnique({
      where: { id: quizId },
      include: { course: true },
    });

    if (!quiz || quiz.course?.instructorId !== instructor.id) {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    const { question, propositions, correctPropositions } = await req.json();

    // Delete existing propositions and recreate
    await prisma.proposition.deleteMany({ where: { quizId } });

    const prop1 = propositions?.[0]?.content || '';
    const prop2 = propositions?.[1]?.content || '';
    const prop3 = propositions?.[2]?.content || '';
    const prop4 = propositions?.[3]?.content || '';

    const updated = await prisma.quiz.update({
      where: { id: quizId },
      data: {
        ...(question !== undefined && { question }),
        proposition1: prop1,
        proposition2: prop2,
        proposition3: prop3,
        proposition4: prop4,
        correctPropositions: correctPropositions || propositions?.find((p: { isTrue: boolean }) => p.isTrue)?.content || '',
        propositions: {
          create: (propositions || []).map((p: { content: string; isTrue: boolean }) => ({
            content: p.content,
            isTrue: p.isTrue,
          })),
        },
      },
      include: { propositions: true },
    });

    return NextResponse.json({ data: updated });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const instructor = await prisma.instructor.findUnique({
      where: { userId: session.userId },
    });
    if (!instructor) {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    const { id } = await params;
    const quizId = parseInt(id);
    if (isNaN(quizId)) {
      return NextResponse.json({ message: 'Invalid quiz ID' }, { status: 400 });
    }

    const quiz = await prisma.quiz.findUnique({
      where: { id: quizId },
      include: { course: true },
    });

    if (!quiz || quiz.course?.instructorId !== instructor.id) {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    await prisma.quiz.delete({ where: { id: quizId } });
    return NextResponse.json({ message: 'Quiz deleted' });
  } catch (error) {
    return handleApiError(error);
  }
}
