import React from 'react';
import Link from 'next/link';

export default function Index() {
  return (
    <>
      {/* Page Header Start */}
      <div className="container-fluid page-header py-5">
        <div className="container text-center py-5">
          <h1 className="display-2 text-white mb-4 animated slideInDown">Projects</h1>
          <nav aria-label="breadcrumb animated slideInDown">
            <ol className="breadcrumb justify-content-center mb-0">
              <li className="breadcrumb-item">
                <Link href="/">Home</Link>
              </li>
              <li className="breadcrumb-item">
                <a href="#">Pages</a>
              </li>
              <li className="breadcrumb-item" aria-current="page">Projects</li>
            </ol>
          </nav>
        </div>
      </div>
      {/* Page Header End */}

      {/* Project Start */}
      <div className="container-fluid project py-5 my-5">
        <div className="container py-5">
          <div className="text-center mx-auto pb-5 wow fadeIn" data-wow-delay=".3s" style={{ maxWidth: '600px' }}>
            <h5 className="text-primary">Our Project</h5>
            <h1>Nos projets recents </h1>
          </div>
          <div className="row g-5">
            <div className="col-md-6 col-lg-4 wow fadeIn" data-wow-delay=".3s">
              <div className="project-item">
                <div className="project-img">
                  <img src="/assets/img/project-1.jpg" className="img-fluid w-100 rounded" alt="" />
                  <div className="project-content">
                    <a href="#" className="text-center">
                      <h4 className="text-secondary">Web design</h4>
                      <p className="m-0 text-white">Web Analysis</p>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* Other projects */}
          </div>
        </div>
      </div>
    </>
  );
}
