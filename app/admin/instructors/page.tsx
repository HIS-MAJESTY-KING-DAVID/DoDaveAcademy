import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function AdminInstructorsPage() {
  const session = await getSession();
  if (!session?.roles?.includes('ROLE_ADMIN')) redirect('/login');

  const instructors = await prisma.instructor.findMany({
    orderBy: { id: 'desc' },
    include: {
      user: { include: { person: true } },
      category: true,
      institution: true,
    },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Instructor Management</h1>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-gray-500 font-medium">ID</th>
                <th className="px-4 py-3 text-left text-gray-500 font-medium">Name</th>
                <th className="px-4 py-3 text-left text-gray-500 font-medium">Email</th>
                <th className="px-4 py-3 text-left text-gray-500 font-medium">Category</th>
                <th className="px-4 py-3 text-left text-gray-500 font-medium">Institution</th>
                <th className="px-4 py-3 text-left text-gray-500 font-medium">Status</th>
                <th className="px-4 py-3 text-left text-gray-500 font-medium">Certified</th>
                <th className="px-4 py-3 text-left text-gray-500 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {instructors.map((inst) => (
                <tr key={inst.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">{inst.id}</td>
                  <td className="px-4 py-3 font-medium">
                    {inst.user?.person?.firstName} {inst.user?.person?.lastName}
                  </td>
                  <td className="px-4 py-3">{inst.user?.email}</td>
                  <td className="px-4 py-3">{inst.category?.name || '-'}</td>
                  <td className="px-4 py-3">{inst.institution?.name || '-'}</td>
                  <td className="px-4 py-3">
                    {inst.isValidated ? (
                      <span className="text-green-600 text-xs bg-green-100 px-2 py-1 rounded">Validated</span>
                    ) : inst.isRejected ? (
                      <span className="text-red-600 text-xs bg-red-100 px-2 py-1 rounded">Rejected</span>
                    ) : (
                      <span className="text-orange-600 text-xs bg-orange-100 px-2 py-1 rounded">Pending</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {inst.isCertified ? (
                      <span className="text-green-600 text-xs bg-green-100 px-2 py-1 rounded">Yes</span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      {!inst.isValidated && !inst.isRejected && (
                        <>
                          <form action={`/api/admin/instructors/${inst.id}/validate`} method="POST" className="inline">
                            <button type="submit" className="text-green-600 hover:underline text-xs">Validate</button>
                          </form>
                          <form action={`/api/admin/instructors/${inst.id}/reject`} method="POST" className="inline">
                            <button type="submit" className="text-red-600 hover:underline text-xs">Reject</button>
                          </form>
                        </>
                      )}
                      {inst.isRejected && (
                        <span className="text-xs text-gray-400">Rejected</span>
                      )}
                      {inst.isValidated && (
                        <span className="text-xs text-gray-400">Approved</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {instructors.length === 0 && (
                <tr><td colSpan={8} className="px-4 py-8 text-center text-gray-400">No instructors found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
