'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

interface CourseData {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  level: string;
  duration: string;
  lessons: number;
  rating: number;
  price: string;
  instructorName: string;
}

interface TestimonialData {
  id: number;
  name: string;
  avatar: string | null;
  rating: number;
  message: string;
  courseTitle: string;
  date: string;
}

interface HomeClientProps {
  totalCourses: number;
  totalStudents: number;
  totalInstructors: number;
  totalExams: number;
  courses: CourseData[];
  categories: { id: number; name: string }[];
  heroImage: string;
  testimonials: TestimonialData[];
}

export default function HomeClient({ totalCourses, totalStudents, totalInstructors, totalExams, courses, categories, heroImage, testimonials }: HomeClientProps) {
  const { t } = useTranslation();

  return (
    <>
      {/* Hero Section START */}
      <section className="position-relative overflow-hidden pt-5 pt-lg-8 pb-5 bg-dark" data-bs-theme="dark">
        <div className="container">
          <div className="row align-items-center">
            {/* Left Content */}
            <div className="col-lg-6 mb-5 mb-lg-0">
              <h1 className="display-4 fw-bold mb-4 text-white">
                <span className="text-primary">{t('MAINMESSAGE_KEY')}</span> <br />
                DoDave Academy
              </h1>
              <p className="lead mb-4 text-white-50">{t('MAINMESSAGEDESCRIPTION_KEY')}</p>
              
              <div className="d-flex gap-3">
                <Link href="/courses" className="btn btn-primary btn-lg text-white">
                  {t('SEE_ALL_COURSES_KEY')}
                </Link>
                <Link href="/register" className="btn btn-outline-light btn-lg">
                  {t('CREATE_ACCOUNT_KEY')}
                </Link>
              </div>
              
              <div className="mt-5">
                <p className="mb-2 small fw-bold text-white">Trusted by students from:</p>
                <div className="d-flex gap-4 opacity-50">
                   <i className="fas fa-university fa-2x text-white"></i>
                   <i className="fas fa-graduation-cap fa-2x text-white"></i>
                   <i className="fas fa-school fa-2x text-white"></i>
                </div>
              </div>
            </div>

            {/* Right Image - featured course or default hero */}
            <div className="col-lg-6 text-center">
               <div className="position-relative d-inline-block">
                  <div className="position-absolute top-50 start-50 translate-middle bg-primary rounded-circle opacity-10 blur-3xl" style={{width: '300px', height: '300px', filter: 'blur(50px)'}}></div>
                  <Image 
                    src={heroImage} 
                    alt="Featured Course" 
                    width={600} 
                    height={600} 
                    className="img-fluid position-relative z-index-9 rounded-3"
                    priority
                    style={{ objectFit: 'cover', maxHeight: '450px' }}
                  />
               </div>
            </div>
          </div>
        </div>
      </section>

      <div id="quizNotification" className="btn btn-success" style={{ display: 'none' }}>{t('QUIZ_AVAILABLE_KEY')}</div>

      {/* Counter START */}
      <section className="py-5 bg-dark border-top border-bottom border-light border-opacity-10" data-bs-theme="dark">
        <div className="container">
          <div className="row g-4">
            <div className="col-sm-6 col-xl-3">
              <div className="d-flex align-items-center p-4 bg-white bg-opacity-10 border border-light border-opacity-10 shadow-sm rounded-3 h-100">
                <span className="display-6 lh-1 text-warning mb-0"><i className="fas fa-tv"></i></span>
                <div className="ms-4">
                  <div className="d-flex align-items-center">
                    <h5 className="mb-0 fw-bold display-6 text-white">{totalCourses}</h5>
                  </div>
                  <p className="mb-0 text-white-50">{t('OONLINECOURSES_KEY')}</p>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-xl-3">
              <div className="d-flex align-items-center p-4 bg-white bg-opacity-10 border border-light border-opacity-10 shadow-sm rounded-3 h-100">
                <span className="display-6 lh-1 text-primary mb-0"><i className="fas fa-user-tie"></i></span>
                <div className="ms-4">
                  <div className="d-flex align-items-center">
                    <h5 className="mb-0 fw-bold display-6 text-white">{totalInstructors}</h5>
                  </div>
                  <p className="mb-0 text-white-50">{t('EXPERTSTUTORS_KEY')}</p>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-xl-3">
              <div className="d-flex align-items-center p-4 bg-white bg-opacity-10 border border-light border-opacity-10 shadow-sm rounded-3 h-100">
                <span className="display-6 lh-1 text-purple mb-0"><i className="fas fa-user-graduate"></i></span>
                <div className="ms-4">
                  <div className="d-flex align-items-center">
                    <h5 className="mb-0 fw-bold display-6 text-white">{totalStudents}</h5>
                  </div>
                  <p className="mb-0 text-white-50">{t('ONLINESTUDENTS_KEY')}</p>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-xl-3">
              <div className="d-flex align-items-center p-4 bg-white bg-opacity-10 border border-light border-opacity-10 shadow-sm rounded-3 h-100">
                <span className="display-6 lh-1 text-info mb-0"><i className="bi bi-patch-check-fill"></i></span>
                <div className="ms-4">
                  <div className="d-flex align-items-center">
                    <h5 className="mb-0 fw-bold display-6 text-white">{totalExams}</h5>
                  </div>
                  <p className="mb-0 text-white-50">{t('CERTIFIEDCOURSES_KEY')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular course START */}
      <section className="py-5 bg-dark" data-bs-theme="dark">
        <div className="container">
          <div className="row mb-4">
            <div className="col-lg-8 mx-auto text-center">
              <h2 className="fs-1 fw-bold text-white">{t('MOSTPOPULAR_KEY')}</h2>
              <p className="mb-0 text-white-50">{t('MOSTPOPULARDESCRIPTION_KEY')}</p>
            </div>
          </div>

          {courses.length > 0 ? (
            <div className="row g-4">
              {courses.map((course) => (
                <div className="col-sm-6 col-lg-4 col-xl-3" key={course.id}>
                  <Link href={`/courses/${course.slug}`} className="text-decoration-none">
                    <div className="card bg-white bg-opacity-10 border border-light border-opacity-10 shadow-sm h-100 hover-shadow transition-all">
                      <div className="card-body pb-0">
                        <div className="d-flex justify-content-between mb-2">
                          <span className="badge bg-primary bg-opacity-10 text-primary">{course.level}</span>
                        </div>
                        <h5 className="card-title fw-bold text-white text-decoration-none">{course.title}</h5>
                        <p className="mb-2 text-truncate-2 small text-white-50">{course.description}</p>
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <div className="hstack gap-1">
                            <span className="text-warning fw-bold">{course.rating}</span>
                            <i className="fas fa-star text-warning small"></i>
                          </div>
                          <div className="hstack gap-1">
                            <i className="far fa-clock text-danger"></i>
                            <span className="small text-white-50">{course.duration}</span>
                          </div>
                        </div>
                      </div>
                      <div className="card-footer pt-0 pb-3 border-0 bg-transparent">
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="d-flex align-items-center">
                            <div className="avatar avatar-xs me-2">
                              <div className="avatar-img rounded-circle bg-primary text-white d-flex align-items-center justify-content-center" style={{width: '30px', height: '30px'}}>
                                {course.instructorName.charAt(0)}
                              </div>
                            </div>
                            <span className="small text-white-50">{course.instructorName}</span>
                          </div>
                          <h5 className="text-primary mb-0">{course.price}</h5>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-white-50">No courses available yet.</p>
            </div>
          )}
          
          <div className="text-center mt-5">
            <Link href="/courses" className="btn btn-outline-light">
                {t('VIEWMORECOURSES_KEY')} <i className="fas fa-arrow-right ms-2"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials START */}
      {testimonials.length > 0 && (
        <section className="py-5 bg-dark border-top border-light border-opacity-10" data-bs-theme="dark">
          <div className="container">
            <div className="row mb-4">
              <div className="col-lg-8 mx-auto text-center">
                <h2 className="fs-1 fw-bold text-white">What Our Students Say</h2>
                <p className="mb-0 text-white-50">Real feedback from real learners</p>
              </div>
            </div>
            <div className="row g-4">
              {testimonials.map((t) => (
                <div className="col-lg-4 col-md-6" key={t.id}>
                  <div className="card bg-white bg-opacity-10 border border-light border-opacity-10 shadow-sm h-100 p-3">
                    <div className="d-flex align-items-center mb-3">
                      <div className="avatar avatar-md me-3 flex-shrink-0">
                        {t.avatar ? (
                          <Image src={t.avatar} alt={t.name} width={48} height={48} className="avatar-img rounded-circle" style={{ objectFit: 'cover' }} />
                        ) : (
                          <div className="avatar-img rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold" style={{width: '48px', height: '48px'}}>
                            {t.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div>
                        <h6 className="mb-0 text-white">{t.name}</h6>
                        <small className="text-white-50">{t.courseTitle}</small>
                      </div>
                    </div>
                    <ul className="list-inline mb-2">
                      {[...Array(5)].map((_, i) => (
                        <li key={i} className="list-inline-item me-0 small">
                          <i className={`fas fa-star ${i < t.rating ? 'text-warning' : 'text-light opacity-25'}`}></i>
                        </li>
                      ))}
                    </ul>
                    <p className="mb-0 small text-white-50">&ldquo;{t.message}&rdquo;</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
