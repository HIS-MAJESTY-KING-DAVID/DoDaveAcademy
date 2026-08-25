import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { handleApiError } from '@/lib/exceptions';

function slugify(value: string) {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export async function POST(req: Request, { params }: { params: Promise<{ id: string; chapterId: string }> }) {
  try {
    const session = await getSession();
    if (!session?.roles?.includes('ROLE_ADMIN')) return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    const routeParams = await params;
    const courseId = Number.parseInt(routeParams.id, 10);
    const chapterId = Number.parseInt(routeParams.chapterId, 10);
    if (!Number.isInteger(courseId) || !Number.isInteger(chapterId) || courseId <= 0 || chapterId <= 0) return NextResponse.json({ message: 'Invalid course or chapter ID' }, { status: 400 });

    const chapter = await prisma.chapter.findFirst({ where: { id: chapterId, courseId }, select: { id: true } });
    if (!chapter) return NextResponse.json({ message: 'Chapter not found' }, { status: 404 });

    const form = await req.formData();
    const title = String(form.get('title') || '').trim();
    const content = String(form.get('content') || '').trim();
    const videoLink = String(form.get('videoLink') || '').trim() || null;
    if (!title || title.length > 180 || !content) return NextResponse.json({ message: 'Lesson title and content are required' }, { status: 400 });

    const previous = await prisma.lesson.findFirst({ where: { chapterId }, orderBy: { number: 'desc' }, select: { number: true } });
    const lesson = await prisma.lesson.create({
      data: {
        chapterId,
        title,
        content: content.slice(0, 100000),
        videoLink,
        slug: `${slugify(title) || 'lesson'}-${Date.now().toString(36)}`,
        number: (previous?.number ?? 0) + 1,
      },
    });
    return NextResponse.redirect(new URL(`/admin/courses/${courseId}/content?createdLesson=${lesson.id}`, req.url));
  } catch (error) {
    return handleApiError(error);
  }
}
