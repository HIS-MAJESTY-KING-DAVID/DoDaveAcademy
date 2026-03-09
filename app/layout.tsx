import { Metadata, Viewport } from 'next';
import './globals.css';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Script from 'next/script';
import I18nProvider from '../components/I18nProvider';
import { AuthProvider } from '../context/AuthContext';
import { Montserrat, Pacifico, Roboto } from 'next/font/google';
import GlobalStructuredData from '../components/SEO/GlobalStructuredData';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--heading-font-family',
  display: 'swap',
});

const pacifico = Pacifico({
  subsets: ['latin'],
  weight: '400',
  variable: '--brand-font-family',
  display: 'swap',
});

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--bs-body-font-family',
  display: 'swap',
});

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://academy.dodave.tech';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#4f46e5',
};

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'DoDave Academy | Innovative Digital Education for Africa',
    template: '%s | DoDave Academy',
  },
  description:
    'DoDave Academy offers innovative digital education solutions tailored for the African context. Explore our courses, exams, and programs to enhance your skills.',
  keywords: [
    'e-learning',
    'Africa',
    'education',
    'courses',
    'exams',
    'digital learning',
    'skills',
    'DoDave Academy',
    'Senegal',
    'coding',
    'professional training',
  ],
  authors: [{ name: 'DoDave Academy', url: baseUrl }],
  creator: 'DoDave Academy',
  publisher: 'DoDave Academy',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: './',
    languages: {
      en: '/en',
      fr: '/fr',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    siteName: 'DoDave Academy',
    title: 'DoDave Academy | Innovative Digital Education for Africa',
    description:
      'Innovative digital education solutions tailored for the African context. Empowering students and professionals with cutting-edge courses and exams.',
    images: [
      {
        url: '/logo.svg',
        width: 800,
        height: 600,
        alt: 'DoDave Academy Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DoDave Academy | Innovative Digital Education for Africa',
    description:
      'Innovative digital education solutions tailored for the African context. Join our platform to enhance your skills and achieve your goals.',
    images: ['/logo.svg'],
  },
  verification: {
    google: 'GSC_VERIFICATION_CODE_PLACEHOLDER',
  },
  category: 'education',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${montserrat.variable} ${pacifico.variable} ${roboto.variable}`}>
      <head>
        <GlobalStructuredData />
        <meta charSet="UTF-8" />
        
        {/* Plugins CSS */}
        {/* eslint-disable @next/next/no-css-tags */}
        <link rel="stylesheet" type="text/css" href="/assets/vendor/font-awesome/css/all.min.css" />
        <link rel="stylesheet" type="text/css" href="/assets/vendor/bootstrap-icons/bootstrap-icons.css" />
        <link rel="stylesheet" type="text/css" href="/assets/vendor/apexcharts/css/apexcharts.css" />
        <link rel="stylesheet" type="text/css" href="/assets/vendor/overlay-scrollbar/css/overlayscrollbars.min.css" />
        <link rel="stylesheet" type="text/css" href="/assets/vendor/tiny-slider/tiny-slider.css" />
        <link rel="stylesheet" type="text/css" href="/assets/vendor/glightbox/css/glightbox.css" />
        <link rel="stylesheet" type="text/css" href="/assets/vendor/choices/css/choices.min.css" />
        <link rel="stylesheet" type="text/css" href="/assets/vendor/aos/aos.css" />
        <link rel="stylesheet" type="text/css" href="/assets/vendor/plyr/plyr.css" />

        {/* Template Stylesheet */}
        <link href="/assets/css/style.css" rel="stylesheet" />
        {/* eslint-enable @next/next/no-css-tags */}
      </head>
      <body>
        <AuthProvider>
          <I18nProvider>
            <Header />
            {children}
            <Footer />
          </I18nProvider>
        </AuthProvider>

        {/* JavaScript Libraries */}
        <Script src="/assets/vendor/jquery/jquery-3.6.4.min.js" strategy="beforeInteractive" />
        <Script src="/assets/vendor/bootstrap/dist/js/bootstrap.bundle.min.js" strategy="afterInteractive" />
        <Script src="/assets/vendor/tiny-slider/tiny-slider.js" strategy="lazyOnload" />
        <Script src="/assets/vendor/glightbox/js/glightbox.js" strategy="lazyOnload" />
        <Script src="/assets/vendor/purecounterjs/dist/purecounter_vanilla.js" strategy="lazyOnload" />
        <Script src="/assets/vendor/apexcharts/js/apexcharts.min.js" strategy="lazyOnload" />
        <Script src="/assets/vendor/overlay-scrollbar/js/overlayscrollbars.min.js" strategy="lazyOnload" />
        <Script src="/assets/vendor/choices/js/choices.min.js" strategy="lazyOnload" />
        <Script src="/assets/vendor/aos/aos.js" strategy="lazyOnload" />
        
        {/* Custom Scripts */}
        <Script id="custom-scripts" strategy="lazyOnload">
          {`
            // Custom scripts from base.html.twig
             if (typeof $ !== 'undefined') {
                $('.pagination-container nav').addClass('mt-4 d-flex justify-content-center');
                $('.pagination-container nav ul.pagination li').addClass('mb-0');
                $('.pagination-container nav ul.pagination').addClass('pagination-primary-soft d-inline-block d-md-flex rounded mb-0');
             }
          `}
        </Script>
      </body>
    </html>
  );
}
