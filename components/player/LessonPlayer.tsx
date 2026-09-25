'use client';

import VideoPlayer from './VideoPlayer';
import { useRouter } from 'next/navigation';

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

    const handleEnded = async () => {
        try {
            const response = await fetch('/api/student/progress', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    lessonId,
                    courseId,
                    chapterId,
                    isFinished: true
                })
            });
            const data = await response.json();
            const destination = data.nextUrl || nextLessonUrl;
            if (destination) router.push(destination);
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
