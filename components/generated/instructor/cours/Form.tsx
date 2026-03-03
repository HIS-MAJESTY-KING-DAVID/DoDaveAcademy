import React, { useState } from 'react';

interface FAQ {
  question: string;
  answer: string;
}

interface Lesson {
  title: string;
  numero: number;
  content: string;
  videoLink: string;
  isPremium: boolean;
  videoFile: File | null;
  posterFile: File | null;
}

interface Chapter {
  title: string;
  description: string;
  numero: number;
  lessons: Lesson[];
}

interface CourseData {
  intitule: string;
  description: string;
  categorie: string;
  niveauDifficulte: string;
  skillLevel: string;
  classe: string;
  language: string;
  isFree: boolean;
  montantAbonnement: number;
  dureeApprentissage: string;
  numberOfLessons: number;
  paymentMethods: string;
  content: string;
  imageFile: File | null;
  videoUrl: string;
  mp4File: File | null;
  webMFile: File | null;
  oggFile: File | null;
  chapitres: Chapter[];
  faqs: FAQ[];
  tags: string;
}

interface FormProps {
  initialData?: Partial<CourseData>;
  onSubmit?: (data: CourseData) => void;
  categories?: { id: string; name: string }[];
  languages?: { id: string; name: string }[];
  levels?: { id: string; name: string }[];
}

