import { useEffect, useRef, useState } from "react";

// The path to the video in the public directory
const VIDEO_PATH = "/timeline-3-optimized.mp4";
const FALLBACK_VIDEO_PATH = "/background-optimized.mp4";

export default function NewVideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [videoError, setVideoError] = useState<string | null>(null);
  const [currentSrc, setCurrentSrc] = useState(VIDEO_PATH);
  
  // Function to attempt video playback
  const attemptPlayback = async () => {
    if (!videoRef.current) return;
    
    try {
      // Reset error state on new attempt
      setVideoError(null);
      
      // Attempt to play the video
      await videoRef.current.play();
      setIsVideoPlaying(true);
      console.log(`Video now playing: ${currentSrc}`);
    } catch (error) {
      // Handle playback failure
      console.error(`Error playing video (${currentSrc}):`, error);
      setIsVideoPlaying(false);
      
      if (currentSrc === VIDEO_PATH) {
        // If the main video fails, try the fallback
        console.log("Trying fallback video...");
        setCurrentSrc(FALLBACK_VIDEO_PATH);
      } else {
        // If fallback also fails, show detailed error
        setVideoError(`Failed to play video: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }
  };
  
  // Handle video loading and errors
  useEffect(() => {
    if (!videoRef.current) return;
    
    const videoElement = videoRef.current;
    
    // Event handlers
    const handleLoadedData = () => {
      console.log(`Video loaded: ${currentSrc}`);
      setIsVideoLoaded(true);
      attemptPlayback();
    };
    
    const handleError = (e: Event) => {
      console.error(`Video error event for ${currentSrc}:`, e);
      setIsVideoLoaded(false);
      setIsVideoPlaying(false);
      
      if (currentSrc === VIDEO_PATH) {
        // If the main video fails, try the fallback
        console.log("Video error, switching to fallback...");
        setCurrentSrc(FALLBACK_VIDEO_PATH);
      } else {
        // If fallback also fails, show error
        setVideoError("Failed to load video after multiple attempts.");
      }
    };
    
    // Register event listeners
    videoElement.addEventListener('loadeddata', handleLoadedData);
    videoElement.addEventListener('error', handleError);
    
    // Clean up event listeners
    return () => {
      videoElement.removeEventListener('loadeddata', handleLoadedData);
      videoElement.removeEventListener('error', handleError);
    };
  }, [currentSrc]); // Re-run when the source changes
  
  return (
    <div className="video-container" style={{ backgroundColor: "#120738" }}>
      <div className="dark-overlay" style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}></div>
      
      {/* Video element */}
      <video 
        ref={videoRef}
        key={currentSrc} // Important: Re-mount video when source changes
        src={currentSrc}
        autoPlay 
        loop
        muted 
        playsInline
        className="video-background"
        style={{ opacity: isVideoPlaying ? 1 : 0 }}
      />
      
      {/* Error message if video fails */}
      {videoError && (
        <div style={{ 
          position: 'fixed', 
          bottom: '10px', 
          right: '10px', 
          background: 'rgba(255,0,0,0.7)', 
          color: 'white', 
          padding: '10px', 
          borderRadius: '5px',
          zIndex: 1000,
          maxWidth: '300px',
          fontSize: '12px'
        }}>
          {videoError}
        </div>
      )}
    </div>
  );
}