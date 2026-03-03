import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface Lesson {
  id: number;
  title: string;
  numero: number;
  description: string;
  content: string; // HTML content
  videoLink: string | null;
  poster: string | null;
  slug: string;
  isPremium: boolean;
  chapitre: Chapter;
}

interface Chapter {
  id: number;
  title: string;
  numero: number;
  description: string;
  slug: string;
  lessons: Lesson[];
  cours: Course;
}

interface Course {
  id: number;
  intitule: string; // Title
  slug: string;
  review: number;
  niveauDifficulte: string; // Difficulty level
  updatedAt: string; // Date string
  language: string;
  eleves: any[]; // Students enrolled
  chapitres: Chapter[];
  media: {
      imageFile: string;
  };
  createdAt: string;
}

interface Lecture {
  reference: string;
  isFinished: boolean;
  lesson: Lesson;
}

interface ReadProps {
  lesson: Lesson;
  lecture?: Lecture | null;
  nbReviews?: number;
}

export default function Read({ lesson, lecture, nbReviews = 1 }: ReadProps) {
  const [activeChapterId, setActiveChapterId] = useState<number | null>(lesson.chapitre?.id || null);
  const [showPlaylist, setShowPlaylist] = useState(false);

  // Helper to format date
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  // Helper for reviews (avoid division by zero)
  const averageReview = nbReviews && nbReviews > 0 ? (lesson.chapitre.cours.review / nbReviews).toFixed(1) : '0.0';

  if (!lesson || !lesson.chapitre || !lesson.chapitre.cours) {
      return <div>Loading...</div>;
  }

  return (
    <>
      <style>
        {`
        .offcanvas-lg.show {
            visibility: visible;
            transform: none;
        }
        @media (min-width: 992px) {
            .offcanvas-lg {
                visibility: visible;
                transform: none;
                background: transparent;
            }
        }
        `}
      </style>

      {/* Page intro START */}
      <section className="bg-light py-0 py-sm-5">
        <div className="container">
          <div className="row py-5">
            <div className="col-lg-8">
              {/* Badge */}
              <h6 className="mb-3 font-base bg-primary text-white py-2 px-4 rounded-2 d-inline-block">
                {lesson.chapitre.cours.intitule}
              </h6>
              {/* Title */}
              <h1>Chapter {lesson.chapitre.numero} - {lesson.chapitre.title}</h1>
              <p>{lesson.chapitre.description}</p>
              {/* Content */}
              <ul className="list-inline mb-0">
                <li className="list-inline-item h6 me-3 mb-1 mb-sm-0">
                  <i className="fas fa-star text-warning me-2"></i>{averageReview}/5.0
                </li>
                <li className="list-inline-item h6 me-3 mb-1 mb-sm-0">
                  <i className="fas fa-user-graduate text-orange me-2"></i>{lesson.chapitre.cours.eleves ? lesson.chapitre.cours.eleves.length : 0} Enrolled
                </li>
                <li className="list-inline-item h6 me-3 mb-1 mb-sm-0">
                  <i className="fas fa-signal text-success me-2"></i>{lesson.chapitre.cours.niveauDifficulte}
                </li>
                <li className="list-inline-item h6 me-3 mb-1 mb-sm-0">
                  <i className="bi bi-patch-exclamation-fill text-danger me-2"></i>Last updated {formatDate(lesson.chapitre.cours.updatedAt)}
                </li>
                <li className="list-inline-item h6 mb-0">
                  <i className="fas fa-globe text-info me-2"></i>{lesson.chapitre.cours.language}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* Page intro END */}

      {/* Page content START */}
      <section className="pb-0 py-lg-5">
        <div className="container">
          <div className="row">
            {/* Main content START */}
            <div className="col-lg-8 order-2 order-lg-1">
              <div className="card shadow rounded-2 p-0">
                {/* Tab contents START */}
                <div className="card-body p-4">
                  <div className="tab-content pt-2" id="course-pills-tabContent">
                    {/* Content START */}
                    <div className="tab-pane fade show active" id="course-pills-1" role="tabpanel">
                      
                      {lesson.videoLink && (
                        <div className="row g-3 mb-5">
                          {/* Course video START */}
                          <div className="col-12">
                            <div className="video-player rounded-3">
                              <video 
                                style={{ maxHeight: '400px', width: '100%' }} 
                                controls 
                                crossOrigin="anonymous" 
                                playsInline 
                                poster={lesson.poster || undefined}
                              >
                                <source src={`/uploads/media/courses/lessons/videos/${lesson.videoLink}`} type="video/mp4" />
                                {/* Caption files - placeholders */}
                                <track kind="captions" label="English" srcLang="en" src="/assets/images/videos/en.vtt" default />
                                <track kind="captions" label="French" srcLang="fr" src="/assets/images/videos/fr.vtt" />
                              </video>
                            </div>
                          </div>
                          {/* Course video END */}
                          
                          {/* Playlist responsive toggler START */}
                          <div className="col-12 d-lg-none">
                            <button 
                                className="btn btn-primary mb-3" 
                                type="button" 
                                onClick={() => setShowPlaylist(!showPlaylist)}
                            >
                              <i className="bi bi-camera-video me-1"></i> Playlist
                            </button>
                          </div>
                          {/* Playlist responsive toggler END */}
                        </div>
                      )}

                      <h3>Lesson {lesson.numero} : {lesson.title}</h3>
                      <hr />
                      {/* Course detail START */}
                      <div dangerouslySetInnerHTML={{ __html: lesson.content }} />
                    </div>
                    {/* Content END */}
                  </div>
                </div>
                {/* Tab contents END */}

                {lecture && lecture.lesson && (
                  <div className="card-footer p-4">
                     <Link href={`/course/lecture/finished/${lecture.reference}`} className="btn btn-success">
                        Leçon suivante !
                     </Link>
                  </div>
                )}
              </div>
            </div>
            {/* Main content END */}

            {/* Right sidebar START */}
            <div className="col-lg-4 pt-5 pt-lg-0 order-1 order-lg-2">
              <div className="row mb-5 mb-lg-0">
                <div className="col-md-6 col-lg-12">
                  {/* Video START */}
                  <div className="card shadow p-2 mb-4 z-index-9">
                    {/* Responsive offcanvas body START */}
                    <div className={`offcanvas-lg offcanvas-end ${showPlaylist ? 'show' : ''}`} tabIndex={-1} id="offcanvasSidebar">
                      <div className="offcanvas-header bg-dark">
                        <h5 className="offcanvas-title text-white">Liste de lecture du cours</h5>
                        <button type="button" className="btn btn-sm btn-light mb-0" onClick={() => setShowPlaylist(false)}>
                            <i className="bi bi-x-lg"></i>
                        </button>
                      </div>
                      <div className="offcanvas-body p-3 p-lg-0">
                        <div className="col-12">
                          {/* Accordion START */}
                          <div className="accordion accordion-icon accordion-bg-light" id="accordionExample2">
                            {lesson.chapitre.cours.chapitres
                                .sort((a, b) => a.numero - b.numero)
                                .map((chapter, index) => (
                              <div className="accordion-item" key={chapter.id}>
                                <h6 className="accordion-header" id={`heading-${index}`}>
                                  <button 
                                    className={`accordion-button fw-bold rounded ${activeChapterId === chapter.id ? '' : 'collapsed'} d-block`} 
                                    type="button" 
                                    onClick={() => setActiveChapterId(activeChapterId === chapter.id ? null : chapter.id)}
                                  >
                                    <span className="mb-0" title={chapter.title}>
                                      {chapter.title.length > 40 ? chapter.title.substring(0, 40) + '...' : chapter.title}
                                    </span>
                                    <span className="small d-block mt-1">({chapter.lessons.length} Leçon(s) )</span>
                                  </button>
                                </h6>
                                <div 
                                    id={`collapse-${index}`} 
                                    className={`accordion-collapse collapse ${activeChapterId === chapter.id ? 'show' : ''}`}
                                >
                                  <div className="accordion-body">
                                    {chapter.lessons
                                        .sort((a, b) => a.numero - b.numero)
                                        .map((les) => (
                                      <div className="d-flex justify-content-between align-items-center mb-2" key={les.id}>
                                        <div className="position-relative d-flex align-items-center">
                                          <Link href={`/lesson/${les.slug}`} className="btn btn-danger-soft btn-round btn-sm mb-0 stretched-link position-static">
                                            <i className="fas fa-play me-0"></i>
                                          </Link>
                                          <span className="d-inline-block text-truncate ms-2 mb-0 h6 fw-light w-200px" title={les.title}>
                                            {les.title}
                                          </span>
                                        </div>
                                      </div>
                                    ))}
                                    
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="position-relative d-flex align-items-center">
                                            <Link href={`/course/${chapter.cours.slug}/chapter/${chapter.slug}/quizzes`} className="btn btn-danger-soft btn-round btn-sm mb-0 stretched-link position-static">
                                                <i className="fas fa-play me-0"></i>
                                            </Link>
                                            <span className="d-inline-block text-truncate ms-2 mb-0 h6 fw-light w-200px">Quiz</span>
                                        </div>
                                    </div>

                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                          {/* Accordion END */}
                        </div>
                      </div>
                    </div>
                    {/* Responsive offcanvas body END */}
                  </div>
                </div>
              </div>
            </div>
            {/* Right sidebar END */}
          </div>
        </div>
      </section>
      {/* Page content END */}
    </>
  );
}