export default function Form({ initialData, onSubmit, categories = [], languages = [], levels = [] }: FormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<CourseData>({
    intitule: initialData?.intitule || '',
    description: initialData?.description || '',
    categorie: initialData?.categorie || '',
    niveauDifficulte: initialData?.niveauDifficulte || '',
    skillLevel: initialData?.skillLevel || '',
    classe: initialData?.classe || '',
    language: initialData?.language || '',
    isFree: initialData?.isFree || false,
    montantAbonnement: initialData?.montantAbonnement || 0,
    dureeApprentissage: initialData?.dureeApprentissage || '',
    numberOfLessons: initialData?.numberOfLessons || 0,
    paymentMethods: initialData?.paymentMethods || '',
    content: initialData?.content || '',
    imageFile: null,
    videoUrl: initialData?.videoUrl || '',
    mp4File: null,
    webMFile: null,
    oggFile: null,
    chapitres: initialData?.chapitres || [],
    faqs: initialData?.faqs || [],
    tags: initialData?.tags || '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    }
  };

  const handleAddChapter = () => {
    setFormData(prev => ({
      ...prev,
      chapitres: [...prev.chapitres, { title: '', description: '', numero: prev.chapitres.length + 1, lessons: [] }]
    }));
  };

  const handleChapterChange = (index: number, field: keyof Chapter, value: any) => {
    const newChapters = [...formData.chapitres];
    newChapters[index] = { ...newChapters[index], [field]: value };
    setFormData(prev => ({ ...prev, chapitres: newChapters }));
  };

  const handleAddLesson = (chapterIndex: number) => {
    const newChapters = [...formData.chapitres];
    newChapters[chapterIndex].lessons.push({
      title: '',
      numero: newChapters[chapterIndex].lessons.length + 1,
      content: '',
      videoLink: '',
      isPremium: false,
      videoFile: null,
      posterFile: null
    });
    setFormData(prev => ({ ...prev, chapitres: newChapters }));
  };

  const handleLessonChange = (chapterIndex: number, lessonIndex: number, field: keyof Lesson, value: any) => {
    const newChapters = [...formData.chapitres];
    newChapters[chapterIndex].lessons[lessonIndex] = { ...newChapters[chapterIndex].lessons[lessonIndex], [field]: value };
    setFormData(prev => ({ ...prev, chapitres: newChapters }));
  };

  const handleAddFAQ = () => {
    setFormData(prev => ({
      ...prev,
      faqs: [...prev.faqs, { question: '', answer: '' }]
    }));
  };

  const handleFAQChange = (index: number, field: 'question' | 'answer', value: string) => {
    const newFAQs = [...formData.faqs];
    newFAQs[index][field] = value;
    setFormData(prev => ({ ...prev, faqs: newFAQs }));
  };

  const handleRemoveFAQ = (index: number) => {
    setFormData(prev => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index)
    }));
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
    console.log('Form submitted:', formData);
  };

  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-md-8 mx-auto text-center">
            <p className="text-center">Use this interface to add a new Course to the portal. Once you are done adding the item it will be reviewed for quality. If approved, your course will appear for sale and you will be informed by email that your course has been accepted.</p>
          </div>
        </div>

        <div className="card bg-transparent border rounded-3 mb-5">
          <div id="stepper" className="bs-stepper stepper-outline">
            <div className="card-header bg-light border-bottom px-lg-5">
              <div className="bs-stepper-header" role="tablist">
                {[1, 2, 3, 4].map(step => (
                  <React.Fragment key={step}>
                    <div className={`step ${currentStep === step ? 'active' : ''}`} data-target={`#step-${step}`}>
                      <div className="d-grid text-center align-items-center">
                        <button type="button" className="btn btn-link step-trigger mb-0" onClick={() => setCurrentStep(step)}>
                          <span className="bs-stepper-circle">{step}</span>
                        </button>
                        <h6 className="bs-stepper-label d-none d-md-block">
                          {step === 1 ? 'Course details' : step === 2 ? 'Course media' : step === 3 ? 'Curriculum' : 'Additional information'}
                        </h6>
                      </div>
                    </div>
                    {step < 4 && <div className="line"></div>}
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div className="card-body">
              <div className="bs-stepper-content">
                <form onSubmit={handleSubmit}>
                  {/* Step 1: Details */}
                  <div id="step-1" role="tabpanel" className={`content ${currentStep === 1 ? 'd-block' : 'd-none'}`}>
                    <h4>Course details</h4>
                    <hr />
                    <div className="row g-4">
                      <div className="col-12">
                        <label className="form-label">Course Title</label>
                        <input type="text" name="intitule" className="form-control" value={formData.intitule} onChange={handleInputChange} />
                      </div>
                      <div className="col-12">
                        <label className="form-label">Short Description</label>
                        <textarea name="description" className="form-control" rows={2} value={formData.description} onChange={handleInputChange}></textarea>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Category</label>
                        <select name="categorie" className="form-select" value={formData.categorie} onChange={handleInputChange}>
                          <option value="">Select Category</option>
                          {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Level</label>
                        <select name="niveauDifficulte" className="form-select" value={formData.niveauDifficulte} onChange={handleInputChange}>
                          <option value="">Select Level</option>
                          {levels.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
                        </select>
                      </div>
                      <div className="col-md-5">
                        <label className="form-label">Skill Level</label>
                        <input type="text" name="skillLevel" className="form-control" value={formData.skillLevel} onChange={handleInputChange} />
                      </div>
                      <div className="col-md-7">
                        <label className="form-label">Class</label>
                        <input type="text" name="classe" className="form-control" value={formData.classe} onChange={handleInputChange} />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Language</label>
                        <select name="language" className="form-select" value={formData.language} onChange={handleInputChange}>
                          <option value="">Select Language</option>
                          {languages.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
                        </select>
                      </div>
                      <div className="col-md-6 d-flex align-items-center justify-content-start mt-5">
                        <div className="form-check form-switch form-check-md">
                          <input type="checkbox" name="isFree" className="form-check-input" id="isFree" checked={formData.isFree} onChange={handleInputChange} />
                          <label className="form-check-label" htmlFor="isFree">Is Free</label>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">Price</label>
                        <input type="number" name="montantAbonnement" className="form-control" value={formData.montantAbonnement} onChange={handleInputChange} disabled={formData.isFree} />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">Duration</label>
                        <input type="text" name="dureeApprentissage" className="form-control" value={formData.dureeApprentissage} onChange={handleInputChange} />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">Total Lessons</label>
                        <input type="number" name="numberOfLessons" className="form-control" value={formData.numberOfLessons} onChange={handleInputChange} />
                      </div>
                      <div className="col-12">
                         <label className="form-label">Payment Methods</label>
                         <input type="text" name="paymentMethods" className="form-control" value={formData.paymentMethods} onChange={handleInputChange} />
                      </div>
                      <div className="col-12">
                        <label className="form-label">Content</label>
                        <textarea name="content" className="form-control" rows={4} value={formData.content} onChange={handleInputChange}></textarea>
                      </div>
                      <div className="d-flex justify-content-end mt-3">
                        <button type="button" className="btn btn-primary next-btn mb-0" onClick={nextStep}>Next</button>
                      </div>
                    </div>
                  </div>

                  {/* Step 2: Media */}
                  <div id="step-2" role="tabpanel" className={`content ${currentStep === 2 ? 'd-block' : 'd-none'}`}>
                    <h4>Course media</h4>
                    <hr />
                    <div className="row">
                      <div className="col-12">
                        <div className="text-center justify-content-center align-items-center p-4 p-sm-5 border border-2 border-dashed position-relative rounded-3">
                           <img src="/assets/images/element/gallery.svg" className="h-50px" alt="" />
                           <div>
                             <h6 className="my-2">Upload course image here</h6>
                             <label style={{ cursor: 'pointer' }}>
                               <span>
                                 <input type="file" name="imageFile" className="form-control stretched-link" onChange={handleFileChange} />
                               </span>
                             </label>
                             <p className="small mb-0 mt-2"><b>Note:</b> Only JPG, JPEG and PNG. 600px * 450px suggested.</p>
                           </div>
                        </div>
                      </div>
                      <div className="col-12 mt-4">
                        <h5>Upload video</h5>
                        <div className="col-12 mt-4 mb-5">
                          <label className="form-label">Video URL</label>
                          <input type="text" name="videoUrl" className="form-control" value={formData.videoUrl} onChange={handleInputChange} />
                        </div>
                        <div className="position-relative my-4">
                          <hr />
                          <p className="small position-absolute top-50 start-50 translate-middle bg-body px-3 mb-0">Or</p>
                        </div>
                        <div className="col-12">
                          <label className="form-label">Upload video files</label>
                          <div className="input-group mb-3">
                            <span className="input-group-text">MP4</span>
                            <input type="file" name="mp4File" className="form-control" onChange={handleFileChange} />
                          </div>
                          <div className="input-group mb-3">
                            <span className="input-group-text">WebM</span>
                            <input type="file" name="webMFile" className="form-control" onChange={handleFileChange} />
                          </div>
                          <div className="input-group mb-3">
                            <span className="input-group-text">OGG</span>
                            <input type="file" name="oggFile" className="form-control" onChange={handleFileChange} />
                          </div>
                        </div>
                      </div>
                      <div className="d-flex justify-content-between mt-3">
                        <button type="button" className="btn btn-secondary prev-btn mb-0" onClick={prevStep}>Previous</button>
                        <button type="button" className="btn btn-primary next-btn mb-0" onClick={nextStep}>Next</button>
                      </div>
                    </div>
                  </div>

                  {/* Step 3: Curriculum */}
                  <div id="step-3" role="tabpanel" className={`content ${currentStep === 3 ? 'd-block' : 'd-none'}`}>
                    <h4>Curriculum</h4>
                    <hr />
                    <div className="row">
                        <div className="d-flex justify-content-between mb-3">
                            <h5>Chapters</h5>
                            <button type="button" className="btn btn-primary btn-sm" onClick={handleAddChapter}>Add Chapter</button>
                        </div>
                        
                        <div className="accordion" id="chaptersAccordion">
                            {formData.chapitres.map((chapter, index) => (
                                <div className="accordion-item mb-3" key={index}>
                                    <h2 className="accordion-header" id={`heading${index}`}>
                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`}>
                                            Chapter {index + 1}: {chapter.title || 'New Chapter'}
                                        </button>
                                    </h2>
                                    <div id={`collapse${index}`} className="accordion-collapse collapse show" data-bs-parent="#chaptersAccordion">
                                        <div className="accordion-body">
                                            <div className="mb-3">
                                                <label className="form-label">Title</label>
                                                <input type="text" className="form-control" value={chapter.title} onChange={(e) => handleChapterChange(index, 'title', e.target.value)} />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Description</label>
                                                <textarea className="form-control" value={chapter.description} onChange={(e) => handleChapterChange(index, 'description', e.target.value)} />
                                            </div>
                                            
                                            <div className="d-flex justify-content-between align-items-center mb-2">
                                                <h6>Lessons</h6>
                                                <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => handleAddLesson(index)}>Add Lesson</button>
                                            </div>
                                            
                                            {chapter.lessons.map((lesson, lIndex) => (
                                                <div className="card mb-2 p-3 border" key={lIndex}>
                                                    <div className="mb-2">
                                                        <label className="form-label">Lesson Title</label>
                                                        <input type="text" className="form-control" value={lesson.title} onChange={(e) => handleLessonChange(index, lIndex, 'title', e.target.value)} />
                                                    </div>
                                                    <div className="mb-2">
                                                        <label className="form-label">Content</label>
                                                        <textarea className="form-control" value={lesson.content} onChange={(e) => handleLessonChange(index, lIndex, 'content', e.target.value)} />
                                                    </div>
                                                    <div className="mb-2">
                                                        <label className="form-label">Video Link</label>
                                                        <input type="text" className="form-control" value={lesson.videoLink} onChange={(e) => handleLessonChange(index, lIndex, 'videoLink', e.target.value)} />
                                                    </div>
                                                    <div className="mb-2">
                                                        <label className="form-label">Video File</label>
                                                        <input type="file" className="form-control" onChange={(e) => {
                                                            if (e.target.files && e.target.files.length > 0) {
                                                                handleLessonChange(index, lIndex, 'videoFile', e.target.files[0]);
                                                            }
                                                        }} />
                                                    </div>
                                                    <div className="mb-2">
                                                        <label className="form-label">Poster Image</label>
                                                        <input type="file" className="form-control" onChange={(e) => {
                                                            if (e.target.files && e.target.files.length > 0) {
                                                                handleLessonChange(index, lIndex, 'posterFile', e.target.files[0]);
                                                            }
                                                        }} />
                                                    </div>
                                                    <div className="form-check form-switch">
                                                        <input className="form-check-input" type="checkbox" checked={lesson.isPremium} onChange={(e) => handleLessonChange(index, lIndex, 'isPremium', e.target.checked)} />
                                                        <label className="form-check-label">Premium Only</label>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="d-flex justify-content-between mt-3">
                            <button type="button" className="btn btn-secondary prev-btn mb-0" onClick={prevStep}>Previous</button>
                            <button type="button" className="btn btn-primary next-btn mb-0" onClick={nextStep}>Next</button>
                        </div>
                    </div>
                  </div>

                  {/* Step 4: Additional Info */}
                  <div id="step-4" role="tabpanel" className={`content ${currentStep === 4 ? 'd-block' : 'd-none'}`}>
                    <h4>Additional information</h4>
                    <hr />
                    <div className="row g-4">
                      <div className="col-12">
                        <div className="bg-light border rounded p-2 p-sm-4">
                          <div className="d-sm-flex justify-content-sm-between align-items-center mb-3">
                            <h5 className="mb-2 mb-sm-0">Upload FAQs</h5>
                            <button type="button" className="btn btn-sm btn-primary-soft mb-0" onClick={handleAddFAQ}>
                              <i className="bi bi-plus-circle me-2"></i>Add Question
                            </button>
                          </div>
                          <div className="row g-4">
                            {formData.faqs.map((faq, index) => (
                              <div key={index} className="col-12">
                                <div className="d-flex justify-content-between">
                                  <h6>Question {index + 1}</h6>
                                  <button type="button" className="btn btn-sm btn-danger-soft" onClick={() => handleRemoveFAQ(index)}>Remove</button>
                                </div>
                                <input 
                                  type="text" 
                                  className="form-control mb-2" 
                                  placeholder="Question" 
                                  value={faq.question} 
                                  onChange={(e) => handleFAQChange(index, 'question', e.target.value)} 
                                />
                                <textarea 
                                  className="form-control" 
                                  placeholder="Answer" 
                                  rows={2} 
                                  value={faq.answer} 
                                  onChange={(e) => handleFAQChange(index, 'answer', e.target.value)}
                                ></textarea>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="bg-light border rounded p-4">
                          <h5 className="mb-0">Tags</h5>
                          <div className="mt-3">
                            <input type="text" name="tags" className="form-control" value={formData.tags} onChange={handleInputChange} placeholder="javascript, react, marketing" />
                            <span className="small">Maximum of 14 keywords. Separated by commas.</span>
                          </div>
                        </div>
                      </div>
                      <div className="d-md-flex justify-content-between align-items-start mt-4">
                        <button type="button" className="btn btn-secondary prev-btn mb-2 mb-md-0" onClick={prevStep}>Previous</button>
                        <div className="text-md-end">
                          <button type="submit" className="btn btn-success mb-2 mb-sm-0">Submit a Course</button>
                          <p className="mb-0 small mt-1">Once you click "Submit a Course", your course will be uploaded and marked as pending for review.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
