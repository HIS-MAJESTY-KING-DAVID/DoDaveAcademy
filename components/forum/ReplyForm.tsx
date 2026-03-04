
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface ReplyFormProps {
    courseSlug: string;
    subjectId: number;
}

export default function ReplyForm({ courseSlug, subjectId }: ReplyFormProps) {
    const [content, setContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim()) return;
        
        setIsSubmitting(true);

        try {
            const res = await fetch(`/api/courses/${courseSlug}/forum/subjects/${subjectId}/messages`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content })
            });

            if (res.ok) {
                setContent('');
                router.refresh();
            } else {
                console.error('Failed to post reply');
            }
        } catch (error) {
            console.error('Error posting reply:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="card mt-4 border-0 shadow-sm">
            <div className="card-body">
                <h5 className="card-title mb-3">Leave a Reply</h5>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <textarea
                            className="form-control"
                            rows={3}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Type your reply here..."
                            required
                        ></textarea>
                    </div>
                    <div className="d-flex justify-content-end">
                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                            {isSubmitting ? 'Posting...' : 'Post Reply'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
