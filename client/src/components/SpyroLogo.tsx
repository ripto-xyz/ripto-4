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
      width: 365px;
      overflow: visible;
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
        <img className="letter" src={A} alt="A" style={{ left: '12px' }} />
        <img className="letter" src={U} alt="U" style={{ left: '40px' }} />
        <img className="letter" src={R} alt="R" style={{ left: '60px' }} />
        <img className="letter" src={E} alt="E" style={{ left: '80px' }} />
        <img className="letter" src={N} alt="N" style={{ left: '100px' }} />
        <img className="letter" src={C} alt="C" style={{ left: '120px' }} />
        <img className="letter" src={E} alt="E" style={{ left: '140px' }} />
        <img className="letter" src={PIPE} alt="|" style={{ left: '170px' }} />
        <img className="letter" src={R} alt="R" style={{ left: '190px' }} />
        <img className="letter" src={I} alt="I" style={{ left: '210px' }} />
        <img className="letter" src={P} alt="P" style={{ left: '230px' }} />
        <img className="letter" src={T} alt="T" style={{ left: '250px' }} />
        <img className="letter" src={O} alt="O" style={{ left: '270px' }} />
        <img className="letter-dot" src={DOT} alt="." style={{ left: '290px', top: '16px' }} />
        <img className="letter" src={E} alt="E" style={{ left: '305px' }} />
        <img className="letter" src={T} alt="T" style={{ left: '325px' }} />
        <img className="letter" src={H} alt="H" style={{ left: '345px' }} />
        
        {/* Create a transparent overlay div with the right width */}
        <div style={{ height: '32px', width: '365px' }}></div>
      </div>
    </div>
  );
}