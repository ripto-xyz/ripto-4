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
  
  // More robust section detection approach
  useEffect(() => {
    const handleScroll = () => {
      const viewportHeight = window.innerHeight;
      const scrollPosition = window.scrollY;
      const scrollThreshold = 80; // How many pixels to scroll before home is no longer active
      
      const sections = ['home', 'about', 'portfolio', 'services', 'contact'];
      
      // Special case for the top of the page - always highlight home
      if (scrollPosition < scrollThreshold) {
        setActiveSection('home');
        return;
      }
      
      // Explicit check for home - only active when truly at the top
      // This prevents home from staying highlighted when moving down the page
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        const aboutTop = aboutSection.offsetTop;
        // If we're more than 20% into the about section, never highlight home
        if (scrollPosition > aboutTop * 0.2) {
          // We're definitely not in home section
          if (activeSection === 'home') {
            // Find the next appropriate section
            for (const sectionId of sections) {
              if (sectionId === 'home') continue;
              const element = document.getElementById(sectionId);
              if (!element) continue;
              
              const sectionTop = element.offsetTop - 150;
              const sectionBottom = sectionTop + element.offsetHeight;
              
              if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                setActiveSection(sectionId);
                return;
              }
            }
          }
        }
      }
      
      // We'll use a different approach for section detection:
      // 1. Calculate how much of each section is visible in the viewport
      // 2. Weight it by how close the section's center is to our focus point
      // 3. Add special bonus for sections that cross the 1/3 point of viewport
      const focusPoint = viewportHeight * 0.33; // Focus point at 1/3 down the viewport
      let bestSection = '';
      let bestScore = -1;
      
      // Process sections in reverse order to give later sections precedence
      // when scores are close
      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionId = sections[i];
        const element = document.getElementById(sectionId);
        if (!element) continue;
        
        const rect = element.getBoundingClientRect();
        
        // Skip if completely out of view
        if (rect.bottom <= 0 || rect.top >= viewportHeight) continue;
        
        // Calculate visibility percentage (how much of the section is in view)
        const visibleTop = Math.max(0, rect.top);
        const visibleBottom = Math.min(viewportHeight, rect.bottom);
        const visibleHeight = visibleBottom - visibleTop;
        const visibilityPercentage = visibleHeight / rect.height;
        
        // Calculate how much of the viewport this section occupies
        const viewportOccupancy = visibleHeight / viewportHeight;
        
        // Calculate distance from the section's center to our focus point
        const sectionCenter = rect.top + (rect.height / 2);
        const distanceFromFocus = Math.abs(sectionCenter - focusPoint);
        const normalizedDistance = distanceFromFocus / viewportHeight; // 0-1 range
        
        // Calculate final score - weighing visibility heavily
        let score = (visibilityPercentage * 0.5) + (viewportOccupancy * 0.3) - (normalizedDistance * 0.2);
        
        // Boost score for whichever section contains the 1/3 viewport mark
        if (rect.top <= focusPoint && rect.bottom >= focusPoint) {
          score += 0.3;
        }
        
        // Special boosts for specific sections
        if (sectionId === 'portfolio') {
          // Portfolio gets a significant boost to help with the transition from about
          score += 0.25;
          
          // Extra boost for portfolio when it's just starting to appear
          if (rect.top < viewportHeight && rect.top > 0) {
            // The earlier in the viewport, the more boost it gets
            const earlyBoost = 0.3 * (1 - (rect.top / viewportHeight));
            score += earlyBoost;
          }
        } else if (sectionId === 'contact' && rect.top < viewportHeight) {
          // Contact gets a boost when it starts becoming visible
          score += 0.15;
        }
        
        // Debug logging - remove in production
        // console.log(`Section ${sectionId}: score=${score.toFixed(2)} (vis=${visibilityPercentage.toFixed(2)}, occ=${viewportOccupancy.toFixed(2)}, dist=${normalizedDistance.toFixed(2)})`);
        
        // Update best section (only if significantly better or it's later in the page)
        const THRESHOLD = 0.01; // Score must be better by this amount unless section is later
        if (score > bestScore + THRESHOLD || (score > bestScore - THRESHOLD && i < sections.indexOf(bestSection))) {
          bestScore = score;
          bestSection = sectionId;
        }
      }
      
      // If we couldn't find a visible section, fall back to traditional method
      // by finding which section we're scrolled into
      if (!bestSection) {
        for (const sectionId of sections) {
          const element = document.getElementById(sectionId);
          if (!element) continue;
          
          const top = element.offsetTop - 100;
          const bottom = top + element.offsetHeight;
          
          if (scrollPosition >= top && scrollPosition < bottom) {
            bestSection = sectionId;
            break;
          }
        }
      }
      
      // Only update if we have a valid section and it's different
      if (bestSection && bestSection !== activeSection) {
        setActiveSection(bestSection);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initialize on mount
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeSection]);
  
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
