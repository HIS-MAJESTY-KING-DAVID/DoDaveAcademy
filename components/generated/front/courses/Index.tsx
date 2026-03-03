import React from 'react';
import Link from 'next/link';

interface Course {
  slug: string;
  intitule: string;
  createdAt: string;
  media: {
    imageFile: string;
  };
  price?: number;
  isFree?: boolean;
}

interface PaginationData {
    currentPage: number;
    totalPages: number;
    totalItems: number;
}

interface IndexProps {
  courses: Course[];
  pagination?: PaginationData;
}

export default function Index({ courses = [], pagination }: IndexProps) {
  return (
    <>
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
          {/* Filter bar START */}
          {/* Add filter bar implementation if needed */}
          {/* Filter bar END */}

          <div className="row mt-3">
            {/* Main content START */}
            <div className="col-12">
              {/* Course Grid START */}
              <div className="row g-4">
                {courses.length > 0 ? (
                  courses.map((course, index) => (
                    <div className="col-sm-6 col-lg-4 col-xl-3" key={index}>
                      <div className="card shadow h-100">
                        <img 
                            src={`/uploads/media/courses/${course.media.imageFile}`} 
                            className="card-img-top" 
                            alt={course.intitule} 
                        />
                        <div className="card-body pb-0">
                          <div className="d-flex justify-content-between mb-2">
                            <a href="#" className="badge bg-purple bg-opacity-10 text-purple">All level</a>
                            <a href="#" className="h6 fw-light mb-0"><i className="far fa-heart"></i></a>
                          </div>
                          <h5 className="card-title">
                            <Link href={`/course/${course.slug}`}>{course.intitule}</Link>
                          </h5>
                          {/* Rating and other info could go here */}
                        </div>
                        <div className="card-footer pt-0 pb-3">
                          <hr />
                          <div className="d-flex justify-content-between">
                            <span className="h6 fw-light mb-0">
                                <i className="far fa-clock text-danger me-2"></i>
                                {new Date(course.createdAt).toLocaleDateString()}
                            </span>
                            <span className="h6 fw-light mb-0">
                                <i className="fas fa-table text-orange me-2"></i>
                                {course.isFree ? 'Free' : `${course.price || 0} FCFA`}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center p-4 mb-5 mt-5">
                    <h2>No results found</h2>
                  </div>
                )}
              </div>
              {/* Course Grid END */}

              {/* Pagination START */}
              {pagination && pagination.totalPages > 1 && (
                <div className="col-12">
                  <div className="pagination-container mt-4">
                     <nav aria-label="navigation">
                        <ul className="pagination justify-content-center">
                            {/* Simple pagination implementation */}
                             <li className={`page-item ${pagination.currentPage === 1 ? 'disabled' : ''}`}>
                                <Link className="page-link" href={`?page=${pagination.currentPage - 1}`}>Prev</Link>
                            </li>
                            {[...Array(pagination.totalPages)].map((_, i) => (
                                <li className={`page-item ${pagination.currentPage === i + 1 ? 'active' : ''}`} key={i}>
                                    <Link className="page-link" href={`?page=${i + 1}`}>{i + 1}</Link>
                                </li>
                            ))}
                            <li className={`page-item ${pagination.currentPage === pagination.totalPages ? 'disabled' : ''}`}>
                                <Link className="page-link" href={`?page=${pagination.currentPage + 1}`}>Next</Link>
                            </li>
                        </ul>
                     </nav>
                  </div>
                </div>
              )}
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
              <path stroke="white" fill="none" strokeWidth="2" d="M0,7.2c16,0,16,25.5,31.9,25.5c16,0,16-25.5,31.9-25.5c16,0,16,25.5,31.9,25.5c16,0,16-25.5,31.9-25.5 c16,0,16,25.5,31.9,25.5c16,0,16-25.5,31.9-25.5c16,0,16-25.5,31.9-25.5s16-25.5,31.9-25.5" />
              <path stroke="white" fill="none" strokeWidth="2" d="M0,57c16,0,16,25.5,31.9,25.5c16,0,16-25.5,31.9-25.5c16,0,16,25.5,31.9,25.5c16,0,16-25.5,31.9-25.5 c16,0,16,25.5,31.9,25.5c16,0,16-25.5,31.9-25.5c16,0,16,25.5,31.9,25.5s16-25.5,31.9-25.5" />
            </svg>
          </figure>

          <div className="bg-grad-blue p-3 p-sm-5 rounded-3">
            <div className="row justify-content-center position-relative">
              {/* SVG decoration */}
              <figure className="position-absolute top-50 start-0 translate-middle-y">
                <svg width="141px" height="141px">
                  <path className="fill-white opacity-1" d="M140.520,70.258 C140.520,109.064 109.062,140.519 70.258,140.519 C31.454,140.519 -0.004,109.064 -0.004,70.258 C-0.004,31.455 31.454,-0.003 70.258,-0.003 C109.062,-0.003 140.520,31.455 140.520,70.258 Z" />
                </svg>
              </figure>
              {/* Newsletter */}
              <div className="col-12 position-relative my-2 my-sm-3">
                <div className="row align-items-center">
                  {/* Title */}
                  <div className="col-lg-6">
                    <h3 className="text-white mb-3 mb-lg-0">Are you ready for conversation?</h3>
                  </div>
                  {/* Input item */}
                  <div className="col-lg-6 text-lg-end">
                    <form className="bg-body rounded p-2">
                      <div className="input-group">
                        <input className="form-control border-0 me-1" type="email" placeholder="Type your email here" />
                        <button type="button" className="btn btn-dark mb-0 rounded">Subscribe</button>
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
    </>
  );
}
