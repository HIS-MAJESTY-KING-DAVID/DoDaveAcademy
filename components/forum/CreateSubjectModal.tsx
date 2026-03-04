
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface CreateSubjectModalProps {
    courseSlug: string;
}

export default function CreateSubjectModal({ courseSlug }: CreateSubjectModalProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [content, setContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const res = await fetch(`/api/courses/${courseSlug}/forum/subjects`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content })
            });

            if (res.ok) {
                setIsOpen(false);
                setContent('');
                router.refresh();
            } else {
                console.error('Failed to create subject');
            }
        } catch (error) {
            console.error('Error creating subject:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) {
        return (
            <button className="btn btn-primary" onClick={() => setIsOpen(true)}>
                <i className="fas fa-plus me-2"></i> New Discussion
            </button>
        );
    }

    return (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Start a New Discussion</h5>
                        <button type="button" className="btn-close" onClick={() => setIsOpen(false)}></button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label className="form-label">Topic / Question</label>
                                <textarea
                                    className="form-control"
                                    rows={4}
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    required
                                    placeholder="What's on your mind?"
                                ></textarea>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => setIsOpen(false)}>Cancel</button>
                            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                {isSubmitting ? 'Posting...' : 'Post Discussion'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
