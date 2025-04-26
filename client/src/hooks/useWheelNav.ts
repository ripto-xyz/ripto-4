import { useEffect, useRef } from 'react';
import { getNextSectionId, getPrevSectionId, scrollToSection, sectionIds } from '@/lib/utils';

/**
 * A simple but robust hook for section-to-section navigation using mouse wheel or trackpad.
 * Handles both devices by accounting for their different scroll characteristics.
 * Features reduced sensitivity for portfolio and services sections to allow better reading.
 */
export function useWheelNav() {
  // State refs to persist across renders
  const isScrollingRef = useRef(false);
  const lastScrollTimeRef = useRef(0);
  const accumulatedDeltaRef = useRef(0);
  const isInContentSectionRef = useRef(false);

  useEffect(() => {
    const getActiveSection = () => {
      // Use more of the viewport to determine active section
      const scrollPosition = window.scrollY + window.innerHeight / 2; 
      
      // Find which section contains the middle of the viewport
      for (const sectionId of sectionIds) {
        const section = document.getElementById(sectionId);
        if (!section) continue;
        
        const rect = section.getBoundingClientRect();
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + rect.height;
        
        // If the middle of the viewport is within this section
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          // Set the content section ref to true if we're in portfolio or services
          isInContentSectionRef.current = sectionId === 'portfolio' || sectionId === 'services';
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
      
      // Set the content section ref based on fallback section
      isInContentSectionRef.current = closestSection === 'portfolio' || closestSection === 'services';
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
      // Longer reset time for content sections to make scrolling less sensitive
      const resetTime = isInContentSectionRef.current ? 400 : 200;
      if (timeSinceLastScroll > resetTime) {
        accumulatedDeltaRef.current = 0;
      }
      
      // Accumulate delta values (helpful for trackpads that send lots of small deltas)
      accumulatedDeltaRef.current += Math.abs(e.deltaY);
      
      // Detect if this is likely a trackpad or mouse wheel
      const isLikelyTrackpad = Math.abs(e.deltaY) < 40;
      
      // Get current section to determine threshold
      const currentSection = getActiveSection();
      
      // Different thresholds based on input device and section
      // Higher threshold for portfolio and services sections to make navigation less sensitive
      let threshold = isLikelyTrackpad ? 100 : 50;
      
      // Higher threshold for portfolio and services sections (content-heavy areas)
      if (currentSection === 'portfolio' || currentSection === 'services') {
        threshold = isLikelyTrackpad ? 200 : 120; // Double the standard threshold
      }
      
      // Only process if accumulated delta is big enough
      if (accumulatedDeltaRef.current < threshold) {
        return;
      }
      
      // Prevent default scrolling
      e.preventDefault();
      
      // Mark as scrolling to prevent additional processing
      isScrollingRef.current = true;
      lastScrollTimeRef.current = now;
      accumulatedDeltaRef.current = 0;
      
      if (e.deltaY > 0) {
        // Scrolling DOWN - go to next section
        const nextSection = getNextSectionId(currentSection);
        if (nextSection) {
          scrollToSection(nextSection);
        } else {
          // No next section available
          isScrollingRef.current = false;
        }
      } else {
        // Scrolling UP - go to previous section
        const prevSection = getPrevSectionId(currentSection);
        if (prevSection) {
          scrollToSection(prevSection);
        } else {
          // No previous section available
          isScrollingRef.current = false;
        }
      }
      
      // Reset scrolling state after animation completes
      // Use longer delay for portfolio and services sections
      const resetDelay = isInContentSectionRef.current ? 1000 : 700;
      setTimeout(() => {
        isScrollingRef.current = false;
      }, resetDelay);
    };
    
    // Add wheel event listener with passive: false to allow preventDefault
    window.addEventListener('wheel', handleWheel, { passive: false });
    
    // Cleanup
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);
}