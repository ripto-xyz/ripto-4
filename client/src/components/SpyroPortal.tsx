import React from "react";
import "./SpyroPortal.css";

export default function SpyroPortal() {
  return (
    <div className="spyro-portal">
      <img 
        src="/static/portalme.png" 
        alt="Spyro Sunny Beach portal" 
        loading="eager"
        onError={(e) => {
          console.error("Portal image failed to load from static path");
          
          // Try a fallback path
          const img = e.currentTarget;
          img.src = "/portalme.png";
          
          // Set up a second error handler in case the fallback also fails
          img.onerror = () => {
            console.error("Portal image failed to load from fallback path");
            img.style.display = 'none';
            
            // Create a simpler fallback element
            const parent = img.parentElement;
            if (parent) {
              const fallback = document.createElement('div');
              fallback.className = "portal-fallback";
              fallback.innerHTML = `
                <div class="portal-frame">
                  <div class="portal-content">
                    <div class="portal-text">SUNNY BEACH</div>
                  </div>
                </div>
              `;
              parent.appendChild(fallback);
            }
          };
        }}
      />
    </div>
  );
}