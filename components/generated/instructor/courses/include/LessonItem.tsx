import React from 'react';

interface LessonItemProps {
  lesson: any;
  index: number;
  chapIndex: number;
  onEdit?: (lesson: any) => void;
  onDelete?: (lesson: any) => void;
}

export default function LessonItem({ lesson, index, chapIndex, onEdit, onDelete }: LessonItemProps) {
  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <div className="position-relative">
          <a href="#" className="btn btn-danger-soft btn-round btn-sm mb-0 stretched-link position-static">
            {!lesson.videoLink ? (
              <i className="fas fa-file"></i>
            ) : (
              <i className="fas fa-play"></i>
            )}
          </a>
          <span id={`lesson_${index}_chapitre_${chapIndex}_title`} className="ms-2 mb-0 h6 fw-light"> 
            Lesson {lesson.numero} : {lesson.title}
          </span>
        </div>
        {/* Edit and cancel button */}
        <div>
          <button 
            type="button" 
            className="btn btn-sm btn-success-soft btn-round me-1 mb-1 mb-md-0 edit-lesson-btn"
            onClick={() => onEdit && onEdit(lesson)}
            data-bs-toggle="modal" 
            data-bs-target="#addTopic"
          >
            <i className="far fa-fw fa-edit"></i>
          </button>
          <button 
            type="button" 
            className="btn btn-sm btn-danger-soft btn-round mb-0 delete-lesson-btn"
            onClick={() => onDelete && onDelete(lesson)}
          >
            <i className="fas fa-fw fa-times"></i>
          </button>
        </div>
      </div>
      <hr />
    </>
  );
}
