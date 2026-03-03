import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function LearnLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ courseSlug: string }>;
}) {
  const session = await getSession();
  if (!session) redirect('/login');

  const { courseSlug } = await params;

  const course = await prisma.course.findFirst({
    where: { slug: courseSlug },
    include: {
      chapters: {
        include: {
          lessons: true,
          quizzes: true
        },
        orderBy: { number: 'asc' }
      }
    }
  });

  if (!course) redirect('/dashboard/student');

  // Check enrollment
  const student = await prisma.student.findUnique({
    where: { userId: session.userId }
  });

  if (!student) redirect('/dashboard/student');

  const enrollment = await prisma.studentCourse.findUnique({
    where: {
      studentId_courseId: {
        studentId: student.id,
        courseId: course.id
      }
    }
  });

  if (!enrollment) redirect(`/courses/${courseSlug}`);

  return (
    <div className="d-flex flex-column vh-100">
        <header className="navbar navbar-dark bg-dark sticky-top flex-md-nowrap p-0 shadow">
            <Link className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="/dashboard/student">
                DoDaveAcademy
            </Link>
            <div className="w-100 text-white px-3">
                {course.title}
            </div>
        </header>

        <div className="container-fluid flex-grow-1">
            <div className="row h-100">
                <nav className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse overflow-auto" style={{ height: 'calc(100vh - 48px)' }}>
                    <div className="position-sticky pt-3">
                        <ul className="list-unstyled">
                            {course.chapters.map(chapter => (
                                <li key={chapter.id} className="mb-3">
                                    <div className="fw-bold px-3 text-muted text-uppercase small mb-2">{chapter.title}</div>
                                    <ul className="list-unstyled fw-normal pb-1 small">
                                        {chapter.lessons.map(lesson => (
                                            <li key={lesson.id}>
                                                <Link href={`/learn/${courseSlug}/${lesson.slug}`} className="d-block py-2 px-3 link-dark text-decoration-none border-bottom hover-bg-gray">
                                                    <i className="far fa-circle me-2"></i>
                                                    {lesson.title}
                                                </Link>
                                            </li>
                                        ))}
                                        {chapter.quizzes.length > 0 && (
                                            <li>
                                                <Link href={`/learn/${courseSlug}/quiz/${chapter.id}`} className="d-block py-2 px-3 link-dark text-decoration-none border-bottom hover-bg-gray">
                                                    <i className="fas fa-question-circle me-2 text-warning"></i>
                                                    Quiz
                                                </Link>
                                            </li>
                                        )}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </div>
                </nav>

                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 py-4 h-100 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    </div>
  );
}
