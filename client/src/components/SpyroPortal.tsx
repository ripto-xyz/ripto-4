import React from "react";

export default function SpyroPortal() {
  // Use the actual image as a base64 string
  return (
    <div className="spyro-portal w-full h-auto max-w-[280px] md:max-w-none">
      <img 
        src="/assets/portal.png" 
        alt="Spyro Sunny Beach portal" 
        className="w-full h-auto object-contain"
      />
    </div>
  );
}