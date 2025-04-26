import VideoBackground from "@/components/VideoBackground";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import PortfolioSection from "@/components/PortfolioSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { useWheelNav } from "@/hooks/useWheelNav";
import { scrollToSection, getNextSectionId, getPrevSectionId } from "@/lib/utils";

export default function Home() {
  // Determine active section with a simpler approach temporarily
  const [activeSection, setActiveSection] = useState('home');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  
  // Wheel-based navigation is disabled but we keep the hook as a placeholder
  useWheelNav();
  
  // Simplified scroll listener to determine active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120; // Using consistent offset value
      
      // Get all sections - already imported from utils
      const sections = ['home', 'about', 'portfolio', 'services', 'contact'];
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (!element) continue;
        
        const rect = element.getBoundingClientRect();
        const sectionTop = rect.top + window.scrollY;
        const sectionBottom = sectionTop + rect.height;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          setActiveSection(section);
          break;
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initialize on mount
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Close mobile menu when clicking anywhere else
  useEffect(() => {
    const handleClickOutside = () => {
      if (showMobileMenu) {
        setShowMobileMenu(false);
      }
    };
    
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showMobileMenu]);
  
  // Navigation handlers
  const handleNavUp = () => {
    const prevSection = getPrevSectionId(activeSection);
    if (prevSection) {
      scrollToSection(prevSection);
    }
  };
  
  const handleNavDown = () => {
    const nextSection = getNextSectionId(activeSection);
    if (nextSection) {
      scrollToSection(nextSection);
    }
  };
  
  return (
    <div className="min-h-screen">
      <VideoBackground />
      <Navbar 
        activeSection={activeSection} 
        showMobileMenu={showMobileMenu}
        setShowMobileMenu={setShowMobileMenu}
      />
      
      {/* Fixed navigation buttons */}
      <div className="fixed right-6 bottom-24 z-50 flex flex-col gap-3">
        <button 
          onClick={handleNavUp} 
          className="nav-button p-3 bg-gradient-to-br from-purple-600/80 to-purple-800/80 hover:from-purple-500/90 hover:to-purple-700/90 text-white rounded-full shadow-lg backdrop-blur-sm transition-all"
          aria-label="Navigate to previous section"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
        
        <button 
          onClick={handleNavDown} 
          className="nav-button p-3 bg-gradient-to-br from-purple-600/80 to-purple-800/80 hover:from-purple-500/90 hover:to-purple-700/90 text-white rounded-full shadow-lg backdrop-blur-sm transition-all"
          aria-label="Navigate to next section"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
      
      <main className="flex flex-col">
        <HeroSection />
        <AboutSection />
        <PortfolioSection />
        <ServicesSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
