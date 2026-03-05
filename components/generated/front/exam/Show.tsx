import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Script from 'next/script';

interface Exam {
  reference: string;
  title: string;
  description: string;
  publishedAt: string;
  classe: { name: string };
  category: { name: string };
  user: {
    personne: {
      nomComplet: string;
      avatarPath: string;
    };
  };
}

interface Course {
    slug: string;
    intitule: string;
    createdAt: string;
    media: { imageFile: string };
}

interface ShowProps {
  exam: Exam;
  data: string; // PDF filename
  display: 'subject' | 'correction';
  courses?: Course[];
}

export default function Show({ exam, data, display, courses = [] }: ShowProps) {
  const [pdfLoaded, setPdfLoaded] = useState(false);

  useEffect(() => {
    // Screenshot protection
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'p' || e.keyCode === 83 || e.keyCode === 80)) {
        e.preventDefault();
        return false;
      }
      if (e.key === 'PrintScreen' || e.keyCode === 44) {
        showScreenshotWarning();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
        if (e.key === 'PrintScreen' || e.keyCode === 44) {
            showScreenshotWarning();
        }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const showScreenshotWarning = () => {
    let warning = document.getElementById('screenshot-warning');
    if (!warning) {
      warning = document.createElement('div');
      warning.id = 'screenshot-warning';
      Object.assign(warning.style, {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'rgba(255, 0, 0, 0.9)',
        color: 'white',
        padding: '20px',
        borderRadius: '5px',
        zIndex: '9999',
        textAlign: 'center',
      });
      warning.innerHTML = '<h3>Capture d\'écran détectée!</h3><p>La capture d\'écran n\'est pas autorisée sur DoDave Academy.</p>';
      document.body.appendChild(warning);
      setTimeout(() => {
        if (warning && warning.parentNode) warning.parentNode.removeChild(warning);
      }, 3000);
    }
  };

  const renderPDF = () => {
      // @ts-ignore
      if (typeof pdfjsLib === 'undefined') return;

      // @ts-ignore
      pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';
      
      const url = `/uploads/media/exams/files/${data}`;
      const container = document.getElementById('pdf-container');
      if (!container) return;

      // @ts-ignore
      pdfjsLib.getDocument(url).promise.then((pdf: any) => {
          const numPages = pdf.numPages;
          // Clear existing canvases
          const canvases = container.querySelectorAll('canvas');
          canvases.forEach(c => c.remove());
          
          const scale = 1.5;

          const renderPage = (pageNum: number) => {
              pdf.getPage(pageNum).then((page: any) => {
                  const viewport = page.getViewport({ scale: scale });
                  const canvas = document.createElement('canvas');
                  const context = canvas.getContext('2d');
                  canvas.height = viewport.height;
                  canvas.width = viewport.width;
                  canvas.style.display = 'block';
                  canvas.style.margin = '0 auto 24px auto';
                  
                  if (context) {
                    const renderContext = {
                        canvasContext: context,
                        viewport: viewport
                    };
                    page.render(renderContext).promise.then(() => {
                        container.appendChild(canvas);
                        if (pageNum < numPages) {
                            renderPage(pageNum + 1);
                        } else {
                            createMovingWatermarks();
                        }
                    });
                  }
              });
          };
          renderPage(1);
      }).catch((error: any) => {
          console.error('Error loading PDF:', error);
      });
  };

  const createMovingWatermarks = () => {
    const container = document.getElementById('pdf-container');
    if (!container) return;

    let watermarkElement = container.querySelector('.floating-watermark') as HTMLElement;
    if (!watermarkElement) return;

    watermarkElement.innerHTML = '';
    const containerWidth = container.offsetWidth;
    // Estimate total height based on canvases or just container height if scrolling
    // But since canvases are appended, container.scrollHeight might be better
    const totalHeight = container.scrollHeight;
    
    watermarkElement.style.height = `${totalHeight}px`;
    watermarkElement.style.width = '100%';

    const numWatermarks = 15;
    for (let i = 0; i < numWatermarks; i++) {
        const watermark = document.createElement('div');
        watermark.className = 'dynamic-watermark';
        watermark.innerText = 'www.kulmapeck.com';
        Object.assign(watermark.style, {
            position: 'absolute',
            color: 'rgba(255, 0, 0, 0.15)',
            zIndex: '1001',
            pointerEvents: 'none',
            fontSize: '18px',
            transform: `rotate(${Math.random() * 90 - 45}deg)`,
            left: `${Math.random() * containerWidth}px`,
            top: `${Math.random() * totalHeight}px`
        });
        watermarkElement.appendChild(watermark);
    }
  };

  return (
    <>
      <Script 
        src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.min.js" 
        onLoad={() => {
            setPdfLoaded(true);
            renderPDF();
        }}
      />
      
      <style>{`
        .screenshot-protection {
            position: relative;
        }
        .screenshot-protection::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 999;
            background-image: url("data:image/svg+xml,%3Csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='watermark' width='300' height='300' patternUnits='userSpaceOnUse'%3E%3Ctext x='50' y='150' font-family='Arial' font-size='20' fill='rgba(200, 0, 0, 0.05)' transform='rotate(-45 150 150)'%3Ekulmapeck.com%3C/text%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23watermark)'/%3E%3C/svg%3E");
            opacity: 0.3;
        }
        @media print {
            body * { display: none !important; }
            body:after { content: "L'impression n'est pas autorisée"; display: block !important; }
        }
      `}</style>

      {/* Main Content START */}
      <section className="pb-0 pt-4 pb-md-5">
        <div className="container">
          <div className="row">
            <div className="col-12">

              {/* Title and Info START */}
              <div className="row">
                {/* Avatar and Share */}
                <div className="col-lg-3 align-items-center mt-4 mt-lg-5 order-2 order-lg-1">
                  <div className="text-lg-center">
                    {/* Author info */}
                    <div className="position-relative">
                      {/* Avatar */}
                      <div className="avatar avatar-xxl">
                        <img 
                            className="avatar-img rounded-circle" 
                            src={exam.user.personne.avatarPath || '/assets/images/avatar/01.jpg'} 
                            alt="avatar" 
                        />
                      </div>
                      <a href="#" className="h5 stretched-link mt-2 mb-0 d-block">{exam.user.personne.nomComplet}</a>
                      <p className="mb-2">Editor at kulmapeck</p>
                    </div>
                    {/* Info */}
                    <ul className="list-inline list-unstyled">
                      <li className="list-inline-item d-lg-block my-lg-2">
                        {new Date(exam.publishedAt).toLocaleString('fr-FR')}
                      </li>
                      {display !== 'correction' ? (
                        <li className="list-inline-item d-lg-block my-lg-2">
                            <Link href={`/exam/${exam.reference}?display=correction`} className="btn btn-success-soft">
                                Voir la correction
                            </Link>
                        </li>
                      ) : (
                        <li className="list-inline-item d-lg-block my-lg-2">
                            <Link href={`/exam/${exam.reference}?display=subject`} className="btn btn-primary-soft">
                                Retour au sujet
                            </Link>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>

                {/* Content */}
                <div className="col-lg-9 order-1">
                  {/* Pre title */}
                  <span className="badge text-bg-primary">{exam.classe.name}</span>
                  <span className="mx-2">|</span>
                  <div className="badge text-bg-success">{exam.category.name}</div>
                  {/* Title */}
                  <h1 className="mt-2 mb-0 display-5">{exam.title}</h1>
                  {/* Info */}
                  <p className="mt-2">{exam.description}</p>
                </div>
              </div>
              {/* Title and Info END */}
              
              {/* PDF Container START */}
              <div className="row mt-4">
                <div className="col-xl-10 mx-auto">
                    {/* Card item START */}
                    <div 
                        className="card overflow-hidden h-700px rounded-3 text-center" 
                        style={{
                            backgroundImage: 'url(/assets/images/event/10.jpg)', 
                            backgroundPosition: 'center left', 
                            backgroundSize: 'cover'
                        }}
                    >
                        {/* Card Image overlay */}
                        <div className="bg-overlay bg-dark opacity-4"></div>
                        <div className="card-img-overlay d-flex align-items-center p-2 p-sm-4"> 
                            <div className="w-100 my-auto">
                                <div className="row justify-content-center">
                                    <div 
                                        id="pdf-container" 
                                        className="screenshot-protection" 
                                        style={{ width: '100%', height: '800px', overflow: 'auto', position: 'relative' }}
                                    >
                                        <div 
                                            className="floating-watermark" 
                                            style={{
                                                pointerEvents: 'none', 
                                                position: 'absolute', 
                                                left: 0, 
                                                top: 0, 
                                                width: '100%', 
                                                height: '100%', 
                                                zIndex: 1001
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Card item END */}
                </div>
              </div>
              {/* PDF Container END */}
              
            </div>
          </div> 
        </div>
      </section>
      {/* Main Content END */}
      
      {/* Related Courses Slider would go here - skipping for brevity if not strictly required or implementing simple list */}
      {courses && courses.length > 0 && (
          <section className="pt-0">
              <div className="container">
                  <div className="row mb-4">
                      <div className="col-12">
                          <h2 className="mb-0">Most Popular</h2>
                      </div>
                  </div>
                  <div className="row g-4">
                      {courses.slice(0, 3).map((course, idx) => (
                          <div className="col-sm-6 col-lg-4" key={idx}>
                              <div className="card bg-transparent">
                                  <div className="row g-0">
                                      <div className="col-md-4">
                                          <img src={`/uploads/media/courses/${course.media.imageFile}`} className="img-fluid rounded-start" alt="..." />
                                      </div>
                                      <div className="col-md-8">
                                          <div className="card-body">
                                              <h6 className="card-title">
                                                  <Link href={`/course/${course.slug}`}>{course.intitule}</Link>
                                              </h6>
                                              <span className="small">{new Date(course.createdAt).toLocaleDateString()}</span>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      ))}
                  </div>
              </div>
          </section>
      )}

    </>
  );
}
