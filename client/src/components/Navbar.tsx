import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { scrollToSection } from "@/lib/utils";
import SpyroLogo from "./SpyroLogo";

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
      <div className="max-w-[1400px] mx-auto px-2 sm:px-6 py-4">
        {/* Complete redesign for mobile */}
        <div className="flex flex-nowrap items-center justify-between w-full">
          {/* Logo container larger to fit better with hamburger menu */}
          <div onClick={(e) => handleNavClick(e, 'home')} 
               className="cursor-pointer overflow-visible"
               style={{ 
                 maxWidth: '80%', 
                 transform: 'scale(0.75)',
                 transformOrigin: 'left center',
                 flex: '0 0 auto'
               }}>
            <SpyroLogo className="overflow-visible" />
          </div>
          
          {/* Desktop Menu - will shrink first before wrapping */}
          <div className="hidden md:flex justify-end space-x-2 lg:space-x-4">
            <a 
              href="#home" 
              onClick={(e) => handleNavClick(e, 'home')}
              className={`${
                activeSection === 'home' ? 'text-primary' : 'text-white'
              } hover:text-primary transition-colors font-medium text-base lg:text-lg whitespace-nowrap`}
            >
              Home
            </a>
            <a 
              href="#about" 
              onClick={(e) => handleNavClick(e, 'about')}
              className={`${
                activeSection === 'about' ? 'text-primary' : 'text-white'
              } hover:text-primary transition-colors font-medium text-base lg:text-lg whitespace-nowrap`}
            >
              About&nbsp;Me
            </a>
            <a 
              href="#portfolio" 
              onClick={(e) => handleNavClick(e, 'portfolio')}
              className={`${
                activeSection === 'portfolio' ? 'text-primary' : 'text-white'
              } hover:text-primary transition-colors font-medium text-base lg:text-lg whitespace-nowrap`}
            >
              Portfolio
            </a>
            <a 
              href="#services" 
              onClick={(e) => handleNavClick(e, 'services')}
              className={`${
                activeSection === 'services' ? 'text-primary' : 'text-white'
              } hover:text-primary transition-colors font-medium text-base lg:text-lg whitespace-nowrap`}
            >
              Services
            </a>
            <a 
              href="#contact" 
              onClick={(e) => handleNavClick(e, 'contact')}
              className={`${
                activeSection === 'contact' ? 'text-primary' : 'text-white'
              } hover:text-primary transition-colors font-medium text-base lg:text-lg whitespace-nowrap`}
            >
              Contact
            </a>
          </div>
          
          {/* Mobile menu button - adjusted position for better balance with larger logo */}
          <div className="flex md:hidden bg-opacity-80 bg-[#1A1A2E] rounded-md absolute right-1 top-4 p-2">
            <button 
              onClick={toggleMobileMenu} 
              className="text-white focus:outline-none"
              style={{ width: '34px', height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              {showMobileMenu ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu - now full width and below the header */}
        {showMobileMenu && (
          <div className="md:hidden w-full mt-4 bg-[#1A1A2E] bg-opacity-95 p-4 rounded-lg animate-fadeIn">
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
