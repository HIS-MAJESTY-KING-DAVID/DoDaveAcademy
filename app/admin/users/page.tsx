import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function AdminUsersPage() {
  const session = await getSession();
  if (!session?.roles?.includes('ROLE_ADMIN')) redirect('/login');

  const users = await prisma.user.findMany({
    orderBy: { id: 'desc' },
    include: { person: true, student: true, instructor: true },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">User Management</h1>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-gray-500 font-medium">ID</th>
                <th className="px-4 py-3 text-left text-gray-500 font-medium">Name</th>
                <th className="px-4 py-3 text-left text-gray-500 font-medium">Email</th>
                <th className="px-4 py-3 text-left text-gray-500 font-medium">Role</th>
                <th className="px-4 py-3 text-left text-gray-500 font-medium">Student</th>
                <th className="px-4 py-3 text-left text-gray-500 font-medium">Instructor</th>
                <th className="px-4 py-3 text-left text-gray-500 font-medium">Admin</th>
                <th className="px-4 py-3 text-left text-gray-500 font-medium">Verified</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">{user.id}</td>
                  <td className="px-4 py-3">{user.person?.firstName} {user.person?.lastName}</td>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3">
                    <span className="inline-block px-2 py-1 text-xs rounded bg-blue-100 text-blue-700">{user.roles}</span>
                  </td>
                  <td className="px-4 py-3">
                    {user.student ? (
                      <span className="text-green-600 text-xs bg-green-100 px-2 py-1 rounded">Yes</span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {user.instructor ? (
                      <span className="text-green-600 text-xs bg-green-100 px-2 py-1 rounded">Yes</span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {user.isAdmin ? (
                      <span className="text-purple-600 text-xs bg-purple-100 px-2 py-1 rounded">Admin</span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {user.isVerified ? (
                      <span className="text-green-600 text-xs bg-green-100 px-2 py-1 rounded">Yes</span>
                    ) : (
                      <span className="text-red-600 text-xs bg-red-100 px-2 py-1 rounded">No</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}