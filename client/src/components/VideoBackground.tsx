import { useEffect, useRef, useState } from "react";
import { videos } from "../assets";

export default function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  
  console.log("VideoBackground component rendering with imported video");
  
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
      
      const handleLoadedData = () => {
        console.log("Video data loaded successfully");
        setVideoLoaded(true);
      };
      
      const handleError = (e: Event) => {
        console.error("Video error:", e);
      };
      
      // Register event listeners
      videoElement.addEventListener('canplay', handleCanPlay);
      videoElement.addEventListener('loadeddata', handleLoadedData);
      videoElement.addEventListener('error', handleError);
      
      // Clean up
      return () => {
        videoElement.removeEventListener('canplay', handleCanPlay);
        videoElement.removeEventListener('loadeddata', handleLoadedData);
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
          src={videos.timeline}
        />
      </div>
    </>
  );
}
