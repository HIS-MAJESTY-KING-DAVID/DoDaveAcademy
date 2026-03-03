'use client';

import { useRef, useEffect } from 'react';

interface VideoPlayerProps {
  src: string;
  poster?: string;
  onEnded?: () => void;
}

export default function VideoPlayer({ src, poster, onEnded }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      if (onEnded) onEnded();
    };

    video.addEventListener('ended', handleEnded);
    return () => {
      video.removeEventListener('ended', handleEnded);
    };
  }, [onEnded]);

  return (
    <div className="ratio ratio-16x9 bg-dark">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        controls
        className="rounded"
        width="100%"
        height="100%"
        controlsList="nodownload"
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
