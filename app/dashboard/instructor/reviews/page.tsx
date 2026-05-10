import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';

export default async function InstructorReviewsPage() {
  const session = await getSession();
  if (!session) redirect('/login');

  const instructor = await prisma.instructor.findUnique({
    where: { userId: session.userId },
    include: {
      courses: {
        include: {
          reviews: {
            include: {
              student: { include: { user: { include: { person: true } } } },
            },
            orderBy: { createdAt: 'desc' },
          },
        },
      },
    },
  });

  if (!instructor) {
    return (
      <div className="container py-4">
        <h2 className="mb-4">Reviews</h2>
        <div className="alert alert-info">No instructor profile found.</div>
      </div>
    );
  }

  const allReviews = instructor.courses.flatMap(c => c.reviews);
  const avgRating = allReviews.length > 0
    ? (allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length).toFixed(1)
    : 'N/A';

  return (
    <div className="container py-4">
      <h2 className="mb-4">Reviews</h2>

      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div className="card shadow-sm border-0 text-center p-4">
            <div className="display-6 text-warning mb-2">
              <i className="fas fa-star"></i>
            </div>
            <h6>Average Rating</h6>
            <p className="h3">{avgRating}</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm border-0 text-center p-4">
            <div className="display-6 text-primary mb-2">
              <i className="fas fa-comment"></i>
            </div>
            <h6>Total Reviews</h6>
            <p className="h3">{allReviews.length}</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm border-0 text-center p-4">
            <div className="display-6 text-success mb-2">
              <i className="fas fa-book"></i>
            </div>
            <h6>Courses</h6>
            <p className="h3">{instructor.courses.length}</p>
          </div>
        </div>
      </div>

      {allReviews.length === 0 ? (
        <div className="alert alert-info">No reviews yet.</div>
      ) : (
        <div className="list-group">
          {allReviews.map((review) => (
            <div key={review.id} className="list-group-item">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <strong>
                    {review.student?.user?.person
                      ? `${review.student.user.person.firstName || ''} ${review.student.user.person.lastName || ''}`
                      : 'Anonymous'}
                  </strong>
                  <div className="text-warning">
                    {Array.from({ length: 5 }, (_, i) => (
                      <i key={i} className={`fas fa-star${i < review.rating ? '' : '-o'} me-1`}></i>
                    ))}
                  </div>
                  <small className="text-muted d-block mt-1">{review.message}</small>
                  <small className="text-muted">{new Date(review.createdAt).toLocaleDateString()}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
