import { Metadata } from 'next';
import HomeClient from '@/components/home/HomeClient';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const totalCourses = await prisma.course.count({ where: { isPublished: true, isValidated: true, isRejected: false } });
  const totalStudents = await prisma.student.count();
  const totalInstructors = await prisma.instructor.count();
  const totalExams = await prisma.exam.count({ where: { isPublished: true } });
  const courses = await prisma.course.findMany({
    where: { isPublished: true, isValidated: true, isRejected: false },
    include: { media: true, skillLevel: true, category: true, instructor: { include: { user: { include: { person: true } } } } },
    orderBy: { createdAt: 'desc' },
    take: 8,
  });
  const categories = await prisma.category.findMany({ where: { categoryId: null }, include: { categories: true }, orderBy: { name: 'asc' } });
  const featuredCourse = await prisma.course.findFirst({
    where: { isPublished: true, isValidated: true, isRejected: false },
    include: { media: true },
    orderBy: { review: 'desc' },
  });
  const testimonials = await prisma.review.findMany({
    include: {
      student: {
        include: { user: { include: { person: true } } },
      },
      course: { select: { title: true } },
    },
    orderBy: { createdAt: 'desc' },
    take: 6,
  });

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
    categoryId: c.categoryId,
  }));

  const heroImage = featuredCourse?.media?.imageFile
    ? `/assets/images/courses/${featuredCourse.media.imageFile}`
    : '/assets/images/element/05.svg';

  const mappedTestimonials = testimonials.map(r => ({
    id: r.id,
    name: r.student?.user?.person?.firstName
      ? `${r.student.user.person.firstName} ${r.student.user.person.lastName || ''}`
      : 'Student',
    avatar: r.student?.user?.person?.avatar
      ? `/assets/images/avatar/${r.student.user.person.avatar}`
      : null,
    rating: r.rating,
    message: r.message,
    courseTitle: r.course?.title || '',
    date: r.createdAt.toISOString(),
  }));

  return <HomeClient
    totalCourses={totalCourses}
    totalStudents={totalStudents}
    totalInstructors={totalInstructors}
    totalExams={totalExams}
    courses={mappedCourses}
    categories={categories.map(c => ({ id: c.id, name: c.name }))}
    heroImage={heroImage}
    testimonials={mappedTestimonials}
  />;
}
