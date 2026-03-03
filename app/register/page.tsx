import RegisterForm from '@/components/auth/RegisterForm';

export const metadata = {
  title: 'Register - DoDave Academy',
  description: 'Create a new DoDave Academy account.',
};

export default function RegisterPage() {
  return (
    <main>
      <section className="pt-4 pt-sm-5">
        <div className="container">
          <div className="row g-4 g-md-5 justify-content-center">
            <div className="col-lg-8 mb-5">
              <RegisterForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
