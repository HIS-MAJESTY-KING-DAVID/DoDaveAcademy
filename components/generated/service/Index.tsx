import React from 'react';
import Link from 'next/link';

export default function Index() {
  return (
    <>
      {/* Page Header Start */}
      <div className="container-fluid page-header py-5">
        <div className="container text-center py-5">
          <h1 className="display-2 text-white mb-4 animated slideInDown">Services</h1>
          <nav aria-label="breadcrumb animated slideInDown">
            <ol className="breadcrumb justify-content-center mb-0">
              <li className="breadcrumb-item">
                <Link href="/">Home</Link>
              </li>
              <li className="breadcrumb-item">
                <a href="#">Pages</a>
              </li>
              <li className="breadcrumb-item" aria-current="page">Services</li>
            </ol>
          </nav>
        </div>
      </div>
      {/* Page Header End */}

      {/* Fact Start */}
      <div className="container-fluid bg-secondary py-5">
        <div className="container">
          <div className="row">
            {/* Counters... */}
          </div>
        </div>
      </div>
      {/* Fact End */}

      {/* Services Start */}
      <div className="container-fluid services py-5 mb-5">
        <div className="container">
          <div className="text-center mx-auto pb-5 wow fadeIn" data-wow-delay=".3s" style={{ maxWidth: '600px' }}>
            <h5 className="text-primary">Nos Services</h5>
            <h1>Des services de qualite pour tous</h1>
          </div>
          <div className="row g-5 services-inner">
            <div className="col-md-6 col-lg-4 wow fadeIn" data-wow-delay=".3s">
              <div className="services-item bg-light">
                <div className="p-4 text-center services-content">
                  <div className="services-content-icon">
                    <i className="fa fa-code fa-7x mb-4 text-primary"></i>
                    <h4 className="mb-3">Formation Classique</h4>
                    <p className="mb-4">
                      Marché d'apprentissage et d'enseignement en ligne avec plus de 5 000 cours et 10 millions d'étudiants.
                      Enseigné par des experts pour vous aider à acquérir de nouvelles compétences.
                    </p>
                    <a href="" className="btn btn-secondary text-white px-5 py-3 rounded-pill">Read More</a>
                  </div>
                </div>
              </div>
            </div>
            {/* Other services */}
          </div>
        </div>
      </div>
    </>
  );
}
