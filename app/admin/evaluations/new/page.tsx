import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import AdminEvaluationCreateForm from './AdminEvaluationCreateForm';

export const dynamic = 'force-dynamic';

export default async function AdminEvaluationCreatePage() {
  const session = await getSession();
  if (!session?.roles?.includes('ROLE_ADMIN')) redirect('/login');
  const categories = await prisma.category.findMany({ orderBy: { name: 'asc' }, select: { id: true, name: true } });
  return <div><Link href="/admin/evaluations" className="text-sm text-gray-500 hover:underline">← Back to evaluations</Link><h1 className="text-2xl font-bold text-gray-800 mt-2 mb-1">Create evaluation</h1><p className="text-gray-500 mb-6">Configure metadata and assignments, then add questions from the evaluation detail page.</p>{categories.length ? <AdminEvaluationCreateForm categories={categories} /> : <div className="alert alert-warning">Create a category before adding an evaluation.</div>}</div>;
}
