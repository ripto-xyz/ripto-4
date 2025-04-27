import { useEffect, useRef, useState } from 'react';
import timelineVideo from '@assets/Timeline 3.mp4';

export default function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Try to force play the video as soon as it's loaded
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener('loadeddata', () => {
        setIsLoading(false);
        
        const playPromise = videoElement.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Auto-play was prevented, try again on user interaction
            document.addEventListener('click', () => {
              videoElement.play();
            }, { once: true });
          });
        }
      });
    }
    
    return () => {
      if (videoElement) {
        videoElement.removeEventListener('loadeddata', () => {
          setIsLoading(false);
        });
      }
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full z-[-1] overflow-hidden">
      {/* Dark overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-0"></div>
      
      {/* Loading indicator */}
      {isLoading && (
        <div className="loading-indicator">
          <div className="spinner"></div>
          <div className="loading-text">Loading video...</div>
        </div>
      )}
      
      {/* Video element - directly use video from assets */}
      <video 
        ref={videoRef}
        className="absolute top-[-20%] left-0 min-w-full min-h-[120%] w-auto h-auto object-cover z-[-1]"
        autoPlay 
        muted 
        loop 
        playsInline
        preload="auto"
        style={{
          objectFit: 'cover',
          width: '100%',
          height: '120%',
          position: 'absolute',
          top: '-20%',
          left: 0,
          zIndex: -1
        }}
      >
        <source src={timelineVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}