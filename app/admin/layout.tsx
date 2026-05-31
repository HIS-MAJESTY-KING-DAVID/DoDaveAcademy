import { ReactNode } from 'react';
import Link from 'next/link';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await getSession();
  if (!session) redirect('/login');

  const isAdmin = session.roles?.includes('ROLE_ADMIN');
  if (!isAdmin) redirect('/dashboard/student');

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md flex-shrink-0">
        <div className="p-4 border-b">
          <Link href="/admin" className="text-lg font-bold text-[var(--brand-primary)]">
            Admin Panel
          </Link>
        </div>
        <nav className="p-2 space-y-1">
          <Link href="/admin" className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 text-gray-700">
            <i className="bi bi-house-door"></i> Dashboard
          </Link>
          <Link href="/admin/users" className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 text-gray-700">
            <i className="bi bi-people"></i> Users
          </Link>
          <Link href="/admin/courses" className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 text-gray-700">
            <i className="bi bi-book"></i> Courses
          </Link>
          <Link href="/admin/instructors" className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 text-gray-700">
            <i className="bi bi-person-workspace"></i> Instructors
          </Link>
          <Link href="/admin/categories" className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 text-gray-700">
            <i className="bi bi-tags"></i> Categories
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 text-gray-700">
            <i className="bi bi-gear"></i> Settings
          </Link>
          <hr className="my-2" />
          <Link href="/dashboard/student" className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 text-gray-500 text-sm">
            <i className="bi bi-arrow-left"></i> Back to Dashboard
          </Link>
        </nav>
      </aside>
      <main className="flex-1 overflow-auto">
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
