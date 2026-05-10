import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function SubscriptionsPage() {
  const session = await getSession();
  if (!session) redirect('/login');

  const student = await prisma.student.findUnique({
    where: { userId: session.userId },
    include: {
      payments: {
        where: { subscriptionId: { not: null } },
        include: { subscription: true },
        orderBy: { paidAt: 'desc' },
      },
    },
  });

  if (!student) {
    return (
      <div className="container py-4">
        <h2 className="mb-4">Mes subscriptions</h2>
        <div className="alert alert-info">No student profile found.</div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4">Mes subscriptions</h2>
      {student.payments.length === 0 ? (
        <div className="alert alert-info">
          Vous n&apos;avez pas encore de subscription active.{' '}
          <Link href="/plan" className="alert-link">Voir les plans</Link>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Plan</th>
                <th>Montant</th>
                <th>Date</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {student.payments.map((payment) => (
                <tr key={payment.id}>
                  <td>{payment.subscription?.label || 'N/A'}</td>
                  <td>{payment.amount ? `${payment.amount} CFA` : 'N/A'}</td>
                  <td>{new Date(payment.paidAt).toLocaleDateString()}</td>
                  <td>
                    {payment.isExpired ? (
                      <span className="badge bg-danger">Expiré</span>
                    ) : (
                      <span className="badge bg-success">Actif</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
