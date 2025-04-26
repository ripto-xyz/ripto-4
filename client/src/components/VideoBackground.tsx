import React from "react";

/**
 * A simple video background component using direct paths rather than imports
 */
export default function VideoBackground() {
  // Use direct path to video file in public folder
  const videoUrl = "/images/timeline3-original.mp4";
  
  return (
    <div className="video-container">
      <div className="dark-overlay"></div>
      <video 
        className="video-background"
        autoPlay 
        muted 
        loop 
        playsInline
        preload="auto"
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
