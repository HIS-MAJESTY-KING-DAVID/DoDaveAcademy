import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';

export default async function InstructorProfilePage() {
  const session = await getSession();
  if (!session) redirect('/login');

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    include: {
      person: true,
      instructor: {
        include: { category: true, institution: true },
      },
    },
  });

  if (!user) redirect('/login');

  const person = user.person;
  const instructor = user.instructor;

  return (
    <div className="container py-4">
      <h2 className="mb-4">Profile</h2>

      <div className="row g-4">
        <div className="col-md-4 text-center">
          <div className="card shadow-sm border-0 p-4">
            <div className="mb-3">
              {person?.avatar ? (
                <img
                  src={person.avatar}
                  alt="Avatar"
                  className="rounded-circle img-fluid"
                  style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                />
              ) : (
                <div
                  className="rounded-circle bg-secondary d-inline-flex align-items-center justify-content-center text-white"
                  style={{ width: '150px', height: '150px', fontSize: '3rem' }}
                >
                  <i className="fas fa-user"></i>
                </div>
              )}
            </div>
            <h5>{person?.firstName} {person?.lastName}</h5>
            <p className="text-muted">{person?.pseudo || user.email}</p>
            {instructor?.isValidated && (
              <span className="badge bg-success">
                <i className="fas fa-check-circle me-1"></i>Certified
              </span>
            )}
          </div>
        </div>

        <div className="col-md-8">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h5 className="card-title mb-4">Personal Information</h5>

              <div className="row mb-3">
                <div className="col-sm-4 text-muted">Email</div>
                <div className="col-sm-8">{user.email}</div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-4 text-muted">First Name</div>
                <div className="col-sm-8">{person?.firstName || 'N/A'}</div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-4 text-muted">Last Name</div>
                <div className="col-sm-8">{person?.lastName || 'N/A'}</div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-4 text-muted">Phone</div>
                <div className="col-sm-8">{person?.phoneNumber || 'N/A'}</div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-4 text-muted">Address</div>
                <div className="col-sm-8">{person?.address || 'N/A'}</div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-4 text-muted">About Me</div>
                <div className="col-sm-8">{instructor?.aboutMe || 'N/A'}</div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-4 text-muted">Specialty</div>
                <div className="col-sm-8">{instructor?.category?.name || 'N/A'}</div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-4 text-muted">Institution</div>
                <div className="col-sm-8">{instructor?.institution?.name || 'N/A'}</div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-4 text-muted">Reference</div>
                <div className="col-sm-8"><code>{instructor?.reference || 'N/A'}</code></div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-4 text-muted">Points</div>
                <div className="col-sm-8">{user.points || 0}</div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-4 text-muted">Joined</div>
                <div className="col-sm-8">
                  {instructor?.joinAt ? new Date(instructor.joinAt).toLocaleDateString() : 'N/A'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
