import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';

export default async function StudentProfilePage() {
  const session = await getSession();
  if (!session) redirect('/login');

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    include: {
      person: true,
      student: true,
    },
  });

  if (!user) redirect('/login');

  const person = user.person;

  return (
    <div className="container py-4">
      <h2 className="mb-4">Mon profile</h2>

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
          </div>
        </div>

        <div className="col-md-8">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h5 className="card-title mb-4">Informations personnelles</h5>

              <div className="row mb-3">
                <div className="col-sm-4 text-muted">Email</div>
                <div className="col-sm-8">{user.email}</div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-4 text-muted">Prénom</div>
                <div className="col-sm-8">{person?.firstName || 'N/A'}</div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-4 text-muted">Nom</div>
                <div className="col-sm-8">{person?.lastName || 'N/A'}</div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-4 text-muted">Téléphone</div>
                <div className="col-sm-8">{person?.phoneNumber || 'N/A'}</div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-4 text-muted">Adresse</div>
                <div className="col-sm-8">{person?.address || 'N/A'}</div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-4 text-muted">Date de naissance</div>
                <div className="col-sm-8">
                  {person?.bornAt ? new Date(person.bornAt).toLocaleDateString() : 'N/A'}
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-4 text-muted">Genre</div>
                <div className="col-sm-8">{person?.gender || 'N/A'}</div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-4 text-muted">Points</div>
                <div className="col-sm-8">{user.points || 0}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
