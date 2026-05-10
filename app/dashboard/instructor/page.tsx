import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function InstructorDashboard() {
  const session = await getSession();
  if (!session) redirect('/login');

  const instructor = await prisma.instructor.findUnique({
    where: { userId: session.userId },
    include: {
      _count: { select: { courses: true, evaluations: true } },
      courses: {
        include: { _count: { select: { studentCourses: true, reviews: true } } },
      },
    },
  });

  if (!instructor) {
    return (
      <div className="container py-4">
        <h2 className="mb-4">Instructor Dashboard</h2>
        <div className="alert alert-info">No instructor profile found.</div>
      </div>
    );
  }

  const totalStudents = instructor.courses.reduce((sum, c) => sum + c._count.studentCourses, 0);
  const totalReviews = instructor.courses.reduce((sum, c) => sum + c._count.reviews, 0);

  return (
    <div className="container py-4">
      <h2 className="mb-4">Instructor Dashboard</h2>

      <div className="row g-4 mb-4">
        <div className="col-md-3">
          <div className="card shadow-sm border-0 text-center p-4">
            <div className="display-6 text-primary mb-2">
              <i className="fas fa-book"></i>
            </div>
            <h6>Courses</h6>
            <p className="h3">{instructor._count.courses}</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm border-0 text-center p-4">
            <div className="display-6 text-success mb-2">
              <i className="fas fa-users"></i>
            </div>
            <h6>Students</h6>
            <p className="h3">{totalStudents}</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm border-0 text-center p-4">
            <div className="display-6 text-warning mb-2">
              <i className="fas fa-star"></i>
            </div>
            <h6>Reviews</h6>
            <p className="h3">{totalReviews}</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm border-0 text-center p-4">
            <div className="display-6 text-info mb-2">
              <i className="fas fa-clipboard-check"></i>
            </div>
            <h6>Evaluations</h6>
            <p className="h3">{instructor._count.evaluations}</p>
          </div>
        </div>
      </div>

      <div className="card shadow-sm border-0">
        <div className="card-body">
          <h5 className="card-title">Quick Links</h5>
          <div className="row mt-3">
            <div className="col-md-3 mb-2">
              <Link href="/dashboard/instructor/courses" className="btn btn-outline-primary w-100">
                <i className="fas fa-book me-2"></i>My Courses
              </Link>
            </div>
            <div className="col-md-3 mb-2">
              <Link href="/dashboard/instructor/network" className="btn btn-outline-success w-100">
                <i className="fas fa-people me-2"></i>My Network
              </Link>
            </div>
            <div className="col-md-3 mb-2">
              <Link href="/dashboard/instructor/orders" className="btn btn-outline-warning w-100">
                <i className="fas fa-cart me-2"></i>Orders
              </Link>
            </div>
            <div className="col-md-3 mb-2">
              <Link href="/dashboard/instructor/profile" className="btn btn-outline-info w-100">
                <i className="fas fa-user me-2"></i>Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
