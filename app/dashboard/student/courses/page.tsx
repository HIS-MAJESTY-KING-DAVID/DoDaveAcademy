import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function StudentCoursesPage() {
  const session = await getSession();
  if (!session) redirect('/login');

  const student = await prisma.student.findUnique({
    where: { userId: session.userId },
    include: {
      studentCourses: {
        include: {
          course: {
            include: {
              media: true,
              skillLevel: true,
              instructor: { include: { user: { include: { person: true } } } },
            },
          },
        },
      },
    },
  });

  if (!student) {
    return (
      <div className="container py-4">
        <h2 className="mb-4">Mes cours</h2>
        <div className="alert alert-info">No student profile found.</div>
      </div>
    );
  }

  const enrollments = student.studentCourses.filter(sc => sc.course);

  return (
    <div className="container py-4">
      <h2 className="mb-4">Mes cours</h2>
      {enrollments.length === 0 ? (
        <div className="alert alert-info">
          Vous n&apos;êtes inscrit à aucun cours.{' '}
          <Link href="/courses" className="alert-link">Parcourir les cours</Link>
        </div>
      ) : (
        <div className="row g-4">
          {enrollments.map((enrollment) => {
            const course = enrollment.course!;
            return (
              <div className="col-sm-6 col-xl-4" key={course.id}>
                <div className="card shadow-sm border-0 h-100">
                  <img
                    src={course.media?.imageFile ? `/assets/images/courses/${course.media.imageFile}` : '/assets/images/courses/4by3/08.jpg'}
                    className="card-img-top"
                    alt={course.title}
                    style={{ height: '180px', objectFit: 'cover' }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{course.title}</h5>
                    <p className="card-text text-muted small flex-grow-1">{course.description}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <small className="text-muted">{course.skillLevel?.name || 'Tous niveaux'}</small>
                      <Link href={`/learn/${course.slug}`} className="btn btn-primary btn-sm">
                        Continuer
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
