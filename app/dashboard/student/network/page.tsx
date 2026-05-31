import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function NetworkPage() {
  const session = await getSession();
  if (!session) redirect('/login');

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    include: {
      person: true,
    },
  });

  const networkConfig = await prisma.networkConfig.findFirst();

  return (
    <div className="container py-4">
      <h2 className="mb-4">Mon réseau</h2>

      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div className="card shadow-sm border-0 text-center p-4">
            <div className="display-6 text-primary mb-2">
              <i className="fas fa-users"></i>
            </div>
            <h5>Mes points</h5>
            <p className="h3">{user?.points || 0}</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm border-0 text-center p-4">
            <div className="display-6 text-success mb-2">
              <i className="fas fa-wallet"></i>
            </div>
            <h5>Ma cagnotte</h5>
            <p className="h3">{user?.cash || 0} CFA</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm border-0 text-center p-4">
            <div className="display-6 text-info mb-2">
              <i className="fas fa-gift"></i>
            </div>
            <h5>Mon code d&apos;invitation</h5>
            <p className="h3">
              <code className="bg-light p-2 rounded">{user?.person?.invitationCode || 'N/A'}</code>
            </p>
          </div>
        </div>
      </div>

      {networkConfig && (
        <div className="card shadow-sm border-0">
          <div className="card-body">
            <h5 className="card-title">Configuration du réseau</h5>
            <div className="row mt-3">
              <div className="col-md-3">
                <small className="text-muted d-block">Points par invitation</small>
                <strong>{networkConfig.pointsPerInvitation}</strong>
              </div>
              <div className="col-md-3">
                <small className="text-muted d-block">Distribution instructeur</small>
                <strong>{networkConfig.instructorDistributionPercentage}%</strong>
              </div>
              <div className="col-md-3">
                <small className="text-muted d-block">Distribution étudiant</small>
                <strong>{networkConfig.studentDistributionPercentage}%</strong>
              </div>
              <div className="col-md-3">
                <small className="text-muted d-block">Retrait minimum</small>
                <strong>{networkConfig.minimumWithdrawable} CFA</strong>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="row g-4 mt-2">
        <div className="col-md-6">
          <Link href="/dashboard/student/network/retrait" className="text-decoration-none">
            <div className="card shadow-sm border-0 text-center p-4 h-100">
              <div className="display-6 text-primary mb-2">
                <i className="fas fa-hand-holding-usd"></i>
              </div>
              <h5>Demander un retrait</h5>
              <p className="text-muted mb-0">Retirez vos gains</p>
            </div>
          </Link>
        </div>
        <div className="col-md-6">
          <Link href="/dashboard/student/network/retraits" className="text-decoration-none">
            <div className="card shadow-sm border-0 text-center p-4 h-100">
              <div className="display-6 text-info mb-2">
                <i className="fas fa-history"></i>
              </div>
              <h5>Historique des retraits</h5>
              <p className="text-muted mb-0">Consultez vos retraits</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
