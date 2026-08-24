'use client';

import { useState } from 'react';
import VideoPlayer from './VideoPlayer';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

interface LessonPlayerProps {
  lessonId: number;
  courseId: number;
  chapterId: number;
  videoUrl: string;
  poster?: string;
  nextLessonUrl?: string;
}

export default function LessonPlayer({ lessonId, courseId, chapterId, videoUrl, poster, nextLessonUrl }: LessonPlayerProps) {
  const router = useRouter();
  const { t } = useTranslation();
  const [completionError, setCompletionError] = useState('');

  const handleEnded = async () => {
    setCompletionError('');
    try {
      const response = await fetch('/api/student/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lessonId, courseId, chapterId, isFinished: true }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data.message || t('PROGRESS_UPDATE_FAILED_KEY'));
      }
      const destination = data.nextUrl || nextLessonUrl;
      if (destination) router.push(destination);
    } catch (error) {
      console.error('Failed to update progress', error);
      setCompletionError(error instanceof Error ? error.message : t('PROGRESS_UPDATE_FAILED_KEY'));
    }
  };

  return (
    <div>
      <VideoPlayer src={videoUrl} poster={poster} onEnded={handleEnded} />
      {completionError && <div className="alert alert-danger mt-3" role="alert">{completionError}</div>}
    </div>
  );
}
