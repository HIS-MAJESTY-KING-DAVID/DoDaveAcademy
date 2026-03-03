import React from 'react';
import Link from 'next/link';
import RegistrationForm from './Form';

export default function RegisterSimple() {
  return (
    <>
      <section className="mb-9 position-relative" style={{backgroundImage: 'url(assets/images/bg/07.jpg)', backgroundPosition: 'center left', backgroundSize: 'cover'}}>
        {/* Background dark overlay */}
        <div className="bg-overlay bg-blue opacity-9"></div>
        <div className="container z-index-9 position-relative">
          <div className="row g-4 justify-content-between align-items-center">
            {/* Content */}
            <div className="col-lg-6">
              <h1 className="text-white">Welcome to the largest community</h1>
              <p className="text-white mb-3">Join our community and start learning today!</p>
              <Link href="/courses" className="btn btn-white mb-0">Explore Courses<i className="bi bi-arrow-right ms-2"></i></Link>
            </div>

            {/* Form */}
            <div className="col-lg-6 col-xl-5 mb-n9">
              <div className="card card-body shadow p-4 p-sm-5">
                <div className="card-header bg-transparent pb-5">
                  <h1 className="h3">Create Account</h1>
                  <p className="mb-0">
                    Already have an account? <Link href="/login">Login</Link>
                  </p>
                </div>

                <div className="card-body">
                  <RegistrationForm userType="student" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
