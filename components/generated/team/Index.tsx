import React from 'react';
import Link from 'next/link';

export default function Index() {
  return (
    <>
      {/* Page Header Start */}
      <div className="container-fluid page-header py-5">
        <div className="container text-center py-5">
          <h1 className="display-2 text-white mb-4 animated slideInDown">Notre Equipe</h1>
          <nav aria-label="breadcrumb animated slideInDown">
            <ol className="breadcrumb justify-content-center mb-0">
              <li className="breadcrumb-item">
                <Link href="/">Home</Link>
              </li>
              <li className="breadcrumb-item">
                <a href="#">Pages</a>
              </li>
              <li className="breadcrumb-item" aria-current="page">Notre Equipe</li>
            </ol>
          </nav>
        </div>
      </div>
      {/* Page Header End */}

      {/* Fact Start */}
      <div className="container-fluid bg-secondary py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 wow fadeIn" data-wow-delay=".1s">
              <div className="d-flex counter">
                <h1 className="me-3 text-primary counter-value">99</h1>
                <h5 className="text-white mt-1">Success in getting happy customer</h5>
              </div>
            </div>
            {/* ... other counters ... */}
          </div>
        </div>
      </div>
      {/* Fact End */}

      {/* Team Start */}
      <div className="container-fluid py-5 mb-5 team">
        <div className="container">
          <div className="text-center mx-auto pb-5 wow fadeIn" data-wow-delay=".3s" style={{ maxWidth: '600px' }}>
            <h5 className="text-primary">Notre Equipe</h5>
            <h1>Rencontrer Nos experts</h1>
          </div>
          <div className="owl-carousel team-carousel wow fadeIn" data-wow-delay=".5s">
            <div className="rounded team-item">
              <div className="team-content">
                <div className="team-img-icon">
                  <div className="team-img rounded-circle">
                    <img src="/assets/img/team-1.jpg" className="img-fluid w-100 rounded-circle" alt="" />
                  </div>
                  <div className="team-name text-center py-3">
                    <h4 className="">Cyrille NGAZOA ONDOUA</h4>
                    <p className="m-0">Ingenieur developpeur</p>
                  </div>
                  <div className="team-icon d-flex justify-content-center pb-4">
                    <a className="btn btn-square btn-secondary text-white rounded-circle m-1" href="">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a className="btn btn-square btn-secondary text-white rounded-circle m-1" href="">
                      <i className="fab fa-twitter"></i>
                    </a>
                    {/* ... other icons ... */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
