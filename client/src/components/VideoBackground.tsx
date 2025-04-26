import React from "react";

/**
 * A static background component with a gradient and optional patterns
 * This is a reliable alternative to the video background
 */
export default function VideoBackground() {
  return (
    <div className="static-background">
      <div className="dark-overlay"></div>
    </div>
  );
}
