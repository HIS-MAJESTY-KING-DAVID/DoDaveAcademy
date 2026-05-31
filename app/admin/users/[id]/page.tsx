import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function AdminUserDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session?.roles?.includes('ROLE_ADMIN')) redirect('/login');

  const { id } = await params;
  const userId = parseInt(id, 10);
  if (isNaN(userId)) redirect('/admin/users');

  const [user, recentPayments] = await Promise.all([
    prisma.user.findUnique({
      where: { id: userId },
      include: {
        person: true,
        student: { include: { payments: { orderBy: { paidAt: 'desc' }, take: 10, include: { course: true, subscription: true } } } },
        instructor: { include: { category: true, institution: true } },
        withdrawals: { orderBy: { createdAt: 'desc' }, take: 5 },
        notifications: { orderBy: { createdAt: 'desc' }, take: 5 },
      },
    }),
    prisma.payment.findMany({
      where: { student: { userId } },
      orderBy: { paidAt: 'desc' },
      take: 10,
      include: { course: true, subscription: true },
    }),
  ]);

  if (!user) redirect('/admin/users');

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <Link href="/admin/users" className="text-blue-600 hover:underline text-sm">&larr; Back to Users</Link>
        <h1 className="text-2xl font-bold text-gray-800">User #{user.id}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Account Info</h2>
            <dl className="grid grid-cols-2 gap-4 text-sm">
              <div><dt className="text-gray-500">Email</dt><dd className="font-medium">{user.email}</dd></div>
              <div><dt className="text-gray-500">Roles</dt><dd><span className="inline-block px-2 py-1 text-xs rounded bg-blue-100 text-blue-700">{user.roles}</span></dd></div>
              <div><dt className="text-gray-500">Points</dt><dd>{user.points ?? 0}</dd></div>
              <div><dt className="text-gray-500">Cash</dt><dd>{user.cash ?? 0} CFA</dd></div>
              <div><dt className="text-gray-500">Verified</dt><dd>{user.isVerified ? <span className="text-green-600">Yes</span> : <span className="text-red-600">No</span>}</dd></div>
            </dl>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Recent Payments ({recentPayments.length})
            </h2>
            {recentPayments.length === 0 ? (
              <p className="text-sm text-gray-400">No payments found.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-2 text-left text-gray-500">Reference</th>
                      <th className="px-3 py-2 text-left text-gray-500">For</th>
                      <th className="px-3 py-2 text-left text-gray-500">Amount</th>
                      <th className="px-3 py-2 text-left text-gray-500">Status</th>
                      <th className="px-3 py-2 text-left text-gray-500">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {recentPayments.map((p) => (
                      <tr key={p.id} className="hover:bg-gray-50">
                        <td className="px-3 py-2"><code className="text-xs">{p.reference}</code></td>
                        <td className="px-3 py-2">{p.course?.title || p.subscription?.label || '-'}</td>
                        <td className="px-3 py-2">{p.amount ?? '-'} CFA</td>
                        <td className="px-3 py-2">
                          {p.status === 'completed' ? <span className="text-green-600 text-xs">Completed</span> :
                           p.status === 'pending' ? <span className="text-orange-600 text-xs">Pending</span> :
                           <span className="text-xs">{p.status}</span>}
                        </td>
                        <td className="px-3 py-2 text-xs">{new Date(p.paidAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Person Details</h2>
            {user.person ? (
              <dl className="space-y-3 text-sm">
                <div><dt className="text-gray-500">Name</dt><dd className="font-medium">{user.person.firstName} {user.person.lastName}</dd></div>
                <div><dt className="text-gray-500">Phone</dt><dd>{user.person.phoneNumber || '-'}</dd></div>
                <div><dt className="text-gray-500">Gender</dt><dd>{user.person.gender || '-'}</dd></div>
                <div><dt className="text-gray-500">Address</dt><dd>{user.person.address || '-'}</dd></div>
                <div><dt className="text-gray-500">Pseudo</dt><dd>{user.person.pseudo || '-'}</dd></div>
                <div><dt className="text-gray-500">Invitation Code</dt><dd><code>{user.person.invitationCode || '-'}</code></dd></div>
              </dl>
            ) : <p className="text-sm text-gray-400">No person record.</p>}
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Instructor Info</h2>
            {user.instructor ? (
              <dl className="space-y-3 text-sm">
                <div><dt className="text-gray-500">Status</dt>
                  <dd>{user.instructor.isValidated ? <span className="text-green-600">Validated</span> : user.instructor.isRejected ? <span className="text-red-600">Rejected</span> : <span className="text-orange-600">Pending</span>}</dd>
                </div>
                <div><dt className="text-gray-500">Certified</dt><dd>{user.instructor.isCertified ? 'Yes' : 'No'}</dd></div>
                <div><dt className="text-gray-500">Category</dt><dd>{user.instructor.category?.name || '-'}</dd></div>
                <div><dt className="text-gray-500">Institution</dt><dd>{user.instructor.institution?.name || '-'}</dd></div>
              </dl>
            ) : <p className="text-sm text-gray-400">Not an instructor.</p>}
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Notifications ({user.notifications.length})</h2>
            {user.notifications.length === 0 ? (
              <p className="text-sm text-gray-400">None.</p>
            ) : (
              <ul className="space-y-2 text-sm">
                {user.notifications.map((n) => (
                  <li key={n.id} className="pb-2 border-b last:border-0">
                    <p className="font-medium">{n.title}</p>
                    <p className="text-gray-500 text-xs">{n.content}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
