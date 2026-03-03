import React from 'react';
import Link from 'next/link';

interface Exam {
  id: number;
  reference: string;
  title: string;
  description: string;
  sujet: string;
  correction: string;
  isPublished: boolean;
  isValidated: boolean;
}

interface IndexProps {
  exams: Exam[];
}

export default function Index({ exams }: IndexProps) {
  const handleDelete = (id: number) => {
    if (confirm('Are you sure that you want to delete this exam?')) {
      console.log('Delete exam', id);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-end mb-3">
        <Link href="/instructor/exam/new" className="btn btn-success mb-0">add new exam</Link>
      </div>

      {/* Card START */}
      <div className="card border bg-transparent rounded-3">
        {/* Card header START */}
        <div className="card-header bg-transparent border-bottom">
          <h3 className="mb-0">Exam List</h3>
        </div>
        {/* Card header END */}

        {/* Card body START */}
        <div className="card-body">

          {/* Order list table START */}
          <div className="table-responsive border-0">
            {/* Table START */}
            <table className="table table-dark-gray align-middle p-4 mb-0 table-hover">
              {/* Table head */}
              <thead>
                <tr>
                  <th scope="col" className="border-0 rounded-start">Exam Title</th>
                  <th scope="col" className="border-0">Description</th>
                  <th scope="col" className="border-0">Subject</th>
                  <th scope="col" className="border-0">Correction</th>
                  <th scope="col" className="border-0 rounded-end">Action</th>
                </tr>
              </thead>

              {/* Table body START */}
              <tbody>
                {exams && exams.length > 0 ? (
                  exams.map((exam) => (
                    <tr key={exam.id}>
                      <td>{exam.title}</td>
                      <td>{exam.description}</td>
                      <td>
                        <a href={`/uploads/media/exams/files/${exam.sujet}`} className="btn btn-sm btn-primary-soft" download>
                          <i className="fas fa-file-download"></i> Download
                        </a>
                      </td>
                      <td>
                        <a href={`/uploads/media/exams/files/${exam.correction}`} className="btn btn-sm btn-success-soft" download>
                          <i className="fas fa-file-download"></i> Download
                        </a>
                      </td>
                      <td className="text-center">
                        {!exam.isPublished ? (
                          <>
                            <Link 
                              href={`/instructor/exam/${exam.reference}/published`} 
                              className="btn btn-sm btn-success-soft btn-round me-1"
                              title="Published"
                            >
                              <i className="fas fa-paper-plane"></i>
                            </Link>
                            <Link 
                              href={`/instructor/exam/${exam.reference}/edit`} 
                              className="btn btn-sm btn-warning-soft btn-round me-1"
                              title="Edit"
                            >
                              <i className="fas fa-edit"></i>
                            </Link>
                            <button 
                              className="btn btn-sm btn-danger-soft btn-round"
                              onClick={() => handleDelete(exam.id)}
                              title="Remove"
                            >
                              <i className="fas fa-trash-alt"></i>
                            </button>
                          </>
                        ) : !exam.isValidated ? (
                          <i className="badge badge-warning">Waiting vatidation</i>
                        ) : (
                          <i className="badge badge-success">Published</i>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan={5}>No Exam's found</td></tr>
                )}
              </tbody>
              {/* Table body END */}
            </table>
            {/* Table END */}
          </div>
          {/* Order list table END */}

          {/* Pagination START */}
          <div className="d-sm-flex justify-content-sm-between align-items-sm-center mt-4 mt-sm-3">
            {/* Content */}
            <p className="mb-0 text-center text-sm-start">Pagination placeholder</p>
            {/* Pagination */}
          </div>
          {/* Pagination END */}
        </div>
        {/* Card body START */}
      </div>
      {/* Card END */}
    </>
  );
}
