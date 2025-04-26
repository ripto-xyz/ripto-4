import { useEffect, useRef, useState } from "react";

export default function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  
  useEffect(() => {
    // Handle video loading success
    const handleLoadedData = () => {
      setVideoLoaded(true);
      console.log("Video loaded successfully");
    };
    
    // Handle video loading error and try fallback
    const handleError = () => {
      console.warn(`Video loading error, retry attempt: ${retryCount}`);
      if (retryCount < 3) {
        setRetryCount(prev => prev + 1);
        // Force reload the video element
        if (videoRef.current) {
          videoRef.current.load();
        }
      }
    };
    
    // Start playing the video as soon as it's loaded
    if (videoRef.current) {
      // Add event listeners
      videoRef.current.addEventListener('loadeddata', handleLoadedData);
      videoRef.current.addEventListener('error', handleError);
      
      // Start playing
      videoRef.current.play().catch(error => {
        console.error("Error playing the video:", error);
      });
    }
    
    // Clean up event listeners
    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener('loadeddata', handleLoadedData);
        videoRef.current.removeEventListener('error', handleError);
      }
    };
  }, [retryCount]);
  
  return (
    <>
      <div className="video-container">
        <div className="dark-overlay"></div>
        <video 
          ref={videoRef}
          autoPlay 
          muted 
          loop 
          playsInline
          className="video-background"
          preload="auto"
        >
          {/* New optimized background video */}
          <source src="/timeline-3-optimized.mp4" type="video/mp4" />
          {/* Fallback to the original background video */}
          <source src="/background-optimized.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </>
  );
}
