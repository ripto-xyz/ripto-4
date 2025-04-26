import { useEffect, useRef } from 'react';
import { getNextSectionId, getPrevSectionId, scrollToSection, sectionIds } from '@/lib/utils';

/**
 * Robust hook for section-to-section navigation using mouse wheel or trackpad.
 * Features:
 * - Detects trackpad vs mouse wheel
 * - Special handling for portfolio section with 3-second cooldown
 * - Accumulates delta values for better trackpad handling
 * - Prevents accidental navigation with various thresholds
 */
export function useWheelNav() {
  // State refs to persist across renders
  const isScrollingRef = useRef(false);
  const lastScrollTimeRef = useRef(0);
  const accumulatedDeltaRef = useRef(0);
  const scrollWindowStartTimeRef = useRef(0);
  const scrollCountInWindowRef = useRef(0);
  const lastPortfolioNavigationTimeRef = useRef(0); // When we last navigated from portfolio
  
  // Debug flag - set to true for console logging
  const isDebugMode = true;

  useEffect(() => {
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
      
      // Handle time windows for accumulated scrolls (used by portfolio section)
      if (activeSection === 'portfolio') {
        const TIME_WINDOW_MS = 500; // 500ms time window
        
        // Start a new time window if needed
        if (timestamp - scrollWindowStartTimeRef.current > TIME_WINDOW_MS) {
          scrollWindowStartTimeRef.current = timestamp;
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
      
      // Check if the portfolio section is in its cooldown period
      let isPortfolioInCooldown = false;
      if (activeSection === 'portfolio') {
        const PORTFOLIO_COOLDOWN_MS = 3000; // 3-second cooldown for portfolio section
        const timeSinceLastNavigation = timestamp - lastPortfolioNavigationTimeRef.current;
        isPortfolioInCooldown = timeSinceLastNavigation < PORTFOLIO_COOLDOWN_MS;
        
        if (isPortfolioInCooldown && isDebugMode) {
          console.log(`Portfolio in cooldown! ${Math.round((PORTFOLIO_COOLDOWN_MS - timeSinceLastNavigation)/1000)}s remaining`);
        }
      }
      
      // Set appropriate threshold based on section and cooldown status
      let threshold;
      if (activeSection === 'portfolio') {
        if (isPortfolioInCooldown) {
          // Much higher threshold during the cooldown period
          threshold = isLikelyTrackpad ? 500 : 250;
        } else {
          // Standard threshold for portfolio without cooldown
          threshold = isLikelyTrackpad ? 250 : 120;
        }
      } else if (activeSection === 'services') {
        // Moderate threshold for services
        threshold = isLikelyTrackpad ? 150 : 80;
      } else {
        // Normal threshold for other sections
        threshold = isLikelyTrackpad ? 100 : 50;
      }
      
      // Enhanced debug logging
      if (isDebugMode) {
        const scrollInfo = activeSection === 'portfolio' 
          ? `, Scroll count: ${scrollCountInWindowRef.current}, Window age: ${timestamp - scrollWindowStartTimeRef.current}ms` 
          : '';
          
        console.log(
          `Section: ${activeSection}${scrollInfo}, ` +
          `Device: ${isLikelyTrackpad ? 'trackpad' : 'mouse'}, ` + 
          `Delta: ${Math.round(e.deltaY)}, ` +
          `Threshold: ${threshold}, ` + 
          `Accumulated: ${Math.round(accumulatedDeltaRef.current)}` +
          (isPortfolioInCooldown ? ' [COOLDOWN]' : '')
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
      lastScrollTimeRef.current = timestamp;
      accumulatedDeltaRef.current = 0;
      
      // If navigating from the portfolio section, update the timestamp
      if (activeSection === 'portfolio') {
        lastPortfolioNavigationTimeRef.current = timestamp;
      }
      
      // Navigate to the next/previous section
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
      let cooldownTime;
      if (activeSection === 'portfolio') {
        cooldownTime = 1000; // Longer cooldown for portfolio
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