import './globals.css';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Script from 'next/script';
import I18nProvider from '../components/I18nProvider';
import { AuthProvider } from '../context/AuthContext';
import { Montserrat, Pacifico, Roboto } from 'next/font/google';

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

export const metadata = {
  title: 'DoDave Academy - Welcome',
  description: 'La solution éducative innovante et digitalisée adaptée au contexte Africain.',
  icons: {
    icon: '/logo.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${montserrat.variable} ${pacifico.variable} ${roboto.variable}`}>
      <head>
        <meta charSet="UTF-8" />
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        
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
