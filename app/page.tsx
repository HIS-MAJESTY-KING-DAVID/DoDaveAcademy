'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t } = useTranslation();

  return (
    <>
      {/* Custom Banner START */}
      <section className="banner-with-background">
        <div className="container">
          <div className="row align-items-center text-center">
            {/* Texte de la bannière */}
            <div className="col-md-12">
              <p className="mb-4 fw-bold main-message">{t('MAINMESSAGE_KEY')} DoDave Academy</p>
              <p className="mb-4 fw-bold sub-message">{t('MAINMESSAGEDESCRIPTION_KEY')}</p>
              <Link href="/courses" className="btn btn-lg" style={{ backgroundColor: '#fd7e14', color: 'white', fontSize: '20px' }}>
                {t('SEE_ALL_COURSES_KEY')}
              </Link>
              
              <div className="row justify-content-center mt-6">
                 <div className="col-6 col-md-6 d-flex justify-content-end">
                    <Link className="btn btn-custom" style={{ backgroundColor: 'white', color: '#09139f' }} href="/register">
                       {t('CREATE_ACCOUNT_KEY')}
                    </Link>
                 </div>
                 <div className="col-6 col-md-6 d-flex justify-content-start">
                    <Link href="/login" className="btn btn-custom" style={{ backgroundColor: 'white', color: '#09139f' }}>
                       {t('SIGN_IN_KEY')}
                    </Link>
                 </div>
              </div>

            </div>
          </div>
        </div>
      </section>
      {/* Custom Banner END */}

      <div id="quizNotification" className="btn btn-success" style={{ display: 'none' }}>{t('QUIZ_AVAILABLE_KEY')}</div>

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
                    <h5 className="purecounter mb-0 fw-bold" data-purecounter-start="0" data-purecounter-end="10" data-purecounter-delay="200">0</h5>
                    <span className="mb-0 h5">K</span>
                  </div>
                  <p className="mb-0">{t('OONLINECOURSES_KEY')}</p>
                </div>
              </div>
            </div>
            {/* Counter item */}
            <div className="col-sm-6 col-xl-3">
              <div className="d-flex justify-content-center align-items-center p-4 bg-blue bg-opacity-10 rounded-3">
                <span className="display-6 lh-1 text-blue mb-0"><i className="fas fa-user-tie"></i></span>
                <div className="ms-4 h6 fw-normal mb-0">
                  <div className="d-flex">
                    <h5 className="purecounter mb-0 fw-bold" data-purecounter-start="0" data-purecounter-end="200" data-purecounter-delay="200">0</h5>
                    <span className="mb-0 h5">+</span>
                  </div>
                  <p className="mb-0">{t('EXPERTSTUTORS_KEY')}</p>
                </div>
              </div>
            </div>
            {/* Counter item */}
            <div className="col-sm-6 col-xl-3">
              <div className="d-flex justify-content-center align-items-center p-4 bg-purple bg-opacity-10 rounded-3">
                <span className="display-6 lh-1 text-purple mb-0"><i className="fas fa-user-graduate"></i></span>
                <div className="ms-4 h6 fw-normal mb-0">
                  <div className="d-flex">
                    <h5 className="purecounter mb-0 fw-bold" data-purecounter-start="0" data-purecounter-end="60" data-purecounter-delay="200">0</h5>
                    <span className="mb-0 h5">K+</span>
                  </div>
                  <p className="mb-0">{t('ONLINESTUDENTS_KEY')}</p>
                </div>
              </div>
            </div>
            {/* Counter item */}
            <div className="col-sm-6 col-xl-3">
              <div className="d-flex justify-content-center align-items-center p-4 bg-info bg-opacity-10 rounded-3">
                <span className="display-6 lh-1 text-info mb-0"><i className="bi bi-patch-check-fill"></i></span>
                <div className="ms-4 h6 fw-normal mb-0">
                  <div className="d-flex">
                    <h5 className="purecounter mb-0 fw-bold" data-purecounter-start="0" data-purecounter-end="6" data-purecounter-delay="300">0</h5>
                    <span className="mb-0 h5">K+</span>
                  </div>
                  <p className="mb-0">{t('CERTIFIEDCOURSES_KEY')}</p>
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
              <h2 className="fs-1">{t('MOSTPOPULAR_KEY')}</h2>
              <p className="mb-0">{t('MOSTPOPULARDESCRIPTION_KEY')}</p>
            </div>
          </div>

          {/* Tabs START */}
          <ul className="nav nav-pills nav-pills-bg-soft justify-content-sm-center mb-4 px-3" id="course-pills-tab" role="tablist">
            <li className="nav-item me-2 me-sm-5">
              <button className="nav-link mb-2 mb-md-0 active" id="course-pills-tab-1" data-bs-toggle="pill" data-bs-target="#course-pills-tabs-1" type="button" role="tab" aria-controls="course-pills-tabs-1" aria-selected="true">Web Design</button>
            </li>
            <li className="nav-item me-2 me-sm-5">
              <button className="nav-link mb-2 mb-md-0" id="course-pills-tab-2" data-bs-toggle="pill" data-bs-target="#course-pills-tabs-2" type="button" role="tab" aria-controls="course-pills-tabs-2" aria-selected="false">Development</button>
            </li>
            <li className="nav-item me-2 me-sm-5">
              <button className="nav-link mb-2 mb-md-0" id="course-pills-tab-3" data-bs-toggle="pill" data-bs-target="#course-pills-tabs-3" type="button" role="tab" aria-controls="course-pills-tabs-3" aria-selected="false">Graphic Design</button>
            </li>
          </ul>
          {/* Tabs END */}

          {/* Tabs content START */}
          <div className="tab-content" id="course-pills-tabContent">
             <div className="tab-pane fade show active" id="course-pills-tabs-1" role="tabpanel" aria-labelledby="course-pills-tab-1">
                <div className="row g-4">
                   {/* Placeholder Course Item */}
                   <div className="col-sm-6 col-lg-4 col-xl-3">
                      <div className="card shadow h-100">
                         <div className="card-body pb-0">
                            <div className="d-flex justify-content-between mb-2">
                               <a href="#" className="badge bg-purple bg-opacity-10 text-purple">All level</a>
                               <a href="#" className="h6 mb-0"><i className="far fa-heart"></i></a>
                            </div>
                            <h5 className="card-title"><a href="#">Sketch from A to Z: for app designer</a></h5>
                            <p className="mb-2 text-truncate-2">Proposal indulged no do cheerful you sociably as. Laughter ladies house the blind songs for society.</p>
                            <div className="d-flex justify-content-between mb-2">
                               <div className="hstack gap-2">
                                  <p className="text-warning m-0">4.5<i className="fas fa-star text-warning ms-1"></i></p>
                                  <span className="small">(650)</span>
                               </div>
                               <div className="hstack gap-2">
                                  <p className="h6 fw-light mb-0 m-0">12h 56m</p>
                                  <span className="small">(15 lectures)</span>
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>
                   {/* Add more placeholder items as needed */}
                </div>
             </div>
             <div className="tab-pane fade" id="course-pills-tabs-2" role="tabpanel" aria-labelledby="course-pills-tab-2">
                 <div className="row g-4">
                    <p>Development courses here...</p>
                 </div>
             </div>
             <div className="tab-pane fade" id="course-pills-tabs-3" role="tabpanel" aria-labelledby="course-pills-tab-3">
                 <div className="row g-4">
                    <p>Graphic Design courses here...</p>
                 </div>
             </div>
          </div>
          {/* Tabs content END */}
        </div>
      </section>
      {/* Popular course END */}

      {/* Action box START */}
      <section className="pt-0 pt-lg-5">
        <div className="container position-relative">
          <div className="row">
            <div className="col-12">
              <div className="bg-info p-4 p-sm-5 rounded-3">
                <div className="row position-relative">
                  <div className="col-11 mx-auto position-relative">
                    <div className="row align-items-center">
                      <div className="col-lg-7">
                        <h3 className="text-white">{t('BECOMEINSTRUCTOR_KEY')}</h3>
                        <p className="text-white mb-3 mb-lg-0">{t('BECOMEINSTRUCTORDESCRIPTION_KEY')}</p>
                      </div>
                      <div className="col-lg-5 text-lg-end">
                        <a href="#" className="btn btn-dark mb-0">{t('STARTTEACHINGTODAY_KEY')}</a>
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
    </>
  );
}
