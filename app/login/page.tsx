import Link from 'next/link';
import LoginForm from '@/components/auth/LoginForm';

export const metadata = {
  title: 'Sign In - DoDave Academy',
  description: 'Login to your DoDave Academy account.',
};

export default function LoginPage() {
  return (
    <main>
      <section className="mb-9 position-relative" style={{ backgroundImage: 'url(/assets/images/bg/07.jpg)', backgroundPosition: 'center left', backgroundSize: 'cover' }}>
        {/* Background dark overlay */}
        <div className="bg-overlay bg-blue opacity-9"></div>
        <div className="container z-index-9 position-relative">
          <div className="row g-4 justify-content-between align-items-center">
            {/* Content */}
            <div className="col-lg-6">
              <h1 className="text-white">Welcome to our largest community</h1>
              <p className="text-white mb-3">Let&apos;s learn something new today!</p>
              <Link href="/courses" className="btn btn-white mb-0">
                Explore Courses<i className="bi bi-arrow-right ms-2"></i>
              </Link>
            </div>

            {/* Form */}
            <div className="col-lg-6 col-xl-5 mb-n9">
              <LoginForm />
            </div>

          </div> {/* Row END */}
        </div>
      </section>
    </main>
  );
}
