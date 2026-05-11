import { Metadata } from 'next';
import Link from 'next/link';
import BecomeTeacherForm from '@/components/auth/BecomeTeacherForm';

export const metadata: Metadata = {
  title: 'Become an Instructor',
  description: 'Share your knowledge and earn money. Join DoDave Academy as an instructor and reach students across Africa.',
};

export default function BecomeTeacherPage() {
  return (
    <main>
      <section className="py-4">
        <div className="container">
          <div className="bg-light p-4 text-center rounded-3">
            <h1 className="m-0">Become an Instructor</h1>
            <p className="mb-0 mt-2">Share your knowledge and earn money</p>
            <div className="d-flex justify-content-center">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb breadcrumb-dots mb-0">
                  <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                  <li className="breadcrumb-item active" aria-current="page">Become Teacher</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-0">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card shadow-sm border-0">
                <div className="card-body p-4 p-lg-5">
                  <h2 className="mb-3">Why become an instructor?</h2>
                  <div className="row g-3 mb-4">
                    <div className="col-md-4 text-center">
                      <i className="fas fa-globe fa-2x text-primary mb-2"></i>
                      <h6>Reach Millions</h6>
                      <small className="text-muted">Share your knowledge with students across Africa</small>
                    </div>
                    <div className="col-md-4 text-center">
                      <i className="fas fa-dollar-sign fa-2x text-success mb-2"></i>
                      <h6>Earn Revenue</h6>
                      <small className="text-muted">Get paid for your expertise and content</small>
                    </div>
                    <div className="col-md-4 text-center">
                      <i className="fas fa-video fa-2x text-info mb-2"></i>
                      <h6>Easy Tools</h6>
                      <small className="text-muted">Simple course creation and management tools</small>
                    </div>
                  </div>

                  <p className="text-muted mb-4">
                    To become an instructor, please <Link href="/register">create an account</Link> first,
                    then fill out the application form below. Our team will review your application and
                    get back to you within 48 hours.
                  </p>

                  <BecomeTeacherForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
