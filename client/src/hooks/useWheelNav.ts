import { useEffect, useRef } from 'react';
import { getNextSectionId, getPrevSectionId, scrollToSection, sectionIds } from '@/lib/utils';

/**
 * A simple but robust hook for section-to-section navigation using mouse wheel or trackpad.
 * Handles both devices by accounting for their different scroll characteristics.
 */
export function useWheelNav() {
  // State refs to persist across renders
  const isScrollingRef = useRef(false);
  const lastScrollTimeRef = useRef(0);
  const accumulatedDeltaRef = useRef(0);
  const scrollWindowStartTimeRef = useRef(0);
  const scrollCountInWindowRef = useRef(0);
  
  // Debug flag - useful for troubleshooting wheel navigation
  const isDebugMode = true; // Temporarily enable debug mode

  useEffect(() => {
    const getActiveSection = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2; // Use the middle of the viewport
      
      // Find which section contains the middle of the viewport
      for (const sectionId of sectionIds) {
        const section = document.getElementById(sectionId);
        if (!section) continue;
        
        const rect = section.getBoundingClientRect();
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + rect.height;
        
        // If the middle of the viewport is within this section
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          return sectionId;
        }
      }
      
      // Fallback: use the closest section based on position
      let closestSection = sectionIds[0];
      let closestDistance = Infinity;
      
      for (const sectionId of sectionIds) {
        const section = document.getElementById(sectionId);
        if (!section) continue;
        
        const distance = Math.abs(section.offsetTop - scrollPosition);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestSection = sectionId;
        }
      }
      
      return closestSection;
    };

    // The wheel event handler
    const handleWheel = (e: WheelEvent) => {
      // Skip processing if already in a scroll animation
      if (isScrollingRef.current) {
        e.preventDefault();
        return;
      }
      
      const now = Date.now();
      const timeSinceLastScroll = now - lastScrollTimeRef.current;
      
      // Reset accumulated delta if it's been a while
      if (timeSinceLastScroll > 200) {
        accumulatedDeltaRef.current = 0;
      }
      
      // Accumulate delta values (helpful for trackpads that send lots of small deltas)
      accumulatedDeltaRef.current += Math.abs(e.deltaY);
      
      // Detect if this is likely a trackpad or mouse wheel
      const isLikelyTrackpad = Math.abs(e.deltaY) < 40;
      
      // Get current active section
      const activeSection = getActiveSection();
      
      // Special handling for portfolio section - count scrolls within a time window
      if (activeSection === 'portfolio') {
        const TIME_WINDOW_MS = 500; // 500ms time window
        const now = Date.now();
        
        // Start a new time window if needed
        if (now - scrollWindowStartTimeRef.current > TIME_WINDOW_MS) {
          scrollWindowStartTimeRef.current = now;
          scrollCountInWindowRef.current = 1;
        } else {
          // Still in the same time window, increment the count
          scrollCountInWindowRef.current++;
        }
        
        // If this is just the first or second scroll event in a new time window, 
        // we'll require more scrolling before triggering navigation
        if (scrollCountInWindowRef.current <= 2) {
          accumulatedDeltaRef.current = Math.min(accumulatedDeltaRef.current, 50);
        }
      }
      
      // Higher thresholds for portfolio and services sections to require more deliberate swipes
      let threshold;
      if (activeSection === 'portfolio') {
        // Even higher threshold specifically for portfolio section
        threshold = isLikelyTrackpad ? 250 : 120; // Much higher threshold for portfolio
      } else if (activeSection === 'services') {
        // Moderate threshold for services section
        threshold = isLikelyTrackpad ? 150 : 80;
      } else {
        // Normal threshold for other sections
        threshold = isLikelyTrackpad ? 100 : 50;
      }
      
      // Enhanced debug logging
      if (isDebugMode) {
        const scrollInfo = activeSection === 'portfolio' 
          ? `, Scroll count: ${scrollCountInWindowRef.current}, Window age: ${Date.now() - scrollWindowStartTimeRef.current}ms` 
          : '';
          
        console.log(
          `Section: ${activeSection}${scrollInfo}, ` +
          `Device: ${isLikelyTrackpad ? 'trackpad' : 'mouse'}, ` + 
          `Delta: ${Math.round(e.deltaY)}, ` +
          `Threshold: ${threshold}, ` + 
          `Accumulated: ${Math.round(accumulatedDeltaRef.current)}`
        );
      }
      
      // Only process if accumulated delta is big enough
      if (accumulatedDeltaRef.current < threshold) {
        return;
      }
      
      // Prevent default scrolling
      e.preventDefault();
      
      // Mark as scrolling to prevent additional processing
      isScrollingRef.current = true;
      const currentTime = Date.now();
      lastScrollTimeRef.current = currentTime;
      accumulatedDeltaRef.current = 0;
      
      // Using activeSection for navigation
      
      if (e.deltaY > 0) {
        // Scrolling DOWN - go to next section
        const nextSection = getNextSectionId(activeSection);
        if (nextSection) {
          scrollToSection(nextSection);
        } else {
          // No next section available
          isScrollingRef.current = false;
        }
      } else {
        // Scrolling UP - go to previous section
        const prevSection = getPrevSectionId(activeSection);
        if (prevSection) {
          scrollToSection(prevSection);
        } else {
          // No previous section available
          isScrollingRef.current = false;
        }
      }
      
      // Reset scrolling state after animation completes
      // Use even longer cooldown for portfolio section specifically
      let cooldownTime;
      if (activeSection === 'portfolio') {
        cooldownTime = 1000; // Much longer cooldown for portfolio
      } else if (activeSection === 'services') {
        cooldownTime = 800; // Moderate cooldown for services
      } else {
        cooldownTime = 700; // Normal cooldown for other sections
      }
      setTimeout(() => {
        isScrollingRef.current = false;
      }, cooldownTime);
    };
    
    // Add wheel event listener with passive: false to allow preventDefault
    window.addEventListener('wheel', handleWheel, { passive: false });
    
    // Cleanup
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);
}