// Export all assets from this file
import timelineVideo from './timeline3.mp4'; // Original high quality version
import timelineOptimized from './timeline3-web-optimized.mp4'; // Web-optimized version (1280p, 30fps)
import timelinePlaceholder from './timeline3-placeholder.mp4'; // Placeholder version for instant loading

// Export videos with different quality options
export const videos = {
  timeline: timelineOptimized, // Default to optimized version for better loading
  timelineHighQuality: timelineVideo, // Original high quality for powerful devices
  timelinePlaceholder: timelinePlaceholder, // Ultra small placeholder
};

// Export any other assets below
export const images = {
  // Add image imports here when needed
};