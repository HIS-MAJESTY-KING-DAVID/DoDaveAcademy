import Link from 'next/link';
import CourseCard, { Course as CourseType } from '@/components/courses/CourseCard';
import CourseFilter from '@/components/courses/CourseFilter';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export const metadata = {
  title: 'Online Courses',
  description: 'Browse our wide range of online courses designed to help you master new skills. From programming to business, find the right course for your career.',
  openGraph: {
    title: 'Online Courses | DoDave Academy',
    description: 'Explore our catalog of professional online courses. Learn at your own pace with expert instructors.',
  },
};

// Helper to map Prisma course to Component course
const mapCourse = (course: any): CourseType => { // eslint-disable-line @typescript-eslint/no-explicit-any
  return {
    id: course.id.toString(),
    slug: course.slug,
    title: course.title,
    description: course.description,
    image: course.media?.imageFile ? `/assets/images/courses/${course.media.imageFile}` : '/assets/images/courses/4by3/08.jpg', // Fallback image
    level: course.skillLevel?.name || 'All Levels',
    duration: course.duration,
    lessons: course.numberOfLessons,
    rating: course.review || 0,
  };
};

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  const page = typeof resolvedSearchParams.page === 'string' ? parseInt(resolvedSearchParams.page) : 1;
  const limit = 12;
  const search = typeof resolvedSearchParams.search === 'string' ? resolvedSearchParams.search : '';
  const categoryId = typeof resolvedSearchParams.categoryId === 'string' ? parseInt(resolvedSearchParams.categoryId) : undefined;
  const levelId = typeof resolvedSearchParams.levelId === 'string' ? parseInt(resolvedSearchParams.levelId) : undefined;
  const isFree = typeof resolvedSearchParams.isFree === 'string' ? resolvedSearchParams.isFree === 'true' : undefined;

  const where: Prisma.CourseWhereInput = {
    isPublished: true,
    isValidated: true,
    isRejected: false,
  };

  if (search) {
    where.OR = [
      { title: { contains: search } },
      { description: { contains: search } },
    ];
  }

  if (categoryId) {
    where.categoryId = categoryId;
  }

  if (levelId) {
    where.skillLevelId = levelId;
  }

  if (isFree !== undefined) {
    where.isFree = isFree;
  }

  // Fetch courses, total count, categories, and levels in parallel
  const [courses, total, categories, levels] = await Promise.all([
    prisma.course.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      include: {
        media: true,
        skillLevel: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    }),
    prisma.course.count({ where }),
    prisma.category.findMany({
      where: { categoryId: null },
      include: { categories: true },
      orderBy: { name: 'asc' },
    }),
    prisma.skillLevel.findMany({
      orderBy: { id: 'asc' },
    }),
  ]);

  const mappedCourses = courses.map(mapCourse);
  const totalPages = Math.ceil(total / limit);

  return (
    <main>
      {/* Page Banner START */}
      <section className="py-4">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="bg-light p-4 text-center rounded-3">
                <h1 className="m-0">Courses</h1>
                {/* Breadcrumb */}
                <div className="d-flex justify-content-center">
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb breadcrumb-dots mb-0">
                      <li className="breadcrumb-item">
                        <Link href="/">Home</Link>
                      </li>
                      <li className="breadcrumb-item active" aria-current="page">
                        Courses
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Page Banner END */}

      {/* Page content START */}
      <section className="pt-0">
        <div className="container">
          {/* Filter bar START */}
          <div className="row mb-4 align-items-center">
            {/* Search bar */}
            <div className="col-xl-9">
              <form className="bg-body border rounded p-2">
                <div className="input-group input-group-sm">
                  <input 
                    className="form-control border-0 me-1" 
                    type="search" 
                    placeholder="Search course" 
                    name="search"
                    defaultValue={search}
                  />
                  <button type="submit" className="btn btn-primary mb-0 rounded">
                    <i className="fas fa-search me-2"></i>Search
                  </button>
                </div>
              </form>
            </div>
          </div>
          {/* Filter bar END */}

          <div className="row mt-3">
            {/* Sidebar START */}
            <div className="col-lg-4 col-xl-3">
              <div className="responsive-sidebar">
                 <CourseFilter categories={categories} levels={levels} />
              </div>
            </div>
            {/* Sidebar END */}

            {/* Main content START */}
            <div className="col-lg-8 col-xl-9">
              {/* Course Grid START */}
              <div className="row g-4">
                {mappedCourses.length > 0 ? (
                  mappedCourses.map((course) => (
                    <div className="col-sm-6 col-xl-4" key={course.id}>
                      <CourseCard course={course} />
                    </div>
                  ))
                ) : (
                  <div className="col-12 text-center py-5">
                    <h3 className="text-muted">No courses found matching your criteria.</h3>
                    <Link href="/courses" className="btn btn-primary-soft mt-3">
                      Clear Filters
                    </Link>
                  </div>
                )}
              </div>
              {/* Course Grid END */}

              {/* Pagination START */}
              {totalPages > 1 && (
                <div className="col-12">
                  <nav className="mt-4 d-flex justify-content-center" aria-label="navigation">
                    <ul className="pagination pagination-primary-soft d-inline-block d-md-flex rounded mb-0">
                      {page > 1 && (
                        <li className="page-item mb-0">
                          <Link className="page-link" href={`/courses?page=${page - 1}${search ? `&search=${search}` : ''}`} tabIndex={-1}>
                            <i className="fas fa-angle-left"></i>
                          </Link>
                        </li>
                      )}
                      {[...Array(totalPages)].map((_, i) => (
                        <li key={i} className={`page-item mb-0 ${page === i + 1 ? 'active' : ''}`}>
                          <Link className="page-link" href={`/courses?page=${i + 1}${search ? `&search=${search}` : ''}`}>
                            {i + 1}
                          </Link>
                        </li>
                      ))}
                      {page < totalPages && (
                        <li className="page-item mb-0">
                          <Link className="page-link" href={`/courses?page=${page + 1}${search ? `&search=${search}` : ''}`}>
                            <i className="fas fa-angle-right"></i>
                          </Link>
                        </li>
                      )}
                    </ul>
                  </nav>
                </div>
              )}
              {/* Pagination END */}
            </div>
            {/* Main content END */}
          </div>
          {/* Row END */}
        </div>
      </section>
      {/* Page content END */}
    </main>
  );
}
