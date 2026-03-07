import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://academy.dodave.tech';

  const staticRoutes = [
    '',
    '/about',
    '/contact',
    '/courses',
    '/exams',
    '/faq',
    '/plan',
    '/programs',
    '/register',
    '/login',
    '/terms',
    '/become-teacher',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  const courses = await prisma.course.findMany({
    where: { isPublished: true },
    select: {
      slug: true,
      updatedAt: true,
      publishedAt: true,
      createdAt: true,
    },
  });

  const courseRoutes = courses.map((course) => ({
    url: `${baseUrl}/courses/${course.slug}`,
    lastModified: course.updatedAt || course.publishedAt || course.createdAt,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const exams = await prisma.exam.findMany({
    where: { isPublished: true },
    select: {
      reference: true,
      publishedAt: true,
    },
  });

  const examRoutes = exams.map((exam) => ({
    url: `${baseUrl}/exams/${exam.reference}`,
    lastModified: exam.publishedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...courseRoutes, ...examRoutes];
}
