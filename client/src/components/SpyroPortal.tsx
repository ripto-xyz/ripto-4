import React from "react";

export default function SpyroPortal() {
  // Direct embed of a placeholder portal with similar appearance
  return (
    <div className="spyro-portal w-full h-auto max-w-[350px] md:max-w-[500px]">
      <svg width="100%" height="100%" viewBox="0 0 500 400" xmlns="http://www.w3.org/2000/svg">
        {/* Portal outer frame */}
        <rect x="50" y="40" width="400" height="320" rx="40" ry="40" fill="#8e7f7f" />
        
        {/* Portal inner frame - yellowish gold border */}
        <rect x="75" y="60" width="350" height="280" rx="30" ry="30" fill="#e6c34a" />
        
        {/* Portal opening - blue sky */}
        <rect x="100" y="80" width="300" height="240" rx="20" ry="20" fill="#4a90e2" />
        
        {/* Ocean at bottom */}
        <rect x="100" y="200" width="300" height="120" fill="#1a75ff" />
        
        {/* Text "SUNNY BEACH" */}
        <text x="250" y="160" 
            fontFamily="Arial Black, sans-serif" 
            fontSize="28" 
            fontWeight="bold" 
            fill="#70e070" 
            textAnchor="middle">
            SUNNY BEACH
        </text>
        
        {/* Smiling face in center */}
        <circle cx="250" cy="240" r="70" fill="#f2c083" /> {/* Face background */}
        <ellipse cx="250" cy="260" rx="40" ry="30" fill="none" stroke="#663931" strokeWidth="6" /> {/* Smile */}
        <circle cx="220" cy="220" r="8" fill="#663931" /> {/* Left eye */}
        <circle cx="280" cy="220" r="8" fill="#663931" /> {/* Right eye */}
        <path d="M210,280 Q250,320 290,280" fill="#663931" /> {/* Beard */}
      </svg>
    </div>
  );
}