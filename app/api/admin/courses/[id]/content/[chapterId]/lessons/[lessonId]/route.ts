import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { handleApiError } from '@/lib/exceptions';

function slugify(value: string) {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export async function POST(req: Request, { params }: { params: Promise<{ id: string; chapterId: string; lessonId: string }> }) {
  try {
    const session = await getSession();
    if (!session?.roles?.includes('ROLE_ADMIN')) return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    const routeParams = await params;
    const courseId = Number.parseInt(routeParams.id, 10);
    const chapterId = Number.parseInt(routeParams.chapterId, 10);
    const lessonId = Number.parseInt(routeParams.lessonId, 10);
    if (![courseId, chapterId, lessonId].every((value) => Number.isInteger(value) && value > 0)) return NextResponse.json({ message: 'Invalid course, chapter, or lesson ID' }, { status: 400 });

    const lesson = await prisma.lesson.findFirst({ where: { id: lessonId, chapterId, chapter: { courseId } }, select: { id: true } });
    if (!lesson) return NextResponse.json({ message: 'Lesson not found' }, { status: 404 });

    const form = await req.formData();
    const action = String(form.get('_action') || 'update');
    if (action === 'delete') {
      await prisma.lesson.delete({ where: { id: lessonId } });
      return NextResponse.redirect(new URL(`/admin/courses/${courseId}/content?deletedLesson=${lessonId}`, req.url));
    }

    const title = String(form.get('title') || '').trim();
    const content = String(form.get('content') || '').trim();
    const videoLink = String(form.get('videoLink') || '').trim() || null;
    if (!title || title.length > 180 || !content) return NextResponse.json({ message: 'Lesson title and content are required' }, { status: 400 });

    await prisma.lesson.update({
      where: { id: lessonId },
      data: { title, content: content.slice(0, 100000), videoLink, slug: `${slugify(title) || 'lesson'}-${lessonId}`, updatedAt: new Date() },
    });
    return NextResponse.redirect(new URL(`/admin/courses/${courseId}/content?updatedLesson=${lessonId}`, req.url));
  } catch (error) {
    return handleApiError(error);
  }
}
