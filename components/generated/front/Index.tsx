import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

export default function Index() {
  const { t } = useTranslation();
  return (
    <>
      {/* ======= Hero Section ======= */}
      <section id="hero" className="d-flex justify-content-center align-items-center">
        <div className="container position-relative" data-aos="zoom-in" data-aos-delay="100">
          <h1>{t('HERO_TITLE_KEY')}</h1>
          <h2>{t('HERO_SUBTITLE_KEY')}</h2>
          <Link href="/courses" className="btn-get-started">{t('GET_STARTED_KEY')}</Link>
        </div>
      </section>
      {/* End Hero */}

      <main id="main">
        {/* ======= About Section ======= */}
        <section id="about" className="about">
          <div className="container" data-aos="fade-up">

            <div className="row">
              <div className="col-lg-6 order-1 order-lg-2" data-aos="fade-left" data-aos-delay="100">
                <img src="/assets/img/about.jpg" className="img-fluid" alt="" />
              </div>
              <div className="col-lg-6 pt-4 pt-lg-0 order-2 order-lg-1 content">
                <h3>Voluptatem dignissimos provident quasi corporis voluptates sit assumenda.</h3>
                <p className="fst-italic">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                  magna aliqua.
                </p>
                <ul>
                  <li><i className="bi bi-check-circle"></i> Ullamco laboris nisi ut aliquip ex ea commodo consequat.</li>
                  <li><i className="bi bi-check-circle"></i> Duis aute irure dolor in reprehenderit in voluptate velit.</li>
                  <li><i className="bi bi-check-circle"></i> Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate trideta storacalaperda mastiro dolore eu fugiat nulla pariatur.</li>
                </ul>
                <p>
                  Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                </p>

              </div>
            </div>

          </div>
        </section>
        {/* End About Section */}

        {/* ======= Counts Section ======= */}
        <section id="counts" className="counts section-bg">
          <div className="container">

            <div className="row counters">

              <div className="col-lg-3 col-6 text-center">
                <span data-purecounter-start="0" data-purecounter-end="1232" data-purecounter-duration="1" className="purecounter">1232</span>
                <p>{t('STUDENTS_KEY')}</p>
              </div>

              <div className="col-lg-3 col-6 text-center">
                <span data-purecounter-start="0" data-purecounter-end="64" data-purecounter-duration="1" className="purecounter">64</span>
                <p>{t('COURSES_COUNT_KEY')}</p>
              </div>

              <div className="col-lg-3 col-6 text-center">
                <span data-purecounter-start="0" data-purecounter-end="42" data-purecounter-duration="1" className="purecounter">42</span>
                <p>{t('PAST_PAPERS_KEY')}</p>
              </div>

              <div className="col-lg-3 col-6 text-center">
                <span data-purecounter-start="0" data-purecounter-end="15" data-purecounter-duration="1" className="purecounter">15</span>
                <p>{t('TRAINERS_KEY')}</p>
              </div>

            </div>

          </div>
        </section>
        {/* End Counts Section */}

        {/* ======= Why Us Section ======= */}
        <section id="why-us" className="why-us">
          <div className="container" data-aos="fade-up">

            <div className="row">
              <div className="col-lg-4 d-flex align-items-stretch">
                <div className="content">
                  <h3>{t('WHY_CHOOSE_US_KEY')}</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit
                    Asperiores dolores sed et. Tenetur quia eos. Autem tempore quibusdam vel necessitatibus optio ad corporis.
                  </p>
                  <div className="text-center">
                    <Link href="/about" className="more-btn">Learn More <i className="bx bx-chevron-right"></i></Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* End Why Us Section */}
      </main>
    </>
  );
}
