import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Menu, X } from "lucide-react";
import YellowLogo from "./YellowLogo";

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

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#1A1A2E] bg-opacity-80 backdrop-blur-md' : 'bg-opacity-0'
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-8">
          <div onClick={() => window.location.href = '/'} className="cursor-pointer mr-4">
            <YellowLogo />
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 flex-1 justify-end">
            <a 
              href="#home" 
              className={`${
                activeSection === 'home' ? 'text-primary' : 'text-white'
              } hover:text-primary transition-colors font-medium`}
            >
              Home
            </a>
            <a 
              href="#services" 
              className={`${
                activeSection === 'services' ? 'text-primary' : 'text-white'
              } hover:text-primary transition-colors font-medium`}
            >
              Services
            </a>
            <a 
              href="#portfolio" 
              className={`${
                activeSection === 'portfolio' ? 'text-primary' : 'text-white'
              } hover:text-primary transition-colors font-medium`}
            >
              Portfolio
            </a>
            <a 
              href="#about" 
              className={`${
                activeSection === 'about' ? 'text-primary' : 'text-white'
              } hover:text-primary transition-colors font-medium`}
            >
              About
            </a>
            <a 
              href="#contact" 
              className={`${
                activeSection === 'contact' ? 'text-primary' : 'text-white'
              } hover:text-primary transition-colors font-medium`}
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
                className={`${
                  activeSection === 'home' ? 'text-primary' : 'text-white'
                } hover:text-primary transition-colors`}
              >
                Home
              </a>
              <a 
                href="#services" 
                className={`${
                  activeSection === 'services' ? 'text-primary' : 'text-white'
                } hover:text-primary transition-colors`}
              >
                Services
              </a>
              <a 
                href="#portfolio" 
                className={`${
                  activeSection === 'portfolio' ? 'text-primary' : 'text-white'
                } hover:text-primary transition-colors`}
              >
                Portfolio
              </a>
              <a 
                href="#about" 
                className={`${
                  activeSection === 'about' ? 'text-primary' : 'text-white'
                } hover:text-primary transition-colors`}
              >
                About
              </a>
              <a 
                href="#contact" 
                className={`${
                  activeSection === 'contact' ? 'text-primary' : 'text-white'
                } hover:text-primary transition-colors`}
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
