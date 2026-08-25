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

export async function POST(req: Request, { params }: { params: Promise<{ id: string; chapterId: string }> }) {
  try {
    if (!(await requireAdmin())) return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    const routeParams = await params;
    const courseId = Number.parseInt(routeParams.id, 10);
    const chapterId = Number.parseInt(routeParams.chapterId, 10);
    if (!Number.isInteger(courseId) || !Number.isInteger(chapterId) || courseId <= 0 || chapterId <= 0) return NextResponse.json({ message: 'Invalid course or chapter ID' }, { status: 400 });

    const chapter = await prisma.chapter.findFirst({ where: { id: chapterId, courseId }, select: { id: true } });
    if (!chapter) return NextResponse.json({ message: 'Chapter not found' }, { status: 404 });

    const form = await req.formData();
    const action = String(form.get('_action') || 'update');
    if (action === 'delete') {
      await prisma.chapter.delete({ where: { id: chapterId } });
      return NextResponse.redirect(new URL(`/admin/courses/${courseId}/content?deletedChapter=${chapterId}`, req.url));
    }

    const title = String(form.get('title') || '').trim();
    const description = String(form.get('description') || '').trim();
    if (!title || title.length > 180) return NextResponse.json({ message: 'A chapter title is required' }, { status: 400 });

    await prisma.chapter.update({
      where: { id: chapterId },
      data: { title, description: description.slice(0, 5000), slug: `${slugify(title) || 'chapter'}-${chapterId}` },
    });
    return NextResponse.redirect(new URL(`/admin/courses/${courseId}/content?updatedChapter=${chapterId}`, req.url));
  } catch (error) {
    return handleApiError(error);
  }
}
