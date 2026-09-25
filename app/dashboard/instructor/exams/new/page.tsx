import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import ExamEditor from '../ExamEditor';

export default async function NewInstructorExamPage() {
  const session = await getSession();
  if (!session) redirect('/login');
  const instructor = await prisma.instructor.findUnique({ where: { userId: session.userId }, select: { isCertified: true } });
  if (!instructor?.isCertified) redirect('/dashboard/instructor/exams');
  const [categories, classes] = await Promise.all([
    prisma.category.findMany({ orderBy: { name: 'asc' }, select: { id: true, name: true } }),
    prisma.class.findMany({ orderBy: { name: 'asc' }, select: { id: true, name: true } }),
  ]);
  return <ExamEditor categories={categories} classes={classes} />;
}
