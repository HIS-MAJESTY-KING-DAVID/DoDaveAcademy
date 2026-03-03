import React, { useState } from 'react';
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
  image?: string;
}

interface EditProps {
  exam?: Exam;
  exams?: Exam[];
  categories?: { id: number; name: string }[];
  classes?: { id: number; name: string }[];
  languages?: { id: number; name: string }[];
}

export default function Edit({ exam, exams, categories = [], classes = [], languages = [] }: EditProps) {
  const [formData, setFormData] = useState({
    title: exam?.title || '',
    description: exam?.description || '',
    category: '', // Would need actual ID mapping
    classe: '',
    language: '',
    duration: '',
    image: null as File | null,
    sujetFile: null as File | null,
    correctionFile: null as File | null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add logic to submit form data to backend
  };

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
          <h3 className="mb-0">Exam Form</h3>
        </div>
        {/* Card header END */}

        {/* Card body START */}
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-lg-3">
                <label className="form-label">Category</label>
                <select name="category" className="form-select" onChange={handleInputChange} value={formData.category}>
                  <option value="">Select Category</option>
                  {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                </select>
              </div>
              <div className="col-lg-3">
                <label className="form-label">Classe</label>
                <select name="classe" className="form-select" onChange={handleInputChange} value={formData.classe}>
                  <option value="">Select Classe</option>
                  {classes.map(cls => <option key={cls.id} value={cls.id}>{cls.name}</option>)}
                </select>
              </div>
              <div className="col-lg-3">
                <label className="form-label">Language</label>
                <select name="language" className="form-select" onChange={handleInputChange} value={formData.language}>
                  <option value="">Select Language</option>
                  {languages.map(lang => <option key={lang.id} value={lang.id}>{lang.name}</option>)}
                </select>
              </div>
              <div className="col-lg-3">
                <label className="form-label">Duration</label>
                <input 
                  type="text" 
                  name="duration" 
                  className="form-control" 
                  value={formData.duration} 
                  onChange={handleInputChange} 
                  placeholder="Duration"
                />
              </div>
              <div className="col-md-9">
                <div className="row g-2">
                  <div className="col-12">
                    <label className="form-label">Title</label>
                    <input 
                      type="text" 
                      name="title" 
                      className="form-control" 
                      value={formData.title} 
                      onChange={handleInputChange} 
                      placeholder="Exam Title"
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Description</label>
                    <textarea 
                      name="description" 
                      className="form-control" 
                      rows={1} 
                      value={formData.description} 
                      onChange={handleInputChange} 
                      placeholder="Description"
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <label className="form-label d-block">Image</label>
                <label title="Upload exam image file" htmlFor="exam_form_image" style={{ fontSize: '6em', cursor: 'pointer' }}>
                  <img 
                    src={exam?.image ? `/uploads/media/exams/files/${exam.image}` : '/assets/images/courses/4by3/11.jpg'} 
                    alt="Exam" 
                    className="img-fluid"
                  />
                </label>
                <input 
                  type="file" 
                  id="exam_form_image" 
                  name="image" 
                  className="d-none" 
                  onChange={handleFileChange} 
                />
              </div>
              
              <div className="col-md-6">
                <label className="form-label">Subject File</label>
                <input type="file" name="sujetFile" className="form-control" onChange={handleFileChange} />
              </div>
              <div className="col-md-6">
                <label className="form-label">Correction File</label>
                <input type="file" name="correctionFile" className="form-control" onChange={handleFileChange} />
              </div>
              <div className="col-12">
                <hr />
                <button type="submit" className="btn btn-primary-soft">Submit</button>
              </div>
            </div>
          </form>
        </div>
        {/* Card body END */}
      </div>
      {/* Card END */}

      {/* Card START */}
      <div className="card border bg-transparent rounded-3 mt-3">
        {/* Card header START */}
        <div className="card-header bg-transparent border-bottom">
          <h3 className="mb-0">Last exams added</h3>
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
                  exams.map(exam => (
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
                          <i className="badge badge-warning">Waiting validation</i>
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
        </div>
        {/* Card body END */}
      </div>
      {/* Card END */}
    </>
  );
}
