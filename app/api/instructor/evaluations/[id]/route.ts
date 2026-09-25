import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { handleApiError } from '@/lib/exceptions';

async function getOwnedEvaluation(id: number) {
  const session = await getSession();
  if (!session) return { session: null, evaluation: null };

  const instructor = await prisma.instructor.findUnique({ where: { userId: session.userId }, select: { id: true } });
  if (!instructor) return { session, evaluation: null };

  const evaluation = await prisma.evaluation.findFirst({
    where: { id, instructorId: instructor.id },
    include: {
      category: true,
      evaluationQuestions: true,
      evaluationStudents: { include: { student: { include: { user: { include: { person: true } } } } } },
      evaluationClasses: { include: { class: true } },
      _count: { select: { evaluationResults: true } },
    },
  });
  return { session, evaluation };
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const result = await getOwnedEvaluation(Number(id));
    if (!result.session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    if (!result.evaluation) return NextResponse.json({ message: 'Evaluation not found' }, { status: 404 });
    return NextResponse.json({ evaluation: result.evaluation });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const evaluationId = Number(id);
    const result = await getOwnedEvaluation(evaluationId);
    if (!result.session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    if (!result.evaluation) return NextResponse.json({ message: 'Evaluation not found' }, { status: 404 });
    if (result.evaluation.isPassed) return NextResponse.json({ message: 'Passed evaluations are locked' }, { status: 409 });

    const body = await req.json();
    const data: Record<string, unknown> = {};
    if (typeof body.title === 'string' && body.title.trim()) data.title = body.title.trim();
    if (typeof body.description === 'string') data.description = body.description.trim();
    if (body.categoryId !== undefined) data.categoryId = Number(body.categoryId);
    if (body.duration !== undefined) data.duration = Number(body.duration);
    if (body.startAt !== undefined) data.startAt = body.startAt ? new Date(body.startAt) : null;
    if (body.endAt !== undefined) data.endAt = body.endAt ? new Date(body.endAt) : null;
    if (body.isPublished !== undefined) data.isPublished = Boolean(body.isPublished);
    if (body.isGeneratedRandomQuestions !== undefined) data.isGeneratedRandomQuestions = Boolean(body.isGeneratedRandomQuestions);

    const classIds = Array.isArray(body.classIds) ? body.classIds.map(Number).filter(Number.isInteger) : null;
    const studentIds = Array.isArray(body.studentIds) ? body.studentIds.map(Number).filter(Number.isInteger) : null;

    const updated = await prisma.$transaction(async (tx) => {
      if (classIds || studentIds) {
        const selectedClassIds = classIds || result.evaluation!.evaluationClasses.map((entry) => entry.classId);
        const selectedStudentIds = studentIds || result.evaluation!.evaluationStudents.map((entry) => entry.studentId);
        const classStudents = selectedClassIds.length
          ? await tx.student.findMany({ where: { classId: { in: selectedClassIds } }, select: { id: true } })
          : [];
        const assignedStudentIds = [...new Set([...selectedStudentIds, ...classStudents.map((student) => student.id)])];
        await tx.evaluationClass.deleteMany({ where: { evaluationId } });
        await tx.evaluationStudent.deleteMany({ where: { evaluationId } });
        if (selectedClassIds.length) await tx.evaluationClass.createMany({ data: selectedClassIds.map((classId: number) => ({ evaluationId, classId })), skipDuplicates: true });
        if (assignedStudentIds.length) await tx.evaluationStudent.createMany({ data: assignedStudentIds.map((studentId: number) => ({ evaluationId, studentId })), skipDuplicates: true });
      }

      return tx.evaluation.update({
        where: { id: evaluationId },
        data,
        include: { category: true, evaluationQuestions: true, evaluationStudents: true, evaluationClasses: true },
      });
    });
    return NextResponse.json({ evaluation: updated });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const evaluationId = Number(id);
    const result = await getOwnedEvaluation(evaluationId);
    if (!result.session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    if (!result.evaluation) return NextResponse.json({ message: 'Evaluation not found' }, { status: 404 });
    if (result.evaluation.isPassed || result.evaluation._count.evaluationResults > 0) {
      return NextResponse.json({ message: 'Evaluations with results are locked' }, { status: 409 });
    }

    await prisma.$transaction([
      prisma.evaluationQuestion.deleteMany({ where: { evaluationId } }),
      prisma.evaluationStudent.deleteMany({ where: { evaluationId } }),
      prisma.evaluationClass.deleteMany({ where: { evaluationId } }),
      prisma.evaluation.delete({ where: { id: evaluationId } }),
    ]);
    return NextResponse.json({ success: true });
  } catch (error) {
    return handleApiError(error);
  }
}
