import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';

export default async function PaymentsPage() {
  const session = await getSession();
  if (!session) redirect('/login');

  const student = await prisma.student.findUnique({
    where: { userId: session.userId },
    include: {
      payments: {
        include: {
          subscription: true,
          course: true,
          paymentMethod: true,
        },
        orderBy: { paidAt: 'desc' },
      },
    },
  });

  if (!student) {
    return (
      <div className="container py-4">
        <h2 className="mb-4">Mes paiements</h2>
        <div className="alert alert-info">No student profile found.</div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4">Mes paiements</h2>
      {student.payments.length === 0 ? (
        <div className="alert alert-info">Aucun paiement enregistré.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Référence</th>
                <th>Pour</th>
                <th>Montant</th>
                <th>Méthode</th>
                <th>Date</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {student.payments.map((payment) => (
                <tr key={payment.id}>
                  <td><code>{payment.reference}</code></td>
                  <td>
                    {payment.subscription?.label || payment.course?.title || 'N/A'}
                  </td>
                  <td>{payment.amount ? `${payment.amount} CFA` : 'N/A'}</td>
                  <td>{payment.paymentMethod?.label || 'N/A'}</td>
                  <td>{new Date(payment.paidAt).toLocaleDateString()}</td>
                  <td>
                    {payment.status === 'completed' ? (
                      <span className="badge bg-success">Complété</span>
                    ) : payment.status === 'pending' ? (
                      <span className="badge bg-warning text-dark">En attente</span>
                    ) : payment.isExpired ? (
                      <span className="badge bg-danger">Expiré</span>
                    ) : (
                      <span className="badge bg-secondary">{payment.status || 'N/A'}</span>
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
