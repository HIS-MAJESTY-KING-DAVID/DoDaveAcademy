import { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Have questions? Get in touch with DoDave Academy. Our support team is here to assist you with your education journey.',
  openGraph: {
    title: 'Contact DoDave Academy',
    description: 'We are here to help. Reach out to our team for any inquiries or support.',
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
