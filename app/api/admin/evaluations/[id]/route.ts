import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { handleApiError } from '@/lib/exceptions';

async function requireAdmin() {
  const session = await getSession();
  return session?.roles?.includes('ROLE_ADMIN') ? session : null;
}

function ids(value: unknown) {
  return Array.isArray(value) ? [...new Set(value.map(Number).filter((item) => Number.isInteger(item) && item > 0))] : null;
}

function parseDates(body: Record<string, unknown>) {
  const startAt = body.startAt ? new Date(String(body.startAt)) : body.startAt === null ? null : undefined;
  const endAt = body.endAt ? new Date(String(body.endAt)) : body.endAt === null ? null : undefined;
  if ((startAt && Number.isNaN(startAt.getTime())) || (endAt && Number.isNaN(endAt.getTime())) || (startAt && endAt && startAt > endAt)) return null;
  return { startAt, endAt };
}

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await requireAdmin();
    if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    const evaluation = await prisma.evaluation.findUnique({ where: { id: Number((await params).id) }, include: { category: true, instructor: { include: { user: { include: { person: true } } } }, evaluationQuestions: true, evaluationClasses: { include: { class: true } }, evaluationStudents: { include: { student: { include: { user: { include: { person: true } } } } } }, evaluationResults: { include: { student: { include: { user: { include: { person: true } } } } }, orderBy: { evaluatedAt: 'desc' } } } });
    if (!evaluation) return NextResponse.json({ message: 'Evaluation not found' }, { status: 404 });
    return NextResponse.json({ evaluation });
  } catch (error) { return handleApiError(error); }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await requireAdmin();
    if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    const evaluationId = Number((await params).id);
    const body = await req.json() as Record<string, unknown>;
    const existing = await prisma.evaluation.findUnique({ where: { id: evaluationId }, include: { evaluationClasses: true, evaluationStudents: true } });
    if (!existing) return NextResponse.json({ message: 'Evaluation not found' }, { status: 404 });
    const onlyLockChange = Object.keys(body).every((key) => key === 'isPassed');
    if (existing.isPassed && !onlyLockChange) return NextResponse.json({ message: 'Passed evaluations are locked' }, { status: 409 });

    const data: Record<string, unknown> = {};
    if (body.title !== undefined) { if (typeof body.title !== 'string' || !body.title.trim() || body.title.trim().length > 180) return NextResponse.json({ message: 'A valid title is required' }, { status: 400 }); data.title = body.title.trim(); }
    if (body.description !== undefined) { if (typeof body.description !== 'string' || !body.description.trim() || body.description.trim().length > 10000) return NextResponse.json({ message: 'A valid description is required' }, { status: 400 }); data.description = body.description.trim(); }
    if (body.categoryId !== undefined) { const categoryId = Number(body.categoryId); if (!Number.isInteger(categoryId) || categoryId <= 0 || !(await prisma.category.findUnique({ where: { id: categoryId }, select: { id: true } }))) return NextResponse.json({ message: 'Category not found' }, { status: 404 }); data.categoryId = categoryId; }
    if (body.duration !== undefined) { const duration = Number(body.duration); if (!Number.isInteger(duration) || duration <= 0 || duration > 1440) return NextResponse.json({ message: 'Duration must be between 1 and 1440 minutes' }, { status: 400 }); data.duration = duration; }
    if (body.isPublished !== undefined) data.isPublished = Boolean(body.isPublished);
    if (body.isPassed !== undefined) data.isPassed = Boolean(body.isPassed);
    if (body.isGeneratedRandomQuestions !== undefined) data.isGeneratedRandomQuestions = Boolean(body.isGeneratedRandomQuestions);
    if (body.startAt !== undefined || body.endAt !== undefined) { const schedule = parseDates(body); if (!schedule) return NextResponse.json({ message: 'Invalid evaluation dates' }, { status: 400 }); if (schedule.startAt !== undefined) data.startAt = schedule.startAt; if (schedule.endAt !== undefined) data.endAt = schedule.endAt; }

    const classIds = ids(body.classIds);
    const studentIds = ids(body.studentIds);
    const instructorId = body.instructorId === undefined ? undefined : body.instructorId === null || body.instructorId === '' ? null : Number(body.instructorId);
    if (instructorId !== undefined && instructorId !== null && (!Number.isInteger(instructorId) || instructorId <= 0 || !(await prisma.instructor.findUnique({ where: { id: instructorId }, select: { id: true } })))) return NextResponse.json({ message: 'Instructor not found' }, { status: 404 });
    if (instructorId !== undefined) data.instructorId = instructorId;

    const updated = await prisma.$transaction(async (tx) => {
      if (classIds || studentIds) {
        const selectedClassIds = classIds || existing.evaluationClasses.map((entry) => entry.classId);
        const selectedStudentIds = studentIds || existing.evaluationStudents.map((entry) => entry.studentId);
        if (selectedClassIds.length) { const validClasses = await tx.class.findMany({ where: { id: { in: selectedClassIds } }, select: { id: true } }); if (validClasses.length !== selectedClassIds.length) throw new Error('Invalid class assignment'); }
        if (selectedStudentIds.length) { const validStudents = await tx.student.findMany({ where: { id: { in: selectedStudentIds } }, select: { id: true } }); if (validStudents.length !== selectedStudentIds.length) throw new Error('Invalid student assignment'); }
        const classStudents = selectedClassIds.length ? await tx.student.findMany({ where: { classId: { in: selectedClassIds } }, select: { id: true } }) : [];
        const assignedStudentIds = [...new Set([...selectedStudentIds, ...classStudents.map((student) => student.id)])];
        await tx.evaluationClass.deleteMany({ where: { evaluationId } });
        await tx.evaluationStudent.deleteMany({ where: { evaluationId } });
        if (selectedClassIds.length) await tx.evaluationClass.createMany({ data: selectedClassIds.map((classId) => ({ evaluationId, classId })), skipDuplicates: true });
        if (assignedStudentIds.length) await tx.evaluationStudent.createMany({ data: assignedStudentIds.map((studentId) => ({ evaluationId, studentId })), skipDuplicates: true });
      }
      return tx.evaluation.update({ where: { id: evaluationId }, data, include: { category: true, evaluationQuestions: true, evaluationClasses: true, evaluationStudents: true } });
    });
    return NextResponse.json({ evaluation: updated });
  } catch (error) { return handleApiError(error); }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await requireAdmin();
    if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    const evaluationId = Number((await params).id);
    const evaluation = await prisma.evaluation.findUnique({ where: { id: evaluationId }, select: { id: true, isPassed: true, _count: { select: { evaluationResults: true } } } });
    if (!evaluation) return NextResponse.json({ message: 'Evaluation not found' }, { status: 404 });
    if (evaluation.isPassed || evaluation._count.evaluationResults > 0) return NextResponse.json({ message: 'Evaluations with results or a passed state are locked' }, { status: 409 });
    await prisma.$transaction([prisma.evaluationQuestion.deleteMany({ where: { evaluationId } }), prisma.evaluationStudent.deleteMany({ where: { evaluationId } }), prisma.evaluationClass.deleteMany({ where: { evaluationId } }), prisma.evaluation.delete({ where: { id: evaluationId } })]);
    return NextResponse.json({ success: true });
  } catch (error) { return handleApiError(error); }
}
