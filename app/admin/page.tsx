import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const session = await getSession();
  if (!session?.roles?.includes('ROLE_ADMIN')) redirect('/login');

  const [userCount, courseCount, instructorCount, studentCount, pendingCourseCount, recentUsers] = await Promise.all([
    prisma.user.count(),
    prisma.course.count(),
    prisma.instructor.count(),
    prisma.student.count(),
    prisma.course.count({ where: { isValidated: false } }),
    prisma.user.findMany({
      take: 5,
      orderBy: { id: 'desc' },
      include: { person: true },
    }),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-full">
              <i className="bi bi-people text-blue-600 text-xl"></i>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Users</p>
              <p className="text-2xl font-bold text-gray-800">{userCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-full">
              <i className="bi bi-book text-green-600 text-xl"></i>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Courses</p>
              <p className="text-2xl font-bold text-gray-800">{courseCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 rounded-full">
              <i className="bi bi-person-workspace text-purple-600 text-xl"></i>
            </div>
            <div>
              <p className="text-sm text-gray-500">Instructors</p>
              <p className="text-2xl font-bold text-gray-800">{instructorCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-100 rounded-full">
              <i className="bi bi-clock text-orange-600 text-xl"></i>
            </div>
            <div>
              <p className="text-sm text-gray-500">Pending Validations</p>
              <p className="text-2xl font-bold text-gray-800">{pendingCourseCount}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Recent Registrations</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-gray-500 font-medium">ID</th>
                <th className="px-6 py-3 text-left text-gray-500 font-medium">Name</th>
                <th className="px-6 py-3 text-left text-gray-500 font-medium">Email</th>
                <th className="px-6 py-3 text-left text-gray-500 font-medium">Roles</th>
                <th className="px-6 py-3 text-left text-gray-500 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {recentUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-3">{user.id}</td>
                  <td className="px-6 py-3">{user.person?.firstName} {user.person?.lastName}</td>
                  <td className="px-6 py-3">{user.email}</td>
                  <td className="px-6 py-3">
                    <span className="inline-block px-2 py-1 text-xs rounded bg-blue-100 text-blue-700">{user.roles}</span>
                  </td>
                  <td className="px-6 py-3">
                    <Link href={`/admin/users/${user.id}`} className="text-blue-600 hover:underline text-xs">View</Link>
                  </td>
                </tr>
              ))}
              {recentUsers.length === 0 && (
                <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-400">No users found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}