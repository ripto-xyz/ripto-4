import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import SpyroLogo from "./SpyroLogo";
import { scrollToSection } from "@/lib/utils";

interface NavbarProps {
  activeSection: string;
  showMobileMenu: boolean;
  setShowMobileMenu: (show: boolean) => void;
}

export default function Navbar({ activeSection, showMobileMenu, setShowMobileMenu }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowMobileMenu(!showMobileMenu);
  };
  
  // Enhanced scroll function using our utility
  const handleNavClick = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    scrollToSection(sectionId);
    setShowMobileMenu(false);
  };

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#1A1A2E] bg-opacity-90 backdrop-blur-md' : 'bg-opacity-0'
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="grid grid-cols-12 items-center w-full">
          <div onClick={(e) => handleNavClick(e, 'home')} className="cursor-pointer col-span-4 lg:col-span-3">
            {/* Direct HTML with custom inline styles */}
            <div className="inline-block">
              <div style={{maxWidth: '60px', whiteSpace: 'nowrap', transform: 'scale(0.9)', transformOrigin: 'left center'}}>
                <img src="/images/L.png" alt="L" style={{height: '28px', marginRight: '-26px', display: 'inline-block', verticalAlign: 'middle'}} />
                <img src="/images/A.png" alt="A" style={{height: '28px', marginRight: '-26px', display: 'inline-block', verticalAlign: 'middle'}} />
                <img src="/images/U.png" alt="U" style={{height: '28px', marginRight: '-26px', display: 'inline-block', verticalAlign: 'middle'}} />
                <img src="/images/R.png" alt="R" style={{height: '28px', marginRight: '-26px', display: 'inline-block', verticalAlign: 'middle'}} />
                <img src="/images/E.png" alt="E" style={{height: '28px', marginRight: '-26px', display: 'inline-block', verticalAlign: 'middle'}} />
                <img src="/images/N.png" alt="N" style={{height: '28px', marginRight: '-26px', display: 'inline-block', verticalAlign: 'middle'}} />
                <img src="/images/C.png" alt="C" style={{height: '28px', marginRight: '-26px', display: 'inline-block', verticalAlign: 'middle'}} />
                <img src="/images/E.png" alt="E" style={{height: '28px', marginRight: '-26px', display: 'inline-block', verticalAlign: 'middle'}} />
                <img src="/images/PIPE.png" alt="|" style={{height: '28px', marginRight: '-26px', display: 'inline-block', verticalAlign: 'middle'}} />
                <img src="/images/R.png" alt="R" style={{height: '28px', marginRight: '-26px', display: 'inline-block', verticalAlign: 'middle'}} />
                <img src="/images/I.png" alt="I" style={{height: '28px', marginRight: '-26px', display: 'inline-block', verticalAlign: 'middle'}} />
                <img src="/images/P.png" alt="P" style={{height: '28px', marginRight: '-26px', display: 'inline-block', verticalAlign: 'middle'}} />
                <img src="/images/T.png" alt="T" style={{height: '28px', marginRight: '-26px', display: 'inline-block', verticalAlign: 'middle'}} />
                <img src="/images/O.png" alt="O" style={{height: '28px', marginRight: '-26px', display: 'inline-block', verticalAlign: 'middle'}} />
                <img src="/images/DOT.png" alt="." style={{height: '14px', marginRight: '-26px', display: 'inline-block', verticalAlign: 'middle'}} />
                <img src="/images/E.png" alt="E" style={{height: '28px', marginRight: '-26px', display: 'inline-block', verticalAlign: 'middle'}} />
                <img src="/images/T.png" alt="T" style={{height: '28px', marginRight: '-26px', display: 'inline-block', verticalAlign: 'middle'}} />
                <img src="/images/H.png" alt="H" style={{height: '28px', marginRight: '0', display: 'inline-block', verticalAlign: 'middle'}} />
              </div>
            </div>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex justify-end space-x-4 lg:space-x-5 col-span-8 lg:col-span-9">
            <a 
              href="#home" 
              onClick={(e) => handleNavClick(e, 'home')}
              className={`${
                activeSection === 'home' ? 'text-primary' : 'text-white'
              } hover:text-primary transition-colors font-medium text-lg whitespace-nowrap`}
            >
              Home
            </a>
            <a 
              href="#about" 
              onClick={(e) => handleNavClick(e, 'about')}
              className={`${
                activeSection === 'about' ? 'text-primary' : 'text-white'
              } hover:text-primary transition-colors font-medium text-lg whitespace-nowrap`}
            >
              About&nbsp;Me
            </a>
            <a 
              href="#portfolio" 
              onClick={(e) => handleNavClick(e, 'portfolio')}
              className={`${
                activeSection === 'portfolio' ? 'text-primary' : 'text-white'
              } hover:text-primary transition-colors font-medium text-lg whitespace-nowrap`}
            >
              Portfolio
            </a>
            <a 
              href="#services" 
              onClick={(e) => handleNavClick(e, 'services')}
              className={`${
                activeSection === 'services' ? 'text-primary' : 'text-white'
              } hover:text-primary transition-colors font-medium text-lg whitespace-nowrap`}
            >
              Services
            </a>
            <a 
              href="#contact" 
              onClick={(e) => handleNavClick(e, 'contact')}
              className={`${
                activeSection === 'contact' ? 'text-primary' : 'text-white'
              } hover:text-primary transition-colors font-medium text-lg whitespace-nowrap`}
            >
              Contact
            </a>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden absolute right-6">
            <button 
              onClick={toggleMobileMenu} 
              className="text-white focus:outline-none"
            >
              {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden mt-4 bg-[#1A1A2E] bg-opacity-95 p-4 rounded-lg animate-fadeIn">
            <div className="flex flex-col space-y-4" onClick={(e) => e.stopPropagation()}>
              <a 
                href="#home" 
                onClick={(e) => handleNavClick(e, 'home')}
                className={`${
                  activeSection === 'home' ? 'text-primary' : 'text-white'
                } hover:text-primary transition-colors text-lg font-medium whitespace-nowrap py-2`}
              >
                Home
              </a>
              <a 
                href="#about"
                onClick={(e) => handleNavClick(e, 'about')}
                className={`${
                  activeSection === 'about' ? 'text-primary' : 'text-white'
                } hover:text-primary transition-colors text-lg font-medium whitespace-nowrap py-2`}
              >
                About&nbsp;Me
              </a>
              <a 
                href="#portfolio" 
                onClick={(e) => handleNavClick(e, 'portfolio')}
                className={`${
                  activeSection === 'portfolio' ? 'text-primary' : 'text-white'
                } hover:text-primary transition-colors text-lg font-medium whitespace-nowrap py-2`}
              >
                Portfolio
              </a>
              <a 
                href="#services" 
                onClick={(e) => handleNavClick(e, 'services')}
                className={`${
                  activeSection === 'services' ? 'text-primary' : 'text-white'
                } hover:text-primary transition-colors text-lg font-medium whitespace-nowrap py-2`}
              >
                Services
              </a>
              <a 
                href="#contact" 
                onClick={(e) => handleNavClick(e, 'contact')}
                className={`${
                  activeSection === 'contact' ? 'text-primary' : 'text-white'
                } hover:text-primary transition-colors text-lg font-medium whitespace-nowrap py-2`}
              >
                Contact
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
