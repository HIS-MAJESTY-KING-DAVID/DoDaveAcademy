import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function InstructorNetworkPage() {
  const session = await getSession();
  if (!session) redirect('/login');

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    include: {
      person: true,
      instructor: true,
    },
  });

  const networkConfig = await prisma.networkConfig.findFirst();

  return (
    <div className="container py-4">
      <h2 className="mb-4">My Network</h2>

      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div className="card shadow-sm border-0 text-center p-4">
            <div className="display-6 text-primary mb-2">
              <i className="fas fa-users"></i>
            </div>
            <h5>My Points</h5>
            <p className="h3">{user?.points || 0}</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm border-0 text-center p-4">
            <div className="display-6 text-success mb-2">
              <i className="fas fa-wallet"></i>
            </div>
            <h5>My Earnings</h5>
            <p className="h3">{user?.cash || 0} CFA</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm border-0 text-center p-4">
            <div className="display-6 text-info mb-2">
              <i className="fas fa-gift"></i>
            </div>
            <h5>Invitation Code</h5>
            <p className="h3">
              <code className="bg-light p-2 rounded">{user?.person?.invitationCode || 'N/A'}</code>
            </p>
          </div>
        </div>
      </div>

      {networkConfig && (
        <div className="card shadow-sm border-0">
          <div className="card-body">
            <h5 className="card-title">Network Configuration</h5>
            <div className="row mt-3">
              <div className="col-md-3">
                <small className="text-muted d-block">Points per Invitation</small>
                <strong>{networkConfig.pointsPerInvitation}</strong>
              </div>
              <div className="col-md-3">
                <small className="text-muted d-block">Instructor Distribution</small>
                <strong>{networkConfig.instructorDistributionPercentage}%</strong>
              </div>
              <div className="col-md-3">
                <small className="text-muted d-block">Student Distribution</small>
                <strong>{networkConfig.studentDistributionPercentage}%</strong>
              </div>
              <div className="col-md-3">
                <small className="text-muted d-block">Minimum Withdrawal</small>
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
              <h5>Withdraw Earnings</h5>
              <p className="text-muted mb-0">Request a withdrawal</p>
            </div>
          </Link>
        </div>
        <div className="col-md-6">
          <Link href="/dashboard/student/network/retraits" className="text-decoration-none">
            <div className="card shadow-sm border-0 text-center p-4 h-100">
              <div className="display-6 text-info mb-2">
                <i className="fas fa-history"></i>
              </div>
              <h5>Withdrawal History</h5>
              <p className="text-muted mb-0">View your withdrawals</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
