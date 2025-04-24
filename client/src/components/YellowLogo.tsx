import React from 'react';

interface YellowLogoProps {
  className?: string;
}

export default function YellowLogo({ className = '' }: YellowLogoProps) {
  return (
    <div className={`inline-block ${className}`}>
      <div className="text-lg md:text-2xl font-black tracking-wide whitespace-nowrap perspective-[1000px]">
        <span className="yellow-logo-text uppercase inline-block">LAURENCE</span>
        <span className="mx-1 md:mx-2 opacity-90 text-yellow-300 font-black">|</span>
        <span className="yellow-logo-text uppercase inline-block">RIPTO.ETH</span>
      </div>
    </div>
  );
}