import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function AdminCoursesPage() {
  const session = await getSession();
  if (!session?.roles?.includes('ROLE_ADMIN')) redirect('/login');

  const courses = await prisma.course.findMany({
    orderBy: { id: 'desc' },
    include: {
      category: true,
      instructor: { include: { user: { include: { person: true } } } },
    },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Course Management</h1>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-gray-500 font-medium">ID</th>
                <th className="px-4 py-3 text-left text-gray-500 font-medium">Title</th>
                <th className="px-4 py-3 text-left text-gray-500 font-medium">Instructor</th>
                <th className="px-4 py-3 text-left text-gray-500 font-medium">Category</th>
                <th className="px-4 py-3 text-left text-gray-500 font-medium">Price</th>
                <th className="px-4 py-3 text-left text-gray-500 font-medium">Published</th>
                <th className="px-4 py-3 text-left text-gray-500 font-medium">Validated</th>
                <th className="px-4 py-3 text-left text-gray-500 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {courses.map((course) => (
                <tr key={course.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">{course.id}</td>
                  <td className="px-4 py-3 font-medium">{course.title}</td>
                  <td className="px-4 py-3">
                    {course.instructor?.user?.person?.firstName} {course.instructor?.user?.person?.lastName}
                  </td>
                  <td className="px-4 py-3">{course.category?.name || '-'}</td>
                  <td className="px-4 py-3">
                    {course.isFree ? (
                      <span className="text-green-600 text-xs bg-green-100 px-2 py-1 rounded">Free</span>
                    ) : (
                      <span>{course.subscriptionPrice ? `${course.subscriptionPrice} FCFA` : '-'}</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {course.isPublished ? (
                      <span className="text-green-600 text-xs bg-green-100 px-2 py-1 rounded">Yes</span>
                    ) : (
                      <span className="text-gray-400 text-xs bg-gray-100 px-2 py-1 rounded">No</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {course.isValidated ? (
                      <span className="text-green-600 text-xs bg-green-100 px-2 py-1 rounded">Yes</span>
                    ) : (
                      <span className="text-orange-600 text-xs bg-orange-100 px-2 py-1 rounded">Pending</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Link href={`/courses/${course.slug}`} className="text-blue-600 hover:underline text-xs">View</Link>
                      {!course.isValidated && (
                        <form action={`/api/admin/courses/${course.id}/validate`} method="POST" className="inline">
                          <button type="submit" className="text-green-600 hover:underline text-xs">Validate</button>
                        </form>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {courses.length === 0 && (
                <tr><td colSpan={8} className="px-4 py-8 text-center text-gray-400">No courses found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}