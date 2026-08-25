import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { handleApiError } from '@/lib/exceptions';

function optionalValue(value: FormDataEntryValue | null, max: number) {
  const normalized = typeof value === 'string' ? value.trim() : '';
  return normalized ? normalized.slice(0, max) : null;
}

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getSession();
    if (!session?.roles?.includes('ROLE_ADMIN')) return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    const courseId = Number.parseInt((await params).id, 10);
    if (!Number.isInteger(courseId) || courseId <= 0) return NextResponse.json({ message: 'Invalid course ID' }, { status: 400 });

    const course = await prisma.course.findUnique({ where: { id: courseId }, select: { id: true } });
    if (!course) return NextResponse.json({ message: 'Course not found' }, { status: 404 });

    const form = await req.formData();
    if (String(form.get('_action') || 'save') === 'delete') {
      await prisma.media.deleteMany({ where: { courseId } });
      return NextResponse.redirect(new URL(`/admin/courses/${courseId}/content?deletedMedia=1`, req.url));
    }

    const imageFile = optionalValue(form.get('imageFile'), 500);
    if (!imageFile) return NextResponse.json({ message: 'An image path or URL is required' }, { status: 400 });
    const data = {
      imageFile,
      videoUrl: optionalValue(form.get('videoUrl'), 1000),
      mp4File: optionalValue(form.get('mp4File'), 500),
      webMFile: optionalValue(form.get('webMFile'), 500),
      oggFile: optionalValue(form.get('oggFile'), 500),
    };
    await prisma.media.upsert({ where: { courseId }, create: { courseId, ...data }, update: data });
    return NextResponse.redirect(new URL(`/admin/courses/${courseId}/content?savedMedia=1`, req.url));
  } catch (error) {
    return handleApiError(error);
  }
}
