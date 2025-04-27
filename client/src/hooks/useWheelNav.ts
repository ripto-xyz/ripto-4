import { useEffect, useRef } from 'react';
import { getNextSectionId, getPrevSectionId, scrollToSection, sectionIds } from '@/lib/utils';

/**
 * Simplified wheel navigation for section-to-section scrolling.
 * - Uses higher thresholds for more deliberate scrolling
 * - Special handling for portfolio section with 3-second cooldown
 * - Increased sensitivity for services section to fix stopping issue
 */
export function useWheelNav() {
  // State refs to track scrolling state
  const isScrollingRef = useRef(false);
  const lastScrollTimeRef = useRef(0);
  const accumulatedDeltaRef = useRef(0);
  const lastPortfolioNavigationTimeRef = useRef(0);
  const lastServicesNavigationTimeRef = useRef(0);
  
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Skip if already scrolling
      if (isScrollingRef.current) {
        e.preventDefault();
        return;
      }
      
      // Basic scroll time calculation
      const now = Date.now();
      const timeSinceLastScroll = now - lastScrollTimeRef.current;
      
      // Reset accumulated delta after some time
      if (timeSinceLastScroll > 200) {
        accumulatedDeltaRef.current = 0;
      }
      
      // Add current scroll to accumulated value
      accumulatedDeltaRef.current += Math.abs(e.deltaY);
      
      // Determine device type
      const isTrackpad = Math.abs(e.deltaY) < 40;
      
      // Find current section
      const sections = {};
      for (const id of sectionIds) {
        sections[id] = document.getElementById(id);
      }
      
      // Get scroll position 
      const scrollY = window.scrollY;
      const viewportMid = scrollY + window.innerHeight / 2;
      
      // Determine current section
      let currentSection = 'home';  // Default
      
      for (const id of sectionIds) {
        const section = sections[id];
        if (!section) continue;
        
        const top = section.offsetTop;
        const bottom = top + section.clientHeight;
        
        // Special handling for services section - give it a larger detection area
        if (id === 'services') {
          const extendedTop = top - 100;
          const extendedBottom = bottom + 150;
          
          if (viewportMid >= extendedTop && viewportMid < extendedBottom) {
            currentSection = id;
            break;
          }
        } 
        // Normal detection for other sections
        else if (viewportMid >= top && viewportMid < bottom) {
          currentSection = id;
          break;
        }
      }
      
      // Check cooldown periods
      const portfolioCooldownMS = 3000;
      const servicesCooldownMS = 2500;
      
      const portfolioCooldown = 
        currentSection === 'portfolio' && 
        (now - lastPortfolioNavigationTimeRef.current < portfolioCooldownMS);
        
      const servicesCooldown = 
        currentSection === 'services' && 
        (now - lastServicesNavigationTimeRef.current < servicesCooldownMS);
        
      // Set thresholds based on section and cooldown state
      let threshold;
      
      if (currentSection === 'portfolio') {
        threshold = portfolioCooldown 
          ? (isTrackpad ? 600 : 350)  // Higher during cooldown
          : (isTrackpad ? 350 : 200); // Normal portfolio threshold
      } 
      else if (currentSection === 'services') {
        threshold = servicesCooldown
          ? (isTrackpad ? 500 : 300)   // Much higher for services cooldown
          : (isTrackpad ? 400 : 250);  // Higher default for services
      }
      else {
        threshold = isTrackpad ? 100 : 50; // Normal threshold
      }
      
      // Check if threshold is exceeded
      if (accumulatedDeltaRef.current < threshold) {
        return;
      }
      
      // We've exceeded the threshold, prevent default scrolling
      e.preventDefault();
      
      // Update refs
      isScrollingRef.current = true;
      lastScrollTimeRef.current = now;
      accumulatedDeltaRef.current = 0;
      
      // Record navigation timestamps for cooldown
      if (currentSection === 'portfolio') {
        lastPortfolioNavigationTimeRef.current = now;
      } else if (currentSection === 'services') {
        lastServicesNavigationTimeRef.current = now;
      }
      
      // Determine direction and target section
      if (e.deltaY > 0) {
        // Scrolling DOWN
        const nextSection = getNextSectionId(currentSection);
        if (nextSection) {
          scrollToSection(nextSection);
        } else {
          isScrollingRef.current = false;
        }
      } else {
        // Scrolling UP
        const prevSection = getPrevSectionId(currentSection);
        if (prevSection) {
          scrollToSection(prevSection);
        } else {
          isScrollingRef.current = false;
        }
      }
      
      // Reset scrolling state after animation
      setTimeout(() => {
        isScrollingRef.current = false;
      }, currentSection === 'services' ? 1200 : 1000); // Longer cooldown for services
    };
    
    // Add wheel listener
    window.addEventListener('wheel', handleWheel, { passive: false });
    
    // Cleanup
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);
}