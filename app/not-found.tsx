import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center px-4">
        <h1 className="display-1 text-primary fw-bold">404</h1>
        <h4 className="mb-3">Page Not Found</h4>
        <p className="text-muted mb-4">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link href="/" className="btn btn-primary btn-lg rounded-pill">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
