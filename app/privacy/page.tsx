import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <main className="container py-5">
      <div className="row justify-content-center"><div className="col-lg-8">
        <Link href="/register" className="text-decoration-none">← Back to registration</Link>
        <h1 className="mt-3">Privacy Policy</h1>
        <p className="lead text-muted">How DoDave Academy collects, uses, and protects learner and instructor information.</p>
        <h2 className="h4 mt-4">Information we collect</h2>
        <p>We collect account details, learning progress, course activity, payment references, and messages needed to operate the academy and provide support.</p>
        <h2 className="h4 mt-4">How we use information</h2>
        <p>Information is used to authenticate accounts, deliver courses, process enrollments, manage assessments, communicate service updates, and prevent abuse.</p>
        <h2 className="h4 mt-4">Your choices</h2>
        <p>You may request corrections to profile information or contact DoDave Academy through the <Link href="/contact">contact page</Link> for account and privacy questions.</p>
        <h2 className="h4 mt-4">Updates</h2>
        <p>This policy may be updated as DoDave Academy adds features. The latest version will remain available on this page.</p>
      </div></div>
    </main>
  );
}
