import Link from 'next/link';
import { redirect, notFound } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import ConfirmDeleteForm from './ConfirmDeleteForm';

export const dynamic = 'force-dynamic';

export default async function AdminCourseContentPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | undefined>>;
}) {
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
      media: true,
      chapters: {
        orderBy: { number: 'asc' },
        include: {
          lessons: { orderBy: { number: 'asc' } },
          quizzes: { orderBy: { id: 'asc' } },
        },
      },
    },
  });
  if (!course) notFound();
  const notices = await searchParams;
  const hasNotice = Object.keys(notices).some((key) => key.startsWith('created') || key.startsWith('updated') || key.startsWith('deleted') || key.startsWith('saved'));

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <Link href="/admin/courses" className="text-sm text-gray-500 hover:underline">← Back to courses</Link>
          <h1 className="text-2xl font-bold text-gray-800 mt-2">{course.title} content</h1>
        </div>
        <Link href={`/courses/${course.slug}`} className="text-blue-600 hover:underline">View learner course</Link>
      </div>

      {hasNotice && <div className="mb-4 rounded bg-green-50 px-4 py-3 text-green-700">Content changes saved successfully.</div>}

      <div className="grid gap-6 xl:grid-cols-3">
        <section className="bg-white rounded-lg shadow p-5 xl:col-span-2">
          <h2 className="text-lg font-semibold mb-4">Chapters, lessons, and quizzes</h2>
          {course.chapters.length === 0 && <p className="text-gray-500">No chapters yet.</p>}
          <div className="space-y-6">
            {course.chapters.map((chapter) => (
              <article key={chapter.id} className="border rounded-lg p-4">
                <div className="flex flex-wrap justify-between gap-3">
                  <div>
                    <h3 className="font-semibold">{chapter.number}. {chapter.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{chapter.description || 'No description'}</p>
                  </div>
                  <span className="text-xs text-gray-500">{chapter.lessons.length} lessons · {chapter.quizzes.length} quizzes</span>
                </div>

                <form action={`/api/admin/courses/${course.id}/content/${chapter.id}`} method="POST" className="mt-4 grid gap-2 rounded bg-gray-50 p-3">
                  <input type="hidden" name="_action" value="update" />
                  <div className="grid gap-2 sm:grid-cols-2">
                    <input name="title" required maxLength={180} defaultValue={chapter.title} className="rounded border px-3 py-2 text-sm" aria-label="Chapter title" />
                    <input name="description" maxLength={5000} defaultValue={chapter.description} className="rounded border px-3 py-2 text-sm" aria-label="Chapter description" />
                  </div>
                  <div className="flex gap-3"><button className="rounded border border-blue-600 px-3 py-2 text-sm text-blue-700 hover:bg-blue-50">Update chapter</button></div>
                </form>
                <div className="flex flex-wrap gap-2 mt-2"><form action={`/api/admin/courses/${course.id}/content/reorder`} method="POST"><input type="hidden" name="type" value="chapter" /><input type="hidden" name="itemId" value={chapter.id} /><input type="hidden" name="direction" value="up" /><button className="rounded border px-3 py-2 text-xs" aria-label={`Move chapter ${chapter.title} up`}>Move up</button></form><form action={`/api/admin/courses/${course.id}/content/reorder`} method="POST"><input type="hidden" name="type" value="chapter" /><input type="hidden" name="itemId" value={chapter.id} /><input type="hidden" name="direction" value="down" /><button className="rounded border px-3 py-2 text-xs" aria-label={`Move chapter ${chapter.title} down`}>Move down</button></form></div>
                <ConfirmDeleteForm action={`/api/admin/courses/${course.id}/content/${chapter.id}`} label="Delete chapter and its content" message="Delete this chapter and all of its content?" />

                <div className="mt-5 space-y-3">
                  {chapter.lessons.map((lesson) => (
                    <div key={lesson.id} className="rounded border p-3">
                      <form action={`/api/admin/courses/${course.id}/content/${chapter.id}/lessons/${lesson.id}`} method="POST" className="grid gap-2">
                        <input type="hidden" name="_action" value="update" />
                        <input name="title" required maxLength={180} defaultValue={lesson.title} className="rounded border px-3 py-2 text-sm" aria-label="Lesson title" />
                        <textarea name="content" required maxLength={100000} defaultValue={lesson.content} className="rounded border px-3 py-2 text-sm" rows={3} aria-label="Lesson content" />
                        <input name="videoLink" type="url" defaultValue={lesson.videoLink || ''} placeholder="Optional video URL" className="rounded border px-3 py-2 text-sm" aria-label="Lesson video URL" />
                        <div className="flex gap-3"><button className="rounded border border-blue-600 px-3 py-2 text-sm text-blue-700 hover:bg-blue-50">Update lesson</button></div>
                      </form>
                      <div className="flex flex-wrap gap-2 mt-2"><form action={`/api/admin/courses/${course.id}/content/reorder`} method="POST"><input type="hidden" name="type" value="lesson" /><input type="hidden" name="itemId" value={lesson.id} /><input type="hidden" name="direction" value="up" /><button className="rounded border px-3 py-2 text-xs" aria-label={`Move lesson ${lesson.title} up`}>Move up</button></form><form action={`/api/admin/courses/${course.id}/content/reorder`} method="POST"><input type="hidden" name="type" value="lesson" /><input type="hidden" name="itemId" value={lesson.id} /><input type="hidden" name="direction" value="down" /><button className="rounded border px-3 py-2 text-xs" aria-label={`Move lesson ${lesson.title} down`}>Move down</button></form></div>
                      <ConfirmDeleteForm action={`/api/admin/courses/${course.id}/content/${chapter.id}/lessons/${lesson.id}`} label="Delete lesson" message="Delete this lesson?" />
                    </div>
                  ))}
                </div>

                <form action={`/api/admin/courses/${course.id}/content/${chapter.id}/lessons`} method="POST" className="mt-4 grid gap-2 rounded bg-gray-50 p-3">
                  <h4 className="font-medium text-sm">Add lesson</h4>
                  <input name="title" required maxLength={180} placeholder="Lesson title" className="rounded border px-3 py-2 text-sm" />
                  <textarea name="content" required maxLength={100000} placeholder="Lesson content" className="rounded border px-3 py-2 text-sm" rows={3} />
                  <input name="videoLink" type="url" placeholder="Optional video URL" className="rounded border px-3 py-2 text-sm" />
                  <button className="justify-self-start rounded bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700">Add lesson</button>
                </form>

                <div className="mt-5 border-t pt-4 space-y-3">
                  <h4 className="font-medium text-sm">Quiz questions</h4>
                  {chapter.quizzes.map((quiz) => (
                    <div key={quiz.id} className="rounded border p-3">
                      <form action={`/api/admin/courses/${course.id}/content/${chapter.id}/quizzes/${quiz.id}`} method="POST" className="grid gap-2">
                        <input type="hidden" name="_action" value="update" />
                        <textarea name="question" required maxLength={5000} defaultValue={quiz.question} className="rounded border px-3 py-2 text-sm" rows={2} aria-label="Quiz question" />
                        {[1, 2, 3, 4].map((index) => <input key={index} name={`proposition${index}`} defaultValue={quiz[`proposition${index}` as 'proposition1' | 'proposition2' | 'proposition3' | 'proposition4'] || ''} placeholder={`Proposition ${index}`} className="rounded border px-3 py-2 text-sm" />)}
                        <input name="correctPropositions" required defaultValue={quiz.correctPropositions} placeholder="Correct options, e.g. 1 or 1,3" className="rounded border px-3 py-2 text-sm" />
                        <button className="justify-self-start rounded border border-blue-600 px-3 py-2 text-sm text-blue-700 hover:bg-blue-50">Update quiz</button>
                      </form>
                      <ConfirmDeleteForm action={`/api/admin/courses/${course.id}/content/${chapter.id}/quizzes/${quiz.id}`} label="Delete quiz" message="Delete this quiz question?" />
                    </div>
                  ))}
                  <form action={`/api/admin/courses/${course.id}/content/${chapter.id}/quizzes`} method="POST" className="grid gap-2 rounded bg-gray-50 p-3">
                    <h5 className="font-medium text-sm">Add quiz question</h5>
                    <textarea name="question" required maxLength={5000} placeholder="Question" className="rounded border px-3 py-2 text-sm" rows={2} />
                    {[1, 2, 3, 4].map((index) => <input key={index} name={`proposition${index}`} placeholder={`Proposition ${index}${index < 3 ? ' (required)' : ''}`} className="rounded border px-3 py-2 text-sm" />)}
                    <input name="correctPropositions" required placeholder="Correct options, e.g. 1 or 1,3" className="rounded border px-3 py-2 text-sm" />
                    <input name="reference" maxLength={120} placeholder="Optional reference" className="rounded border px-3 py-2 text-sm" />
                    <button className="justify-self-start rounded bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700">Add quiz question</button>
                  </form>
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className="space-y-6">
          <section className="bg-white rounded-lg shadow p-5 h-fit">
            <h2 className="text-lg font-semibold mb-4">Add chapter</h2>
            <form action={`/api/admin/courses/${course.id}/content`} method="POST" className="grid gap-3">
              <input name="title" required maxLength={180} placeholder="Chapter title" className="rounded border px-3 py-2" />
              <textarea name="description" maxLength={5000} placeholder="Chapter description" className="rounded border px-3 py-2" rows={4} />
              <button className="rounded bg-blue-600 px-3 py-2 text-white hover:bg-blue-700">Create chapter</button>
            </form>
          </section>

          <section className="bg-white rounded-lg shadow p-5 h-fit">
            <h2 className="text-lg font-semibold mb-2">Course media</h2>
            <p className="text-xs text-gray-500 mb-4">Store approved storage paths or provider URLs. Do not upload secrets or private credentials.</p>
            <form action={`/api/admin/courses/${course.id}/media`} method="POST" className="grid gap-3">
              <input name="imageFile" required maxLength={500} defaultValue={course.media?.imageFile || ''} placeholder="Image path or URL" className="rounded border px-3 py-2 text-sm" />
              <input name="videoUrl" type="url" defaultValue={course.media?.videoUrl || ''} placeholder="Video URL" className="rounded border px-3 py-2 text-sm" />
              <input name="mp4File" maxLength={500} defaultValue={course.media?.mp4File || ''} placeholder="MP4 storage path" className="rounded border px-3 py-2 text-sm" />
              <input name="webMFile" maxLength={500} defaultValue={course.media?.webMFile || ''} placeholder="WebM storage path" className="rounded border px-3 py-2 text-sm" />
              <input name="oggFile" maxLength={500} defaultValue={course.media?.oggFile || ''} placeholder="Ogg storage path" className="rounded border px-3 py-2 text-sm" />
              <button className="rounded bg-blue-600 px-3 py-2 text-white hover:bg-blue-700">Save media</button>
            </form>
            {course.media && <div className="mt-3"><ConfirmDeleteForm action={`/api/admin/courses/${course.id}/media`} label="Delete course media" message="Delete the course media references?" /></div>}
          </section>
        </div>
      </div>
    </div>
  );
}
