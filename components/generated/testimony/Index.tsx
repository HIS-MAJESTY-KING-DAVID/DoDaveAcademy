import React from 'react';
import Link from 'next/link';

export default function Index() {
  return (
    <div className="container-fluid testimonial py-5 my-5">
      <div className="container py-5">
        <div className="text-center mx-auto pb-5" style={{ maxWidth: '600px' }}>
          <h5 className="text-primary">Nos temoignages</h5>
          <h1>Retour des apprenants !</h1>
        </div>
        <div className="owl-carousel testimonial-carousel">
          <div className="testimonial-item border p-4">
            <div className="d-flex align-items-center">
              <div className="">
                <img src="/assets/img/testimonial-1.jpg" alt="" />
              </div>
              <div className="ms-4">
                <h4 className="text-secondary">Client Name</h4>
                <p className="m-0 pb-3">Profession</p>
                <div className="d-flex pe-5">
                  <i className="fas fa-star me-1 text-primary"></i>
                  <i className="fas fa-star me-1 text-primary"></i>
                  <i className="fas fa-star me-1 text-primary"></i>
                  <i className="fas fa-star me-1 text-primary"></i>
                  <i className="fas fa-star me-1 text-primary"></i>
                </div>
              </div>
            </div>
            <div className="border-top mt-4 pt-3">
              <p className="mb-0">Lorem ipsum dolor sit amet elit. Sed efficitur quis purus ut interdum aliquam dolor eget urna. Nam volutpat libero sit amet leo cursus, ac viverra eros morbi quis quam mi.</p>
            </div>
          </div>
          <div className="testimonial-item border p-4">
            <div className=" d-flex align-items-center">
              <div className="">
                <img src="/assets/img/testimonial-2.jpg" alt="" />
              </div>
              <div className="ms-4">
                <h4 className="text-secondary">Client Name</h4>
                 <p className="m-0 pb-3">Profession</p>
                 {/* ... stars ... */}
              </div>
            </div>
            {/* ... content ... */}
          </div>
        </div>
      </div>
    </div>
  );
}
