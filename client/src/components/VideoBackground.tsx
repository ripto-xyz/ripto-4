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
    src: '/video/timeline-high.mp4', // Using pre-optimized high quality in public folder
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
  const highQualityVideoRef = useRef<HTMLVideoElement>(null);
  
  // Start with low quality for immediate loading
  const [initialQuality] = useState<VideoQuality>('low');
  const [targetQuality, setTargetQuality] = useState<VideoQuality>('high');
  const [currentQuality, setCurrentQuality] = useState<VideoQuality>('low');
  
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showQualityInfo, setShowQualityInfo] = useState<boolean>(false);
  const [highQualityLoaded, setHighQualityLoaded] = useState<boolean>(false);

  // Preload the high quality video in the background
  useEffect(() => {
    // First show something quickly
    setIsLoading(false);
    
    // Test connection speed
    const testConnectionSpeed = async () => {
      try {
        // Calculate connection speed using the Navigation API if available
        if ('connection' in navigator && navigator.connection) {
          const connectionType = (navigator as any).connection.effectiveType;
          console.log('Connection type:', connectionType);

          // Estimate connection speed based on effective type
          if (connectionType === '4g') {
            setTargetQuality('high');
          } else if (connectionType === '3g') {
            setTargetQuality('medium');
          } else {
            setTargetQuality('low');
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
            setTargetQuality('high');
          } else if (speedInMbps >= videoQualityOptions.medium.minConnectionSpeed) {
            setTargetQuality('medium');
          } else {
            setTargetQuality('low');
          }
        }
      } catch (error) {
        console.error('Error testing connection speed:', error);
        // Default to low quality on error
        setTargetQuality('low');
      }
    };

    testConnectionSpeed();
    
    // Preload the high quality video if needed
    if (targetQuality === 'high') {
      const preloadVideo = document.createElement('video');
      preloadVideo.src = videoQualityOptions.high.src;
      preloadVideo.muted = true;
      preloadVideo.preload = 'auto';
      
      // Track when high quality is loaded
      preloadVideo.addEventListener('canplaythrough', () => {
        setHighQualityLoaded(true);
        setCurrentQuality('high');
        
        // Show quality notification
        setShowQualityInfo(true);
        setTimeout(() => {
          setShowQualityInfo(false);
        }, 3000);
      });
      
      preloadVideo.load();
    }
  }, [targetQuality]);

  // Handle video playback
  useEffect(() => {
    // Try to force play the video as soon as it's loaded
    const videoElement = videoRef.current;
    if (videoElement && !isLoading) {
      const playPromise = videoElement.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          // Show quality notification only for initial load
          if (currentQuality === initialQuality) {
            setShowQualityInfo(true);
            setTimeout(() => {
              setShowQualityInfo(false);
            }, 3000);
          }
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
  }, [isLoading, initialQuality, currentQuality]);

  return (
    <div className="fixed top-0 left-0 w-full h-full z-[-1] overflow-hidden">
      {/* Dark overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-0"></div>
      
      {/* Loading indicator */}
      {isLoading && (
        <div className="loading-indicator">
          <div className="spinner"></div>
          <div className="loading-text">Loading video...</div>
        </div>
      )}
      
      {/* Quality information - shows briefly when video quality changes */}
      {showQualityInfo && !isLoading && (
        <div className="absolute bottom-4 right-4 bg-black/70 text-white px-4 py-2 rounded-lg z-10 text-sm fade-out shadow-lg border border-white/10 backdrop-blur-sm">
          <div className="font-semibold flex items-center">
            <svg className="w-4 h-4 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            {videoQualityOptions[currentQuality].label}
          </div>
          <div className="text-xs opacity-80 mt-1 pl-6">
            Based on your connection speed
          </div>
        </div>
      )}
      
      {/* Low quality video (loaded first) */}
      <video 
        ref={videoRef}
        className="absolute top-[-20%] left-0 min-w-full min-h-[120%] w-auto h-auto object-cover z-[-1]"
        autoPlay 
        muted 
        loop 
        playsInline
        preload="auto"
        style={{
          objectFit: 'cover',
          width: '100%',
          height: '120%',
          position: 'absolute',
          top: '-20%',
          left: 0,
          zIndex: -1,
          opacity: highQualityLoaded && currentQuality === 'high' ? 0 : 1,
          transition: 'opacity 1s ease-in-out'
        }}
      >
        <source src={videoQualityOptions.low.src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* High quality video (loaded in background) */}
      {targetQuality === 'high' && (
        <video 
          ref={highQualityVideoRef}
          className="absolute top-[-20%] left-0 min-w-full min-h-[120%] w-auto h-auto object-cover z-[-1]"
          autoPlay 
          muted 
          loop 
          playsInline
          preload="auto"
          style={{
            objectFit: 'cover',
            width: '100%',
            height: '120%',
            position: 'absolute',
            top: '-20%',
            left: 0,
            zIndex: -1,
            opacity: highQualityLoaded && currentQuality === 'high' ? 1 : 0,
            transition: 'opacity 1s ease-in-out'
          }}
        >
          <source src={videoQualityOptions.high.src} type="video/mp4" />
        </video>
      )}
    </div>
  );
}