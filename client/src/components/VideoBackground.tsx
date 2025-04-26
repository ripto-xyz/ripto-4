import { useEffect, useRef } from "react";

export default function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    // Only run once after mount
    const videoElement = videoRef.current;
    
    // Start playing the video as soon as it's loaded
    if (videoElement) {
      const playVideo = async () => {
        try {
          await videoElement.play();
          console.log("Video playing successfully");
        } catch (error) {
          console.error("Error playing the video:", error);
          // Try again after a short delay
          setTimeout(() => {
            videoElement.play().catch(e => console.error("Retry failed:", e));
          }, 1000);
        }
      };
      
      playVideo();
    }
    
    return () => {
      // Cleanup function
      if (videoElement) {
        videoElement.pause();
      }
    };
  }, []);
  
  return (
    <div className="fixed inset-0 -z-10 w-full h-full overflow-hidden">
      {/* Dark overlay to make content more visible */}
      <div className="absolute inset-0 bg-black/70 pointer-events-none"></div>
      
      {/* Video element with inline styles for maximum compatibility */}
      <video 
        ref={videoRef}
        autoPlay 
        muted 
        loop 
        playsInline
        style={{ 
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: '-20',
          transform: 'translateZ(0)' // Force hardware acceleration
        }}
      >
        <source src="/static/background-optimized.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
