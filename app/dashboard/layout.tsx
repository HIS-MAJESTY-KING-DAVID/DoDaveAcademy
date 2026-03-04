import { ReactNode } from 'react';
import Link from 'next/link';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const session = await getSession();

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <nav className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse" style={{ minHeight: '100vh' }}>
          <div className="position-sticky pt-3">
            <h5 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
              <span>Student Dashboard</span>
            </h5>
            <ul className="nav flex-column">
              <li className="nav-item">
                <Link className="nav-link active" href="/dashboard/student">
                  <i className="fas fa-book-open me-2"></i>
                  My Learning
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/dashboard/student/messages">
                  <i className="fas fa-comments me-2"></i>
                  Messages
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/profile">
                  <i className="fas fa-user me-2"></i>
                  My Profile
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          {children}
        </main>
      </div>
    </div>
  );
}
