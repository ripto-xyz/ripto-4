import { useEffect, useRef, useState } from "react";

export default function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  
  // Use a static path - direct to the public folder to avoid import issues
  const videoPath = "/images/timeline3-new.mp4";
  
  useEffect(() => {
    const videoElement = videoRef.current;
    
    if (videoElement) {
      const handleCanPlay = () => {
        console.log("Video can now play");
        setVideoLoaded(true);
        videoElement.play().catch(error => {
          console.error("Error playing the video:", error);
        });
      };
      
      const handleError = (e: Event) => {
        console.error("Video error:", e);
      };
      
      videoElement.addEventListener('canplay', handleCanPlay);
      videoElement.addEventListener('error', handleError);
      
      // Force reload of the video element
      videoElement.load();
      
      return () => {
        videoElement.removeEventListener('canplay', handleCanPlay);
        videoElement.removeEventListener('error', handleError);
      };
    }
  }, []);
  
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
          <source src={videoPath} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </>
  );
}
