import React from 'react';
import Link from 'next/link';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <section className="mb-9 position-relative" style={{backgroundImage: 'url(/assets/images/bg/07.jpg)', backgroundPosition: 'center left', backgroundSize: 'cover'}}>
      <div className="bg-overlay bg-blue opacity-9"></div>
      <div className="container z-index-9 position-relative">
        <div className="row g-4 justify-content-between align-items-center">
          <div className="col-lg-6">
            <h1 className="text-white">Welcome to the largest community</h1>
            <p className="text-white mb-3">Login to access your account and explore our courses.</p>
            <Link href="/courses" className="btn btn-white mb-0">Explore Courses<i className="bi bi-arrow-right ms-2"></i></Link>
          </div>

          <div className="col-lg-6 col-xl-5 mb-n9">
            <div className="card card-body shadow p-4 p-sm-5">
              {children}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
