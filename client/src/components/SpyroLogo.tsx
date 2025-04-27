import React from 'react';

// Import all the individual letter/symbol images
import L from '../assets/L.png';
import A from '../assets/A.png';
import U from '../assets/U.png';
import R from '../assets/R.png';
import E from '../assets/E.png';
import N from '../assets/N.png';
import C from '../assets/C.png';
import PIPE from '../assets/PIPE.png';
import I from '../assets/I.png';
import P from '../assets/P.png';
import T from '../assets/T.png';
import O from '../assets/O.png';
import DOT from '../assets/DOT.png';
import H from '../assets/H.png';

interface SpyroLogoProps {
  className?: string;
}

export default function SpyroLogo({ className = '' }: SpyroLogoProps) {
  // Create a single CSS class with the proper styles
  const styles = `
    .logo-container {
      display: inline-block;
      white-space: nowrap;
      position: relative;
      height: 32px;
      line-height: 1;
      width: auto;
    }
    .letter {
      position: absolute;
      height: 32px;
      display: block;
    }
    .letter-dot {
      position: absolute;
      height: 16px;
      display: block;
    }
  `;

  // Create a simpler approach with absolute positioning
  return (
    <div className={className}>
      <style>{styles}</style>
      <div className="logo-container">
        <img className="letter" src={L} alt="L" style={{ left: '0px' }} />
        <img className="letter" src={A} alt="A" style={{ left: '5px' }} />
        <img className="letter" src={U} alt="U" style={{ left: '11px' }} />
        <img className="letter" src={R} alt="R" style={{ left: '15px' }} />
        <img className="letter" src={E} alt="E" style={{ left: '19px' }} />
        <img className="letter" src={N} alt="N" style={{ left: '23px' }} />
        <img className="letter" src={C} alt="C" style={{ left: '27px' }} />
        <img className="letter" src={E} alt="E" style={{ left: '31px' }} />
        <img className="letter" src={PIPE} alt="|" style={{ left: '36px' }} />
        <img className="letter" src={R} alt="R" style={{ left: '38px' }} />
        <img className="letter" src={I} alt="I" style={{ left: '42px' }} />
        <img className="letter" src={P} alt="P" style={{ left: '44px' }} />
        <img className="letter" src={T} alt="T" style={{ left: '48px' }} />
        <img className="letter" src={O} alt="O" style={{ left: '52px' }} />
        <img className="letter-dot" src={DOT} alt="." style={{ left: '56px', top: '16px' }} />
        <img className="letter" src={E} alt="E" style={{ left: '58px' }} />
        <img className="letter" src={T} alt="T" style={{ left: '62px' }} />
        <img className="letter" src={H} alt="H" style={{ left: '66px' }} />
        
        {/* Create a transparent overlay div with the right width */}
        <div style={{ height: '32px', width: '75px' }}></div>
      </div>
    </div>
  );
}