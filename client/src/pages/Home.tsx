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
  
  // Completely revised section detection approach
  useEffect(() => {
    const handleScroll = () => {
      // Define center point - using 40% from the top of the viewport as our "focus point"
      const viewportHeight = window.innerHeight;
      const focusPoint = viewportHeight * 0.4;
      
      // Get all our sections in order
      const sections = ['home', 'about', 'portfolio', 'services', 'contact'];
      
      // Find which section is most visible at our focus point
      let maxVisibility = -1;
      let mostVisibleSection = 'home'; // Default to home
      
      sections.forEach(sectionId => {
        const element = document.getElementById(sectionId);
        if (!element) return;
        
        const rect = element.getBoundingClientRect();
        
        // Skip sections that are completely out of view
        if (rect.bottom < 0 || rect.top > viewportHeight) return;
        
        // Calculate section visibility score
        let visibilityScore = 0;
        
        // Special rule for home section - always fully visible when at the top
        if (sectionId === 'home' && window.scrollY < 100) {
          visibilityScore = 1000;
        } 
        // Special rule for contact section - more weight when it's visible
        else if (sectionId === 'contact' && rect.top < viewportHeight) {
          // Calculate how close the section top is to our focus point
          const distance = Math.abs(rect.top - focusPoint);
          visibilityScore = 800 - distance;
          
          // Extra weight when contact is a significant portion of the viewport
          if (rect.height > viewportHeight / 3) {
            visibilityScore += 100;
          }
        }
        // Normal sections
        else {
          // Calculate how much of the section is visible, and how centered it is
          const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
          const centerPoint = rect.top + (rect.height / 2);
          const distanceFromFocus = Math.abs(centerPoint - focusPoint);
          
          // Score based on visibility and proximity to our focus point
          visibilityScore = (visibleHeight / rect.height) * 500 - distanceFromFocus;
        }
        
        // Update the most visible section
        if (visibilityScore > maxVisibility) {
          maxVisibility = visibilityScore;
          mostVisibleSection = sectionId;
        }
      });
      
      // Set the active section
      setActiveSection(mostVisibleSection);
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
