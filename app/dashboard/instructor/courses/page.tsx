import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function InstructorCoursesPage() {
  const session = await getSession();
  if (!session) redirect('/login');

  const instructor = await prisma.instructor.findUnique({
    where: { userId: session.userId },
    include: {
      courses: {
        include: {
          category: true,
          skillLevel: true,
          media: true,
          _count: { select: { studentCourses: true, chapters: true, reviews: true } },
        },
        orderBy: { createdAt: 'desc' },
      },
    },
  });

  if (!instructor) {
    return (
      <div className="container py-4">
        <h2 className="mb-4">My Courses</h2>
        <div className="alert alert-info">No instructor profile found.</div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">My Courses</h2>
        <Link href="/become-teacher" className="btn btn-primary">
          <i className="fas fa-plus me-2"></i>New Course
        </Link>
      </div>

      {instructor.courses.length === 0 ? (
        <div className="alert alert-info">You haven&apos;t created any courses yet.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Level</th>
                <th>Students</th>
                <th>Reviews</th>
                <th>Status</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {instructor.courses.map((course) => (
                <tr key={course.id}>
                  <td>
                    <Link href={`/courses/${course.slug}`} className="text-decoration-none">
                      {course.title}
                    </Link>
                  </td>
                  <td>{course.category?.name || 'N/A'}</td>
                  <td>{course.skillLevel?.name || 'N/A'}</td>
                  <td>{course._count.studentCourses}</td>
                  <td>{course._count.reviews}</td>
                  <td>
                    {course.isPublished ? (
                      course.isValidated ? (
                        <span className="badge bg-success">Published</span>
                      ) : (
                        <span className="badge bg-warning text-dark">Pending</span>
                      )
                    ) : (
                      <span className="badge bg-secondary">Draft</span>
                    )}
                  </td>
                  <td>{new Date(course.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
