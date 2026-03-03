import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Person {
  pseudo: string;
  avatarPath: string;
}

interface Course {
  eleves: any[];
}

interface Teacher {
  review: number;
  cours: Course[];
}

interface User {
  personne: Person;
  enseignant: Teacher;
}

interface InstructorLayoutProps {
  children: React.ReactNode;
  user: User;
}

export default function InstructorLayout({ children, user }: InstructorLayoutProps) {
  const pathname = usePathname();
  const isActive = (path: string) => pathname?.startsWith(path);

  const getAssetPath = (path: string) => {
    return path.startsWith('http') ? path : `/assets/${path}`;
  };

  const nbStudents = user.enseignant.cours.reduce((acc, course) => acc + (course.eleves?.length || 0), 0);

  return (
    <>
      {/* Page Banner START */}
      <section className="pt-0">
        <div className="container-fluid px-0">
          <div className="bg-blue h-100px h-md-200px rounded-0" style={{background: `url(/assets/images/pattern/04.png) no-repeat center center`, backgroundSize: 'cover'}}>
          </div>
        </div>
        <div className="container mt-n4">
          <div className="row">
            <div className="col-12">
              <div className="card bg-transparent card-body p-0">
                <div className="row d-flex justify-content-between">
                  {/* Avatar */}
                  <div className="col-auto mt-4 mt-md-0">
                    <div className="avatar avatar-xxl mt-n3">
                      <img className="avatar-img rounded-circle border border-white border-3 shadow" src={getAssetPath(user.personne.avatarPath)} alt="" />
                    </div>
                  </div>
                  {/* Profile info */}
                  <div className="col d-md-flex justify-content-between align-items-center mt-4">
                    <div>
                      <h1 className="my-1 fs-4">{user.personne.pseudo} <i className="bi bi-patch-check-fill text-info small"></i></h1>
                      <ul className="list-inline mb-0">
                        <li className="list-inline-item h6 fw-light me-3 mb-1 mb-sm-0"><i className="fas fa-star text-warning me-2"></i>{user.enseignant.review}/5.0</li>
                        <li className="list-inline-item h6 fw-light me-3 mb-1 mb-sm-0"><i className="fas fa-user-graduate text-orange me-2"></i>{nbStudents} Enrolled Students</li>
                        <li className="list-inline-item h6 fw-light me-3 mb-1 mb-sm-0"><i className="fas fa-book text-purple me-2"></i>{user.enseignant.cours.length} Courses</li>
                      </ul>
                    </div>
                    {/* Button */}
                    <div className="d-flex align-items-center mt-2 mt-md-0">
                      <Link href="/instructor/cours/new" className="btn btn-success mb-0">Create a course</Link>
                    </div>
                  </div>
                </div>
              </div>

              <hr className="d-xl-none" />
              <div className="col-12 col-xl-3 d-flex justify-content-between align-items-center">
                <a className="h6 mb-0 fw-bold d-xl-none" href="#">Menu</a>
                <button className="btn btn-primary d-xl-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasSidebar" aria-controls="offcanvasSidebar">
                  <i className="fas fa-sliders-h"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Page Banner END */}

      {/* Page content START */}
      <section className="pt-0">
        <div className="container">
          <div className="row">
            {/* Left sidebar START */}
            <div className="col-xl-3">
              <div className="offcanvas-xl offcanvas-end" tabIndex={-1} id="offcanvasSidebar">
                <div className="offcanvas-header bg-light">
                  <h5 className="offcanvas-title" id="offcanvasNavbarLabel">My profile</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#offcanvasSidebar" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body p-3 p-xl-0">
                  <div className="bg-dark border rounded-3 pb-0 p-3 w-100">
                    <div className="list-group list-group-dark list-group-borderless">
                      <Link className={`list-group-item ${isActive('/instructor/home') ? 'active' : ''}`} href="/instructor/home"><i className="bi bi-ui-checks-grid fa-fw me-2"></i>Dashboard</Link>
                      <Link className={`list-group-item ${isActive('/instructor/courses') ? 'active' : ''}`} href="/instructor/courses"><i className="bi bi-basket fa-fw me-2"></i>My Courses</Link>
                      <Link className={`list-group-item ${isActive('/instructor/network') ? 'active' : ''}`} href="/instructor/network"><i className="bi bi-people fa-fw me-2"></i>My Network</Link>
                      <Link className={`list-group-item ${isActive('/instructor/orders') ? 'active' : ''}`} href="/instructor/orders"><i className="bi bi-folder-check fa-fw me-2"></i>Orders</Link>
                      <Link className={`list-group-item ${isActive('/instructor/exam') ? 'active' : ''}`} href="/instructor/exam"><i className="bi bi-pencil-square fa-fw me-2"></i>Exam</Link>
                      <Link className={`list-group-item ${isActive('/admin/evaluation') ? 'active' : ''}`} href="/admin/evaluation"><i className="bi bi-card-checklist fa-fw me-2"></i>Evaluations</Link>
                      <Link className={`list-group-item ${isActive('/instructor/reviews') ? 'active' : ''}`} href="/instructor/reviews"><i className="bi bi-star fa-fw me-2"></i>Reviews</Link>
                      <Link className={`list-group-item ${isActive('/instructor/profile') ? 'active' : ''}`} href="/instructor/profile"><i className="far fa-user fa-fw me-2"></i>Profile</Link>
                      <Link className="list-group-item text-danger bg-danger-soft-hover" href="/logout"><i className="fas fa-sign-out-alt fa-fw me-2"></i>Sign Out</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Left sidebar END */}

            {/* Main content START */}
            <div className="col-xl-9">
              {children}
            </div>
            {/* Main content END */}
          </div>
        </div>
      </section>
      {/* Page content END */}

      {/* Footer */}
      <footer className="bg-dark p-3">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-4 text-center text-md-start mb-3 mb-md-0">
              <Link href="/"> <img className="h-20px" src="/assets/images/logo-light.svg" alt="logo" /> </Link>
            </div>
            <div className="col-md-4 mb-3 mb-md-0">
              <div className="text-center text-white">
                Copyrights ©2023 <a href="#" target="_blank" className="text-reset btn-link">kulmapeck.com</a>. All rights reserved.
              </div>
            </div>
            <div className="col-md-4">
              <ul className="list-inline mb-0 text-center text-md-end">
                <li className="list-inline-item ms-2"><a href="#"><i className="text-white fab fa-facebook"></i></a></li>
                <li className="list-inline-item ms-2"><a href="#"><i className="text-white fab fa-instagram"></i></a></li>
                <li className="list-inline-item ms-2"><a href="#"><i className="text-white fab fa-linkedin-in"></i></a></li>
                <li className="list-inline-item ms-2"><a href="#"><i className="text-white fab fa-twitter"></i></a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
