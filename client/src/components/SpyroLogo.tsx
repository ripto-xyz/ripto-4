import React from 'react';

// Import all the individual letter/symbol images
import L from '../assets/L.png';
import A from '../assets/A.png';
import U from '../assets/U.png';
import R from '../assets/R.png';
import E from '../assets/E.png';
import N from '../assets/N.png';
import C from '../assets/C.png';
// Second E reuses the first E
import PIPE from '../assets/PIPE.png';
// Second R reuses the first R
import I from '../assets/I.png';
import P from '../assets/P.png';
import T from '../assets/T.png';
import O from '../assets/O.png';
import DOT from '../assets/DOT.png';
// Third E reuses the first E
import H from '../assets/H.png';

interface SpyroLogoProps {
  className?: string;
}

export default function SpyroLogo({ className = '' }: SpyroLogoProps) {
  // Set a consistent height for all letters
  const letterHeight = 32; // larger height for better visibility

  // Define the space between letters - using negative margin for tighter spacing
  const letterSpacing = -6; // pixels (negative for overlap) - moderate overlap

  // Create a style for the container
  const containerStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: `${letterSpacing}px`,
    marginLeft: `${-letterSpacing/2}px`, // compensate for the negative spacing on first item
    transform: 'scale(1)', // no scale down
    transformOrigin: 'left center',
    maxWidth: '225px', // wider to accommodate full-size logo
  };

  // Create a style for each letter
  const letterStyle = {
    height: `${letterHeight}px`,
    width: 'auto',
    display: 'inline-block',
    filter: 'drop-shadow(0px 1px 1px rgba(0,0,0,0.3))', // add subtle shadow for better visibility
  };

  // Define a gap for the space and pipe - now very minimal
  const spaceWidth = 1; // fixed tiny spacing
  const spaceStyle = {
    width: `${spaceWidth}px`,
    display: 'inline-block',
  };

  return (
    <div className={`inline-block ${className}`}>
      <div style={containerStyle} className="whitespace-nowrap">
        {/* LAURENCE */}
        <img src={L} alt="L" style={letterStyle} />
        <img src={A} alt="A" style={letterStyle} />
        <img src={U} alt="U" style={letterStyle} />
        <img src={R} alt="R" style={letterStyle} />
        <img src={E} alt="E" style={letterStyle} />
        <img src={N} alt="N" style={letterStyle} />
        <img src={C} alt="C" style={letterStyle} />
        <img src={E} alt="E" style={letterStyle} />
        
        {/* Space */}
        <div style={spaceStyle}></div>
        
        {/* Pipe */}
        <img src={PIPE} alt="|" style={letterStyle} />
        
        {/* Space */}
        <div style={spaceStyle}></div>
        
        {/* RIPTO.ETH */}
        <img src={R} alt="R" style={letterStyle} />
        <img src={I} alt="I" style={letterStyle} />
        <img src={P} alt="P" style={letterStyle} />
        <img src={T} alt="T" style={letterStyle} />
        <img src={O} alt="O" style={letterStyle} />
        <img src={DOT} alt="." style={{...letterStyle, height: `${letterHeight/2}px`}} />
        <img src={E} alt="E" style={letterStyle} />
        <img src={T} alt="T" style={letterStyle} />
        <img src={H} alt="H" style={letterStyle} />
      </div>
    </div>
  );
}