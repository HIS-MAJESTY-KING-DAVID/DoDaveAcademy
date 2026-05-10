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

    const instructor = await prisma.instructor.findUnique({
      where: { userId: session.userId },
    });
    if (!instructor) {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    const { chapterId, courseId, question, propositions, correctPropositions } = await req.json();

    const course = await prisma.course.findUnique({ where: { id: courseId } });
    if (!course || course.instructorId !== instructor.id) {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    const reference = `QZ-${Date.now()}`;

    // Legacy fields for backward compatibility
    const prop1 = propositions?.[0]?.content || '';
    const prop2 = propositions?.[1]?.content || '';
    const prop3 = propositions?.[2]?.content || '';
    const prop4 = propositions?.[3]?.content || '';

    const quiz = await prisma.quiz.create({
      data: {
        chapterId,
        courseId,
        question,
        reference,
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

    return NextResponse.json({ data: quiz }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
