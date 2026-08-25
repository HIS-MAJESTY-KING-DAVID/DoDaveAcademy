import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { handleApiError } from '@/lib/exceptions';

function slugify(value: string) {
  return value.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'evaluation';
}

async function requireAdmin() {
  const session = await getSession();
  return session?.roles?.includes('ROLE_ADMIN') ? session : null;
}

function ids(value: unknown) {
  return Array.isArray(value) ? [...new Set(value.map(Number).filter((item) => Number.isInteger(item) && item > 0))] : [];
}

function dates(body: Record<string, unknown>) {
  const startAt = body.startAt ? new Date(String(body.startAt)) : null;
  const endAt = body.endAt ? new Date(String(body.endAt)) : null;
  if ((startAt && Number.isNaN(startAt.getTime())) || (endAt && Number.isNaN(endAt.getTime())) || (startAt && endAt && startAt > endAt)) return null;
  return { startAt, endAt };
}

export async function GET() {
  try {
    const session = await requireAdmin();
    if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    const evaluations = await prisma.evaluation.findMany({ include: { category: true, instructor: { include: { user: { include: { person: true } } } }, _count: { select: { evaluationQuestions: true, evaluationStudents: true, evaluationResults: true } } }, orderBy: { id: 'desc' } });
    return NextResponse.json({ evaluations });
  } catch (error) { return handleApiError(error); }
}

export async function POST(req: Request) {
  try {
    const session = await requireAdmin();
    if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    const body = await req.json() as Record<string, unknown>;
    const title = typeof body.title === 'string' ? body.title.trim() : '';
    const description = typeof body.description === 'string' ? body.description.trim() : '';
    const categoryId = Number(body.categoryId);
    const duration = Number(body.duration);
    if (!title || title.length > 180 || !description || description.length > 10000 || !Number.isInteger(categoryId) || !Number.isInteger(duration) || duration <= 0 || duration > 1440) return NextResponse.json({ message: 'Title, description, category, and a valid duration are required' }, { status: 400 });
    const category = await prisma.category.findUnique({ where: { id: categoryId }, select: { id: true } });
    if (!category) return NextResponse.json({ message: 'Category not found' }, { status: 404 });
    const schedule = dates(body);
    if (!schedule) return NextResponse.json({ message: 'Invalid evaluation dates' }, { status: 400 });
    const classIds = ids(body.classIds);
    const studentIds = ids(body.studentIds);
    const instructorId = body.instructorId === undefined || body.instructorId === null || body.instructorId === '' ? null : Number(body.instructorId);
    if (instructorId !== null && (!Number.isInteger(instructorId) || instructorId <= 0)) return NextResponse.json({ message: 'Invalid instructor' }, { status: 400 });
    const classStudents = classIds.length ? await prisma.student.findMany({ where: { classId: { in: classIds } }, select: { id: true } }) : [];
    const assignedStudentIds = [...new Set([...studentIds, ...classStudents.map((student) => student.id)])];
    const evaluation = await prisma.evaluation.create({ data: { categoryId, title, description, duration, ...schedule, slug: `${slugify(title)}-${Date.now().toString(36)}`, instructorId, isPassed: false, isGeneratedRandomQuestions: Boolean(body.isGeneratedRandomQuestions), isPublished: Boolean(body.isPublished), evaluationClasses: classIds.length ? { create: classIds.map((classId) => ({ classId })) } : undefined, evaluationStudents: assignedStudentIds.length ? { create: assignedStudentIds.map((studentId) => ({ studentId })) } : undefined }, include: { category: true, evaluationClasses: true, evaluationStudents: true } });
    return NextResponse.json({ evaluation }, { status: 201 });
  } catch (error) { return handleApiError(error); }
}
