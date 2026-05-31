import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function AdminLevelsPage() {
  const session = await getSession();
  if (!session?.roles?.includes('ROLE_ADMIN')) redirect('/login');

  const levels = await prisma.skillLevel.findMany({
    orderBy: { id: 'asc' },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Skill Level Management</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-gray-500 font-medium">ID</th>
                  <th className="px-4 py-3 text-left text-gray-500 font-medium">Name</th>
                  <th className="px-4 py-3 text-left text-gray-500 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {levels.map((level) => (
                  <tr key={level.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">{level.id}</td>
                    <td className="px-4 py-3 font-medium">{level.name}</td>
                    <td className="px-4 py-3">
                      <form action={`/api/admin/levels/${level.id}/delete`} method="POST" className="inline">
                        <button type="submit" className="text-red-600 hover:underline text-xs">Delete</button>
                      </form>
                    </td>
                  </tr>
                ))}
                {levels.length === 0 && (
                  <tr><td colSpan={3} className="px-4 py-8 text-center text-gray-400">No levels found</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Add Level</h2>
          <form action="/api/admin/levels" method="POST" className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
              <input type="text" name="name" required
                className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <button type="submit"
              className="w-full px-4 py-2 bg-[var(--brand-primary)] text-white rounded text-sm hover:opacity-90">
              Create Level
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
