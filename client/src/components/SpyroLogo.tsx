import React from 'react';

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
  return (
    <div className={`inline-block ${className}`}>
      <div className="text-lg md:text-2xl font-black tracking-wide whitespace-nowrap perspective-[800px]">
        <div className="inline-block overflow-visible">
          <span className="spyro-logo-text uppercase inline-block">{text1}</span>
          <span className="mx-1 md:mx-2 opacity-80 text-yellow-300 relative top-[-1px] transform rotate-3">|</span>
          <span className="spyro-logo-text uppercase inline-block">{text2}</span>
        </div>
      </div>
    </div>
  );
}