import React from 'react';
import StructuredData from './StructuredData';

const GlobalStructuredData: React.FC = () => {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://academy.dodave.tech';

  const organizationData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'DoDave Academy',
    url: baseUrl,
    logo: `${baseUrl}/assets/images/logo.svg`,
    sameAs: [
      'https://www.facebook.com/dodaveacademy',
      'https://twitter.com/dodaveacademy',
      'https://www.linkedin.com/company/dodaveacademy',
      'https://www.instagram.com/dodaveacademy',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+221-XXX-XX-XX', // Replace with real number if available
      contactType: 'customer service',
      areaServed: 'AF',
      availableLanguage: ['en', 'fr'],
    },
  };

  const websiteData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'DoDave Academy',
    url: baseUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/courses?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      <StructuredData data={organizationData} />
      <StructuredData data={websiteData} />
    </>
  );
};

export default GlobalStructuredData;
