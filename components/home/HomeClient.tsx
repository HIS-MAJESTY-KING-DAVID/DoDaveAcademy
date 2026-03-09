'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

export default function HomeClient() {
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
                   {/* Placeholder for partner logos if needed, or just remove */}
                   <i className="fas fa-university fa-2x text-white"></i>
                   <i className="fas fa-graduation-cap fa-2x text-white"></i>
                   <i className="fas fa-school fa-2x text-white"></i>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="col-lg-6 text-center">
               <div className="position-relative d-inline-block">
                  {/* Decorative blob or shape could go here */}
                  <div className="position-absolute top-50 start-50 translate-middle bg-primary rounded-circle opacity-10 blur-3xl" style={{width: '300px', height: '300px', filter: 'blur(50px)'}}></div>
                  <Image 
                    src="/assets/images/element/05.svg" 
                    alt="Hero Image" 
                    width={600} 
                    height={600} 
                    className="img-fluid position-relative z-index-9"
                    priority
                  />
               </div>
            </div>
          </div>
        </div>
      </section>
      {/* Hero Section END */}

      <div id="quizNotification" className="btn btn-success" style={{ display: 'none' }}>{t('QUIZ_AVAILABLE_KEY')}</div>

      {/* Counter START */}
      <section className="py-5 bg-dark border-top border-bottom border-light border-opacity-10" data-bs-theme="dark">
        <div className="container">
          <div className="row g-4">
            {/* Counter item */}
            <div className="col-sm-6 col-xl-3">
              <div className="d-flex align-items-center p-4 bg-white bg-opacity-10 border border-light border-opacity-10 shadow-sm rounded-3 h-100">
                <span className="display-6 lh-1 text-warning mb-0"><i className="fas fa-tv"></i></span>
                <div className="ms-4">
                  <div className="d-flex align-items-center">
                    <h5 className="purecounter mb-0 fw-bold display-6 text-white" data-purecounter-start="0" data-purecounter-end="10" data-purecounter-delay="200">0</h5>
                    <span className="mb-0 h5 ms-1 text-white">K</span>
                  </div>
                  <p className="mb-0 text-white-50">{t('OONLINECOURSES_KEY')}</p>
                </div>
              </div>
            </div>
            {/* Counter item */}
            <div className="col-sm-6 col-xl-3">
              <div className="d-flex align-items-center p-4 bg-white bg-opacity-10 border border-light border-opacity-10 shadow-sm rounded-3 h-100">
                <span className="display-6 lh-1 text-primary mb-0"><i className="fas fa-user-tie"></i></span>
                <div className="ms-4">
                  <div className="d-flex align-items-center">
                    <h5 className="purecounter mb-0 fw-bold display-6 text-white" data-purecounter-start="0" data-purecounter-end="200" data-purecounter-delay="200">0</h5>
                    <span className="mb-0 h5 ms-1 text-white">+</span>
                  </div>
                  <p className="mb-0 text-white-50">{t('EXPERTSTUTORS_KEY')}</p>
                </div>
              </div>
            </div>
            {/* Counter item */}
            <div className="col-sm-6 col-xl-3">
              <div className="d-flex align-items-center p-4 bg-white bg-opacity-10 border border-light border-opacity-10 shadow-sm rounded-3 h-100">
                <span className="display-6 lh-1 text-purple mb-0"><i className="fas fa-user-graduate"></i></span>
                <div className="ms-4">
                  <div className="d-flex align-items-center">
                    <h5 className="purecounter mb-0 fw-bold display-6 text-white" data-purecounter-start="0" data-purecounter-end="60" data-purecounter-delay="200">0</h5>
                    <span className="mb-0 h5 ms-1 text-white">K+</span>
                  </div>
                  <p className="mb-0 text-white-50">{t('ONLINESTUDENTS_KEY')}</p>
                </div>
              </div>
            </div>
            {/* Counter item */}
            <div className="col-sm-6 col-xl-3">
              <div className="d-flex align-items-center p-4 bg-white bg-opacity-10 border border-light border-opacity-10 shadow-sm rounded-3 h-100">
                <span className="display-6 lh-1 text-info mb-0"><i className="bi bi-patch-check-fill"></i></span>
                <div className="ms-4">
                  <div className="d-flex align-items-center">
                    <h5 className="purecounter mb-0 fw-bold display-6 text-white" data-purecounter-start="0" data-purecounter-end="6" data-purecounter-delay="300">0</h5>
                    <span className="mb-0 h5 ms-1 text-white">K+</span>
                  </div>
                  <p className="mb-0 text-white-50">{t('CERTIFIEDCOURSES_KEY')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Counter END */}

      {/* Popular course START */}
      <section className="py-5 bg-dark" data-bs-theme="dark">
        <div className="container">
          <div className="row mb-4">
            <div className="col-lg-8 mx-auto text-center">
              <h2 className="fs-1 fw-bold text-white">{t('MOSTPOPULAR_KEY')}</h2>
              <p className="mb-0 text-white-50">{t('MOSTPOPULARDESCRIPTION_KEY')}</p>
            </div>
          </div>

          {/* Tabs START */}
          <ul className="nav nav-pills nav-pills-bg-soft justify-content-center mb-5" id="course-pills-tab" role="tablist">
            <li className="nav-item me-2 me-sm-4">
              <button className="nav-link mb-2 mb-md-0 active rounded-pill px-4" id="course-pills-tab-1" data-bs-toggle="pill" data-bs-target="#course-pills-tabs-1" type="button" role="tab" aria-controls="course-pills-tabs-1" aria-selected="true">Web Design</button>
            </li>
            <li className="nav-item me-2 me-sm-4">
              <button className="nav-link mb-2 mb-md-0 rounded-pill px-4" id="course-pills-tab-2" data-bs-toggle="pill" data-bs-target="#course-pills-tabs-2" type="button" role="tab" aria-controls="course-pills-tabs-2" aria-selected="false">Development</button>
            </li>
            <li className="nav-item me-2 me-sm-4">
              <button className="nav-link mb-2 mb-md-0 rounded-pill px-4" id="course-pills-tab-3" data-bs-toggle="pill" data-bs-target="#course-pills-tabs-3" type="button" role="tab" aria-controls="course-pills-tabs-3" aria-selected="false">Graphic Design</button>
            </li>
          </ul>
          {/* Tabs END */}

          {/* Tabs content START */}
          <div className="tab-content" id="course-pills-tabContent">
             <div className="tab-pane fade show active" id="course-pills-tabs-1" role="tabpanel" aria-labelledby="course-pills-tab-1">
                <div className="row g-4">
                   {/* Placeholder Course Item */}
                   <div className="col-sm-6 col-lg-4 col-xl-3">
                      <div className="card bg-white bg-opacity-10 border border-light border-opacity-10 shadow-sm h-100 hover-shadow transition-all">
                         <div className="card-body pb-0">
                            <div className="d-flex justify-content-between mb-2">
                               <span className="badge bg-primary bg-opacity-10 text-primary">All level</span>
                               <a href="#" className="h6 mb-0 text-danger"><i className="far fa-heart"></i></a>
                            </div>
                            <h5 className="card-title fw-bold"><a href="#" className="text-white text-decoration-none stretched-link">Sketch from A to Z</a></h5>
                            <p className="mb-2 text-truncate-2 small text-white-50">Proposal indulged no do cheerful you sociably as. Laughter ladies house the blind songs for society.</p>
                            <div className="d-flex justify-content-between align-items-center mb-2">
                               <div className="hstack gap-1">
                                  <span className="text-warning fw-bold">4.5</span>
                                  <i className="fas fa-star text-warning small"></i>
                                  <span className="small text-white-50">(650)</span>
                               </div>
                               <div className="hstack gap-1">
                                  <i className="far fa-clock text-danger"></i>
                                  <span className="small text-white-50">12h 56m</span>
                               </div>
                            </div>
                         </div>
                         <div className="card-footer pt-0 pb-3 border-0 bg-transparent">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center">
                                    <div className="avatar avatar-xs me-2">
                                        <div className="avatar-img rounded-circle bg-primary text-white d-flex align-items-center justify-content-center" style={{width: '30px', height: '30px'}}>D</div>
                                    </div>
                                    <span className="small text-white-50">DoDave</span>
                                </div>
                                <h5 className="text-primary mb-0">$150</h5>
                            </div>
                         </div>
                      </div>
                   </div>
                   {/* Add more placeholder items as needed */}
                </div>
             </div>
             {/* Other tabs... */}
          </div>
          {/* Tabs content END */}
          
          <div className="text-center mt-5">
            <Link href="/courses" className="btn btn-outline-light">
                {t('VIEWMORECOURSES_KEY')} <i className="fas fa-arrow-right ms-2"></i>
            </Link>
          </div>
        </div>
      </section>
      {/* Popular course END */}
    </>
  );
}
