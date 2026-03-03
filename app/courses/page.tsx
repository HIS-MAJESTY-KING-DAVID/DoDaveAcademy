import Link from 'next/link';
import CourseCard, { Course } from '@/components/courses/CourseCard';

const MOCK_COURSES: Course[] = [
  {
    id: '1',
    slug: 'web-development-bootcamp',
    title: 'Complete Web Development Bootcamp',
    description: 'Learn Web Development from A to Z in 100 days.',
    image: '/assets/images/courses/4by3/08.jpg',
    level: 'Beginner',
    duration: '56h',
    lessons: 450,
    rating: 4.8,
  },
  {
    id: '2',
    slug: 'react-mastery',
    title: 'React.js Mastery',
    description: 'Master React.js with Redux, Hooks, and Context API.',
    image: '/assets/images/courses/4by3/02.jpg',
    level: 'Intermediate',
    duration: '32h',
    lessons: 120,
    rating: 4.9,
  },
  {
    id: '3',
    slug: 'python-for-data-science',
    title: 'Python for Data Science',
    description: 'Data Science with Python, Pandas, Numpy, and Matplotlib.',
    image: '/assets/images/courses/4by3/03.jpg',
    level: 'Advanced',
    duration: '40h',
    lessons: 200,
    rating: 4.7,
  },
  {
    id: '4',
    slug: 'digital-marketing',
    title: 'Digital Marketing Strategy',
    description: 'Learn Digital Marketing Strategy, Social Media Marketing, SEO, YouTube, Email, Facebook Marketing, Analytics & More!',
    image: '/assets/images/courses/4by3/04.jpg',
    level: 'All Levels',
    duration: '22h',
    lessons: 85,
    rating: 4.6,
  },
   {
    id: '5',
    slug: 'graphic-design-masterclass',
    title: 'Graphic Design Masterclass',
    description: 'The Ultimate Graphic Design Course Which Covers Photoshop, Illustrator, InDesign, Design Theory, Branding and Logo Design.',
    image: '/assets/images/courses/4by3/05.jpg',
    level: 'Beginner',
    duration: '28h',
    lessons: 95,
    rating: 4.8,
  },
  {
    id: '6',
    slug: 'finance-investment',
    title: 'Finance & Investment Fundamentals',
    description: 'Understand Finance & Accounting, Investment, Financial Management, Valuation & Financial Analysis.',
    image: '/assets/images/courses/4by3/06.jpg',
    level: 'Beginner',
    duration: '15h',
    lessons: 45,
    rating: 4.5,
  }
];

export const metadata = {
  title: 'All Courses',
};

