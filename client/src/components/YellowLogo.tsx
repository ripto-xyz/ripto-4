import React from 'react';

interface YellowLogoProps {
  className?: string;
}

export default function YellowLogo({ className = '' }: YellowLogoProps) {
  return (
    <div className={`inline-block ${className}`}>
      <div className="text-lg md:text-2xl font-black tracking-wide whitespace-nowrap perspective-[1000px]">
        {/* Add multiple shadow layers for enhanced 3D effect */}
        <div className="relative inline-block">
          {/* Bottom shadow - deepest */}
          <span className="yellow-logo-shadow-bottom uppercase absolute top-[3px] left-[1px] z-[-3]">LAURENCE</span>
          {/* Left shadow */}
          <span className="yellow-logo-shadow uppercase absolute top-0 left-0 z-[-2]">LAURENCE</span>
          {/* Right-side shadow highlight */}
          <span className="yellow-logo-shadow-right uppercase absolute top-0 left-[1px] z-[-1]">LAURENCE</span>
          {/* Main text on top */}
          <span className="yellow-logo-text uppercase inline-block">LAURENCE</span>
        </div>
        
        <span className="mx-1 md:mx-2 opacity-90 text-yellow-300 font-black">|</span>
        
        <div className="relative inline-block">
          {/* Bottom shadow - deepest */}
          <span className="yellow-logo-shadow-bottom uppercase absolute top-[3px] left-[1px] z-[-3]">RIPTO.ETH</span>
          {/* Left shadow */}
          <span className="yellow-logo-shadow uppercase absolute top-0 left-0 z-[-2]">RIPTO.ETH</span>
          {/* Right-side shadow highlight */}
          <span className="yellow-logo-shadow-right uppercase absolute top-0 left-[1px] z-[-1]">RIPTO.ETH</span>
          {/* Main text on top */}
          <span className="yellow-logo-text uppercase inline-block">RIPTO.ETH</span>
        </div>
      </div>
    </div>
  );
}