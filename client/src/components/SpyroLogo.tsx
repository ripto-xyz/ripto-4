import React, { useEffect, useState } from 'react';

interface SpyroLogoProps {
  className?: string;
  text1?: string;
  text2?: string;
}

export default function SpyroLogo({ 
  className = '', 
  text1 = 'LAURENCE', 
  text2 = 'RIPTO.ETH' 
}: SpyroLogoProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  useEffect(() => {
    // Check if the Spyro font reference image is available
    const img = new Image();
    img.src = '/assets/spyrofont2.jpg';
    
    img.onload = () => {
      console.log('Loading image from:', img.src);
      setImageLoaded(true);
    };
    
    img.onerror = () => {
      console.log('Failed to load Spyro font image:', img.onerror);
      setImageLoaded(false);
    };
  }, []);

  return (
    <div className={`inline-block ${className}`}>
      <div className="text-lg md:text-2xl font-black tracking-wide whitespace-nowrap perspective-[800px]">
        <span className="spyro-logo-text uppercase inline-block">{text1}</span>
        <span className="mx-1 md:mx-2 opacity-80 text-yellow-400">|</span>
        <span className="spyro-logo-text uppercase inline-block">{text2}</span>
      </div>
    </div>
  );
}