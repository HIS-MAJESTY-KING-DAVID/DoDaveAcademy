import { prisma } from '@/lib/prisma';
import LessonPlayer from '@/components/player/LessonPlayer';
import { notFound } from 'next/navigation';

export default async function LessonPage({
  params
}: {
  params: Promise<{ courseSlug: string; lessonSlug: string }>;
}) {
  const { courseSlug, lessonSlug } = await params;

  const course = await prisma.course.findFirst({
    where: { slug: courseSlug },
    include: {
      chapters: {
        include: {
          lessons: {
            orderBy: { number: 'asc' }
          }
        },
        orderBy: { number: 'asc' }
      }
    }
  });

  if (!course) notFound();

  // Flatten lessons to find next one
  const lessons = course.chapters.flatMap(c => c.lessons);
  const currentLessonIndex = lessons.findIndex(l => l.slug === lessonSlug);

  if (currentLessonIndex === -1) notFound();

  const lesson = lessons[currentLessonIndex];
  const nextLesson = lessons[currentLessonIndex + 1];
  const nextLessonUrl = nextLesson ? `/learn/${courseSlug}/${nextLesson.slug}` : undefined;

  return (
    <div className="container-fluid px-0">
        <h2 className="mb-4">{lesson.title}</h2>
        {lesson.videoLink ? (
            <div className="mb-4">
                <LessonPlayer 
                    lessonId={lesson.id}
                    videoUrl={lesson.videoLink}
                    poster={lesson.poster || undefined}
                    nextLessonUrl={nextLessonUrl}
                />
            </div>
        ) : (
            <div className="alert alert-warning">No video available for this lesson.</div>
        )}
        
        <div className="card shadow-sm border-0">
            <div className="card-body">
                <h3 className="h5 mb-3">Description</h3>
                <div dangerouslySetInnerHTML={{ __html: lesson.content }} />
            </div>
        </div>
    </div>
  );
}
