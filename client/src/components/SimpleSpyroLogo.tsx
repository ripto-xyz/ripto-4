import React from 'react';

interface SimpleSpyroLogoProps {
  className?: string;
  text: string;
}

export default function SimpleSpyroLogo({ className = '', text }: SimpleSpyroLogoProps) {
  return (
    <div className={`inline-block ${className}`}>
      <div 
        className="spyro-text text-xl md:text-2xl"
        style={{
          fontFamily: 'Arial Black, Impact, sans-serif',
          fontWeight: 900,
          color: '#F1E955',
          textShadow: `
            0px 1px 0px #D6CE4A,
            0px 2px 0px #BBB341,
            0px 3px 0px #A09E2F,
            0px 4px 0px #8C8A28,
            0px 5px 4px rgba(0, 0, 0, 0.6)
          `,
          letterSpacing: '1px',
          animation: 'spyroFloat 6s ease-in-out infinite',
        }}
      >
        {text.toUpperCase()}
      </div>
    </div>
  );
}

// Add the floating animation CSS to index.css
const styleTag = document.createElement('style');
styleTag.innerHTML = `
  @keyframes spyroFloat {
    0% { transform: translateY(0) rotate(-0.5deg); }
    50% { transform: translateY(-2px) rotate(0.5deg); }
    100% { transform: translateY(0) rotate(-0.5deg); }
  }
`;
document.head.appendChild(styleTag);