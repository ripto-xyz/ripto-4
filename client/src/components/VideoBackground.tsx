import { useEffect, useRef, useState } from 'react';

// Use the highly compressed version (513KB) instead of the original (30MB)
const COMPRESSED_VIDEO_URL = '/video/compressed/timeline-compressed.mp4';

// Black background placeholder shows immediately
const PLACEHOLDER_BG_COLOR = "#000000";

export default function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false); // Don't show loading indicator
  const [videoReady, setVideoReady] = useState<boolean>(false);

  // Handle video loading and playback
  useEffect(() => {
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
      
      // Fallback timeout to ensure video shows even if the event doesn't fire
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
      }, 3000);
      
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
      
      {/* Loading indicator - hidden by default */}
      {isLoading && (
        <div className="loading-indicator">
          <div className="spinner"></div>
          <div className="loading-text">Loading video...</div>
        </div>
      )}
      
      {/* Video element - uses compressed version and fades in when ready */}
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
          zIndex: -1,
          opacity: videoReady ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out'
        }}
      >
        <source src={COMPRESSED_VIDEO_URL} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}