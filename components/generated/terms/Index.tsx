import React from 'react';
import Link from 'next/link';

interface Term {
  id: number;
  title: string;
  content: string;
}

interface IndexProps {
  terms: Term[];
}

export default function Index({ terms }: IndexProps) {
  return (
    <>
      <section 
        className="bg-dark align-items-center d-flex" 
        style={{
          background: `url(/assets/images/pattern/04.png) no-repeat center center`, 
          backgroundSize: 'cover'
        }}
      >
        {/* Main banner background image */}
        <div className="container">
          <div className="row">
            <div className="col-12">
              {/* Title */}
              <h1 className="text-white">Terms and conditions</h1>
              {/* Breadcrumb */}
              <div className="d-flex">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb breadcrumb-dark breadcrumb-dots mb-0">
                    <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Terms & conditions</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Page content START */}
      <section className="pb-0 py-sm-5">
        <div className="container">
          {(!terms || terms.length === 0) ? (
            <h1 className="text-center mt-5 mb-5">Coming Soon... <i className="fas fa-sync fa-spin"></i></h1>
          ) : (
            <div className="accordion accordion-icon accordion-bg-light" id="accordionExample2">
              {terms.map((term, index) => (
                <div className="accordion-item mb-3" key={term.id}>
                  <h6 className="accordion-header font-base" id={`heading-${term.id}`}>
                    <button 
                      className={`accordion-button fw-bold rounded d-block ${index !== 0 ? 'collapsed' : ''}`}
                      type="button" 
                      data-bs-toggle="collapse" 
                      data-bs-target={`#collapse-${term.id}`} 
                      aria-expanded={index === 0 ? 'true' : 'false'} 
                      aria-controls={`collapse-${term.id}`}
                    >
                      <span className="mb-0">{term.title}</span>
                    </button>
                  </h6>
                  <div 
                    id={`collapse-${term.id}`} 
                    className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`} 
                    aria-labelledby={`heading-${term.id}`} 
                    data-bs-parent="#accordionExample2"
                  >
                    <div className="accordion-body mt-3" dangerouslySetInnerHTML={{ __html: term.content }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
