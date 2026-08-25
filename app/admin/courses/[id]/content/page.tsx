import Link from 'next/link';
import { redirect, notFound } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function AdminCourseContentPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ createdChapter?: string; createdLesson?: string }> }) {
  const session = await getSession();
  if (!session?.roles?.includes('ROLE_ADMIN')) redirect('/login');
  const courseId = Number.parseInt((await params).id, 10);
  if (!Number.isInteger(courseId) || courseId <= 0) notFound();

  const course = await prisma.course.findUnique({
    where: { id: courseId },
    select: {
      id: true,
      title: true,
      slug: true,
      chapters: { orderBy: { number: 'asc' }, include: { lessons: { orderBy: { number: 'asc' } } } },
    },
  });
  if (!course) notFound();
  const notices = await searchParams;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div><Link href="/admin/courses" className="text-sm text-gray-500 hover:underline">← Back to courses</Link><h1 className="text-2xl font-bold text-gray-800 mt-2">{course.title} content</h1></div>
        <Link href={`/courses/${course.slug}`} className="text-blue-600 hover:underline">View learner course</Link>
      </div>
      {(notices.createdChapter || notices.createdLesson) && <div className="mb-4 rounded bg-green-50 px-4 py-3 text-green-700">Content created successfully.</div>}
      <div className="grid gap-6 lg:grid-cols-3">
        <section className="bg-white rounded-lg shadow p-5 lg:col-span-2">
          <h2 className="text-lg font-semibold mb-4">Chapters and lessons</h2>
          {course.chapters.length === 0 && <p className="text-gray-500">No chapters yet.</p>}
          <div className="space-y-5">
            {course.chapters.map((chapter) => (
              <div key={chapter.id} className="border rounded-lg p-4">
                <div className="flex justify-between gap-3"><div><h3 className="font-semibold">{chapter.number}. {chapter.title}</h3><p className="text-sm text-gray-500 mt-1">{chapter.description || 'No description'}</p></div><span className="text-xs text-gray-500">{chapter.lessons.length} lessons</span></div>
                <ol className="mt-4 space-y-2 list-decimal list-inside">{chapter.lessons.map((lesson) => <li key={lesson.id} className="text-sm"><span className="font-medium">{lesson.title}</span>{lesson.videoLink && <span className="text-gray-400 ml-2">video</span>}</li>)}</ol>
                <form action={`/api/admin/courses/${course.id}/content/${chapter.id}/lessons`} method="POST" className="mt-4 grid gap-2 rounded bg-gray-50 p-3">
                  <input name="title" required maxLength={180} placeholder="Lesson title" className="rounded border px-3 py-2 text-sm" />
                  <textarea name="content" required placeholder="Lesson content" className="rounded border px-3 py-2 text-sm" rows={3} />
                  <input name="videoLink" type="url" placeholder="Optional video URL" className="rounded border px-3 py-2 text-sm" />
                  <button className="justify-self-start rounded bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700">Add lesson</button>
                </form>
              </div>
            ))}
          </div>
        </section>
        <section className="bg-white rounded-lg shadow p-5 h-fit">
          <h2 className="text-lg font-semibold mb-4">Add chapter</h2>
          <form action={`/api/admin/courses/${course.id}/content`} method="POST" className="grid gap-3">
            <input name="title" required maxLength={180} placeholder="Chapter title" className="rounded border px-3 py-2" />
            <textarea name="description" placeholder="Chapter description" className="rounded border px-3 py-2" rows={4} />
            <button className="rounded bg-blue-600 px-3 py-2 text-white hover:bg-blue-700">Create chapter</button>
          </form>
        </section>
      </div>
    </div>
  );
}
