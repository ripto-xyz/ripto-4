// Export all assets from this file with static paths instead of imports
// This avoids the Vite import issues and runtime errors

// Export videos with direct paths to public folder
export const videos = {
  timeline: "/images/timeline3-original.mp4", // Use the original video
  timelineNew: "/images/timeline3-new.mp4", // Backup option
};

// Export any other assets below
export const images = {
  // Add image paths here when needed
};