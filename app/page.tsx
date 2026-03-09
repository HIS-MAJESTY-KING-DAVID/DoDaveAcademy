import { Metadata } from 'next';
import HomeClient from '@/components/home/HomeClient';

export const metadata: Metadata = {
  title: 'DoDave Academy | Innovative Digital Education for Africa',
  description: 'DoDave Academy offers innovative digital education solutions tailored for the African context. Explore our courses, exams, and programs to enhance your skills.',
  openGraph: {
    title: 'DoDave Academy | Innovative Digital Education for Africa',
    description: 'Innovative digital education solutions tailored for the African context. Empowering students and professionals with cutting-edge courses and exams.',
  },
};

export default function Home() {
  return <HomeClient />;
}
