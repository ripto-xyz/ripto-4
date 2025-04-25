import React from "react";
import "./SpyroPortal.css";

export default function SpyroPortal() {
  // We'll use a relative URL that should work in the Replit environment
  return (
    <div className="spyro-portal">
      <img 
        src="https://af306101-4eb7-4afb-8e04-f35473c4ecec-00-3ff7j7qpuojoh.spock.replit.dev/portalme.png" 
        alt="Spyro Sunny Beach portal" 
        onError={(e) => {
          // If the image doesn't load, display a simple fallback
          console.error("Portal image failed to load");
          e.currentTarget.style.display = 'none';
          
          // Add a fallback text
          const parent = e.currentTarget.parentElement;
          if (parent) {
            const fallback = document.createElement('div');
            fallback.textContent = 'SUNNY BEACH PORTAL';
            fallback.style.background = '#ffd700';
            fallback.style.color = '#000';
            fallback.style.padding = '20px';
            fallback.style.borderRadius = '20px';
            fallback.style.textAlign = 'center';
            fallback.style.fontWeight = 'bold';
            fallback.style.fontSize = '24px';
            parent.appendChild(fallback);
          }
        }}
      />
    </div>
  );
}