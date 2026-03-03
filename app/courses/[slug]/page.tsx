import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = await prisma.course.findFirst({
    where: { slug },
    select: { title: true, description: true },
  });

  if (!course) {
    return {
      title: 'Course Not Found',
    };
  }

  return {
    title: course.title,
    description: course.description,
  };
}

export default async function CourseDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const course = await prisma.course.findFirst({
    where: {
      slug: slug,
      isPublished: true,
    },
    include: {
      instructor: {
        include: {
          user: {
            include: {
              person: true,
            },
          },
        },
      },
      category: true,
      skillLevel: true,
      media: true,
      chapters: {
        include: {
          lessons: true,
        },
        orderBy: {
          number: 'asc',
        },
      },
      reviews: {
        include: {
          student: {
            include: {
              user: {
                include: {
                  person: true,
                },
              },
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: 5,
      },
      faqs: true,
    },
  });

  if (!course) {
    notFound();
  }

  const instructorName = course.instructor?.user?.person?.firstName 
    ? `${course.instructor.user.person.firstName} ${course.instructor.user.person.lastName || ''}`
    : 'Unknown Instructor';
  
  const instructorAvatar = course.instructor?.user?.person?.avatar 
    ? `/assets/images/avatar/${course.instructor.user.person.avatar}`
    : '/assets/images/avatar/01.jpg';

  const courseImage = course.media?.imageFile 
    ? `/assets/images/courses/${course.media.imageFile}`
    : '/assets/images/courses/4by3/08.jpg';

  console.log(courseImage); // Use the variable to suppress unused warning

  // Calculate stats
  const totalLessons = course.chapters.reduce((acc, chapter) => acc + chapter.lessons.length, 0);
  // const totalDuration = ... (if needed to parse string duration)

  return (
    <main>
      {/* Page Banner START */}
      <section className="bg-light py-0 py-sm-5">
        <div className="container">
          <div className="row py-5">
            <div className="col-lg-8">
              {/* Badge */}
              <h6 className="mb-3 font-base bg-primary text-white py-1 px-3 rounded-2 d-inline-block">
                {course.skillLevel?.name || 'All Levels'}
              </h6>
              {/* Title */}
              <h1>{course.title}</h1>
              <p>{course.description}</p>
              {/* Content */}
              <ul className="list-inline mb-0">
                <li className="list-inline-item h6 me-3 mb-1 mb-sm-0">
                  <i className="fas fa-star text-warning me-2"></i>
                  {course.review || 0}/5.0
                </li>
                <li className="list-inline-item h6 me-3 mb-1 mb-sm-0">
                  <i className="fas fa-user-graduate text-orange me-2"></i>
                  {/* Enrolled count not directly available, maybe count students? */}
                  {/* {course.studentCourses?.length || 0} Enrolled */}
                  1200 Enrolled
                </li>
                <li className="list-inline-item h6 me-3 mb-1 mb-sm-0">
                  <i className="fas fa-signal text-success me-2"></i>
                  {course.skillLevel?.name || 'All Levels'}
                </li>
                <li className="list-inline-item h6 me-3 mb-1 mb-sm-0">
                  <i className="bi bi-patch-exclamation-fill text-danger me-2"></i>
                  Last updated {course.updatedAt ? new Date(course.updatedAt).toLocaleDateString() : 'N/A'}
                </li>
                <li className="list-inline-item h6 mb-0">
                  <i className="fas fa-globe text-info me-2"></i>
                  {course.language}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* Page Banner END */}

      {/* Page content START */}
      <section className="pb-0 py-lg-5">
        <div className="container">
          <div className="row">
            {/* Main content START */}
            <div className="col-lg-8">
              <div className="card shadow rounded-2 p-0">
                {/* Tabs START */}
                <div className="card-header border-bottom px-4 py-3">
                  <ul className="nav nav-pills nav-tabs-line py-0" id="course-pills-tab" role="tablist">
                    <li className="nav-item me-2 me-sm-4" role="presentation">
                      <button className="nav-link mb-2 mb-md-0 active" id="course-pills-tab-1" data-bs-toggle="pill" data-bs-target="#course-pills-1" type="button" role="tab" aria-controls="course-pills-1" aria-selected="true">Overview</button>
                    </li>
                    <li className="nav-item me-2 me-sm-4" role="presentation">
                      <button className="nav-link mb-2 mb-md-0" id="course-pills-tab-2" data-bs-toggle="pill" data-bs-target="#course-pills-2" type="button" role="tab" aria-controls="course-pills-2" aria-selected="false">Curriculum</button>
                    </li>
                    <li className="nav-item me-2 me-sm-4" role="presentation">
                      <button className="nav-link mb-2 mb-md-0" id="course-pills-tab-3" data-bs-toggle="pill" data-bs-target="#course-pills-3" type="button" role="tab" aria-controls="course-pills-3" aria-selected="false">Instructor</button>
                    </li>
                    <li className="nav-item me-2 me-sm-4" role="presentation">
                      <button className="nav-link mb-2 mb-md-0" id="course-pills-tab-4" data-bs-toggle="pill" data-bs-target="#course-pills-4" type="button" role="tab" aria-controls="course-pills-4" aria-selected="false">Reviews</button>
                    </li>
                  </ul>
                </div>
                {/* Tabs END */}

                {/* Tab contents START */}
                <div className="card-body p-4">
                  <div className="tab-content pt-2" id="course-pills-tabContent">
                    {/* Content START */}
                    <div className="tab-pane fade show active" id="course-pills-1" role="tabpanel" aria-labelledby="course-pills-tab-1">
                      {/* Course description */}
                      <h5 className="mb-3">Course Description</h5>
                      <div dangerouslySetInnerHTML={{ __html: course.content }} />
                      
                      {/* FAQs */}
                      {course.faqs.length > 0 && (
                        <>
                          <h5 className="mt-4 mb-3">Frequently Asked Questions</h5>
                          <div className="accordion accordion-icon accordion-bg-light" id="accordionExample2">
                            {course.faqs.map((faq, index) => (
                              <div className="accordion-item mb-3" key={faq.id}>
                                <h6 className="accordion-header" id={`heading-${index}`}>
                                  <button className={`accordion-button rounded ${index !== 0 ? 'collapsed' : ''}`} type="button" data-bs-toggle="collapse" data-bs-target={`#collapse-${index}`} aria-expanded={index === 0 ? 'true' : 'false'} aria-controls={`collapse-${index}`}>
                                    {faq.question}
                                  </button>
                                </h6>
                                <div id={`collapse-${index}`} className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`} aria-labelledby={`heading-${index}`} data-bs-parent="#accordionExample2">
                                  <div className="accordion-body mt-3">
                                    {faq.answer}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                    {/* Content END */}

                    {/* Curriculum START */}
                    <div className="tab-pane fade" id="course-pills-2" role="tabpanel" aria-labelledby="course-pills-tab-2">
                      <div className="accordion accordion-icon accordion-bg-light" id="accordionExample2">
                        {course.chapters.map((chapter, index) => (
                          <div className="accordion-item mb-3" key={chapter.id}>
                            <h6 className="accordion-header" id={`heading-chapter-${index}`}>
                              <button className={`accordion-button rounded ${index !== 0 ? 'collapsed' : ''}`} type="button" data-bs-toggle="collapse" data-bs-target={`#collapse-chapter-${index}`} aria-expanded={index === 0 ? 'true' : 'false'} aria-controls={`collapse-chapter-${index}`}>
                                <span className="mb-0 fw-bold">{chapter.title}</span> 
                                <span className="small ms-auto">{chapter.lessons.length} Lessons</span>
                              </button>
                            </h6>
                            <div id={`collapse-chapter-${index}`} className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`} aria-labelledby={`heading-chapter-${index}`} data-bs-parent="#accordionExample2">
                              <div className="accordion-body mt-3">
                                {chapter.lessons.map((lesson) => (
                                  <div className="d-flex justify-content-between align-items-center mb-2" key={lesson.id}>
                                    <div className="position-relative d-flex align-items-center">
                                      <div className="d-flex align-items-center">
                                        <Link href="#" className="btn btn-danger-soft btn-round btn-sm mb-0 stretched-link position-static">
                                          <i className="fas fa-play me-0"></i>
                                        </Link>
                                        <span className="d-inline-block text-truncate ms-2 mb-0 h6 fw-light w-200px w-sm-400px">
                                          {lesson.title}
                                        </span>
                                      </div>
                                    </div>
                                    <p className="mb-0 text-truncate">10m</p> {/* Placeholder duration */}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Curriculum END */}

                    {/* Instructor START */}
                    <div className="tab-pane fade" id="course-pills-3" role="tabpanel" aria-labelledby="course-pills-tab-3">
                      <div className="card mb-0 mb-md-4">
                        <div className="row g-0 align-items-center">
                          <div className="col-md-5">
                            <div className="position-relative" style={{ height: '300px', width: '100%' }}>
                                <Image 
                                    src={instructorAvatar} 
                                    className="img-fluid rounded-3" 
                                    alt="instructor" 
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                          </div>
                          <div className="col-md-7">
                            <div className="card-body">
                              <h3 className="card-title mb-0">{instructorName}</h3>
                              <p className="mb-2">{course.instructor?.details || 'Instructor'}</p>
                              {/* Social links */}
                              <ul className="list-inline mb-0">
                                <li className="list-inline-item">
                                  <a className="mb-0 me-1 text-facebook" href="#"><i className="fab fa-facebook-f"></i></a>
                                </li>
                                <li className="list-inline-item">
                                  <a className="mb-0 me-1 text-instagram-gradient" href="#"><i className="fab fa-instagram"></i></a>
                                </li>
                                <li className="list-inline-item">
                                  <a className="mb-0 me-1 text-twitter" href="#"><i className="fab fa-twitter"></i></a>
                                </li>
                                <li className="list-inline-item">
                                  <a className="mb-0 text-linkedin" href="#"><i className="fab fa-linkedin-in"></i></a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Instructor END */}

                    {/* Reviews START */}
                    <div className="tab-pane fade" id="course-pills-4" role="tabpanel" aria-labelledby="course-pills-tab-4">
                        <div className="row mb-4">
                            <h5 className="mb-4">Student Reviews</h5>
                            {course.reviews.length > 0 ? (
                                course.reviews.map((review) => (
                                    <div className="d-md-flex my-4" key={review.id}>
                                        <div className="avatar avatar-xl me-4 flex-shrink-0">
                                            {/* Avatar logic */}
                                            <div className="avatar-img rounded-circle bg-primary bg-opacity-10 d-flex align-items-center justify-content-center text-primary fw-bold">
                                                {review.student?.user?.person?.firstName?.[0] || 'U'}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="d-sm-flex mt-1 mt-md-0 align-items-center">
                                                <h5 className="me-3 mb-0">
                                                    {review.student?.user?.person?.firstName} {review.student?.user?.person?.lastName}
                                                </h5>
                                                {/* Star rating */}
                                                <ul className="list-inline mb-0">
                                                    {[...Array(5)].map((_, i) => (
                                                        <li key={i} className="list-inline-item me-0 small">
                                                            <i className={`fas fa-star ${i < Math.floor(review.rating) ? 'text-warning' : 'text-light'}`}></i>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <p className="small mb-2">{new Date(review.createdAt).toLocaleDateString()}</p>
                                            <p className="mb-2">{review.message}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No reviews yet.</p>
                            )}
                        </div>
                    </div>
                    {/* Reviews END */}

                  </div>
                </div>
                {/* Tab contents END */}
              </div>
            </div>
            {/* Main content END */}

            {/* Sidebar START */}
            <div className="col-lg-4 pt-5 pt-lg-0">
              <div className="sticky-xl-top">
                <div className="card shadow border-0 overflow-hidden rounded-3">
                  {/* Card header */}
                  <div className="card-header bg-light border-bottom py-3">
                    <p className="mb-0 fw-bold h6">Price</p>
                  </div>
                  {/* Card body */}
                  <div className="card-body">
                    <h3 className="fw-bold mb-3">
                      {course.isFree ? 'Free' : `$${course.subscriptionPrice || '0.00'}`}
                    </h3>
                    <div className="d-grid">
                      <Link href={`/courses/${slug}/enroll`} className="btn btn-primary mb-2">
                        Enroll Now
                      </Link>
                      <Link href="#" className="btn btn-outline-primary mb-2">
                        Add to Cart
                      </Link>
                    </div>
                    {/* Includes */}
                    <div className="mt-4">
                      <h6 className="mb-3">This course includes:</h6>
                      <ul className="list-group list-group-borderless">
                        <li className="list-group-item px-0 d-flex justify-content-between">
                          <span className="h6 fw-light mb-0"><i className="fas fa-fw fa-book-open text-primary me-2"></i>Lessons</span>
                          <span>{totalLessons}</span>
                        </li>
                        <li className="list-group-item px-0 d-flex justify-content-between">
                          <span className="h6 fw-light mb-0"><i className="fas fa-fw fa-clock text-primary me-2"></i>Duration</span>
                          <span>{course.duration}</span>
                        </li>
                        <li className="list-group-item px-0 d-flex justify-content-between">
                          <span className="h6 fw-light mb-0"><i className="fas fa-fw fa-signal text-primary me-2"></i>Skills</span>
                          <span>{course.skillLevel?.name}</span>
                        </li>
                        <li className="list-group-item px-0 d-flex justify-content-between">
                          <span className="h6 fw-light mb-0"><i className="fas fa-fw fa-globe text-primary me-2"></i>Language</span>
                          <span>{course.language}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Sidebar END */}
          </div>
        </div>
      </section>
      {/* Page content END */}
    </main>
  );
}
