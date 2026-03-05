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
          <Link href="/" className="navbar-brand d-flex align-items-center">
            <Image
              className="light-mode-item navbar-brand-item"
              src="/logo.svg"
              alt="DoDave Academy"
              width={40}
              height={40}
              style={{ height: '40px', width: 'auto' }}
            />
            <span className="ms-2 d-none d-sm-inline-block" style={{ fontFamily: 'Pacifico, cursive', color: 'var(--brand-primary)', fontSize: '24px' }}>DoDave Academy</span>
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
            
            {/* Nav Main menu START */}
            <ul className="navbar-nav navbar-nav-scroll me-auto">
              {/* Categories Dropdown */}
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="categoryMenu" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  {t('COURSESCATEGORY_KEY')}
                </a>
                <ul className="dropdown-menu" aria-labelledby="categoryMenu">
                  <li> <Link className="dropdown-item" href="#">Web Development</Link> </li>
                  <li> <Link className="dropdown-item" href="#">Data Science</Link> </li>
                  <li> <Link className="dropdown-item" href="#">Mobile Development</Link> </li>
                </ul>
              </li>

              <li className="nav-item">
                <Link className="nav-link" href="/">
                  {t('HOME_KEY')}
                </Link>
              </li>
              
              {/* Courses Dropdown */}
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="courseMenu" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  {t('COURSES_KEY')}
                </a>
                <ul className="dropdown-menu" aria-labelledby="courseMenu">
                  <li> <Link className="dropdown-item" href="/courses">{t('ALLCOURSES_KEY')}</Link> </li>
                  <li> <Link className="dropdown-item" href="/programs">{t('PROGRAMS_KEY')}</Link> </li>
                </ul>
              </li>

              <li className="nav-item">
                <Link className="nav-link" href="/exams">
                  {t('EXAMS_KEY')}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/forum">
                  {t('FORUM_KEY')}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/plan">
                  {t('SUBSCRIBE_KEY')}
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

              <div className="nav-item ms-3">
                <LanguageSwitcher />
              </div>
              
              <div className="nav-item ms-3 d-none d-sm-block">
                 <Link className="btn btn-sm btn-outline-primary mb-0" href="/login">
                    {t('SIGN_IN_KEY')}
                 </Link>
              </div>
              <div className="nav-item ms-3 d-none d-sm-block">
                 <Link className="btn btn-sm btn-primary mb-0" href="/register">
                    {t('ENROLL_NOW_KEY')}
                 </Link>
              </div>
            </div>
             {/* Nav Right (Account) END */}

          </div>
        </div>
      </nav>
    </header>
  );
}
