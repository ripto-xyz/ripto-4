import React, { useEffect, useRef } from 'react';

/**
 * VideoBackground Component
 * 
 * A simple but robust video background component that attempts to load
 * and play a video as the background, with fallback mechanisms.
 */
export default function VideoBackground() {
  // Reference to the video element
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Effect to handle video loading and playing
  useEffect(() => {
    // Skip if no video element is found
    if (!videoRef.current) return;
    
    const video = videoRef.current;
    
    // Function to attempt playing the video
    const attemptPlay = async () => {
      try {
        await video.play();
        console.log('Video playing successfully');
      } catch (err) {
        console.error('Video play failed:', err);
      }
    };
    
    // Event listeners
    const onCanPlay = () => {
      console.log('Video can play, attempting playback');
      attemptPlay();
    };
    
    const onError = (e: Event) => {
      console.error('Video error occurred:', e);
    };
    
    // Add event listeners
    video.addEventListener('canplay', onCanPlay);
    video.addEventListener('error', onError);
    
    // If the video is already loaded, try to play it
    if (video.readyState >= 3) {
      attemptPlay();
    }
    
    // Clean up event listeners on unmount
    return () => {
      video.removeEventListener('canplay', onCanPlay);
      video.removeEventListener('error', onError);
    };
  }, []);
  
  return (
    <div className="video-background-container">
      {/* Fallback background color */}
      <div 
        className="fixed top-0 left-0 w-full h-full z-[-2]" 
        style={{ backgroundColor: "#120738" }}
      ></div>
      
      {/* Dark overlay */}
      <div 
        className="fixed top-0 left-0 w-full h-full z-[0] bg-black opacity-70"
      ></div>
      
      {/* Video element */}
      <video
        ref={videoRef}
        className="fixed top-0 left-0 w-full h-full object-cover z-[-1]"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/timeline-3-optimized.mp4" type="video/mp4" />
        <source src="/timeline3.mp4" type="video/mp4" />
        <source src="/background-optimized.mp4" type="video/mp4" />
      </video>
    </div>
  );
}