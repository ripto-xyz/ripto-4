import { useEffect, useRef, useState } from 'react';
import spyroNewVideo from '@assets/Spyro New 2(1).mp4';

// This is the immediate solution - create a static background placeholder
// that looks similar to the video to show immediately while the video loads
const PLACEHOLDER_BG_COLOR = "#000000";

export default function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [videoReady, setVideoReady] = useState<boolean>(false);

  // Preload the video in the background
  useEffect(() => {
    // Show the placeholder immediately
    setIsLoading(false);
    
    // Try to force play the video as soon as it's loaded
    const videoElement = videoRef.current;
    if (videoElement) {
      const handleVideoReady = () => {
        console.log('Video data loaded');
        setVideoReady(true);
        
        const playPromise = videoElement.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Auto-play was prevented, try again on user interaction
            document.addEventListener('click', () => {
              videoElement.play();
            }, { once: true });
          });
        }
      };
      
      videoElement.addEventListener('loadeddata', handleVideoReady);
      
      // Also set a timeout to show video after a few seconds regardless
      // This helps if the loadeddata event doesn't fire for some reason
      const timeoutId = setTimeout(() => {
        if (!videoReady) {
          console.log('Video load timeout - showing anyway');
          setVideoReady(true);
          videoElement.play().catch(() => {
            // Auto-play was prevented, try again on user interaction
            document.addEventListener('click', () => {
              videoElement.play();
            }, { once: true });
          });
        }
      }, 5000);
      
      return () => {
        videoElement.removeEventListener('loadeddata', handleVideoReady);
        clearTimeout(timeoutId);
      };
    }
  }, [videoReady]);

  return (
    <div className="fixed top-0 left-0 w-full h-full z-[-1] overflow-hidden">
      {/* Static placeholder background - always visible immediately */}
      <div 
        className="absolute top-0 left-0 w-full h-full z-[-2]"
        style={{ backgroundColor: PLACEHOLDER_BG_COLOR }}
      ></div>
      
      {/* Dark overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-0"></div>
      
      {/* Loading indicator - now optional as we have the placeholder */}
      {isLoading && (
        <div className="loading-indicator">
          <div className="spinner"></div>
          <div className="loading-text">Loading video...</div>
        </div>
      )}
      
      {/* Video element - fades in when ready */}
      <video 
        ref={videoRef}
        className="absolute top-0 left-0 min-w-full min-h-full w-auto h-auto object-cover z-[-1]"
        autoPlay 
        muted 
        loop 
        playsInline
        preload="auto"
        style={{
          objectFit: 'cover',
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: -1,
          opacity: videoReady ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out'
        }}
      >
        <source src={spyroNewVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}