import React from 'react';
import Link from 'next/link';

interface HomeIndexProps {
  enseignant?: any;
  premiumCourses?: any[];
  freeCourses?: any[];
}

export default function Index({ enseignant, premiumCourses = [], freeCourses = [] }: HomeIndexProps) {
  return (
    <>
      {/* Counter boxes START */}
      <div className="row g-4">
        {/* Counter item */}
        <div className="col-sm-6 col-lg-4">
          <div className="d-flex justify-content-center align-items-center p-4 bg-warning bg-opacity-15 rounded-3">
            <span className="display-6 text-warning mb-0"><i className="fas fa-tv fa-fw"></i></span>
            <div className="ms-4">
              <div className="d-flex">
                <h5 className="purecounter mb-0 fw-bold">
                  {enseignant?.cours?.length || 0}
                </h5>
              </div>
              <span className="mb-0 h6 fw-light">Total Courses</span>
            </div>
          </div>
        </div>
        {/* Counter item */}
        <div className="col-sm-6 col-lg-4">
          <div className="d-flex justify-content-center align-items-center p-4 bg-purple bg-opacity-10 rounded-3">
            <span className="display-6 text-purple mb-0"><i className="fas fa-user-graduate fa-fw"></i></span>
            <div className="ms-4">
              <div className="d-flex">
                <h5 className="purecounter mb-0 fw-bold">
                  {premiumCourses.length}
                </h5>
                {/* <span className="mb-0 h5">K+</span> */}
              </div>
              <span className="mb-0 h6 fw-light">Premium courses</span>
            </div>
          </div>
        </div>
        {/* Counter item */}
        <div className="col-sm-6 col-lg-4">
          <div className="d-flex justify-content-center align-items-center p-4 bg-info bg-opacity-10 rounded-3">
            <span className="display-6 text-info mb-0"><i className="fas fa-gem fa-fw"></i></span>
            <div className="ms-4">
              <div className="d-flex">
                <h5 className="purecounter mb-0 fw-bold">
                  {freeCourses.length}
                </h5>
                {/* <span className="mb-0 h5">K</span> */}
              </div>
              <span className="mb-0 h6 fw-light">Free courses</span>
            </div>
          </div>
        </div>
      </div>
      {/* Counter boxes END */}

      {/* Chart START */}
      <div className="row mt-5">
        <div className="col-12">
          <div className="card card-body bg-transparent border p-4 h-100">
            <div className="row g-4">
              {/* Content */}
              <div className="col-sm-6 col-md-4">
                <span className="badge text-bg-dark">Current Month</span>
                <h4 className="text-primary my-2">$35000</h4>
                <p className="mb-0"><span className="text-success me-1">0.20%<i className="bi bi-arrow-up"></i></span>vs last month</p>
              </div>
              {/* Content */}
              <div className="col-sm-6 col-md-4">
                <span className="badge text-bg-dark">Last Month</span>
                <h4 className="my-2">$28000</h4>
                <p className="mb-0"><span className="text-danger me-1">0.10%<i className="bi bi-arrow-down"></i></span>Then last month</p>
              </div>
            </div>

            {/* Apex chart */}
            <div id="ChartPayout"></div>

          </div>
        </div>
      </div>
      {/* Chart END */}

      {/* Course List table START */}
      <div className="row">
        <div className="col-12">
          <div className="card border bg-transparent rounded-3 mt-5">
            {/* Card header START */}
            <div className="card-header bg-transparent border-bottom">
              <div className="d-sm-flex justify-content-sm-between align-items-center">
                <h3 className="mb-2 mb-sm-0">Last courses</h3>
                <Link href="/instructor/courses" className="btn btn-sm btn-primary-soft mb-0">View all</Link>
              </div>
            </div>
            {/* Card header END */}

            {/* Card body START */}
            <div className="card-body">
              <div className="table-responsive border-0 rounded-3">
                {/* Table START */}
                <table className="table table-dark-gray align-middle p-4 mb-0">
                   {/* Table content placeholder */}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
