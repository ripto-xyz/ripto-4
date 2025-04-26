import { useEffect, useRef, useState } from "react";
import { videos } from "../assets";

export default function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mainVideoLoaded, setMainVideoLoaded] = useState(false);
  const [placeholderLoaded, setPlaceholderLoaded] = useState(false);
  const [currentSource, setCurrentSource] = useState(videos.timelinePlaceholder);
  
  console.log("VideoBackground component rendering with progressive loading");
  
  // First load the placeholder video for immediate display
  useEffect(() => {
    const videoElement = videoRef.current;
    
    if (videoElement) {
      // Event handlers for placeholder video
      const handlePlaceholderCanPlay = () => {
        console.log("Placeholder video can now play");
        setPlaceholderLoaded(true);
        videoElement.play().catch(error => {
          console.error("Error playing the placeholder video:", error);
        });
        
        // Start preloading the high-quality video
        preloadMainVideo();
      };
      
      const handleError = (e: Event) => {
        console.error("Video error:", e);
      };
      
      videoElement.addEventListener('canplay', handlePlaceholderCanPlay);
      videoElement.addEventListener('error', handleError);
      
      return () => {
        videoElement.removeEventListener('canplay', handlePlaceholderCanPlay);
        videoElement.removeEventListener('error', handleError);
      };
    }
  }, []);
  
  // Preload the main high-quality video
  const preloadMainVideo = () => {
    const preloadVideo = new Audio() as HTMLAudioElement;
    
    preloadVideo.oncanplaythrough = () => {
      console.log("Main video preloaded successfully");
      setMainVideoLoaded(true);
      
      // Switch to the high-quality version once it's preloaded
      if (videoRef.current) {
        // Store current time and playing state
        const currentTime = videoRef.current.currentTime;
        const isPlaying = !videoRef.current.paused;
        
        // Switch source
        setCurrentSource(videos.timeline);
        
        // Restore playback state after source change
        videoRef.current.oncanplay = () => {
          videoRef.current!.currentTime = currentTime;
          if (isPlaying) {
            videoRef.current!.play();
          }
        };
      }
    };
    
    preloadVideo.onerror = () => {
      console.error("Error preloading main video");
    };
    
    preloadVideo.src = videos.timeline;
    preloadVideo.load();
  };
  
  return (
    <>
      <div className="video-container">
        <div className="dark-overlay"></div>
        {!placeholderLoaded && (
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
          src={currentSource}
        />
      </div>
    </>
  );
}
