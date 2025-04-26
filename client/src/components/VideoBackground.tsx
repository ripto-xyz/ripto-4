import { useRef, useEffect } from 'react';

// Simple, direct implementation that ensures the video will show
export default function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Add event listener for when document is clicked to ensure video plays
  useEffect(() => {
    const playVideo = () => {
      if (videoRef.current) {
        videoRef.current.play().catch(e => {
          console.error("Error playing video:", e);
        });
      }
    };

    // Try to play immediately
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // If autoplay fails, set up click handler
        document.addEventListener('click', playVideo, { once: true });
      });
    }

    return () => {
      document.removeEventListener('click', playVideo);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full z-[-1] overflow-hidden">
      {/* Dark overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-0"></div>
      
      {/* Video element - using direct path */}
      <video 
        ref={videoRef}
        className="absolute top-[-20%] left-0 min-w-full min-h-[120%] w-auto h-auto object-cover z-[-1]"
        autoPlay 
        muted 
        loop 
        playsInline
        onError={(e) => console.error("Video error:", e)}
        style={{
          objectFit: 'cover',
          width: '100%',
          height: '120%',
          position: 'absolute',
          top: '-20%',
          left: 0,
          zIndex: -1
        }}
      >
        <source src="/video/timeline.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}