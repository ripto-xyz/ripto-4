import React from 'react';

interface SpyroLogoProps {
  className?: string;
}

export default function SpyroLogo({ className = '' }: SpyroLogoProps) {
  // Create an array of letters for better rendering
  const laurence = ['L', 'A', 'U', 'R', 'E', 'N', 'C', 'E'];
  const riptoEth = ['R', 'I', 'P', 'T', 'O', '.', 'E', 'T', 'H'];
  
  return (
    <div className={`inline-block ${className}`}>
      <div className="flex items-center flex-wrap">
        {/* LAURENCE */}
        {laurence.map((letter, index) => (
          <div 
            key={`laurence-${index}`} 
            className={letter === '.' ? 'spyro-symbol' : `spyro-letter-${letter}`}
            style={{ 
              '--letter-index': index,
              '--rotation': `${Math.random() * 4 - 2}deg`,
              '--scale': `${1 + Math.random() * 0.05}`
            } as React.CSSProperties}
          >
            {letter}
          </div>
        ))}
        
        {/* Divider */}
        <div className="spyro-symbol mx-2 md:mx-3">|</div>
        
        {/* RIPTO.ETH */}
        {riptoEth.map((letter, index) => (
          <div 
            key={`ripto-${index}`} 
            className={letter === '.' ? 'spyro-symbol' : `spyro-letter-${letter}`}
            style={{ 
              '--letter-index': index + laurence.length + 1,
              '--rotation': `${Math.random() * 4 - 2}deg`,
              '--scale': `${1 + Math.random() * 0.05}`
            } as React.CSSProperties}
          >
            {letter}
          </div>
        ))}
      </div>
    </div>
  );
}