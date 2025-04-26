import { useEffect, useRef, MutableRefObject } from 'react';
import { getNextSectionId, getPrevSectionId, scrollToSection, sectionIds } from '@/lib/utils';

/**
 * A robust hook for wheel-based navigation between sections.
 * Works with both mouse wheels and trackpads by detecting different input patterns.
 */
export function useWheelNavigation() {
  // Create refs inside the hook function, not inside useEffect
  const cumulativeDeltaRef = useRef<number>(0);
  const deltaResetTimeoutRef = useRef<number | null>(null);
  const isScrollingRef = useRef<boolean>(false);
  const lastScrollTimeRef = useRef<number>(0);
  
  useEffect(() => {
    // Use the refs instead of local variables
    // so they persist across renders
    
    const getActiveSection = (): string => {
      const scrollPosition = window.scrollY + 100; // 100px offset for navbar
      
      // Find the section that is currently in view
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const section = document.getElementById(sectionIds[i]);
        if (section && section.offsetTop <= scrollPosition) {
          return sectionIds[i];
        }
      }
      
      return sectionIds[0]; // Default to first section
    };
    
    const handleWheelEvent = (e: WheelEvent) => {
      // Always prevent default to take full control of scrolling
      e.preventDefault();
      
      const now = Date.now();
      const timeSinceLastScroll = now - lastScrollTimeRef.current;
      
      // Reset cumulative delta if it's been a while since the last wheel event
      if (timeSinceLastScroll > 200) {
        cumulativeDeltaRef.current = 0;
      }
      
      // If we're in a scrolling animation, ignore additional wheel events
      if (isScrollingRef.current) {
        return;
      }
      
      // Accumulate delta (for trackpad support)
      cumulativeDeltaRef.current += Math.abs(e.deltaY);
      
      // Clear any existing timeout
      if (deltaResetTimeoutRef.current !== null) {
        window.clearTimeout(deltaResetTimeoutRef.current);
      }
      
      // Set timeout to reset cumulative delta
      deltaResetTimeoutRef.current = window.setTimeout(() => {
        cumulativeDeltaRef.current = 0;
        deltaResetTimeoutRef.current = null;
      }, 150);
      
      // Detect device type and adjust behavior
      const isTrackpad = Math.abs(e.deltaY) < 50;
      const threshold = isTrackpad ? 80 : 40; // Higher threshold for trackpads
      
      // Only process if we've accumulated enough movement OR it's a big mouse wheel movement
      if (cumulativeDeltaRef.current < threshold && isTrackpad) {
        return;
      }
      
      // Set state to prevent multiple scrolls
      isScrollingRef.current = true;
      lastScrollTimeRef.current = now;
      cumulativeDeltaRef.current = 0;
      
      // Get current active section
      const activeSection = getActiveSection();
      
      // Determine direction and target section
      if (e.deltaY > 0) { // Scrolling DOWN
        const nextSection = getNextSectionId(activeSection);
        if (nextSection) {
          scrollToSection(nextSection);
        } else {
          // No next section, so we're not really scrolling
          isScrollingRef.current = false;
        }
      } else { // Scrolling UP
        // Special case: prevent going from About back to Home
        if (activeSection === 'about') {
          isScrollingRef.current = false;
          return;
        }
        
        const prevSection = getPrevSectionId(activeSection);
        if (prevSection) {
          scrollToSection(prevSection);
        } else {
          // No previous section, so we're not really scrolling
          isScrollingRef.current = false;
        }
      }
      
      // Reset scrolling state after animation completes
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 700);
    };
    
    // Use passive: false to allow preventDefault()
    window.addEventListener('wheel', handleWheelEvent, { passive: false });
    
    return () => {
      window.removeEventListener('wheel', handleWheelEvent);
      if (deltaResetTimeoutRef.current !== null) {
        window.clearTimeout(deltaResetTimeoutRef.current);
      }
    };
  }, []);
}