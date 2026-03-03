import React, { useState } from 'react';

interface LessonData {
  title: string;
  numero: number;
  content: string;
  videoLink: string;
  videoFile: File | null;
  posterFile: File | null;
  isPremium: boolean;
}

interface FormProps {
  initialData?: Partial<LessonData>;
  onSubmit?: (data: LessonData) => void;
  buttonLabel?: string;
}

export default function Form({ initialData, onSubmit, buttonLabel = 'Enregistrer' }: FormProps) {
  const [formData, setFormData] = useState<LessonData>({
    title: initialData?.title || '',
    numero: initialData?.numero || 0,
    content: initialData?.content || '',
    videoLink: initialData?.videoLink || '',
    videoFile: null,
    posterFile: null,
    isPremium: initialData?.isPremium || false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
    console.log('Form submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row g-4">
        <div className="col-md-9">
          <label className="form-label">Title</label>
          <input 
            type="text" 
            name="title" 
            className="form-control" 
            value={formData.title} 
            onChange={handleInputChange} 
          />
        </div>
        <div className="col-md-3">
          <label className="form-label">Numero</label>
          <input 
            type="number" 
            name="numero" 
            className="form-control" 
            value={formData.numero} 
            onChange={handleInputChange} 
          />
        </div>
        <div className="col-12">
          <label className="form-label">Content</label>
          <textarea 
            name="content" 
            className="form-control" 
            rows={4} 
            value={formData.content} 
            onChange={handleInputChange} 
          ></textarea>
        </div>
        <div className="col-md-6">
          <label className="form-label">Video Link</label>
          <input 
            type="text" 
            name="videoLink" 
            className="form-control" 
            value={formData.videoLink} 
            onChange={handleInputChange} 
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Video File</label>
          <input 
            type="file" 
            name="videoFile" 
            className="form-control" 
            onChange={handleFileChange} 
          />
        </div>
        <div className="col-12">
          <label className="form-label">Poster File</label>
          <input 
            type="file" 
            name="posterFile" 
            className="form-control" 
            onChange={handleFileChange} 
          />
        </div>
        <div className="col-12">
          <div className="form-check">
            <input 
              type="checkbox" 
              name="isPremium" 
              className="form-check-input" 
              id="isPremiumCheck" 
              checked={formData.isPremium} 
              onChange={handleInputChange} 
            />
            <label className="form-check-label" htmlFor="isPremiumCheck">
              Is Premium
            </label>
          </div>
        </div>
        <div>
          <button type="submit" className="btn btn-primary-soft">{buttonLabel}</button>
        </div>
      </div>
    </form>
  );
}
