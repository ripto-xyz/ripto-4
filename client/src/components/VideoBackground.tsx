import { useEffect, useRef } from "react";

export default function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    // Start playing the video as soon as it's loaded
    if (videoRef.current) {
      // Force the video to play
      const playVideo = async () => {
        try {
          await videoRef.current?.play();
          console.log("Video playing successfully");
        } catch (error) {
          console.error("Error playing the video:", error);
          // Try again after a short delay
          setTimeout(() => {
            videoRef.current?.play().catch(e => console.error("Retry failed:", e));
          }, 1000);
        }
      };
      
      playVideo();
    }
    
    return () => {
      // Cleanup function
      if (videoRef.current) {
        videoRef.current.pause();
      }
    };
  }, []);
  
  return (
    <div className="fixed inset-0 -z-10 w-full h-full overflow-hidden">
      {/* Dark overlay to make content more visible */}
      <div className="absolute inset-0 bg-black/70 pointer-events-none"></div>
      
      {/* Video element */}
      <video 
        ref={videoRef}
        autoPlay 
        muted 
        loop 
        playsInline
        className="absolute top-0 left-0 min-w-full min-h-full w-auto h-auto object-cover"
        style={{ 
          transform: 'translate(0, 0)', 
          top: '-20%',
          minHeight: '120%'
        }}
      >
        {/* Optimized MP4 version */}
        <source src="/static/background-optimized.mp4" type="video/mp4" />
        <source src="/api/video" type="video/quicktime" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
