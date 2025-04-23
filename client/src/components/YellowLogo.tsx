import React from 'react';

interface YellowLogoProps {
  className?: string;
}

export default function YellowLogo({ className = '' }: YellowLogoProps) {
  return (
    <div className={`inline-block ${className}`}>
      <div className="text-2xl md:text-3xl font-black tracking-wide" style={{ 
        color: '#FFD700',
        textShadow: '0 0 10px rgba(255, 215, 0, 0.3)'
      }}>
        <span className="yellow-logo-text">Laurence</span>
        <span className="mx-2 opacity-80">|</span>
        <span className="yellow-logo-text">ripto.eth</span>
      </div>
    </div>
  );
}