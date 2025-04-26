import { useRef, useEffect } from 'react';

// Simple, direct implementation that ensures the video will show
export default function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Add event listener for when document is clicked to ensure video plays
  useEffect(() => {
    console.log("VideoBackground mounted, video path: /videos/timeline.mp4");
    
    // Verify video file availability
    fetch('/videos/timeline.mp4', { method: 'HEAD' })
      .then(response => {
        if (response.ok) {
          console.log("Video file exists on server:", response.status, response.statusText);
        } else {
          console.error("Video file not found on server:", response.status, response.statusText);
        }
      })
      .catch(err => {
        console.error("Error checking video file:", err);
      });
    
    const playVideo = () => {
      if (videoRef.current) {
        console.log("Attempting to play video...");
        videoRef.current.play()
          .then(() => console.log("Video playback started successfully"))
          .catch(e => {
            console.error("Error playing video:", e);
          });
      }
    };

    // Try to play immediately
    if (videoRef.current) {
      videoRef.current.play()
        .then(() => console.log("Video autoplay successful"))
        .catch((err) => {
          console.log("Video autoplay failed, will attempt on click:", err);
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
        onLoadStart={() => console.log("Video load started")}
        onLoadedData={() => console.log("Video data loaded")}
        onCanPlay={() => console.log("Video can play")}
        onPlaying={() => console.log("Video is playing")}
        onError={(e) => console.error("Video error:", e.currentTarget.error)}
        onSeeking={() => console.log("Video seeking")}
        onSeeked={() => console.log("Video seeked")}
        preload="auto"
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
        <source src="/videos/timeline.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}