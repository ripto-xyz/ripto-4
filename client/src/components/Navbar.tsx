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
        isScrolled ? 'bg-[#1A1A2E] bg-opacity-80 backdrop-blur-md' : 'bg-opacity-0'
      }`}
    >
      <div className="container mx-auto px-2 py-4">
        <div className="flex items-center justify-between gap-2">
          <div onClick={(e) => handleNavClick(e, 'home')} className="cursor-pointer flex-shrink-0 mr-8">
            <SpyroLogo />
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-4 lg:space-x-6 flex-1 justify-end">
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
          <div className="md:hidden">
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
