import React from 'react';

export default function SimpleVideoBackground() {
  return (
    <div className="fixed top-0 left-0 w-full h-full overflow-hidden z-[-2]">
      {/* Fallback color */}
      <div 
        className="absolute inset-0 bg-[#120738] z-[-1]"
      ></div>
      
      {/* Video embed using iframe for maximum compatibility */}
      <div className="absolute inset-0 w-full h-full z-[-1]">
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        >
          <source src="/timeline3.mp4" type="video/mp4" />
        </video>
      </div>
      
      {/* Dark overlay */}
      <div 
        className="absolute inset-0 bg-black opacity-70 z-[0]"
      ></div>
    </div>
  );
}