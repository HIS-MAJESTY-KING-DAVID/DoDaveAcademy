import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function AdminExamsPage() {
  const session = await getSession();
  if (!session?.roles?.includes('ROLE_ADMIN')) redirect('/login');

  const exams = await prisma.exam.findMany({
    orderBy: { id: 'desc' },
    include: { category: true },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Exam Management</h1>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-gray-500 font-medium">ID</th>
                <th className="px-4 py-3 text-left text-gray-500 font-medium">Reference</th>
                <th className="px-4 py-3 text-left text-gray-500 font-medium">Title</th>
                <th className="px-4 py-3 text-left text-gray-500 font-medium">Category</th>
                <th className="px-4 py-3 text-left text-gray-500 font-medium">Duration</th>
                <th className="px-4 py-3 text-left text-gray-500 font-medium">Status</th>
                <th className="px-4 py-3 text-left text-gray-500 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {exams.map((exam) => (
                <tr key={exam.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">{exam.id}</td>
                  <td className="px-4 py-3"><code className="text-xs">{exam.reference}</code></td>
                  <td className="px-4 py-3 font-medium">{exam.title}</td>
                  <td className="px-4 py-3">{exam.category?.name || '-'}</td>
                  <td className="px-4 py-3">{exam.duration ? `${exam.duration} min` : '-'}</td>
                  <td className="px-4 py-3">
                    {exam.isValidated ? (
                      <span className="text-green-600 text-xs bg-green-100 px-2 py-1 rounded">Validated</span>
                    ) : (
                      <span className="text-orange-600 text-xs bg-orange-100 px-2 py-1 rounded">Pending</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {!exam.isValidated && (
                      <form action={`/api/admin/exams/${exam.id}/validate`} method="POST" className="inline">
                        <button type="submit" className="text-green-600 hover:underline text-xs">Validate</button>
                      </form>
                    )}
                  </td>
                </tr>
              ))}
              {exams.length === 0 && (
                <tr><td colSpan={7} className="px-4 py-8 text-center text-gray-400">No exams found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
