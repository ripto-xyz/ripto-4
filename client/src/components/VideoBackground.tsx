import { useEffect, useRef } from 'react';

export default function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Try to force play the video as soon as it's loaded
    const videoElement = videoRef.current;
    if (videoElement) {
      const playPromise = videoElement.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Auto-play was prevented, try again on user interaction
          document.addEventListener('click', () => {
            videoElement.play();
          }, { once: true });
        });
      }
    }
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full z-[-1] overflow-hidden">
      {/* Dark overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-0"></div>
      
      {/* Video element */}
      <video 
        ref={videoRef}
        className="absolute top-0 left-0 min-w-full min-h-full w-auto h-auto object-cover z-[-1]"
        autoPlay 
        muted 
        loop 
        playsInline
      >
        <source src="/attached_assets/timeline.mp4" type="video/mp4" />
        <source src="/timeline-bg.mp4" type="video/mp4" />
        <source src="/timeline.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}