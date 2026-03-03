import React from 'react';
import Link from 'next/link';

interface StudentLayoutProps {
  user?: any;
  children?: React.ReactNode;
  title?: string;
  subTitle?: string;
}

export default function StudentLayout({ user, children, title = 'Student', subTitle }: StudentLayoutProps) {
  return (
    <>
      {/* Page Banner START */}
      <section className="pt-0">
        <div className="container-fluid px-0">
          <div 
            className="bg-blue h-100px h-md-200px rounded-0 d-flex justify-content-center align-items-center" 
            style={{ 
              background: `url(/assets/images/pattern/04.png) no-repeat center center`, 
              backgroundSize: 'cover' 
            }}
          >
            <div className="text-center w-100">
              {(!user || (user.eleve && !user.eleve.isPremium)) && (
                <>
                  {/* Countdown logic would go here */}
                  <h3 className="text-white">
                    La période d'accès gratuit prend fin dans : <br />
                    <span id="countdown" className="text-warning"></span>
                  </h3>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="container mt-n4">
          <div className="row">
            {/* Profile banner START */}
            <div className="col-12">
              <div className="card bg-transparent card-body p-0">
                <div className="row d-flex justify-content-between">
                  {/* Avatar */}
                  <div className="col-auto mt-4 mt-md-0">
                    <div className="avatar avatar-xxl mt-n3">
                      <img 
                        className="avatar-img rounded-circle border border-white border-3 shadow" 
                        src={user?.personne?.avatar ? `/uploads/images/eleves/${user.personne.avatar}` : '/assets/img/avatar/default.jpg'} 
                        alt="" 
                      />
                    </div>
                  </div>
                  {/* Profile info */}
                  <div className="col d-md-flex justify-content-between align-items-center mt-4">
                    <div>
                      <h1 className="my-1 fs-4">
                        {user?.personne?.nomComplet} <i className="bi bi-patch-check-fill text-info small"></i>
                      </h1>
                      <ul className="list-inline mb-0">
                        {/* Stats placeholders */}
                      </ul>
                    </div>
                  </div>
                  <div className="col-3 justify-content-between align-items-center mt-5">
                    <button 
                      className="btn d-xl-none" 
                      type="button" 
                      data-bs-toggle="offcanvas" 
                      data-bs-target="#offcanvasSidebar" 
                      aria-controls="offcanvasSidebar" 
                      style={{ backgroundColor: 'rgba(9, 19, 159, 0.55)', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}
                    >
                      <i className="fas fa-sliders-h text-white"></i>
                    </button>
                  </div>
                </div>
              </div>
              {/* Profile banner END */}

              {/* Advanced filter responsive toggler START */}
              <hr className="d-xl-none" />
              <div className="col-12 col-xl-3 d-flex flex-column align-items-center justify-content-center d-xl-none">
                <div 
                  className="d-flex justify-content-center p-3 rounded-3 mb-3 w-100"
                  style={{ backgroundColor: 'rgba(9, 19, 159, 0.55)', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}
                >
                  <div className="d-flex align-items-center">
                    <i className="fas fa-book fa-fw fs-4" style={{ color: 'rgba(253, 126, 20, 0.65)' }}></i>
                    <Link href="/courses" className="h6 mb-0 fw-bold text-decoration-none text-white ms-3">
                      Voir tous nos cours
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <div className="container">
         {children}
      </div>
    </>
  );
}
