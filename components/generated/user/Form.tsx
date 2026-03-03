import React from 'react';

interface FormProps {
  buttonLabel?: string;
  initialValues?: any;
}

export default function Form({ buttonLabel = 'Save', initialValues = {} }: FormProps) {
  return (
    <form>
      <div className="mb-3">
        <label className="form-label">Email</label>
        <input 
          type="email" 
          className="form-control" 
          defaultValue={initialValues.email || ''} 
          name="email"
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Password</label>
        <input 
          type="password" 
          className="form-control" 
          defaultValue={initialValues.password || ''} 
          name="password"
        />
      </div>
      <button className="btn btn-primary">{buttonLabel}</button>
    </form>
  );
}
