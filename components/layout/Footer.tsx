'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <footer className="pt-5 bg-gray-800 text-white">
      <div className="container">
        {/* Row START */}
        <div className="row g-4">
          
          {/* Col 1: Brand & Social */}
          <div className="col-lg-3">
            <Link className="me-0" href="/">
               <span style={{ fontFamily: 'Pacifico, cursive', fontSize: '24px', color: '#fff' }}>DoDave Academy</span>
            </Link>
            
            <p className="my-3 text-muted">{t('FOOTER_TAGLINE_KEY')}</p>
            
            {/* Social media icon */}
            <ul className="list-inline mb-0 mt-3">
                <li className="list-inline-item">
                    <a className="btn btn-white btn-sm shadow px-2 text-whatsapp" href="#"><i className="fab fa-fw fa-whatsapp"></i></a>
                </li>
                <li className="list-inline-item">
                    <a className="btn btn-white btn-sm shadow px-2 text-facebook" href="#"><i className="fab fa-fw fa-facebook-f"></i></a>
                </li>
                <li className="list-inline-item">
                    <a className="btn btn-white btn-sm shadow px-2 text-instagram" href="#"><i className="fab fa-fw fa-instagram"></i></a>
                </li>
                <li className="list-inline-item">
                    <a className="btn btn-white btn-sm shadow px-2 text-twitter" href="#"><i className="fab fa-fw fa-twitter"></i></a>
                </li>
                <li className="list-inline-item">
                    <a className="btn btn-white btn-sm shadow px-2 text-linkedin" href="https://www.linkedin.com/in/kollodavid237/" target="_blank"><i className="fab fa-fw fa-linkedin-in"></i></a>
                </li>
            </ul>
          </div>

          {/* Col 2: Company Links */}
          <div className="col-lg-2">
            <h5 className="mb-2 mb-md-4 text-white">{t('COMPANY_KEY')}</h5>
            <ul className="nav flex-column">
              <li className="nav-item"><Link className="nav-link text-muted" href="/courses">{t('COURSES_KEY')}</Link></li>
              <li className="nav-item"><Link className="nav-link text-muted" href="/exams">{t('EXAMS_KEY')}</Link></li>
              <li className="nav-item"><Link className="nav-link text-muted" href="/about">{t('ABOUTUS_KEY')}</Link></li>
              <li className="nav-item"><Link className="nav-link text-muted" href="/contact">{t('CONTACTUS_KEY')}</Link></li>
            </ul>
          </div>

          {/* Col 3: Community Links */}
          <div className="col-lg-2">
            <h5 className="mb-2 mb-md-4 text-white">{t('COMMUNITY_KEY')}</h5>
            <ul className="nav flex-column">
              <li className="nav-item"><Link className="nav-link text-muted" href="/faq">{t('FAQ_KEY')}</Link></li>
              <li className="nav-item"><Link className="nav-link text-muted" href="/forum">{t('FORUM_KEY')}</Link></li>
              <li className="nav-item"><Link className="nav-link text-muted" href="#">{t('SITEMAP_KEY')}</Link></li>
            </ul>
          </div>

          {/* Col 4: Teaching & Legal */}
          <div className="col-lg-2">
            <h5 className="mb-2 mb-md-4 text-white">{t('TEACHING_KEY')}</h5>
            <ul className="nav flex-column">
              <li className="nav-item"><Link className="nav-link text-muted" href="/become-teacher">{t('BECOMEATEACKER_KEY')}</Link></li>
              <li className="nav-item"><Link className="nav-link text-muted" href="/become-teacher#contactTitle">{t('HOWTOGUIDE_KEY')}</Link></li>
              <li className="nav-item"><Link className="nav-link text-muted" href="/terms">{t('TERMSANDCONDITIONS_KEY')}</Link></li>
            </ul>
          </div>

          {/* Col 5: Contact & Apps */}
          <div className="col-lg-3">
            <h5 className="mb-2 mb-md-4 text-white">{t('CONTACT_INFO_KEY')}</h5>
            <p className="mb-2 text-muted">{t('TOLLFREE_KEY')}: <span className="text-white">+237 673 14 77 53</span></p>
            <p className="mb-2 text-muted">{t('EMAIL_KEY')}: <span className="text-white">dave@dodave.tech</span></p>
            
            <h5 className="mb-2 mb-md-4 text-white mt-4">{t('MOBILE_APPS_KEY')}</h5>
            <div className="row g-2">
              <div className="col-6 col-sm-4 col-md-3 col-lg-6">
                <Link href="#"> <img src="/assets/images/client/google-play.svg" alt="" /> </Link>
              </div>
              <div className="col-6 col-sm-4 col-md-3 col-lg-6">
                <Link href="#"> <img src="/assets/images/client/app-store.svg" alt="app-store" /> </Link>
              </div>
            </div>
          </div>

        </div>
        {/* Row END */}

        {/* Divider */}
        <hr className="mt-4 mb-0 border-top border-secondary" />

        {/* Bottom footer */}
        <div className="py-3">
          <div className="container px-0">
            <div className="d-lg-flex justify-content-between align-items-center py-3 text-center text-md-left">
              {/* copyright text */}
              <div className="text-muted text-primary-hover">
                {t('COPYRIGHT_KEY', { year: new Date().getFullYear() })}
                <span className="mx-2">|</span>
                <Link href="/terms" className="text-muted">{t('TERMSOFUSE_KEY')}</Link>
                <span className="mx-2">|</span>
                <Link href="/terms" className="text-muted">{t('PRIVACYPOLICY_KEY')}</Link>
              </div>
              
              {/* copyright links*/}
              <div className="justify-content-center mt-3 mt-lg-0">
                <ul className="nav list-inline justify-content-center mb-0">
                  <li className="list-inline-item">
                    {/* Language selector */}
                    <div className="dropup mt-0 text-center text-sm-end">
                      <a className="dropdown-toggle nav-link text-muted" href="#" role="button" id="languageSwitcher" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="fas fa-globe me-2"></i>{t('QUICK_SETTINGS_KEY')}
                      </a>
                      <ul className="dropdown-menu min-w-auto" aria-labelledby="languageSwitcher">
                        <li><button className="dropdown-item me-4" onClick={() => changeLanguage('en')}><Image className="fa-fw me-2" src="/assets/images/flags/us.svg" alt="" width={20} height={15} />{t('ENGLISH_KEY')}</button></li>
                        <li><button className="dropdown-item me-4" onClick={() => changeLanguage('fr')}><Image className="fa-fw me-2" src="/assets/images/flags/fr.svg" alt="" width={20} height={15} />{t('FRENCH_KEY')}</button></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li>
                            <div className="modeswitch-item theme-icon-active d-flex justify-content-center gap-3 align-items-center p-2 pb-0">
                                <span>{t('THEME_KEY')}</span>
                                <button type="button" className="btn btn-link btn-sm p-0 mb-0" data-bs-theme-value="light">
                                    <i className="bi bi-sun fa-fw mode-switch"></i>
                                </button>
                                <button type="button" className="btn btn-link btn-sm p-0 mb-0" data-bs-theme-value="dark">
                                    <i className="bi bi-moon-stars fa-fw mode-switch"></i>
                                </button>
                                <button type="button" className="btn btn-link btn-sm p-0 mb-0" data-bs-theme-value="auto">
                                    <i className="bi bi-circle-half fa-fw mode-switch"></i>
                                </button>
                            </div>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
