'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { contacts } from '@/lib/contacts';

export default function Footer() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <footer className="bg-gray-800 text-white pt-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {/* Col 1: Brand & Social */}
          <div className="lg:col-span-1">
            <Link href="/">
               <span style={{ fontFamily: 'Pacifico, cursive', fontSize: '24px', color: '#fff' }}>DoDave Academy</span>
            </Link>
            <p className="my-3 text-gray-400">{t('FOOTER_TAGLINE_KEY')}</p>
            <ul className="flex flex-wrap gap-2 mt-3">
                <li>
                    <a className="inline-flex items-center justify-center w-8 h-8 bg-white rounded shadow-sm text-whatsapp hover:opacity-90" href="#"><i className="fab fa-fw fa-whatsapp"></i></a>
                </li>
                <li>
                    <a className="inline-flex items-center justify-center w-8 h-8 bg-white rounded shadow-sm text-facebook hover:opacity-90" href="#"><i className="fab fa-fw fa-facebook-f"></i></a>
                </li>
                <li>
                    <a className="inline-flex items-center justify-center w-8 h-8 bg-white rounded shadow-sm text-instagram hover:opacity-90" href="#"><i className="fab fa-fw fa-instagram"></i></a>
                </li>
                <li>
                    <a className="inline-flex items-center justify-center w-8 h-8 bg-white rounded shadow-sm text-twitter hover:opacity-90" href="#"><i className="fab fa-fw fa-twitter"></i></a>
                </li>
                <li>
                    <a className="inline-flex items-center justify-center w-8 h-8 bg-white rounded shadow-sm text-linkedin hover:opacity-90" href="https://www.linkedin.com/in/kollodavid237/" target="_blank"><i className="fab fa-fw fa-linkedin-in"></i></a>
                </li>
            </ul>
          </div>

          {/* Col 2: Company Links */}
          <div>
            <h5 className="mb-2 md:mb-4 text-white font-semibold">{t('COMPANY_KEY')}</h5>
            <ul className="flex flex-col space-y-2">
              <li><Link className="text-gray-400 hover:text-white transition" href="/courses">{t('COURSES_KEY')}</Link></li>
              <li><Link className="text-gray-400 hover:text-white transition" href="/exams">{t('EXAMS_KEY')}</Link></li>
              <li><Link className="text-gray-400 hover:text-white transition" href="/about">{t('ABOUTUS_KEY')}</Link></li>
              <li><Link className="text-gray-400 hover:text-white transition" href="/contact">{t('CONTACTUS_KEY')}</Link></li>
            </ul>
          </div>

          {/* Col 3: Community Links */}
          <div>
            <h5 className="mb-2 md:mb-4 text-white font-semibold">{t('COMMUNITY_KEY')}</h5>
            <ul className="flex flex-col space-y-2">
              <li><Link className="text-gray-400 hover:text-white transition" href="/faq">{t('FAQ_KEY')}</Link></li>
              <li><Link className="text-gray-400 hover:text-white transition" href="/forum">{t('FORUM_KEY')}</Link></li>
              <li><Link className="text-gray-400 hover:text-white transition" href="/sitemap.xml">{t('SITEMAP_KEY')}</Link></li>
            </ul>
          </div>

          {/* Col 4: Teaching & Legal */}
          <div>
            <h5 className="mb-2 md:mb-4 text-white font-semibold">{t('TEACHING_KEY')}</h5>
            <ul className="flex flex-col space-y-2">
              <li><Link className="text-gray-400 hover:text-white transition" href="/become-teacher">{t('BECOMEATEACKER_KEY')}</Link></li>
              <li><Link className="text-gray-400 hover:text-white transition" href="/become-teacher#contactTitle">{t('HOWTOGUIDE_KEY')}</Link></li>
              <li><Link className="text-gray-400 hover:text-white transition" href="/terms">{t('TERMSANDCONDITIONS_KEY')}</Link></li>
            </ul>
          </div>

          {/* Col 5: Contact & Apps */}
          <div>
            <h5 className="mb-2 md:mb-4 text-white font-semibold">{t('CONTACT_INFO_KEY')}</h5>
            <p className="mb-2 text-gray-400"><i className="fas fa-map-marker-alt me-1"></i> <span className="text-white">{contacts.address}</span></p>
            <p className="mb-2 text-gray-400">{t('TOLLFREE_KEY')}: <span className="text-white">{contacts.phone}</span></p>
            <p className="mb-2 text-gray-400">{t('EMAIL_KEY')}: <span className="text-white">{contacts.email}</span></p>
            <h5 className="mb-2 md:mb-4 text-white font-semibold mt-4">{t('MOBILE_APPS_KEY')}</h5>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Link href="#"> <img src="/assets/images/client/google-play.svg" alt="" /> </Link>
              </div>
              <div>
                <Link href="#"> <img src="/assets/images/client/app-store.svg" alt="app-store" /> </Link>
              </div>
            </div>
          </div>
        </div>

        <hr className="mt-6 mb-0 border-t border-gray-600" />

        <div className="py-3">
          <div className="lg:flex justify-between items-center py-3 text-center md:text-left">
            <div className="text-gray-400">
              {t('COPYRIGHT_KEY', { year: new Date().getFullYear() })}
              <span className="mx-2">|</span>
              <Link href="/terms" className="text-gray-400 hover:text-white transition">{t('TERMSOFUSE_KEY')}</Link>
              <span className="mx-2">|</span>
              <Link href="/terms" className="text-gray-400 hover:text-white transition">{t('PRIVACYPOLICY_KEY')}</Link>
            </div>
            <div className="flex justify-center mt-3 lg:mt-0">
              <div className="relative">
                <a className="flex items-center text-gray-400 hover:text-white transition cursor-pointer" role="button" id="languageSwitcher" data-bs-toggle="dropdown" aria-expanded="false">
                  <i className="fas fa-globe me-2"></i>{t('QUICK_SETTINGS_KEY')}
                </a>
                <ul className="absolute bottom-full mb-1 right-0 min-w-max bg-white shadow-lg rounded hidden" aria-labelledby="languageSwitcher" data-bs-popper="static">
                  <li><button className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={() => changeLanguage('en')}><Image className="inline me-2" src="/assets/images/flags/us.svg" alt="" width={20} height={15} />{t('ENGLISH_KEY')}</button></li>
                  <li><button className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={() => changeLanguage('fr')}><Image className="inline me-2" src="/assets/images/flags/fr.svg" alt="" width={20} height={15} />{t('FRENCH_KEY')}</button></li>
                  <li><hr className="my-1 border-t border-gray-200" /></li>
                  <li>
                      <div className="flex justify-center gap-3 items-center p-2 pb-0">
                          <span className="text-gray-600 text-sm">{t('THEME_KEY')}</span>
                          <button type="button" className="p-1 text-gray-600 hover:text-gray-900" data-bs-theme-value="light">
                              <i className="bi bi-sun"></i>
                          </button>
                          <button type="button" className="p-1 text-gray-600 hover:text-gray-900" data-bs-theme-value="dark">
                              <i className="bi bi-moon-stars"></i>
                          </button>
                          <button type="button" className="p-1 text-gray-600 hover:text-gray-900" data-bs-theme-value="auto">
                              <i className="bi bi-circle-half"></i>
                          </button>
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
