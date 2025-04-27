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
      width: 370px;
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
      <div className="logo-container spyro-logo-animated">
        <img className="letter letter-animated-3" src={L} alt="L" style={{ left: '0px', animationDelay: '0.0s' }} />
        <img className="letter letter-animated-1" src={A} alt="A" style={{ left: '10px', animationDelay: '0.1s' }} />
        <img className="letter letter-animated-2" src={U} alt="U" style={{ left: '40px', animationDelay: '0.2s' }} />
        <img className="letter letter-animated-4" src={R} alt="R" style={{ left: '60px', animationDelay: '0.3s' }} />
        <img className="letter letter-animated-5" src={E} alt="E" style={{ left: '80px', animationDelay: '0.4s' }} />
        <img className="letter letter-animated-1" src={N} alt="N" style={{ left: '100px', animationDelay: '0.5s' }} />
        <img className="letter letter-animated-3" src={C} alt="C" style={{ left: '120px', animationDelay: '0.6s' }} />
        <img className="letter letter-animated-2" src={E} alt="E" style={{ left: '140px', animationDelay: '0.7s' }} />
        <img className="letter letter-animated-4" src={PIPE} alt="|" style={{ left: '170px', animationDelay: '0.8s', height: '40px', marginTop: '-4px' }} />
        <img className="letter letter-animated-5" src={R} alt="R" style={{ left: '195px', animationDelay: '0.9s' }} />
        <img className="letter letter-animated-2" src={I} alt="I" style={{ left: '222px', animationDelay: '1.0s', height: '28px', marginTop: '2px' }} />
        <img className="letter letter-animated-1" src={P} alt="P" style={{ left: '235px', animationDelay: '1.1s' }} />
        <img className="letter letter-animated-3" src={T} alt="T" style={{ left: '255px', animationDelay: '1.2s' }} />
        <img className="letter letter-animated-5" src={O} alt="O" style={{ left: '275px', animationDelay: '1.3s' }} />
        <img className="letter-dot letter-animated-4" src={DOT} alt="." style={{ left: '297px', top: '16px', animationDelay: '1.4s' }} />
        <img className="letter letter-animated-2" src={E} alt="E" style={{ left: '310px', animationDelay: '1.5s' }} />
        <img className="letter letter-animated-1" src={T} alt="T" style={{ left: '328px', top: '2px', animationDelay: '1.6s' }} />
        <img className="letter letter-animated-3" src={H} alt="H" style={{ left: '350px', animationDelay: '1.7s' }} />
        
        {/* Create a transparent overlay div with the right width */}
        <div style={{ height: '32px', width: '370px' }}></div>
      </div>
    </div>
  );
}