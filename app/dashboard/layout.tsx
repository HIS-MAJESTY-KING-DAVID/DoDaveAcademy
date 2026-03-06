import { ReactNode } from 'react';
import Link from 'next/link';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const session = await getSession();

  if (!session) {
    redirect('/login');
  }

  // Determine user role
  const isInstructor = session.roles?.includes('ROLE_INSTRUCTOR');

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <nav className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse" style={{ minHeight: '100vh' }}>
          <div className="position-sticky pt-3">
            
            {/* Student Sidebar */}
            {!isInstructor && (
              <>
                <h5 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                  <span>Student Menu</span>
                </h5>
                <ul className="nav flex-column">
                  <li className="nav-item">
                    <Link className="nav-link" href="/plan">
                      <i className="fas fa-crown text-warning me-2"></i>
                      S'ABONNER
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" href="/dashboard/student">
                      <i className="bi bi-house-door me-2"></i>
                      Dashboard
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" href="/courses">
                      <i className="bi bi-book me-2"></i>
                      Voir tous nos cours
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" href="/dashboard/student/subscriptions">
                      <i className="bi bi-wallet2 me-2"></i>
                      Mes subscriptions
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" href="/dashboard/student/courses">
                      <i className="bi bi-journal-bookmark me-2"></i>
                      Mes cours
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" href="/dashboard/student/payments">
                      <i className="bi bi-credit-card me-2"></i>
                      Mes paiements
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" href="/dashboard/student/network">
                      <i className="bi bi-people me-2"></i>
                      Mon réseau
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" href="/dashboard/student/profile">
                      <i className="bi bi-person me-2"></i>
                      Mon profile
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" href="/dashboard/student/messages">
                      <i className="bi bi-chat-dots me-2"></i>
                      Discuter avec nos profs
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-danger" href="/logout">
                      <i className="bi bi-box-arrow-right me-2"></i>
                      Se déconnecter
                    </Link>
                  </li>
                </ul>
              </>
            )}

            {/* Instructor Sidebar */}
            {isInstructor && (
              <>
                <h5 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                  <span>Instructor Menu</span>
                </h5>
                <ul className="nav flex-column">
                  <li className="nav-item">
                    <Link className="nav-link" href="/dashboard/instructor">
                      <i className="bi bi-house-door me-2"></i>
                      Dashboard
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" href="/dashboard/instructor/courses">
                      <i className="bi bi-journal-richtext me-2"></i>
                      My Courses
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" href="/dashboard/instructor/network">
                      <i className="bi bi-people me-2"></i>
                      My Network
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" href="/dashboard/instructor/orders">
                      <i className="bi bi-cart me-2"></i>
                      Orders
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" href="/dashboard/instructor/exams">
                      <i className="bi bi-pencil-square me-2"></i>
                      Exam
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" href="/dashboard/instructor/evaluations">
                      <i className="bi bi-clipboard-check me-2"></i>
                      Evaluations
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" href="/dashboard/instructor/reviews">
                      <i className="bi bi-star me-2"></i>
                      Reviews
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" href="/dashboard/instructor/profile">
                      <i className="bi bi-person me-2"></i>
                      Profile
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-danger" href="/logout">
                      <i className="bi bi-box-arrow-right me-2"></i>
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </>
            )}

          </div>
        </nav>

        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          {children}
        </main>
      </div>
    </div>
  );
}
