'use client';

import { useState } from 'react';

export function ForumMessageActions({ courseSlug, subjectId, messageId, initialLikes = 0 }: { courseSlug: string; subjectId: number; messageId: number; initialLikes?: number }) {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const toggleLike = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch(`/api/courses/${encodeURIComponent(courseSlug)}/forum/subjects/${subjectId}/like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messageIds: [messageId] }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Unable to update like');
      setLiked(Boolean(data.data.liked));
      setLikes(Number(data.data.likes) || 0);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Unable to update like');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-3">
      <button type="button" className={`btn btn-sm ${liked ? 'btn-primary' : 'btn-outline-secondary'}`} onClick={toggleLike} disabled={isLoading}>
        {liked ? 'Unlike' : 'Like'} ({likes})
      </button>
      {error && <small className="text-danger ms-2" role="alert">{error}</small>}
    </div>
  );
}

export function SubjectSolveAction({ courseSlug, subjectId, initialSolved }: { courseSlug: string; subjectId: number; initialSolved: boolean }) {
  const [isSolved, setIsSolved] = useState(initialSolved);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const toggleSolved = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch(`/api/courses/${encodeURIComponent(courseSlug)}/forum/subjects/${subjectId}/solve`, { method: 'POST' });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Unable to update solved state');
      setIsSolved(Boolean(data.data.isSolved));
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Unable to update solved state');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="text-end">
      {isSolved && <span className="badge bg-success me-2">Solved</span>}
      <button type="button" className="btn btn-sm btn-outline-success" onClick={toggleSolved} disabled={isLoading}>{isSolved ? 'Reopen' : 'Mark solved'}</button>
      {error && <div className="small text-danger mt-1" role="alert">{error}</div>}
    </div>
  );
}
