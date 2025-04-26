import React from "react";

export default function VideoBackground() {
  return (
    <div className="video-container" style={{ backgroundColor: "#120738" }}>
      <div className="dark-overlay" style={{ backgroundColor: "rgba(0, 0, 0, 0.7)", zIndex: 0 }}></div>
    </div>
  );
}
