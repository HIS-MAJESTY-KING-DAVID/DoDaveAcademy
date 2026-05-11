import { Metadata } from 'next';
import HomeClient from '@/components/home/HomeClient';
import { prisma } from '@/lib/prisma';

export const metadata: Metadata = {
  title: 'DoDave Academy | Innovative Digital Education for Africa',
  description: 'DoDave Academy offers innovative digital education solutions tailored for the African context. Explore our courses, exams, and programs to enhance your skills.',
  openGraph: {
    title: 'DoDave Academy | Innovative Digital Education for Africa',
    description: 'Innovative digital education solutions tailored for the African context. Empowering students and professionals with cutting-edge courses and exams.',
  },
};

export default async function Home() {
  const [totalCourses, totalStudents, totalInstructors, totalExams, courses, categories] = await Promise.all([
    prisma.course.count({ where: { isPublished: true, isValidated: true, isRejected: false } }),
    prisma.student.count(),
    prisma.instructor.count(),
    prisma.exam.count({ where: { isPublished: true } }),
    prisma.course.findMany({
      where: { isPublished: true, isValidated: true, isRejected: false },
      include: { media: true, skillLevel: true, category: true, instructor: { include: { user: { include: { person: true } } } } },
      orderBy: { createdAt: 'desc' },
      take: 8,
    }),
    prisma.category.findMany({ where: { categoryId: null }, include: { categories: true }, orderBy: { name: 'asc' } }),
  ]);

  const mappedCourses = courses.map(c => ({
    id: c.id.toString(),
    slug: c.slug,
    title: c.title,
    description: c.description,
    image: c.media?.imageFile ? `/assets/images/courses/${c.media.imageFile}` : '/assets/images/courses/4by3/08.jpg',
    level: c.skillLevel?.name || 'All Levels',
    duration: c.duration,
    lessons: c.numberOfLessons,
    rating: c.review || 0,
    price: c.isFree ? 'Free' : `${c.subscriptionPrice || 0} CFA`,
    instructorName: c.instructor?.user?.person?.firstName
      ? `${c.instructor.user.person.firstName} ${c.instructor.user.person.lastName || ''}`
      : 'Instructor',
  }));

  return <HomeClient
    totalCourses={totalCourses}
    totalStudents={totalStudents}
    totalInstructors={totalInstructors}
    totalExams={totalExams}
    courses={mappedCourses}
    categories={categories.map(c => ({ id: c.id, name: c.name }))}
  />;
}
