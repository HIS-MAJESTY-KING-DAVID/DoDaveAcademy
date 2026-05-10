'use client';

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center px-4">
        <h1 className="display-1 text-danger fw-bold">500</h1>
        <h4 className="mb-3">Something went wrong</h4>
        <p className="text-muted mb-4">
          {error.message || 'An unexpected error occurred. Please try again.'}
        </p>
        <button onClick={reset} className="btn btn-primary btn-lg rounded-pill">
          Try Again
        </button>
      </div>
    </div>
  );
}
