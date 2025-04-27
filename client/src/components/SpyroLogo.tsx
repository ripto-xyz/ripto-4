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

  // Define the space between letters - using extremely aggressive negative margin for very tight spacing
  const letterSpacing = -18; // pixels (negative for extreme overlap)

  // Create a style for the container
  const containerStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: `${letterSpacing}px`,
    marginLeft: `${-letterSpacing/2}px`, // compensate for the negative spacing on first item
    transform: 'scale(1)', // no scale down
    transformOrigin: 'left center',
    maxWidth: '120px', // much narrower with the extreme tight spacing
  };

  // Create a style for each letter
  const letterStyle = {
    height: `${letterHeight}px`,
    width: 'auto',
    display: 'inline-block',
    filter: 'drop-shadow(0px 1px 1px rgba(0,0,0,0.3))', // add subtle shadow for better visibility
  };

  // Define a gap for the pipe - now completely eliminated
  const spaceWidth = 0; // no extra space
  const spaceStyle = {
    width: `${spaceWidth}px`,
    display: 'inline-block',
  };

  // CSS-based approach instead of containerStyle with extremely aggressive negative margins
  const inlineStyleCSS = `
    .spyro-logo-container img {
      height: ${letterHeight}px;
      margin-right: -25px; /* extremely aggressive overlap */
      display: inline-block;
      vertical-align: middle;
    }
    .spyro-logo-container .dot {
      height: ${letterHeight/2}px;
      margin-right: -22px;
    }
    .spyro-logo-container {
      max-width: 85px;
      white-space: nowrap;
      transform: scale(0.9);
      transform-origin: left center;
    }
  `;

  return (
    <div className={`inline-block ${className}`}>
      <style dangerouslySetInnerHTML={{__html: inlineStyleCSS}} />
      <div className="spyro-logo-container">
        {/* LAURENCE */}
        <img src={L} alt="L" />
        <img src={A} alt="A" />
        <img src={U} alt="U" />
        <img src={R} alt="R" />
        <img src={E} alt="E" />
        <img src={N} alt="N" />
        <img src={C} alt="C" />
        <img src={E} alt="E" />
        
        {/* Pipe */}
        <img src={PIPE} alt="|" />
        
        {/* RIPTO.ETH */}
        <img src={R} alt="R" />
        <img src={I} alt="I" />
        <img src={P} alt="P" />
        <img src={T} alt="T" />
        <img src={O} alt="O" />
        <img src={DOT} alt="." className="dot" />
        <img src={E} alt="E" />
        <img src={T} alt="T" />
        <img src={H} alt="H" />
      </div>
    </div>
  );
}