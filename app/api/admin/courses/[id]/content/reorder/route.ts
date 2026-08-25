import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { handleApiError } from '@/lib/exceptions';

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getSession();
    if (!session?.roles?.includes('ROLE_ADMIN')) return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    const courseId = Number.parseInt((await params).id, 10);
    if (!Number.isInteger(courseId) || courseId <= 0) return NextResponse.json({ message: 'Invalid course ID' }, { status: 400 });
    const form = await req.formData();
    const type = String(form.get('type') || '');
    const itemId = Number.parseInt(String(form.get('itemId') || ''), 10);
    const direction = String(form.get('direction') || '');
    if (!['chapter', 'lesson'].includes(type) || !Number.isInteger(itemId) || itemId <= 0 || !['up', 'down'].includes(direction)) return NextResponse.json({ message: 'Invalid reorder request' }, { status: 400 });

    if (type === 'chapter') {
      const current = await prisma.chapter.findFirst({ where: { id: itemId, courseId }, select: { id: true, number: true } });
      if (!current) return NextResponse.json({ message: 'Chapter not found' }, { status: 404 });
      const siblings = await prisma.chapter.findMany({ where: { courseId }, select: { id: true, number: true }, orderBy: [{ number: 'asc' }, { id: 'asc' }] });
      const index = siblings.findIndex((item) => item.id === itemId);
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (index < 0 || targetIndex < 0 || targetIndex >= siblings.length) return NextResponse.redirect(new URL(`/admin/courses/${courseId}/content`, req.url));
      const target = siblings[targetIndex];
      await prisma.$transaction([
        prisma.chapter.update({ where: { id: current.id }, data: { number: -1 } }),
        prisma.chapter.update({ where: { id: target.id }, data: { number: current.number ?? index + 1 } }),
        prisma.chapter.update({ where: { id: current.id }, data: { number: target.number ?? targetIndex + 1 } }),
      ]);
    } else {
      const current = await prisma.lesson.findFirst({ where: { id: itemId, chapter: { courseId } }, select: { id: true, chapterId: true, number: true } });
      if (!current) return NextResponse.json({ message: 'Lesson not found' }, { status: 404 });
      const siblings = await prisma.lesson.findMany({ where: { chapterId: current.chapterId }, select: { id: true, number: true }, orderBy: [{ number: 'asc' }, { id: 'asc' }] });
      const index = siblings.findIndex((item) => item.id === itemId);
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (index < 0 || targetIndex < 0 || targetIndex >= siblings.length) return NextResponse.redirect(new URL(`/admin/courses/${courseId}/content`, req.url));
      const target = siblings[targetIndex];
      await prisma.$transaction([
        prisma.lesson.update({ where: { id: current.id }, data: { number: -1 } }),
        prisma.lesson.update({ where: { id: target.id }, data: { number: current.number ?? index + 1 } }),
        prisma.lesson.update({ where: { id: current.id }, data: { number: target.number ?? targetIndex + 1 } }),
      ]);
    }
    return NextResponse.redirect(new URL(`/admin/courses/${courseId}/content?reordered=${type}`, req.url));
  } catch (error) {
    return handleApiError(error);
  }
}
