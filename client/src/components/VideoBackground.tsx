import { useEffect, useRef, useState } from 'react';
import timelineVideo from '@assets/Timeline 3.mp4';

// Define type for quality options
type VideoQuality = 'high' | 'medium' | 'low';

interface VideoQualityOption {
  src: string;
  minConnectionSpeed: number;
  label: string;
}

// Video quality options with different quality levels
const videoQualityOptions: Record<VideoQuality, VideoQualityOption> = {
  high: {
    src: timelineVideo, // Original high quality video
    minConnectionSpeed: 5, // Mbps
    label: 'High Quality (4K)'
  },
  medium: {
    src: '/video/timeline-medium.mp4', // Medium quality version
    minConnectionSpeed: 2, // Mbps
    label: 'Medium Quality (960p)'
  },
  low: {
    src: '/video/timeline-medium.mp4', // Using medium as fallback for low quality
    minConnectionSpeed: 0, // Always available
    label: 'Low Quality (960p)'
  }
};

export default function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [selectedQuality, setSelectedQuality] = useState<VideoQuality>('high');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showQualityInfo, setShowQualityInfo] = useState<boolean>(false);

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
            setSelectedQuality('medium');
          } else {
            setSelectedQuality('low');
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
          } else if (speedInMbps >= videoQualityOptions.medium.minConnectionSpeed) {
            setSelectedQuality('medium');
          } else {
            setSelectedQuality('low');
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
        playPromise.then(() => {
          // Show quality notification for 3 seconds when video starts playing
          setShowQualityInfo(true);
          setTimeout(() => {
            setShowQualityInfo(false);
          }, 3000);
        })
        .catch(() => {
          // Auto-play was prevented, try again on user interaction
          document.addEventListener('click', () => {
            videoElement.play().then(() => {
              setShowQualityInfo(true);
              setTimeout(() => {
                setShowQualityInfo(false);
              }, 3000);
            });
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