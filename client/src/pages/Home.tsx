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

export default function Home() {
  // Determine active section with a simpler approach temporarily
  const [activeSection, setActiveSection] = useState('home');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isFirefox, setIsFirefox] = useState(false);
  
  // Check if the browser is Firefox
  useEffect(() => {
    const firefoxDetected = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    setIsFirefox(firefoxDetected);
    
    // Apply Firefox-specific CSS
    if (firefoxDetected) {
      document.body.classList.add('firefox-browser');
      
      // Disable smooth scroll behavior on Firefox
      const style = document.createElement('style');
      style.textContent = `
        html {
          scroll-behavior: auto !important;
        }
        body {
          overflow-y: auto !important;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);
  
  // Use wheel navigation hook, but it will check for Firefox internally
  useWheelNav(isFirefox);
  
  // Improved scroll listener to determine active section
  useEffect(() => {
    const handleScroll = () => {
      // Calculate viewport height and scroll position 
      const windowHeight = window.innerHeight;
      const scrollPosition = window.scrollY + windowHeight * 0.35; // Check position 35% down the viewport
      
      // Special case: check if we're at the bottom of the page (contact section)
      const isAtBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
      if (isAtBottom) {
        setActiveSection('contact');
        return;
      }
      
      // Get all sections
      const sections = ['home', 'about', 'portfolio', 'services', 'contact'];
      
      // Start from the last section (contact) and work backwards
      // This helps when sections are close together - the last one gets precedence
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const element = document.getElementById(section);
        if (!element) continue;
        
        const rect = element.getBoundingClientRect();
        const sectionTop = rect.top + window.scrollY;
        const sectionBottom = sectionTop + rect.height;
        
        // Special handling for contact section - make it activate sooner
        const threshold = section === 'contact' ? windowHeight * 0.2 : 0;
        
        if (scrollPosition >= sectionTop - threshold && scrollPosition < sectionBottom) {
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
  
  return (
    <div className="min-h-screen">
      <VideoBackground />
      <Navbar 
        activeSection={activeSection} 
        showMobileMenu={showMobileMenu}
        setShowMobileMenu={setShowMobileMenu}
      />
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
