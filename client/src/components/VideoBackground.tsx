import { useCallback, useEffect, useRef, useState } from "react";
import { videos } from '../assets';

export default function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [currentSource, setCurrentSource] = useState(videos.timeline);
  const [fallbackIndex, setFallbackIndex] = useState(0);
  
  // Array of alternative video sources to try if the main one fails
  const fallbackSources = [
    videos.timeline,
    videos.timelineNew,
    "/images/timeline3-new.mp4",
    "/images/timeline3-original.mp4"
  ];
  
  // Try the next fallback source
  const tryNextSource = useCallback(() => {
    const nextIndex = fallbackIndex + 1;
    if (nextIndex < fallbackSources.length) {
      setFallbackIndex(nextIndex);
      setCurrentSource(fallbackSources[nextIndex]);
      console.log(`Trying fallback source #${nextIndex}: ${fallbackSources[nextIndex]}`);
    } else {
      console.error("All video sources failed");
    }
  }, [fallbackIndex, fallbackSources]);
  
  useEffect(() => {
    const videoElement = videoRef.current;
    
    if (videoElement) {
      // When source changes, reload the video
      videoElement.load();
      
      const handleCanPlay = () => {
        console.log("Video can now play:", currentSource);
        setVideoLoaded(true);
        videoElement.play().catch(error => {
          console.error("Error playing the video:", error);
          tryNextSource();
        });
      };
      
      const handleError = (e: Event) => {
        console.error("Video error:", e);
        tryNextSource();
      };
      
      videoElement.addEventListener('canplay', handleCanPlay);
      videoElement.addEventListener('error', handleError);
      
      return () => {
        videoElement.removeEventListener('canplay', handleCanPlay);
        videoElement.removeEventListener('error', handleError);
      };
    }
  }, [currentSource, tryNextSource]);
  
  return (
    <>
      <div className="video-container">
        <div className="dark-overlay"></div>
        {!videoLoaded && (
          <div className="loading-indicator">
            <div className="spinner"></div>
            <div className="loading-text">Loading video...</div>
          </div>
        )}
        <video 
          ref={videoRef}
          autoPlay 
          muted 
          loop 
          playsInline
          className="video-background"
          preload="auto"
        >
          <source src={currentSource} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </>
  );
}
