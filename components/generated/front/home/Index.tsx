import React, { useState } from 'react';
import Link from 'next/link';

interface User {
  id: string;
  // add other user props
}

interface Course {
  slug: string;
  intitule: string;
  media: { imageFile: string };
  price?: number;
  isFree?: boolean;
  rating?: number;
  reviews?: number;
  // add other course props
}

interface Category {
  category: {
    id: number;
    name: string;
    slug: string;
  };
  courses: Course[];
}

interface Review {
  message: string;
  rating: number;
  eleve: {
    utilisateur: {
      personne: {
        firstName: string;
        lastName: string;
        avatarPath: string;
      };
    };
  };
}

interface HomeProps {
  user?: User | null;
  categories: Category[];
  trendingCourses: Course[];
  topReviews: Review[];
}

export default function Home({ user, categories = [], trendingCourses = [], topReviews = [] }: HomeProps) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      {/* Custom Banner START */}
      {!user && (
        <section className="text-white py-3" style={{ backgroundColor: 'rgba(var(--bs-info-rgb))' }}>
          <div className="container text-center">
            <p className="mb-0">
              <strong className="d-block d-md-none">Create your account to get free access to all our courses for 2 days</strong>
              <strong className="d-none d-md-block" style={{ fontSize: '1.5rem' }}>Create your account to get free access to all our courses for 2 days</strong>
            </p>
          </div>
        </section>
      )}

      <section className="banner-with-background">
        <div className="container">
          <div className="row align-items-center text-center">
            {/* Banner text */}
            <div className="col-md-12">
              <p className="mb-4 fw-bold main-message">LEARN ON KULMAPECK</p>
              <p className="mb-4 fw-bold sub-message">Education within everyone's reach.</p>
              <Link href="/courses/category" className="btn btn-lg" style={{ backgroundColor: '#fd7e14', color: 'white', fontSize: '20px' }}>
                View all our courses
              </Link>
              {!user && (
                <div className="row justify-content-center mt-6">
                  <div className="col-6 col-md-6 d-flex justify-content-end">
                    <Link className="btn btn-custom" style={{ backgroundColor: 'white', color: '#09139f' }} href="/register">
                      Create an account
                    </Link>
                  </div>
                  <div className="col-6 col-md-6 d-flex justify-content-start">
                    <Link href="/login" className="btn btn-custom" style={{ backgroundColor: 'white', color: '#09139f' }}>
                      Log in
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      {/* Custom Banner END */}

      {/* Counter START */}
      <section className="py-0 py-xl-5 counter-block">
        <div className="container">
          <div className="row g-4">
            {/* Counter item */}
            <div className="col-sm-6 col-xl-3">
              <div className="d-flex justify-content-center align-items-center p-4 bg-warning bg-opacity-15 rounded-3">
                <span className="display-6 lh-1 text-warning mb-0"><i className="fas fa-tv"></i></span>
                <div className="ms-4 h6 fw-normal mb-0">
                  <div className="d-flex">
                    <h5 className="purecounter mb-0 fw-bold">10</h5>
                    <span className="mb-0 h5">K</span>
                  </div>
                  <p className="mb-0">Online Courses</p>
                </div>
              </div>
            </div>
            {/* Counter item */}
            <div className="col-sm-6 col-xl-3">
              <div className="d-flex justify-content-center align-items-center p-4 bg-blue bg-opacity-10 rounded-3">
                <span className="display-6 lh-1 text-blue mb-0"><i className="fas fa-user-tie"></i></span>
                <div className="ms-4 h6 fw-normal mb-0">
                  <div className="d-flex">
                    <h5 className="purecounter mb-0 fw-bold">200</h5>
                    <span className="mb-0 h5">+</span>
                  </div>
                  <p className="mb-0">Expert Tutors</p>
                </div>
              </div>
            </div>
            {/* Counter item */}
            <div className="col-sm-6 col-xl-3">
              <div className="d-flex justify-content-center align-items-center p-4 bg-purple bg-opacity-10 rounded-3">
                <span className="display-6 lh-1 text-purple mb-0"><i className="fas fa-user-graduate"></i></span>
                <div className="ms-4 h6 fw-normal mb-0">
                  <div className="d-flex">
                    <h5 className="purecounter mb-0 fw-bold">60</h5>
                    <span className="mb-0 h5">K+</span>
                  </div>
                  <p className="mb-0">Online Students</p>
                </div>
              </div>
            </div>
            {/* Counter item */}
            <div className="col-sm-6 col-xl-3">
              <div className="d-flex justify-content-center align-items-center p-4 bg-info bg-opacity-10 rounded-3">
                <span className="display-6 lh-1 text-info mb-0"><i className="bi bi-patch-check-fill"></i></span>
                <div className="ms-4 h6 fw-normal mb-0">
                  <div className="d-flex">
                    <h5 className="purecounter mb-0 fw-bold">6</h5>
                    <span className="mb-0 h5">K+</span>
                  </div>
                  <p className="mb-0">Certified Courses</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Counter END */}

      {/* Popular course START */}
      <section>
        <div className="container">
          <div className="row mb-4">
            <div className="col-lg-8 mx-auto text-center">
              <h2 className="fs-1">Most Popular</h2>
              <p className="mb-0">Choose from hundreds of free and premium courses</p>
            </div>
          </div>

          {/* Tabs START */}
          <ul className="nav nav-pills nav-pills-bg-soft justify-content-sm-center mb-4 px-3">
            {categories.map((cat, index) => (
              <li className="nav-item me-2 me-sm-5" key={index}>
                <button 
                  className={`nav-link mb-2 mb-md-0 ${activeTab === index ? 'active' : ''}`} 
                  onClick={() => setActiveTab(index)}
                >
                  {cat.category.name}
                </button>
              </li>
            ))}
            <li className="nav-item me-2 me-sm-5">
              <Link className="nav-link mb-2 mb-md-0" href="/courses">All Courses</Link>
            </li>
          </ul>
          {/* Tabs END */}

          {/* Tabs content START */}
          <div className="tab-content">
            {categories.map((cat, index) => (
              <div className={`tab-pane fade ${activeTab === index ? 'show active' : ''}`} key={index}>
                <div className="row g-4">
                  {cat.courses.map((course, idx) => (
                    <div className="col-sm-6 col-lg-4 col-xl-3" key={idx}>
                      <div className="card shadow h-100">
                        <img src={`/uploads/media/courses/${course.media.imageFile}`} className="card-img-top" alt={course.intitule} />
                        <div className="card-body pb-0">
                          <h5 className="card-title">
                            <Link href={`/course/${course.slug}`}>{course.intitule}</Link>
                          </h5>
                        </div>
                        <div className="card-footer pt-0 pb-3">
                          <hr />
                          <div className="d-flex justify-content-between">
                             <span className="h6 fw-light mb-0">
                                {course.isFree ? 'Free' : `${course.price || 0} FCFA`}
                             </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {/* Tabs content END */}
        </div>
      </section>
      {/* Popular course END */}

      {/* Action box START */}
      <section className="pt-0 pt-lg-5">
        <div className="container position-relative">
            {/* SVG decoration */}
            <div className="row">
                <div className="col-12">
                    <div className="bg-info p-4 p-sm-5 rounded-3">
                        <div className="row position-relative">
                            <div className="col-11 mx-auto position-relative">
                                <div className="row align-items-center">
                                    <div className="col-lg-7">
                                        <h3 className="text-white">Become an Instructor</h3>
                                        <p className="text-white mb-3 mb-lg-0">Speed up the skill acquisition process by teaching what you know.</p>
                                    </div>
                                    <div className="col-lg-5 text-lg-end">
                                        <Link href="/register?type=trainer" className="btn btn-outline-warning mb-0">Start Teaching Today</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>
      {/* Action box END */}

      {/* Trending courses START */}
      <section className="pb-5 pt-0 pt-lg-5">
        <div className="container">
            <div className="row mb-4">
                <div className="col-lg-8 mx-auto text-center">
                    <h2 className="fs-1">Trending Courses</h2>
                    <p className="mb-0">Check out our most popular courses</p>
                </div>
            </div>
            <div className="row g-4">
                {trendingCourses.map((course, index) => (
                    <div className="col-sm-6 col-lg-4 col-xl-3" key={index}>
                         <div className="card shadow h-100">
                            <img src={`/uploads/media/courses/${course.media.imageFile}`} className="card-img-top" alt={course.intitule} />
                            <div className="card-body">
                                <h5 className="card-title">
                                    <Link href={`/course/${course.slug}`}>{course.intitule}</Link>
                                </h5>
                            </div>
                         </div>
                    </div>
                ))}
            </div>
        </div>
      </section>
      {/* Trending courses END */}

      {/* Reviews START */}
      <section className="bg-light">
        <div className="container">
            <div className="row g-4 g-lg-5 align-items-center">
                <div className="col-xl-7 order-2 order-xl-1">
                    <div className="row mt-0 mt-xl-5">
                        <div className="col-md-7 position-relative mb-0 mt-0 mt-md-5">
                            {topReviews.length > 0 && (
                                <div className="bg-body shadow text-center p-4 rounded-3 position-relative mb-5 mb-md-0">
                                    <div className="avatar avatar-xl mb-3">
                                        <img className="avatar-img rounded-circle" src={topReviews[0].eleve.utilisateur.personne.avatarPath || '/assets/images/avatar/01.jpg'} alt="avatar" />
                                    </div>
                                    <blockquote>
                                        <p>
                                            <span className="me-1 small"><i className="fas fa-quote-left"></i></span>
                                            {topReviews[0].message}
                                            <span className="ms-1 small"><i className="fas fa-quote-right"></i></span>
                                        </p>
                                    </blockquote>
                                    <ul className="list-inline mb-2">
                                        {[...Array(5)].map((_, i) => (
                                            <li className="list-inline-item me-0 small" key={i}>
                                                <i className={`fas fa-star ${i < topReviews[0].rating ? 'text-warning' : 'text-muted'}`}></i>
                                            </li>
                                        ))}
                                    </ul>
                                    <h6 className="mb-0">
                                        {topReviews[0].eleve.utilisateur.personne.firstName || topReviews[0].eleve.utilisateur.personne.lastName}
                                    </h6>
                                </div>
                            )}
                        </div>
                        {/* Mentor list - simplified */}
                        <div className="col-md-5 mt-5 mt-md-0 d-none d-md-block">
                            <div className="bg-body shadow p-4 rounded-3 d-inline-block position-relative">
                                <h6 className="mb-3">100+ Verified Mentors</h6>
                                {/* ... mentors ... */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-5 order-1 text-center text-xl-start">
                    <h2 className="fs-1">Feedback</h2>
                    <p>What our students say about us</p>
                    {!user && (
                        <Link href="/register" className="btn btn-primary mb-0">Create an account</Link>
                    )}
                </div>
            </div>
        </div>
      </section>
      {/* Reviews END */}
    </>
  );
}
