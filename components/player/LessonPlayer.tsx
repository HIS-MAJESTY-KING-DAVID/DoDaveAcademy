'use client';

import VideoPlayer from './VideoPlayer';
import { useRouter } from 'next/navigation';

interface LessonPlayerProps {
    lessonId: number;
    videoUrl: string;
    poster?: string;
    nextLessonUrl?: string;
}

export default function LessonPlayer({ lessonId, videoUrl, poster, nextLessonUrl }: LessonPlayerProps) {
    const router = useRouter();

    const handleEnded = async () => {
        try {
            await fetch('/api/student/progress', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    lessonId,
                    isFinished: true
                })
            });
            
            if (nextLessonUrl) {
                router.push(nextLessonUrl);
            }
        } catch (error) {
            console.error('Failed to update progress', error);
        }
    };

    return (
        <VideoPlayer 
            src={videoUrl} 
            poster={poster} 
            onEnded={handleEnded} 
        />
    );
}
