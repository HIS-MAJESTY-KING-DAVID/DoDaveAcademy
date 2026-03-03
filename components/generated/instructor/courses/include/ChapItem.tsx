import React from 'react';
import LessonItem from './LessonItem';

interface Chapitre {
  id: number;
  title: string;
  description: string;
  lessons: any[];
}

interface ChapItemProps {
  chapitre: Chapitre;
  index: number;
  numero: number;
  onAddLesson?: (chapIndex: number) => void;
  onEditChapitre?: (chapIndex: number) => void;
  onDeleteChapitre?: (chapIndex: number) => void;
}

export default function ChapItem({ 
  chapitre, 
  index, 
  numero, 
  onAddLesson, 
  onEditChapitre, 
  onDeleteChapitre 
}: ChapItemProps) {
  return (
    <div className="accordion-item mb-3">
      <h6 className="accordion-header font-base" id={`heading-${index}`}>
        <button 
          className="accordion-button fw-bold rounded d-inline-block d-block pe-5" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target={`#collapse-${index}`} 
          aria-expanded="false" 
          aria-controls={`collapse-${index}`}
        >
          Chapter {numero} : {chapitre.title}
        </button>
      </h6>

      <div 
        id={`collapse-${index}`} 
        className="accordion-collapse collapse show" 
        aria-labelledby="heading-1" 
        data-bs-parent="#accordionExample2"
      >
        {/* Topic START */}
        <div className="accordion-body mt-3">
          <p className="description">{chapitre.description}</p>
          <div id={`lessons-container-${index}`}>
            {chapitre.lessons && chapitre.lessons.map((lesson, cmp) => (
              <LessonItem 
                key={lesson.id || cmp} 
                lesson={lesson} 
                index={cmp} 
                chapIndex={index} 
              />
            ))}
          </div>

          {/* Add topic */}
          <button 
            type="button"
            className="btn btn-sm btn-dark mb-0 add-lesson-btn" 
            data-bs-toggle="modal" 
            data-bs-target="#addTopic"
            onClick={() => onAddLesson && onAddLesson(index)}
          >
            <i className="bi bi-plus-circle me-2"></i>Add lesson
          </button>
          <button 
            type="button"
            className="btn btn-sm btn-success mb-0 edit-chapitre-btn" 
            data-bs-toggle="modal" 
            data-bs-target="#addLecture"
            onClick={() => onEditChapitre && onEditChapitre(index)}
          >
            <i className="far fa-fw fa-edit me-2"></i>Edit chap
          </button>
          <button 
            type="button" 
            className="btn btn-sm btn-danger mb-0 delete-chapitre-btn"
            onClick={() => onDeleteChapitre && onDeleteChapitre(index)}
          >
            <i className="fas fa-fw fa-trash"></i>
          </button>
        </div>
        {/* Topic END */}
      </div>
    </div>
  );
}
