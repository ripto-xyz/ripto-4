import React from 'react';

interface LogoYellowProps {
  className?: string;
}

export default function LogoYellow({ className = '' }: LogoYellowProps) {
  return (
    <div className={`logo-yellow inline-block ${className}`}>
      <svg width="300" height="50" viewBox="0 0 300 50" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF074" />
            <stop offset="50%" stopColor="#FFD700" />
            <stop offset="100%" stopColor="#FFBB00" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        <text 
          x="150" 
          y="30" 
          textAnchor="middle" 
          dominantBaseline="middle"
          fontFamily="Arial Black, Helvetica Bold, sans-serif"
          fontWeight="900"
          fontSize="24"
          fill="url(#goldGradient)"
          filter="url(#glow)"
        >
          Laurence | ripto.eth
        </text>
      </svg>
    </div>
  );
}