export default function CoursesPage() {
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

      <section className="pt-0">
        <div className="container">
          {/* Filter bar START (Placeholder) */}
          {/* Filter bar END */}

          <div className="row mt-3">
            {/* Main content START */}
            <div className="col-12">
              {/* Course Grid START */}
              <div className="row g-4">
                {MOCK_COURSES.length > 0 ? (
                  MOCK_COURSES.map((course) => (
                    <div key={course.id} className="col-sm-6 col-lg-4 col-xl-3">
                      <CourseCard course={course} />
                    </div>
                  ))
                ) : (
                  <div className="text-center p-4 mb-5 mt-5">
                    <h2>No Result Found</h2>
                  </div>
                )}
              </div>
              {/* Course Grid END */}

              {/* Pagination START (Placeholder) */}
              <div className="col-12">
                <div className="pagination-container mt-4 d-flex justify-content-center">
                   <nav>
                      <ul className="pagination pagination-primary-soft d-inline-block d-md-flex rounded mb-0">
                         <li className="page-item mb-0 disabled"><a className="page-link" href="#" tabIndex={-1}><i className="fas fa-angle-double-left"></i></a></li>
                         <li className="page-item mb-0 active"><a className="page-link" href="#">1</a></li>
                         <li className="page-item mb-0"><a className="page-link" href="#">2</a></li>
                         <li className="page-item mb-0"><a className="page-link" href="#">3</a></li>
                         <li className="page-item mb-0"><a className="page-link" href="#"><i className="fas fa-angle-double-right"></i></a></li>
                      </ul>
                   </nav>
                </div>
              </div>
              {/* Pagination END */}
            </div>
            {/* Main content END */}
          </div>
        </div>
      </section>

      {/* Newsletter START */}
      <section className="pt-0">
        <div className="container position-relative overflow-hidden">
          {/* SVG decoration */}
          <figure className="position-absolute top-50 start-50 translate-middle ms-3">
            <svg>
              <path className="fill-white opacity-2" d="m496 22.999c0 10.493-8.506 18.999-18.999 18.999s-19-8.506-19-18.999 8.507-18.999 19-18.999 18.999 8.506 18.999 18.999z" />
              <path className="fill-white opacity-2" d="m775 102.5c0 5.799-4.701 10.5-10.5 10.5-5.798 0-10.499-4.701-10.499-10.5 0-5.798 4.701-10.499 10.499-10.499 5.799 0 10.5 4.701 10.5 10.499z" />
              <path className="fill-white opacity-2" d="m192 102c0 6.626-5.373 11.999-12 11.999s-11.999-5.373-11.999-11.999c0-6.628 5.372-12 11.999-12s12 5.372 12 12z" />
              <path className="fill-white opacity-2" d="m20.499 10.25c0 5.66-4.589 10.249-10.25 10.249-5.66 0-10.249-4.589-10.249-10.249-0-5.661 4.589-10.25 10.249-10.25 5.661-0 10.25 4.589 10.25 10.25z" />
            </svg>
          </figure>
          {/* Svg decoration */}
          <figure className="position-absolute bottom-0 end-0 mb-5 d-none d-sm-block">
            <svg className="rotate-130" width="258.7px" height="86.9px" viewBox="0 0 258.7 86.9">
              <path stroke="white" fill="none" strokeWidth="2" d="M0,7.2c16,0,16,25.5,31.9,25.5c16,0,16-25.5,31.9-25.5c16,0,16,25.5,31.9,25.5c16,0,16-25.5,31.9-25.5 c16,0,16,25.5,31.9,25.5c16,0,16-25.5,31.9-25.5c16,0,16,25.5,31.9,25.5s16-25.5,31.9-25.5" />
              <path stroke="white" fill="none" strokeWidth="2" d="M0,57c16,0,16,25.5,31.9,25.5c16,0,16-25.5,31.9-25.5c16,0,16,25.5,31.9,25.5c16,0,16-25.5,31.9-25.5 c16,0,16,25.5,31.9,25.5c16,0,16-25.5,31.9-25.5c16,0,16,25.5,31.9,25.5s16-25.5,31.9-25.5" />
            </svg>
          </figure>

          <div className="bg-grad-blue p-3 p-sm-5 rounded-3">
            <div className="row justify-content-center position-relative">
              {/* SVG decoration */}
              <figure className="position-absolute top-50 start-0 translate-middle-y">
                <svg width="141px" height="141px">
                  <path d="M140.520,70.258 C140.520,109.064 109.062,140.519 70.258,140.519 C31.454,140.519 -0.004,109.064 -0.004,70.258 C-0.004,31.455 31.454,-0.003 70.258,-0.003 C109.062,-0.003 140.520,31.455 140.520,70.258 Z" />
                </svg>
              </figure>
              {/* Newsletter */}
              <div className="col-12 position-relative my-2 my-sm-3">
                <div className="col-lg-8 mx-auto text-center">
                  {/* Title */}
                  <h2 className="text-white">Subscribe to our Newsletter</h2>
                  <p className="text-white mb-3 bg-opacity-10">Get the latest news and updates on Kulmapeck courses</p>
                  {/* Form */}
                  <div className="bg-body rounded-2 p-2 shadow-lg">
                     <form className="row g-1">
                        <div className="col-9">
                           <input className="form-control border-0 me-1" type="email" placeholder="Enter your email" />
                        </div>
                        <div className="col-3">
                           <button type="button" className="btn btn-primary mb-0 w-100">Subscribe</button>
                        </div>
                     </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Newsletter END */}
    </main>
  );
}
