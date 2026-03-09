import type { Metadata } from 'next';
import Link from 'next/link';
import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';

function buildExamPageHref(
  page: number,
  search: string,
  categoryId?: number,
  classId?: number,
  levelId?: number,
  language?: string
) {
  const params = new URLSearchParams();
  params.set('page', String(page));

  if (search) params.set('search', search);
  if (categoryId) params.set('categoryId', String(categoryId));
  if (classId) params.set('classId', String(classId));
  if (levelId) params.set('levelId', String(levelId));
  if (language) params.set('language', language);

  return `/exams?${params.toString()}`;
}

export const metadata: Metadata = {
  title: 'Official Exams',
  description: 'Prepare for your certifications with our collection of official exams and corrections. Test your knowledge and get ready for success.',
  openGraph: {
    title: 'Official Exams & Corrections | DoDave Academy',
    description: 'Access our database of official exams. Practice with past papers and detailed corrections.',
  },
};

export default async function ExamsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;

  const page = Math.max(
    1,
    typeof resolvedSearchParams.page === 'string'
      ? Number.parseInt(resolvedSearchParams.page, 10) || 1
      : 1
  );
  const limit = 9;
  const search =
    typeof resolvedSearchParams.search === 'string'
      ? resolvedSearchParams.search.trim()
      : '';
  const categoryId =
    typeof resolvedSearchParams.categoryId === 'string'
      ? Number.parseInt(resolvedSearchParams.categoryId, 10) || undefined
      : undefined;
  const classId =
    typeof resolvedSearchParams.classId === 'string'
      ? Number.parseInt(resolvedSearchParams.classId, 10) || undefined
      : undefined;
  const levelId =
    typeof resolvedSearchParams.levelId === 'string'
      ? Number.parseInt(resolvedSearchParams.levelId, 10) || undefined
      : undefined;
  const language =
    typeof resolvedSearchParams.language === 'string'
      ? resolvedSearchParams.language
      : undefined;

  const where: Prisma.ExamWhereInput = {
    isPublished: true,
  };

  if (search) {
    where.OR = [
      { title: { contains: search } },
      { description: { contains: search } },
      { reference: { contains: search } },
    ];
  }

  if (categoryId) where.categoryId = categoryId;
  if (classId) where.classId = classId;
  if (language) where.language = { equals: language };
  if (levelId) where.class = { is: { skillLevelId: levelId } };

  const [exams, total, categories, classes, levels] = await Promise.all([
    prisma.exam.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      include: {
        category: true,
        class: {
          include: {
            skillLevel: true,
          },
        },
        user: {
          include: {
            person: true,
          },
        },
      },
      orderBy: {
        publishedAt: 'desc',
      },
    }),
    prisma.exam.count({ where }),
    prisma.category.findMany({
      where: { categoryId: null },
      orderBy: { name: 'asc' },
    }),
    prisma.class.findMany({
      include: { skillLevel: true },
      orderBy: { name: 'asc' },
    }),
    prisma.skillLevel.findMany({
      orderBy: { id: 'asc' },
    }),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / limit));

  return (
    <main>
      <section className="py-4">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="bg-light p-4 text-center rounded-3">
                <h1 className="m-0">Exams</h1>
                <div className="d-flex justify-content-center">
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb breadcrumb-dots mb-0">
                      <li className="breadcrumb-item">
                        <Link href="/">Home</Link>
                      </li>
                      <li className="breadcrumb-item active" aria-current="page">
                        Exams
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-0">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-3">
              <div className="card card-body shadow-sm">
                <h5 className="mb-3">Filter Exams</h5>
                <form method="GET" action="/exams" className="d-grid gap-3">
                  <div>
                    <label className="form-label">Search</label>
                    <input
                      className="form-control"
                      type="text"
                      name="search"
                      defaultValue={search}
                      placeholder="Title, description, reference"
                    />
                  </div>

                  <div>
                    <label className="form-label">Category</label>
                    <select className="form-select" name="categoryId" defaultValue={categoryId ?? ''}>
                      <option value="">All categories</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="form-label">Class</label>
                    <select className="form-select" name="classId" defaultValue={classId ?? ''}>
                      <option value="">All classes</option>
                      {classes.map((classItem) => (
                        <option key={classItem.id} value={classItem.id}>
                          {classItem.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="form-label">Level</label>
                    <select className="form-select" name="levelId" defaultValue={levelId ?? ''}>
                      <option value="">All levels</option>
                      {levels.map((level) => (
                        <option key={level.id} value={level.id}>
                          {level.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="form-label">Language</label>
                    <select className="form-select" name="language" defaultValue={language ?? ''}>
                      <option value="">All languages</option>
                      <option value="English">English</option>
                      <option value="French">French</option>
                    </select>
                  </div>

                  <button type="submit" className="btn btn-primary">
                    Apply Filters
                  </button>
                  <Link href="/exams" className="btn btn-outline-secondary">
                    Reset
                  </Link>
                </form>
              </div>
            </div>

            <div className="col-lg-9">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="mb-0">Available Exams</h4>
                <span className="text-muted">{total} result(s)</span>
              </div>

              {exams.length === 0 ? (
                <div className="alert alert-warning mb-0">No exams found with the selected filters.</div>
              ) : (
                <div className="row g-4">
                  {exams.map((exam) => (
                    <div className="col-md-6 col-xl-4" key={exam.id}>
                      <div className="card border h-100 shadow-sm">
                        <div className="card-body d-flex flex-column">
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            <span className="badge bg-primary bg-opacity-10 text-primary">
                              {exam.language}
                            </span>
                            {exam.class?.skillLevel?.name && (
                              <span className="badge bg-light text-dark border">
                                {exam.class.skillLevel.name}
                              </span>
                            )}
                          </div>
                          <h6 className="card-title mb-2">{exam.title}</h6>
                          <p className="text-muted small mb-2">
                            {exam.description.length > 120
                              ? `${exam.description.slice(0, 120)}...`
                              : exam.description}
                          </p>
                          <div className="small text-muted mb-3">
                            <div>Reference: {exam.reference}</div>
                            {exam.category?.name && <div>Category: {exam.category.name}</div>}
                            {exam.class?.name && <div>Class: {exam.class.name}</div>}
                          </div>
                          <Link href={`/exams/${exam.reference}`} className="btn btn-sm btn-primary mt-auto">
                            Open Exam
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {totalPages > 1 && (
                <nav className="mt-4 d-flex justify-content-center" aria-label="Exam pagination">
                  <ul className="pagination pagination-primary-soft mb-0">
                    {page > 1 && (
                      <li className="page-item">
                        <Link
                          className="page-link"
                          href={buildExamPageHref(
                            page - 1,
                            search,
                            categoryId,
                            classId,
                            levelId,
                            language
                          )}
                        >
                          <i className="fas fa-angle-left"></i>
                        </Link>
                      </li>
                    )}
                    {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                      <li
                        key={pageNumber}
                        className={`page-item ${pageNumber === page ? 'active' : ''}`}
                      >
                        <Link
                          className="page-link"
                          href={buildExamPageHref(
                            pageNumber,
                            search,
                            categoryId,
                            classId,
                            levelId,
                            language
                          )}
                        >
                          {pageNumber}
                        </Link>
                      </li>
                    ))}
                    {page < totalPages && (
                      <li className="page-item">
                        <Link
                          className="page-link"
                          href={buildExamPageHref(
                            page + 1,
                            search,
                            categoryId,
                            classId,
                            levelId,
                            language
                          )}
                        >
                          <i className="fas fa-angle-right"></i>
                        </Link>
                      </li>
                    )}
                  </ul>
                </nav>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
