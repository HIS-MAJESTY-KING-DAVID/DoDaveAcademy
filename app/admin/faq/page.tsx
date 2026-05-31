import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function AdminFaqPage() {
  const session = await getSession();
  if (!session?.roles?.includes('ROLE_ADMIN')) redirect('/login');

  const [faqs, courses] = await Promise.all([
    prisma.faq.findMany({
      orderBy: { id: 'desc' },
      include: { course: { select: { title: true } } },
    }),
    prisma.course.findMany({ orderBy: { title: 'asc' }, select: { id: true, title: true } }),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">FAQ Management</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-gray-500 font-medium">ID</th>
                  <th className="px-4 py-3 text-left text-gray-500 font-medium">Course</th>
                  <th className="px-4 py-3 text-left text-gray-500 font-medium">Question</th>
                  <th className="px-4 py-3 text-left text-gray-500 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {faqs.map((faq) => (
                  <tr key={faq.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">{faq.id}</td>
                    <td className="px-4 py-3 font-medium">{faq.course?.title || '-'}</td>
                    <td className="px-4 py-3 text-gray-500 max-w-xs truncate">{faq.question}</td>
                    <td className="px-4 py-3">
                      <form action={`/api/admin/faq/${faq.id}/delete`} method="POST" className="inline">
                        <button type="submit" className="text-red-600 hover:underline text-xs">Delete</button>
                      </form>
                    </td>
                  </tr>
                ))}
                {faqs.length === 0 && (
                  <tr><td colSpan={4} className="px-4 py-8 text-center text-gray-400">No FAQs found</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Add FAQ</h2>
          <form action="/api/admin/faq" method="POST" className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Course *</label>
              <select name="courseId" required
                className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Select course...</option>
                {courses.map((c) => (
                  <option key={c.id} value={c.id}>{c.title}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Question *</label>
              <input type="text" name="question" required
                className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Answer *</label>
              <textarea name="answer" rows={4} required
                className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <button type="submit"
              className="w-full px-4 py-2 bg-[var(--brand-primary)] text-white rounded text-sm hover:opacity-90">
              Create FAQ
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
