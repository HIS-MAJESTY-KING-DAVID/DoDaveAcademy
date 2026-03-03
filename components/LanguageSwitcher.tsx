'use client';

import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Avoid synchronous setState warning
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  if (!mounted) {
    return null; // or a placeholder
  }

  const currentLang = i18n.language || 'en';
  const flagSrc = currentLang === 'fr' ? '/assets/images/flags/fr.svg' : '/assets/images/flags/us.svg';

  return (
    <div className="dropdown ms-1 ms-lg-0">
        <a className="avatar avatar-sm p-0" href="#" id="profileDropdown" role="button" data-bs-auto-close="outside" data-bs-display="static" data-bs-toggle="dropdown" aria-expanded="false">
            <Image className="avatar-img rounded-circle" src={flagSrc} alt="avatar" width={40} height={40} />
        </a>
        <ul className="dropdown-menu dropdown-animation dropdown-menu-end shadow pt-3" aria-labelledby="profileDropdown">
            <li className="mb-3">
                <div className="d-flex align-items-center px-3">
                    <div className="mb-0">
                        <button className={`btn btn-sm btn-link ${currentLang === 'en' ? 'text-primary' : ''}`} onClick={() => changeLanguage('en')}>
                            <Image className="avatar-img rounded-circle me-2" style={{width: '20px', height: '20px'}} src="/assets/images/flags/us.svg" alt="avatar" width={20} height={20} />
                            English
                        </button>
                    </div>
                </div>
            </li>
            <li>
                <div className="d-flex align-items-center px-3">
                    <div className="mb-0">
                        <button className={`btn btn-sm btn-link ${currentLang === 'fr' ? 'text-primary' : ''}`} onClick={() => changeLanguage('fr')}>
                            <Image className="avatar-img rounded-circle me-2" style={{width: '20px', height: '20px'}} src="/assets/images/flags/fr.svg" alt="avatar" width={20} height={20} />
                            Français
                        </button>
                    </div>
                </div>
            </li>
        </ul>
    </div>
  );
}
