import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import NewEvaluationForm from './NewEvaluationForm';

export default async function NewEvaluationPage() {
  const session = await getSession();
  if (!session) redirect('/login');
  const instructor = await prisma.instructor.findUnique({ where: { userId: session.userId }, select: { id: true } });
  if (!instructor) redirect('/dashboard/student');
  const [categories, classes, students] = await Promise.all([
    prisma.category.findMany({ orderBy: { name: 'asc' }, select: { id: true, name: true } }),
    prisma.class.findMany({ orderBy: { name: 'asc' }, select: { id: true, name: true } }),
    prisma.student.findMany({ include: { user: { include: { person: true } } }, orderBy: { id: 'desc' }, take: 500 }),
  ]);
  return <NewEvaluationForm categories={categories} classes={classes} students={students.map((student) => ({ id: student.id, name: `${student.user?.person?.firstName || ''} ${student.user?.person?.lastName || ''}`.trim() || student.user?.email || `Student #${student.id}` }))} />;
}
