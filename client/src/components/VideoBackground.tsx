import { useEffect, useRef, useState } from 'react';
import timelineVideo from '@assets/Timeline 3.mp4';

// Video quality options - Currently only one is available but more can be added
const videoQualityOptions = {
  high: {
    src: timelineVideo,
    minConnectionSpeed: 5 // Mbps
  },
  // Medium and low quality versions could be added here when available
};

export default function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [selectedQuality, setSelectedQuality] = useState<'high' | 'medium' | 'low'>('high');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Test connection speed
    const testConnectionSpeed = async () => {
      setIsLoading(true);
      
      try {
        // Calculate connection speed using the Navigation API if available
        if ('connection' in navigator && navigator.connection) {
          const connectionType = (navigator as any).connection.effectiveType;
          console.log('Connection type:', connectionType);

          // Estimate connection speed based on effective type
          if (connectionType === '4g') {
            setSelectedQuality('high');
          } else if (connectionType === '3g') {
            // If we had medium quality, we would use it here
            setSelectedQuality('high'); // Fallback to high for now
          } else {
            // If we had low quality, we would use it here
            setSelectedQuality('high'); // Fallback to high for now
          }
        } else {
          // Fallback method for browsers without Navigation API
          // Download a small image to test speed
          const startTime = new Date().getTime();
          const response = await fetch('/favicon.png');
          const blob = await response.blob();
          const endTime = new Date().getTime();

          const fileSize = blob.size; // in bytes
          const durationInSeconds = (endTime - startTime) / 1000;
          const speedInBitsPerSecond = (fileSize * 8) / durationInSeconds;
          const speedInMbps = speedInBitsPerSecond / (1024 * 1024);

          console.log('Connection speed:', speedInMbps.toFixed(2), 'Mbps');

          // Select quality based on speed
          if (speedInMbps >= videoQualityOptions.high.minConnectionSpeed) {
            setSelectedQuality('high');
          } else if (speedInMbps >= 2) { // Example threshold
            // Would use medium quality if available
            setSelectedQuality('high'); // Fallback to high for now
          } else {
            // Would use low quality if available
            setSelectedQuality('high'); // Fallback to high for now
          }
        }
      } catch (error) {
        console.error('Error testing connection speed:', error);
        // Default to high quality on error
        setSelectedQuality('high');
      }

      setIsLoading(false);
    };

    testConnectionSpeed();
  }, []);

  useEffect(() => {
    // Try to force play the video as soon as it's loaded
    const videoElement = videoRef.current;
    if (videoElement && !isLoading) {
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
  }, [isLoading, selectedQuality]);

  return (
    <div className="fixed top-0 left-0 w-full h-full z-[-1] overflow-hidden">
      {/* Dark overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-0"></div>
      
      {/* Loading indicator */}
      {isLoading && (
        <div className="loading-indicator">
          <div className="spinner"></div>
          <div className="loading-text">Loading optimal video quality...</div>
        </div>
      )}
      
      {/* Video element */}
      <video 
        ref={videoRef}
        className="absolute top-[-20%] left-0 min-w-full min-h-[120%] w-auto h-auto object-cover z-[-1]"
        autoPlay 
        muted 
        loop 
        playsInline
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
        <source src={videoQualityOptions[selectedQuality].src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}