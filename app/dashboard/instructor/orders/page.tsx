import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';

export default async function InstructorOrdersPage() {
  const session = await getSession();
  if (!session) redirect('/login');

  const instructor = await prisma.instructor.findUnique({
    where: { userId: session.userId },
    include: {
      courses: {
        include: {
          payments: {
            include: {
              student: { include: { user: { include: { person: true } } } },
              paymentMethod: true,
              course: true,
            },
            orderBy: { paidAt: 'desc' },
          },
        },
      },
    },
  });

  if (!instructor) {
    return (
      <div className="container py-4">
        <h2 className="mb-4">Orders</h2>
        <div className="alert alert-info">No instructor profile found.</div>
      </div>
    );
  }

  const allPayments = instructor.courses.flatMap(c => c.payments);
  const totalRevenue = allPayments.reduce((sum, p) => sum + (p.amount || 0), 0);

  return (
    <div className="container py-4">
      <h2 className="mb-4">Orders & Earnings</h2>

      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div className="card shadow-sm border-0 text-center p-4">
            <div className="display-6 text-success mb-2">
              <i className="fas fa-money-bill-wave"></i>
            </div>
            <h6>Total Revenue</h6>
            <p className="h3">{totalRevenue} CFA</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm border-0 text-center p-4">
            <div className="display-6 text-primary mb-2">
              <i className="fas fa-shopping-cart"></i>
            </div>
            <h6>Total Orders</h6>
            <p className="h3">{allPayments.length}</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm border-0 text-center p-4">
            <div className="display-6 text-warning mb-2">
              <i className="fas fa-chart-line"></i>
            </div>
            <h6>Courses</h6>
            <p className="h3">{instructor.courses.length}</p>
          </div>
        </div>
      </div>

      {allPayments.length === 0 ? (
        <div className="alert alert-info">No orders yet.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Reference</th>
                <th>Student</th>
                <th>Course</th>
                <th>Amount</th>
                <th>Method</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {allPayments.map((payment) => (
                <tr key={payment.id}>
                  <td><code>{payment.reference}</code></td>
                  <td>
                    {payment.student?.user?.person
                      ? `${payment.student.user.person.firstName || ''} ${payment.student.user.person.lastName || ''}`
                      : payment.student?.user?.email || 'N/A'}
                  </td>
                  <td>{payment.course?.title || 'N/A'}</td>
                  <td>{payment.amount ? `${payment.amount} CFA` : 'N/A'}</td>
                  <td>{payment.paymentMethod?.label || 'N/A'}</td>
                  <td>{new Date(payment.paidAt).toLocaleDateString()}</td>
                  <td>
                    {payment.status === 'completed' ? (
                      <span className="badge bg-success">Completed</span>
                    ) : payment.status === 'pending' ? (
                      <span className="badge bg-warning text-dark">Pending</span>
                    ) : payment.isExpired ? (
                      <span className="badge bg-danger">Expired</span>
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
