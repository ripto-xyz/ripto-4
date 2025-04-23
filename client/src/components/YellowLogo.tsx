import React from 'react';

interface YellowLogoProps {
  className?: string;
}

export default function YellowLogo({ className = '' }: YellowLogoProps) {
  return (
    <div className={`inline-block ${className}`}>
      <div className="text-lg md:text-2xl font-black tracking-wide whitespace-nowrap" style={{ 
        color: '#FFD700',
        textShadow: '0 0 10px rgba(255, 215, 0, 0.3)'
      }}>
        <span className="yellow-logo-text uppercase">LAURENCE</span>
        <span className="mx-1 md:mx-2 opacity-80">|</span>
        <span className="yellow-logo-text uppercase">RIPTO.ETH</span>
      </div>
    </div>
  );
}