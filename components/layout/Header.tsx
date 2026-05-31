'use client';

import Link from 'next/link';
import Image from 'next/image';
import LanguageSwitcher from '../LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

export default function Header() {
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-full mx-auto px-3 px-xl-5">
        <div className="flex items-center justify-between h-16">

          <Link href="/" className="flex items-center flex-shrink-0">
            <Image
              src="/logo.svg"
              alt="DoDave Academy"
              width={40}
              height={40}
              style={{ height: '40px', width: 'auto' }}
            />
            <span className="ml-2 hidden sm:inline-block" style={{ fontFamily: 'Pacifico, cursive', color: 'var(--brand-primary)', fontSize: '24px' }}>DoDave Academy</span>
          </Link>

          <button
            className="xl:hidden ml-auto p-2 rounded hover:bg-gray-100"
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-controls="navbarCollapse"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation"
          >
            <span className="block w-5 h-0.5 bg-gray-600 mb-1 transition"></span>
            <span className="block w-5 h-0.5 bg-gray-600 mb-1 transition"></span>
            <span className="block w-5 h-0.5 bg-gray-600 transition"></span>
          </button>

          <div className={`${mobileMenuOpen ? 'block' : 'hidden'} xl:flex xl:items-center xl:w-auto w-full absolute xl:static top-16 left-0 bg-white xl:bg-transparent shadow-md xl:shadow-none z-40`} id="navbarCollapse">

            <ul className="flex flex-col xl:flex-row xl:items-center gap-0 xl:gap-1 p-4 xl:p-0">

              <li className="relative group">
                <button className="flex items-center gap-1 px-3 py-2 text-sm text-gray-700 hover:text-[var(--brand-primary)] rounded hover:bg-gray-50 w-full xl:w-auto text-left">
                  {t('CATEGORIES_KEY')}
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>
                <ul className="xl:absolute left-0 mt-0 xl:mt-1 w-full xl:w-48 bg-white xl:shadow-lg xl:rounded xl:border xl:opacity-0 xl:invisible group-hover:xl:opacity-100 group-hover:xl:visible transition-all duration-200">
                  <li><Link className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[var(--brand-primary)]" href="/courses?category=web-design">Web Design</Link></li>
                  <li><Link className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[var(--brand-primary)]" href="/courses?category=development">Development</Link></li>
                  <li><Link className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[var(--brand-primary)]" href="/courses?category=graphic-design">Graphic Design</Link></li>
                  <li><Link className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[var(--brand-primary)]" href="/courses?category=marketing">Marketing</Link></li>
                  <li><Link className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[var(--brand-primary)]" href="/courses?category=finance">Finance</Link></li>
                </ul>
              </li>

              <li>
                <Link className="block px-3 py-2 text-sm text-gray-700 hover:text-[var(--brand-primary)] rounded hover:bg-gray-50" href="/">
                  {t('HOME_KEY')}
                </Link>
              </li>

              <li className="relative group">
                <button className="flex items-center gap-1 px-3 py-2 text-sm text-gray-700 hover:text-[var(--brand-primary)] rounded hover:bg-gray-50 w-full xl:w-auto text-left">
                  {t('COURSES_KEY')}
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>
                <ul className="xl:absolute left-0 mt-0 xl:mt-1 w-full xl:w-48 bg-white xl:shadow-lg xl:rounded xl:border xl:opacity-0 xl:invisible group-hover:xl:opacity-100 group-hover:xl:visible transition-all duration-200">
                  <li><Link className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[var(--brand-primary)]" href="/courses">{t('ALLCOURSES_KEY')}</Link></li>
                  <li><Link className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[var(--brand-primary)]" href="/programs">{t('PROGRAMS_KEY')}</Link></li>
                </ul>
              </li>

              <li>
                <Link className="block px-3 py-2 text-sm text-gray-700 hover:text-[var(--brand-primary)] rounded hover:bg-gray-50" href="/exams">
                  {t('EXAMS_KEY')}
                </Link>
              </li>

              <li>
                <Link className="block px-3 py-2 text-sm text-gray-700 hover:text-[var(--brand-primary)] rounded hover:bg-gray-50" href="/forum">
                  {t('FORUM_KEY')}
                </Link>
              </li>

              <li className="hidden xl:block">
                <Link className="block px-3 py-2 text-sm text-yellow-600 hover:text-yellow-700 rounded hover:bg-yellow-50" href="/plan">
                  {t('SUBSCRIBE_KEY')}
                </Link>
              </li>
            </ul>

            <div className="flex flex-col xl:flex-row items-stretch xl:items-center gap-2 p-4 xl:p-0 xl:ml-4 border-t xl:border-t-0 border-gray-100">
              <form className="relative">
                <input className="w-full px-3 py-2 pr-8 text-sm border rounded bg-transparent focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]" type="search" placeholder={t('SEARCH_KEY')} aria-label="Search" />
                <button className="bg-transparent p-1.5 absolute top-1/2 right-1 -translate-y-1/2 border-0 text-gray-500 hover:text-[var(--brand-primary)]" type="submit">
                  <i className="fas fa-search"></i>
                </button>
              </form>

              <div className="flex items-center gap-2">
                <LanguageSwitcher />
                <Link className="inline-flex items-center px-4 py-2 text-sm font-medium text-[var(--brand-primary)] border border-[var(--brand-primary)] rounded hover:bg-[var(--brand-primary)] hover:text-white transition-colors" href="/login">
                  {t('SIGN_IN_KEY')}
                </Link>
                <Link className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-[var(--brand-primary)] rounded hover:opacity-90 transition-colors" href="/register">
                  {t('ENROLL_NOW_KEY')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
