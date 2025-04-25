import React from 'react';

interface YellowLogoProps {
  className?: string;
}

export default function YellowLogo({ className = '' }: YellowLogoProps) {
  return (
    <div className={`inline-block ${className}`}>
      <div className="text-lg md:text-xl font-black tracking-wide whitespace-nowrap perspective-[1000px]">
        {/* Add multiple shadow layers for enhanced 3D effect */}
        {/* Using CSS shadows instead of multiple elements */}
        <span className="yellow-logo-text uppercase inline-block tracking-wider">LAURENCE</span>
        
        <span className="mx-1 md:mx-2 opacity-90 text-yellow-300 font-black animate-pulse">|</span>
        
        <span className="yellow-logo-text uppercase inline-block tracking-wider">RIPTO.ETH</span>
      </div>
    </div>
  );
}