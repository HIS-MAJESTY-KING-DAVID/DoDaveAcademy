import Link from 'next/link';
import Image from 'next/image';

// Mock Data for a single course (expanded from CourseCard interface)
const COURSE_DETAILS = {
  id: '1',
  slug: 'web-development-bootcamp',
  title: 'Complete Web Development Bootcamp',
  description: 'Learn Web Development from A to Z in 100 days. This comprehensive course covers everything you need to become a full-stack web developer.',
  content: `
    <p>Welcome to the Complete Web Development Bootcamp, the only course you need to learn to code and become a full-stack web developer. With over 50 hours of HD video tutorials and step-by-step challenges, this course is comprehensive and covers the latest web technologies.</p>
    <p>You will learn:</p>
    <ul>
        <li>HTML5 and CSS3</li>
        <li>JavaScript ES6+</li>
        <li>React.js</li>
        <li>Node.js and Express</li>
        <li>MongoDB and Mongoose</li>
        <li>Git and GitHub</li>
        <li>Deployment</li>
    </ul>
  `,
  image: '/assets/images/courses/4by3/08.jpg',
  level: 'Beginner',
  duration: '56h',
  lessons_count: 450,
  rating: 4.8,
  enrolled: 1200,
  instructor: {
    name: 'Louis K.',
    avatar: '/assets/images/avatar/01.jpg',
    role: 'Senior Developer & Instructor'
  },
  video: {
    poster: '/assets/images/videos/poster.jpg',
    url: '/assets/images/videos/720p.mp4' // Placeholder path
  },
  chapters: [
    {
      id: 1,
      title: 'Introduction to Web Development',
      lessons: [
        { title: 'How the Internet Works', duration: '10m' },
        { title: 'Setting up your Environment', duration: '15m' }
      ]
    },
    {
      id: 2,
      title: 'HTML 5',
      lessons: [
        { title: 'HTML Boilerplate', duration: '12m' },
        { title: 'HTML Tags', duration: '20m' },
        { title: 'HTML Forms', duration: '25m' }
      ]
    },
    {
      id: 3,
      title: 'CSS 3',
      lessons: [
        { title: 'CSS Selectors', duration: '18m' },
        { title: 'Box Model', duration: '22m' },
        { title: 'Flexbox', duration: '30m' },
        { title: 'Grid', duration: '35m' }
      ]
    }
  ],
  faqs: [
    { question: 'Do I need prior experience?', answer: 'No, this course is designed for absolute beginners.' },
    { question: 'Do I get a certificate?', answer: 'Yes, upon completion you will receive a certificate of completion.' }
  ],
  tags: ['Web Development', 'HTML', 'CSS', 'JavaScript', 'React']
};

export const metadata = {
  title: 'Course Details',
};

