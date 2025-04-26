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

  useEffect(() => {
    // Section-specific settings to control scroll sensitivity
    const sectionSettings = {
      'home': { 
        threshold: { trackpad: 80, wheel: 40 }, 
        resetTime: 200, 
        scrollDelay: 700 
      },
      'about': { 
        threshold: { trackpad: 80, wheel: 40 }, 
        resetTime: 200, 
        scrollDelay: 700 
      },
      'portfolio': { 
        threshold: { trackpad: 250, wheel: 150 }, // Higher values = less sensitive
        resetTime: 400,                           // Longer time before resetting delta
        scrollDelay: 1100                         // Longer animation delay
      },
      'services': { 
        threshold: { trackpad: 250, wheel: 150 }, 
        resetTime: 400, 
        scrollDelay: 1100 
      },
      'contact': { 
        threshold: { trackpad: 80, wheel: 40 }, 
        resetTime: 200, 
        scrollDelay: 700 
      }
    };
    
    // Default settings if section not found
    const defaultSettings = {
      threshold: { trackpad: 80, wheel: 40 },
      resetTime: 200,
      scrollDelay: 700
    };

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
      
      // Get current section to determine threshold
      const currentSection = getActiveSection();
      
      // Get settings for current section
      const settings = sectionSettings[currentSection] || defaultSettings;
      
      // Reset accumulated delta if it's been a while - using section-specific reset time
      if (timeSinceLastScroll > settings.resetTime) {
        accumulatedDeltaRef.current = 0;
      }
      
      // Accumulate delta values (helpful for trackpads that send lots of small deltas)
      accumulatedDeltaRef.current += Math.abs(e.deltaY);
      
      // Detect if this is likely a trackpad or mouse wheel
      const isLikelyTrackpad = Math.abs(e.deltaY) < 40;
      
      // Get appropriate threshold based on input device and section
      const threshold = isLikelyTrackpad ? 
        settings.threshold.trackpad : 
        settings.threshold.wheel;
      
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
      
      // Reset scrolling state after animation completes - using section-specific delay
      setTimeout(() => {
        isScrollingRef.current = false;
      }, settings.scrollDelay);
    };
    
    // Add wheel event listener with passive: false to allow preventDefault
    window.addEventListener('wheel', handleWheel, { passive: false });
    
    // Cleanup
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);
}