import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function RetraitsPage() {
  const session = await getSession();
  if (!session) redirect('/login');

  const withdrawals = await prisma.withdrawal.findMany({
    where: { userId: session.userId },
    orderBy: { createdAt: 'desc' },
    include: { paymentMethod: true },
  });

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Historique des retraits</h2>
        <Link href="/dashboard/student/network/retrait" className="btn btn-primary btn-sm">
          Nouveau retrait
        </Link>
      </div>

      {withdrawals.length === 0 ? (
        <div className="alert alert-info">
          Aucun retrait effectué.{' '}
          <Link href="/dashboard/student/network/retrait" className="alert-link">Faire une demande</Link>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Montant</th>
                <th>Méthode</th>
                <th>Téléphone</th>
                <th>Status</th>
                <th>Date</th>
                <th>Référence</th>
              </tr>
            </thead>
            <tbody>
              {withdrawals.map((w) => (
                <tr key={w.id}>
                  <td>{w.amount} CFA</td>
                  <td>{w.paymentMethod?.label || '-'}</td>
                  <td>{w.phoneNumber}</td>
                  <td>
                    {w.isDone ? (
                      <span className="badge bg-success">Complété</span>
                    ) : (
                      <span className="badge bg-warning text-dark">En attente</span>
                    )}
                  </td>
                  <td>{new Date(w.createdAt).toLocaleDateString()}</td>
                  <td><code className="text-xs">{w.transactionReference || '-'}</code></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