export default function CourseDetailsPage({ params }: { params: { slug: string } }) {
  // In a real app, we would fetch data based on params.slug
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { slug } = params;
  const course = COURSE_DETAILS;

  return (
    <main>
      <section className="py-0 pb-lg-5">
        <div className="container">
          <div className="row g-3">
            {/* Course video START */}
            <div className="col-12">
              <div className="video-player rounded-3">
                <video 
                    style={{ maxHeight: '600px', overflow: 'hidden', width: '100%' }} 
                    controls 
                    crossOrigin="anonymous" 
                    playsInline 
                    poster={course.video.poster}
                >
                    <source src={course.video.url} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
              </div>
            </div>
            {/* Course video END */}

            {/* Playlist responsive toggler START */}
            <div className="col-12 d-lg-none">
              <button className="btn btn-primary mb-3" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasSidebar" aria-controls="offcanvasSidebar">
                <i className="bi bi-camera-video me-1"></i> Playlist
              </button>
            </div>
            {/* Playlist responsive toggler END */}
          </div>
        </div>
      </section>

      <section className="pt-0">
        <div className="container">
          <div className="row g-lg-5">

            {/* Main content START */}
            <div className="col-lg-8">
              <div className="row g-4">
                
                {/* Course title START */}
                <div className="col-12">
                  {/* Title */}
                  <h1>{course.title}</h1>
                  {/* Content */}
                  <ul className="list-inline mb-0">
                    <li className="list-inline-item h6 me-3 mb-1 mb-sm-0"><i className="fas fa-star text-warning me-2"></i>{course.rating}/5.0</li>
                    <li className="list-inline-item h6 me-3 mb-1 mb-sm-0"><i className="fas fa-user-graduate text-orange me-2"></i>{course.enrolled} Enrolled</li>
                    <li className="list-inline-item h6 me-3 mb-1 mb-sm-0"><i className="fas fa-signal text-success me-2"></i>{course.level}</li>
                  </ul>
                </div>
                {/* Course title END */}

                {/* Instructor detail START */}
                <div className="col-12">
                  <div className="d-sm-flex justify-content-sm-between align-items-center">
                    {/* Avatar detail */}
                    <div className="d-flex align-items-center">
                      {/* Avatar image */}
                      <div className="avatar avatar-lg relative" style={{position: 'relative', width: '60px', height: '60px'}}>
                        <Image 
                            className="avatar-img rounded-circle" 
                            src={course.instructor.avatar} 
                            alt="avatar" 
                            fill
                            style={{objectFit: 'cover'}}
                        />
                      </div>
                      <div className="ms-3">
                        <h6 className="mb-0"><Link href="#">By {course.instructor.name}</Link></h6>
                        <p className="mb-0 small">{course.instructor.role}</p>
                      </div>
                    </div>

                    {/* Button */}
                    <div className="d-flex mt-2 mt-sm-0">
                      <a className="btn btn-danger-soft btn-sm mb-0" href="#">Follow</a>
                      {/* Share button with dropdown */}
                      <div className="dropdown ms-2">
                        <a href="#" className="btn btn-sm mb-0 btn-info-soft small" role="button" id="dropdownShare" data-bs-toggle="dropdown" aria-expanded="false">
                          Share
                        </a>
                        {/* dropdown button */}
                        <ul className="dropdown-menu dropdown-w-sm dropdown-menu-end min-w-auto shadow rounded" aria-labelledby="dropdownShare">
                          <li><a className="dropdown-item" href="#"><i className="fab fa-twitter-square me-2"></i>Twitter</a></li>
                          <li><a className="dropdown-item" href="#"><i className="fab fa-facebook-square me-2"></i>Facebook</a></li>
                          <li><a className="dropdown-item" href="#"><i className="fab fa-linkedin me-2"></i>LinkedIn</a></li>
                          <li><a className="dropdown-item" href="#"><i className="fas fa-copy me-2"></i>Copy link</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Instructor detail END */}

                {/* Course detail START */}
                <div className="col-12">
                  {/* Tabs START */}
                  <ul className="nav nav-pills nav-pills-bg-soft px-3" id="course-pills-tab" role="tablist">
                    <li className="nav-item me-2 me-sm-4" role="presentation">
                      <button className="nav-link mb-0 active" id="course-pills-tab-1" data-bs-toggle="pill" data-bs-target="#course-pills-1" type="button" role="tab" aria-controls="course-pills-1" aria-selected="true">Overview</button>
                    </li>
                    <li className="nav-item me-2 me-sm-4" role="presentation">
                      <button className="nav-link mb-0" id="course-pills-tab-2" data-bs-toggle="pill" data-bs-target="#course-pills-2" type="button" role="tab" aria-controls="course-pills-2" aria-selected="false">Reviews</button>
                    </li>
                    <li className="nav-item me-2 me-sm-4" role="presentation">
                      <button className="nav-link mb-0" id="course-pills-tab-3" data-bs-toggle="pill" data-bs-target="#course-pills-3" type="button" role="tab" aria-controls="course-pills-3" aria-selected="false">FAQs</button>
                    </li>
                  </ul>
                  {/* Tabs END */}

                  {/* Tab contents START */}
                  <div className="tab-content pt-4 px-3" id="course-pills-tabContent">
                    {/* Content START */}
                    <div className="tab-pane fade show active" id="course-pills-1" role="tabpanel" aria-labelledby="course-pills-tab-1">
                      <h5 className="mb-3">Course Description</h5>
                      <div dangerouslySetInnerHTML={{ __html: course.content }} />
                    </div>
                    {/* Content END */}

                    {/* Content START */}
                    <div className="tab-pane fade" id="course-pills-2" role="tabpanel" aria-labelledby="course-pills-tab-2">
                       <p>Reviews section placeholder...</p>
                    </div>
                    {/* Content END */}

                    {/* Content START */}
                    <div className="tab-pane fade" id="course-pills-3" role="tabpanel" aria-labelledby="course-pills-tab-3">
                      <h5 className="mb-3">Frequently Asked Questions</h5>
                      {course.faqs.map((faq, index) => (
                        <div key={index} className="mt-4">
                          <h6>{faq.question}</h6>
                          <p className="mb-0">{faq.answer}</p>
                        </div>
                      ))}
                    </div>
                    {/* Content END */}
                    
                    <div className="mt-5 text-right">
                        <Link href="#" className="btn btn-primary-soft">Start Learning</Link>
                    </div>

                  </div>
                  {/* Tab contents END */}
                </div>
                {/* Course detail END */}
              </div>
            </div>
            {/* Main content END */}

            {/* Right sidebar START */}
            <div className="col-lg-4">
              <div className="offcanvas-lg offcanvas-end" tabIndex={-1} id="offcanvasSidebar" aria-labelledby="offcanvasSidebarLabel">
                <div className="offcanvas-header bg-dark">
                  <h5 className="offcanvas-title text-white" id="offcanvasSidebarLabel">Course playlist</h5>
                  <button type="button" className="btn btn-sm btn-light mb-0" data-bs-dismiss="offcanvas" data-bs-target="#offcanvasSidebar" aria-label="Close"><i className="bi bi-x-lg"></i></button>
                </div>
                <div className="offcanvas-body p-3 p-lg-0">
                  <div className="col-12">
                    {/* Accordion START */}
                    <div className="accordion accordion-icon accordion-bg-light" id="accordionExample2">
                      {course.chapters.map((chapter, index) => (
                        <div key={chapter.id} className="accordion-item mb-3">
                          <h6 className="accordion-header font-base" id={`heading-${chapter.id}`}>
                            <a className={`accordion-button fw-bold rounded ${index > 0 ? 'collapsed' : ''} d-block`} href={`#collapse-${chapter.id}`} data-bs-toggle="collapse" data-bs-target={`#collapse-${chapter.id}`} aria-expanded={index === 0 ? 'true' : 'false'} aria-controls={`collapse-${chapter.id}`}>
                              <span className="mb-0">{chapter.title}</span>
                              <span className="small d-block mt-1">({chapter.lessons.length} Lectures)</span>
                            </a>
                          </h6>
                          <div id={`collapse-${chapter.id}`} className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`} aria-labelledby={`heading-${chapter.id}`} data-bs-parent="#accordionExample2">
                            <div className="accordion-body mt-3">
                              <div className="vstack gap-3">
                                {chapter.lessons.map((lesson, lessonIndex) => (
                                  <div key={lessonIndex} className="d-flex justify-content-between align-items-center">
                                    <div className="position-relative d-flex align-items-center">
                                      <a href="#" className="btn btn-danger-soft btn-round btn-sm mb-0 stretched-link position-static">
                                        <i className="fas fa-play me-0"></i>
                                      </a>
                                      <span className="d-inline-block text-truncate ms-2 mb-0 h6 fw-light w-200px">{lesson.title}</span>
                                    </div>
                                    <p className="mb-0 text-truncate">{lesson.duration}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* Accordion END */}
                  </div>
                </div>
              </div>

              {/* Tags START */}
              <div className="mt-4">
                <h4 className="mb-3">Tags</h4>
                <ul className="list-inline mb-0">
                  {course.tags.map((tag, index) => (
                    <li key={index} className="list-inline-item"> <a className="btn btn-outline-light btn-sm" href="#">{tag}</a> </li>
                  ))}
                </ul>
              </div>
              {/* Tags END */}
            </div>
            {/* Right sidebar END */}

          </div>{/* Row END */}
        </div>
      </section>
    </main>
  );
}
