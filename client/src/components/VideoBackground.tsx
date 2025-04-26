// Import a static image as fallback
import React from 'react';

export default function VideoBackground() {
  // Create a video element reference
  const videoRef = React.useRef<HTMLVideoElement>(null);
  
  // Set up once on mount
  React.useEffect(() => {
    const videoElement = document.createElement('video');
    videoElement.src = '/static/background-optimized.mp4';
    videoElement.autoplay = true;
    videoElement.loop = true;
    videoElement.muted = true;
    videoElement.style.position = 'absolute';
    videoElement.style.width = '100%';
    videoElement.style.height = '100%';
    videoElement.style.objectFit = 'cover';
    videoElement.style.top = '0';
    videoElement.style.left = '0';
    videoElement.style.zIndex = '-10';
    
    // Add to the container
    const container = document.getElementById('video-container');
    if (container) {
      container.appendChild(videoElement);
      
      // Start playing
      videoElement.play().catch(err => {
        console.error('Video play error:', err);
      });
    }
    
    // Cleanup on unmount
    return () => {
      if (container && videoElement.parentNode === container) {
        container.removeChild(videoElement);
      }
    };
  }, []);
  
  return (
    <>
      {/* Fixed background container */}
      <div 
        className="fixed inset-0 -z-10 w-full h-full overflow-hidden"
        style={{ background: 'black' }}
        id="video-container"
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60 pointer-events-none"></div>
        
        {/* Static image fallback if video fails */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(/static/background-optimized.mp4)', 
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.3,
            zIndex: -15
          }}
        />
      </div>
    </>
  );
}
