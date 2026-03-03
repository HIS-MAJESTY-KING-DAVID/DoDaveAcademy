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
    <footer className="pt-5">
      <div className="container">
        {/* Row START */}
        <div className="row g-4">
          {/* Widget 1 START */}
          <div className="col-lg-3">
            {/* logo */}
            <Link className="me-0" href="/">
              <Image
                className="light-mode-item h-40px"
                src="/assets/images/logo.svg"
                alt="logo"
                width={150}
                height={40}
                style={{ height: '40px', width: 'auto' }}
              />
            </Link>

            <a href="https://wa.me/+237698809093" title="Nous rejoindre sur Whatsapp" target="_blank" className="whatsapp-icon d-block mt-3">
                <Image src="/assets/images/icone-whatsapp.png" alt="WhatsApp" width={70} height={70} />
            </a>

            <p className="my-3">DoDave Academy - {t('MAINMESSAGEDESCRIPTION_KEY')}</p>
            
            {/* Social media icon */}
            <ul className="list-inline mb-0 mt-3">
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
                    <a className="btn btn-white btn-sm shadow px-2 text-linkedin" href="#"><i className="fab fa-fw fa-linkedin-in"></i></a>
                </li>
            </ul>
          </div>
          {/* Widget 1 END */}

          {/* Widget 2 START */}
          <div className="col-lg-6">
            <div className="row g-4">
              {/* Link block */}
              <div className="col-6 col-md-4">
                <h5 className="mb-2 mb-md-4">{t('COMPANY_KEY')}</h5>
                <ul className="nav flex-column">
                  <li className="nav-item"><Link className="nav-link" href="#">{t('ABOUTUS_KEY')}</Link></li>
                  <li className="nav-item"><Link className="nav-link" href="#">{t('CONTACTUS_KEY')}</Link></li>
                  <li className="nav-item"><Link className="nav-link" href="#">News and Blogs</Link></li>
                  <li className="nav-item"><Link className="nav-link" href="#">Library</Link></li>
                  <li className="nav-item"><Link className="nav-link" href="#">Career</Link></li>
                </ul>
              </div>

              {/* Link block */}
              <div className="col-6 col-md-4">
                <h5 className="mb-2 mb-md-4">{t('COMMUNITY_KEY')}</h5>
                <ul className="nav flex-column">
                  <li className="nav-item"><Link className="nav-link" href="#">Documentation</Link></li>
                  <li className="nav-item"><Link className="nav-link" href="#">{t('FAQ_KEY')}</Link></li>
                  <li className="nav-item"><Link className="nav-link" href="#">{t('FORUM_KEY')}</Link></li>
                  <li className="nav-item"><Link className="nav-link" href="#">{t('SITEMAP_KEY')}</Link></li>
                </ul>
              </div>

              {/* Link block */}
              <div className="col-6 col-md-4">
                <h5 className="mb-2 mb-md-4">{t('TEACHING_KEY')}</h5>
                <ul className="nav flex-column">
                  <li className="nav-item"><Link className="nav-link" href="#">{t('BECOMEATEACKER_KEY')}</Link></li>
                  <li className="nav-item"><Link className="nav-link" href="#">{t('HOWTOGUIDE_KEY')}</Link></li>
                  <li className="nav-item"><Link className="nav-link" href="#">{t('TERMSANDCONDITIONS_KEY')}</Link></li>
                </ul>
              </div>
            </div>
          </div>
          {/* Widget 2 END */}

          {/* Widget 3 START */}
          <div className="col-lg-3">
            <h5 className="mb-2 mb-md-4">{t('CONTACT_KEY')}</h5>
            {/* Time */}
            <p className="mb-2">
              {t('TOLLFREE_KEY')}:<span className="h6 fw-light ms-2">+237 650 96 70 64</span>
              <span className="d-block small">(9:AM to 8:PM IST)</span>
            </p>

            <p className="mb-0">{t('EMAIL_KEY')}:<span className="h6 fw-light ms-2">akouma.net@gmail.com</span></p>

            <div className="row g-2 mt-2">
              {/* Google play store button */}
              <div className="col-6 col-sm-4 col-md-3 col-lg-6">
                <a href="#">
                  <Image src="/assets/images/client/google-play.svg" alt="" width={100} height={30} style={{ width: '100%', height: 'auto' }} />
                </a>
              </div>
              {/* App store button */}
              <div className="col-6 col-sm-4 col-md-3 col-lg-6">
                <a href="#">
                  <Image src="/assets/images/client/app-store.svg" alt="app-store" width={100} height={30} style={{ width: '100%', height: 'auto' }} />
                </a>
              </div>
            </div>
          </div>
          {/* Widget 3 END */}
        </div>
        {/* Row END */}

        {/* Divider */}
        <hr className="mt-4 mb-0" />

        {/* Bottom footer */}
        <div className="py-3">
          <div className="container px-0">
            <div className="d-lg-flex justify-content-between align-items-center py-3 text-center text-md-left">
              {/* copyright text */}
              <div className="text-primary-hover">Copyrights 2023 Sensei237. All rights reserved</div>
              {/* copyright links*/}
              <div className="justify-content-center mt-3 mt-lg-0">
                <ul className="nav list-inline justify-content-center mb-0">
                  <li className="list-inline-item">
                    {/* Language selector */}
                    <div className="dropup mt-0 text-center text-sm-end">
                      <a className="dropdown-toggle nav-link" href="#" role="button" id="languageSwitcher" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="fas fa-globe me-2"></i>{t('LANGUAGE_KEY')}
                      </a>
                      <ul className="dropdown-menu min-w-auto" aria-labelledby="languageSwitcher">
                        <li><button className="dropdown-item me-4" onClick={() => changeLanguage('en')}><Image className="fa-fw me-2" src="/assets/images/flags/us.svg" alt="" width={20} height={15} />{t('ENGLISH_KEY')}</button></li>
                        <li><button className="dropdown-item me-4" onClick={() => changeLanguage('fr')}><Image className="fa-fw me-2" src="/assets/images/flags/fr.svg" alt="" width={20} height={15} />{t('FRENCH_KEY')}</button></li>
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
