import { useEffect, useRef } from 'react';
import { getNextSectionId, getPrevSectionId, scrollToSection, sectionIds } from '@/lib/utils';

/**
 * Robust hook for section-to-section navigation using mouse wheel or trackpad.
 * Features:
 * - Detects trackpad vs mouse wheel
 * - Special handling for portfolio section with 3-second cooldown
 * - Accumulates delta values for better trackpad handling
 * - Prevents accidental navigation with various thresholds
 * - Can be disabled for Firefox browsers
 * 
 * @param disableForFirefox - Whether to disable wheel navigation for Firefox (defaults to false)
 */
export function useWheelNav(disableForFirefox = false) {
  // State refs to persist across renders (simplified for home->about navigation only)
  const isScrollingRef = useRef(false);
  const lastScrollTimeRef = useRef(0);
  const accumulatedDeltaRef = useRef(0);
  
  // Debug flag - set to false for production
  const isDebugMode = false;

  useEffect(() => {
    // If this hook should be disabled for Firefox, check if we're on Firefox
    if (disableForFirefox) {
      // Check if we're on Firefox
      const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
      if (isFirefox) {
        // Don't set up the wheel handler on Firefox
        return;
      }
    }
    
    // Get the current active section based on scroll position
    const getActiveSection = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      // Find which section contains the middle of the viewport
      for (const sectionId of sectionIds) {
        const section = document.getElementById(sectionId);
        if (!section) continue;
        
        const rect = section.getBoundingClientRect();
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + rect.height;
        
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
      
      // Get current timestamp for various time calculations
      const timestamp = Date.now();
      const timeSinceLastScroll = timestamp - lastScrollTimeRef.current;
      
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
      
      // Simple threshold for home to about navigation only
      const threshold = isLikelyTrackpad ? 100 : 50;
      
      // Only process if accumulated delta is big enough
      if (accumulatedDeltaRef.current < threshold) {
        return;
      }
      
      // Prevent default scrolling
      e.preventDefault();
      
      // Mark as scrolling to prevent additional processing
      isScrollingRef.current = true;
      lastScrollTimeRef.current = timestamp;
      accumulatedDeltaRef.current = 0;
      
      // No special timestamp tracking needed for simple home->about navigation
      
      // Only allow navigation from home to about section
      if (e.deltaY > 0 && activeSection === 'home') {
        // Scrolling DOWN from home - go to about section only
        scrollToSection('about');
      } else {
        // No navigation allowed for any other sections
        isScrollingRef.current = false;
      }
      
      // Reset scrolling state after animation completes (simple cooldown for home->about)
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 700);
    };
    
    // Add wheel event listener with passive: false to allow preventDefault
    window.addEventListener('wheel', handleWheel, { passive: false });
    
    // Cleanup
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [disableForFirefox]);
}