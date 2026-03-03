import React from 'react';

interface FaqItemProps {
  faq: any;
  index: number;
  onEdit?: (faq: any) => void;
  onDelete?: (faq: any) => void;
}

export default function FaqItem({ faq, index, onEdit, onDelete }: FaqItemProps) {
  return (
    <div className="col-12" id={`faq-${index}`}>
      <div className="bg-body p-3 p-sm-4 border rounded">
        {/* Item 1 */}
        <div className="d-sm-flex justify-content-sm-between align-items-center mb-2">
          {/* Question */}
          <h6 className="mb-0 question">{faq.question}</h6>
          {/* Button */}
          <div className="align-middle">
            <button 
              type="button" 
              className="btn btn-sm btn-success-soft btn-round me-1 mb-1 mb-md-0 edit-faq"
              onClick={() => onEdit && onEdit(faq)}
              data-bs-toggle="modal" 
              data-bs-target="#addQuestion"
            >
              <i className="far fa-fw fa-edit"></i>
            </button>
            <button 
              type="button" 
              className="btn btn-sm btn-danger-soft btn-round mb-0 delete-faq"
              onClick={() => onDelete && onDelete(faq)}
            >
              <i className="fas fa-fw fa-times"></i>
            </button>
          </div>
        </div>
        {/* Content */}
        <p className="answer">{faq.answer}</p>
      </div>
    </div>
  );
}
