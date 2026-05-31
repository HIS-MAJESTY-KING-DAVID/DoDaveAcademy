import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function AdminCategoriesPage() {
  const session = await getSession();
  if (!session?.roles?.includes('ROLE_ADMIN')) redirect('/login');

  const categories = await prisma.category.findMany({
    orderBy: { id: 'asc' },
    include: { categories: true },
  });

  const parentCategories = categories.filter((c) => !c.categoryId);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Category Management</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-gray-500 font-medium">ID</th>
                  <th className="px-4 py-3 text-left text-gray-500 font-medium">Name</th>
                  <th className="px-4 py-3 text-left text-gray-500 font-medium">Slug</th>
                  <th className="px-4 py-3 text-left text-gray-500 font-medium">Type</th>
                  <th className="px-4 py-3 text-left text-gray-500 font-medium">Subcategories</th>
                  <th className="px-4 py-3 text-left text-gray-500 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {categories.map((cat) => (
                  <tr key={cat.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">{cat.id}</td>
                    <td className="px-4 py-3 font-medium">{cat.name}</td>
                    <td className="px-4 py-3 text-gray-500">{cat.slug}</td>
                    <td className="px-4 py-3">
                      {cat.isSubCategory ? (
                        <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded">Sub</span>
                      ) : (
                        <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">Parent</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {cat.categories?.length > 0 ? (
                        <span className="text-xs text-gray-600">{cat.categories.map((s) => s.name).join(', ')}</span>
                      ) : (
                        <span className="text-xs text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <form action={`/api/admin/categories/${cat.id}/delete`} method="POST" className="inline">
                        <button type="submit" className="text-red-600 hover:underline text-xs">Delete</button>
                      </form>
                    </td>
                  </tr>
                ))}
                {categories.length === 0 && (
                  <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-400">No categories found</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Add Category</h2>
          <form action="/api/admin/categories" method="POST" className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
              <input type="text" name="name" required
                className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Parent Category</label>
              <select name="categoryId"
                className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">None (Top-level)</option>
                {parentCategories.map((pc) => (
                  <option key={pc.id} value={pc.id}>{pc.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image (URL)</label>
              <input type="text" name="imageFile"
                className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <button type="submit"
              className="w-full px-4 py-2 bg-[var(--brand-primary)] text-white rounded text-sm hover:opacity-90">
              Create Category
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
