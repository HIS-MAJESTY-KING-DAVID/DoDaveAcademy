import React, { useState } from 'react';
import AuthLayout from '../security/AuthLayout';

export default function Request() {
  const [email, setEmail] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Submit logic
    console.log('Reset request for:', email);
  };

  return (
    <AuthLayout>
      <h2 className="mb-0 h3">Reset your password</h2>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
            <label className="form-label">Email</label>
            <input 
                type="email" 
                className="form-control" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                required 
            />
        </div>
        <div>
            <small className="text-info">
                Enter your email address and we will send you a
                link to reset your password.
            </small>
        </div>

        <button className="btn btn-primary mt-3 w-100">Send password reset email <i className="fas fa-paper-plane"></i></button>
      </form>
    </AuthLayout>
  );
}
