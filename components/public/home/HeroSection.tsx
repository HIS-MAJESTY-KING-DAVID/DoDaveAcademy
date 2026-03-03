import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="banner-with-background">
        <div className="container">
          <div className="row align-items-center text-center">
            {/* Texte de la bannière */}
            <div className="col-md-12">
              <p className="mb-4 fw-bold main-message">WELCOME TO DODAVE ACADEMY</p>
              <p className="mb-4 fw-bold sub-message">Education within everyone&apos;s reach.</p>
              <Link href="/courses" className="btn btn-lg" style={{ backgroundColor: '#fd7e14', color: 'white', fontSize: '20px' }}>
                View All Courses
              </Link>
              
              <div className="row justify-content-center mt-6">
                 <div className="col-6 col-md-6 d-flex justify-content-end">
                    <Link className="btn btn-custom" style={{ backgroundColor: 'white', color: '#09139f' }} href="/register">
                       Create Account
                    </Link>
                 </div>
                 <div className="col-6 col-md-6 d-flex justify-content-start">
                    <Link href="/login" className="btn btn-custom" style={{ backgroundColor: 'white', color: '#09139f' }}>
                       Sign In
                    </Link>
                 </div>
              </div>

            </div>
          </div>
        </div>
      </section>
  );
}
