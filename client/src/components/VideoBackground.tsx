import React from "react";

/**
 * VideoBackground using an iframe to load the video from a static HTML file
 * This avoids the runtime errors that occur when trying to import/load videos in React
 */
export default function VideoBackground() {
  return (
    <div 
      className="video-container" 
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        zIndex: -1, 
        pointerEvents: 'none' 
      }}
    >
      <iframe
        src="/video-background.html"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          border: 'none',
          pointerEvents: 'none'
        }}
        title="Background Video"
        aria-hidden="true"
      />
    </div>
  );
}
