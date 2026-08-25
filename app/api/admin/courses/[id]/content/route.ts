import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { handleApiError } from '@/lib/exceptions';

function slugify(value: string) {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

async function requireAdmin() {
  const session = await getSession();
  return session?.roles?.includes('ROLE_ADMIN') ? session : null;
}

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!(await requireAdmin())) return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    const courseId = Number.parseInt((await params).id, 10);
    if (!Number.isInteger(courseId) || courseId <= 0) return NextResponse.json({ message: 'Invalid course ID' }, { status: 400 });

    const course = await prisma.course.findUnique({ where: { id: courseId }, select: { id: true } });
    if (!course) return NextResponse.json({ message: 'Course not found' }, { status: 404 });

    const form = await req.formData();
    const title = String(form.get('title') || '').trim();
    const description = String(form.get('description') || '').trim();
    if (!title || title.length > 180) return NextResponse.json({ message: 'A chapter title is required' }, { status: 400 });

    const previous = await prisma.chapter.findFirst({ where: { courseId }, orderBy: { number: 'desc' }, select: { number: true } });
    const chapter = await prisma.chapter.create({
      data: {
        courseId,
        title,
        description: description.slice(0, 5000),
        slug: `${slugify(title) || 'chapter'}-${Date.now().toString(36)}`,
        number: (previous?.number ?? 0) + 1,
      },
    });
    return NextResponse.redirect(new URL(`/admin/courses/${courseId}/content?createdChapter=${chapter.id}`, req.url));
  } catch (error) {
    return handleApiError(error);
  }
}
