import { notFound, redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import ExamEditor from '../../ExamEditor';

export default async function EditInstructorExamPage({ params }: { params: Promise<{ reference: string }> }) {
  const session = await getSession();
  if (!session) redirect('/login');
  const { reference } = await params;
  const [exam, categories, classes] = await Promise.all([
    prisma.exam.findFirst({ where: { reference, userId: session.userId }, include: { category: true, class: true } }),
    prisma.category.findMany({ orderBy: { name: 'asc' }, select: { id: true, name: true } }),
    prisma.class.findMany({ orderBy: { name: 'asc' }, select: { id: true, name: true } }),
  ]);
  if (!exam) notFound();
  return <ExamEditor exam={exam} categories={categories} classes={classes} />;
}
