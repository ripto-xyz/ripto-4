import React from "react";

export default function SpyroPortal() {
  return (
    <div className="spyro-portal w-full h-auto max-w-[280px] md:max-w-none">
      {/* Recreated Spyro portal as an SVG */}
      <svg width="300" height="220" viewBox="0 0 300 220" xmlns="http://www.w3.org/2000/svg">
        {/* Portal outer frame - stone texture */}
        <rect x="20" y="10" width="260" height="200" rx="20" ry="20" fill="#8e7f7f" />
        
        {/* Portal inner frame - yellowish gold border */}
        <rect x="40" y="25" width="220" height="170" rx="15" ry="15" fill="#e6c34a" />
        
        {/* Portal opening - blue sky */}
        <rect x="60" y="40" width="180" height="140" rx="10" ry="10" fill="#4a90e2" />
        
        {/* Sunny Beach - sand */}
        <path d="M60,140 L240,140 L240,180 L60,180 Z" fill="#f9d678" />
        
        {/* Ocean water */}
        <rect x="60" y="140" width="180" height="25" fill="#1a75ff" />
        
        {/* Sun */}
        <circle cx="200" cy="70" r="20" fill="#ffeb3b" />
        
        {/* Mountain in background */}
        <path d="M130,100 L190,60 L220,100 L220,140 L130,140 Z" fill="#c2b280" />
        
        {/* Text "SUNNY BEACH" */}
        <text x="150" y="100" 
          fontFamily="Arial Black, sans-serif" 
          fontSize="16" 
          fontWeight="bold" 
          fill="#4d8c57" 
          textAnchor="middle">
          SUNNY BEACH
        </text>
        
        {/* Portal decorative elements - small gems on corners */}
        <circle cx="40" cy="25" r="5" fill="#9c59d1" />
        <circle cx="260" cy="25" r="5" fill="#9c59d1" />
        <circle cx="40" cy="195" r="5" fill="#9c59d1" />
        <circle cx="260" cy="195" r="5" fill="#9c59d1" />
      </svg>
    </div>
  );
}