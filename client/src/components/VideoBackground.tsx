import { useEffect, useRef, useState } from "react";

export default function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoPath = `/images/timeline3-new.mp4?v=${Date.now()}`; // Add timestamp to bust cache
  
  console.log("VideoBackground component rendering with path:", videoPath);
  
  useEffect(() => {
    // Start playing the video as soon as it's loaded
    const videoElement = videoRef.current;
    
    if (videoElement) {
      // Add event listeners
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
      
      // Register event listeners
      videoElement.addEventListener('canplay', handleCanPlay);
      videoElement.addEventListener('error', handleError);
      
      // Clean up
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
            Loading video...
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
          {/* Timeline 3.mp4 video */}
          <source src={videoPath} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </>
  );
}
