import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about DoDave Academy\'s mission to provide innovative digital education solutions tailored for Africa. Empowering learners and instructors.',
  openGraph: {
    title: 'About DoDave Academy',
    description: 'Our mission is to democratize education in Africa through technology and expert-led training.',
  },
};

export default function About() {
  return (
    <main>
       <section>
          <div className="container">
             <div className="row g-4">
                <div className="col-10 text-center mx-auto position-relative">
                   {/* Title */}
                   <h1 className="position-relative fs-2">About Us</h1>
                </div>
             </div>
             
             {/* Images START */}
             <div className="row g-4 mt-0 mt-lg-5">
                {/* Left image */}
                <div className="col-6 col-md-4">
                   <div className="row g-4">
                      <div className="col-10 col-lg-6">
                         <Image className="rounded-4" src="/assets/images/about/05.jpg" alt="" width={300} height={400} style={{width:'100%', height:'auto'}} />
                      </div>
                      <div className="col-12">
                         <Image className="rounded-4" src="/assets/images/about/03.jpg" alt="" width={400} height={300} style={{width:'100%', height:'auto'}} />
                      </div>
                   </div>
                </div>
                
                {/* Center image */}
                <div className="col-6 col-md-4 position-relative">
                   <Image className="rounded-4" src="/assets/images/about/09.jpg" alt="" width={400} height={600} style={{width:'100%', height:'auto'}} />
                </div>
                
                {/* Right image */}
                <div className="col-md-4">
                   <div className="row g-4">
                      <div className="col-sm-6 col-md-12">
                         <div className="bg-primary bg-opacity-10 rounded-4 p-5 text-start">
                            <span>Our Goal:</span>
                            <h3>“To democratize education in Africa”</h3>
                         </div>
                      </div>
                      <div className="col-sm-6 col-md-12 col-lg-6">
                         <Image className="rounded-4" src="/assets/images/about/10.jpg" alt="" width={300} height={300} style={{width:'100%', height:'auto'}} />
                      </div>
                   </div>
                </div>
             </div>
          </div>
       </section>
    </main>
  );
}
