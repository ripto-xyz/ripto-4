import { useEffect, useRef } from "react";

export default function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    // Start playing the video as soon as it's loaded
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error("Error playing the video:", error);
      });
    }
  }, []);
  
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
        >
          <source src="/api/video" type="video/mp4" />
          <source src="/api/video" type="video/quicktime" />
          Your browser does not support the video tag.
        </video>
      </div>
    </>
  );
}
