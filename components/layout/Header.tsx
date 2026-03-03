'use client';

import Link from 'next/link';
import Image from 'next/image';
import LanguageSwitcher from '../LanguageSwitcher';
import { useTranslation } from 'react-i18next';

export default function Header() {
  const { t } = useTranslation();

  return (
    <header className="navbar-light navbar-sticky header-static">
      <nav className="navbar navbar-expand-xl">
        <div className="container-fluid px-3 px-xl-5">
          {/* Logo START */}
          <Link href="/" className="navbar-brand">
            <Image
              className="light-mode-item navbar-brand-item"
              src="/assets/images/logo.svg"
              alt="logo"
              width={150}
              height={40}
              style={{ height: '40px', width: 'auto' }}
            />
          </Link>
          {/* Logo END */}

          {/* Responsive navbar toggler */}
          <button
            className="navbar-toggler ms-auto"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-animation">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>

          {/* Main navbar START */}
          <div className="navbar-collapse w-100 collapse" id="navbarCollapse">
            {/* Nav category menu START */}
            <ul className="navbar-nav navbar-nav-scroll me-auto">
              <li className="nav-item dropdown dropdown-menu-shadow-stacked">
                <a
                  className="nav-link bg-light rounded-3 text-primary px-3 py-3 py-xl-0"
                  href="#"
                  id="categoryMenu"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="bi bi-ui-radios-grid me-2"></i>
                  <span>{t('CATEGORIES_KEY')}</span>
                </a>
                <ul className="dropdown-menu" aria-labelledby="categoryMenu">
                  {/* TODO: Fetch categories dynamically */}
                  <li><Link className="dropdown-item" href="#">Development</Link></li>
                  <li><Link className="dropdown-item" href="#">Design</Link></li>
                  <li><Link className="dropdown-item" href="#">Marketing</Link></li>
                </ul>
              </li>
            </ul>
            {/* Nav category menu END */}

            {/* Nav Main menu START */}
            <ul className="navbar-nav navbar-nav-scroll me-auto">
              <li className="nav-item">
                <Link className="nav-link active" href="/">
                  {t('HOME_KEY')}
                </Link>
              </li>
              
              <li className="nav-item dropdown dropdown-fullwidth">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {t('COURSES_KEY')}
                </a>
                <div className="dropdown-menu dropdown-menu-end" data-bs-popper="none">
                    {/* TODO: Mega menu content */}
                    <div className="row p-4">
                        <div className="col-md-6">
                            <h6>Web Development</h6>
                            <ul className="list-unstyled">
                                <li><Link href="#">HTML</Link></li>
                                <li><Link href="#">CSS</Link></li>
                                <li><Link href="#">JavaScript</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
              </li>

              <li className="nav-item">
                <Link className="nav-link" href="/exam">
                  {t('EXAM_KEY')}
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" href="/forum">
                  {t('FORUM_KEY')}
                </Link>
              </li>
            </ul>
            {/* Nav Main menu END */}
            
            {/* Nav Right (Account) START */}
            <div className="nav my-3 my-xl-0 px-4 flex-nowrap align-items-center">
              <div className="nav-item w-100">
                <form className="position-relative">
                  <input className="form-control pe-5 bg-transparent" type="search" placeholder={t('SEARCH_KEY')} aria-label="Search" />
                  <button className="bg-transparent p-2 position-absolute top-50 end-0 translate-middle-y border-0 text-primary-hover text-reset" type="submit">
                    <i className="fas fa-search fs-6"></i>
                  </button>
                </form>
              </div>
              <div className="nav-item">
                <LanguageSwitcher />
              </div>
            </div>
            
             <ul className="navbar-nav navbar-nav-scroll">
                 <li className="nav-item">
                    <Link className="nav-link" href="/login">
                       <b className="badge bg-success">{t('SIGN_IN_KEY')}</b>
                    </Link>
                 </li>
             </ul>
             {/* Nav Right (Account) END */}

          </div>
        </div>
      </nav>
    </header>
  );
}
