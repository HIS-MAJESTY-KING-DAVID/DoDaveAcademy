import React, { useState } from 'react';

interface ChapitreData {
  title: string;
  numero: number;
  description: string;
}

interface FormProps {
  initialData?: Partial<ChapitreData>;
  onSubmit?: (data: ChapitreData) => void;
  buttonLabel?: string;
}

export default function Form({ initialData, onSubmit, buttonLabel = 'Créer le chapitre' }: FormProps) {
  const [formData, setFormData] = useState<ChapitreData>({
    title: initialData?.title || '',
    numero: initialData?.numero || 0,
    description: initialData?.description || '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
        <div className="col-12">
          <label className="form-label">Title</label>
          <input 
            type="text" 
            name="title" 
            className="form-control" 
            value={formData.title} 
            onChange={handleInputChange} 
          />
        </div>
        <div className="col-12">
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
          <label className="form-label">Description</label>
          <textarea 
            name="description" 
            className="form-control" 
            rows={3}
            value={formData.description} 
            onChange={handleInputChange} 
          ></textarea>
        </div>
        <div>
          <button type="submit" className="btn btn-primary-soft">{buttonLabel}</button>
        </div>
      </div>
    </form>
  );
}
