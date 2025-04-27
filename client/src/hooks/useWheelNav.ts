import { useEffect, useRef } from 'react';
import { getNextSectionId, getPrevSectionId, scrollToSection, sectionIds } from '@/lib/utils';

/**
 * Robust hook for section-to-section navigation using mouse wheel or trackpad.
 * Features:
 * - Detects trackpad vs mouse wheel
 * - Special handling for portfolio and services sections with 3-second cooldowns
 * - Accumulates delta values for better trackpad handling
 * - Prevents accidental navigation with various thresholds
 * - Can be disabled for Firefox browsers
 * 
 * @param disableForFirefox - Whether to disable wheel navigation for Firefox (defaults to false)
 */
export function useWheelNav(disableForFirefox = false) {
  // State refs to persist across renders
  const isScrollingRef = useRef(false);
  const lastScrollTimeRef = useRef(0);
  const accumulatedDeltaRef = useRef(0);
  const scrollWindowStartTimeRef = useRef(0);
  const scrollCountInWindowRef = useRef(0);
  const lastPortfolioNavigationTimeRef = useRef(0); // When we last navigated from portfolio
  const lastServicesNavigationTimeRef = useRef(0); // When we last navigated from services
  
  // Debug flag - set to true for troubleshooting
  const isDebugMode = true;

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
      // Use a point slightly above the center of the viewport for better detection of sections
      // This helps us correctly identify the About section when coming from Portfolio
      const scrollPosition = window.scrollY + window.innerHeight * 0.4;
      
      // Find which section contains our detection point
      for (const sectionId of sectionIds) {
        const section = document.getElementById(sectionId);
        if (!section) continue;
        
        const rect = section.getBoundingClientRect();
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + rect.height;
        
        // Use a slight bias for the portfolio-about transition
        let adjustedTop = sectionTop;
        let adjustedBottom = sectionBottom;
        
        // Portfolio section gets a slight expansion at the top
        if (sectionId === 'portfolio') {
          adjustedTop -= 50;
        }
        // About section gets a slight expansion at the bottom
        else if (sectionId === 'about') {
          adjustedBottom += 50;
        }
        
        if (scrollPosition >= adjustedTop && scrollPosition < adjustedBottom) {
          return sectionId;
        }
      }
      
      // Fallback: use the closest section based on position
      let closestSection = sectionIds[0];
      let closestDistance = Infinity;
      
      for (const sectionId of sectionIds) {
        const section = document.getElementById(sectionId);
        if (!section) continue;
        
        // Calculate distance with a bias favoring the section above
        // This helps with upward scrolling detection
        const bias = 0.2 * window.innerHeight; // 20% of viewport height
        const distance = Math.abs(section.offsetTop - scrollPosition) - 
                       (section.offsetTop < scrollPosition ? bias : 0);
        
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
      
      // Handle time windows for accumulated scrolls (only for portfolio section)
      if (activeSection === 'portfolio') {
        const TIME_WINDOW_MS = 600; // 600ms time window (increased from 500ms)
        
        // Start a new time window if needed
        if (timestamp - scrollWindowStartTimeRef.current > TIME_WINDOW_MS) {
          scrollWindowStartTimeRef.current = timestamp;
          scrollCountInWindowRef.current = 1;
        } else {
          // Still in the same time window, increment the count
          scrollCountInWindowRef.current++;
        }
        
        // For portfolio section: require more deliberate scrolling patterns
        if (scrollCountInWindowRef.current <= 3) { // Increased from 2 to 3 events needed
          // Significantly reduce the accumulated delta for the first few scroll events
          // This makes it much harder to trigger navigation with just a few quick scroll events
          accumulatedDeltaRef.current = Math.min(accumulatedDeltaRef.current, 40);
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
      
      // Check if the services section is in its cooldown period
      let isServicesInCooldown = false;
      if (activeSection === 'services') {
        const SERVICES_COOLDOWN_MS = 3000; // 3-second cooldown for services section
        const timeSinceLastNavigation = timestamp - lastServicesNavigationTimeRef.current;
        isServicesInCooldown = timeSinceLastNavigation < SERVICES_COOLDOWN_MS;
        
        if (isServicesInCooldown && isDebugMode) {
          console.log(`Services in cooldown! ${Math.round((SERVICES_COOLDOWN_MS - timeSinceLastNavigation)/1000)}s remaining`);
        }
      }
      
      // Set appropriate threshold based on section and cooldown status
      let threshold;
      if (activeSection === 'portfolio') {
        if (isPortfolioInCooldown) {
          // Much higher threshold during the cooldown period
          threshold = isLikelyTrackpad ? 600 : 350; // Increased for less sensitivity
        } else {
          // Standard threshold for portfolio without cooldown
          threshold = isLikelyTrackpad ? 350 : 200; // Increased for less sensitivity
        }
      } else if (activeSection === 'services') {
        if (isServicesInCooldown) {
          // Higher threshold during the cooldown period
          threshold = isLikelyTrackpad ? 400 : 200; // Restored to original value
        } else {
          // Standard threshold for services without cooldown
          threshold = isLikelyTrackpad ? 150 : 80; // Restored to original value
        }
      } else {
        // Normal threshold for other sections
        threshold = isLikelyTrackpad ? 100 : 50;
      }
      
      // Enhanced debug logging - but be careful not to cause runtime errors
      if (isDebugMode) {
        try {
          // Create additional info for portfolio section
          let scrollInfo = '';
          if (activeSection === 'portfolio') {
            scrollInfo = `, Scroll count: ${scrollCountInWindowRef.current}, Window age: ${timestamp - scrollWindowStartTimeRef.current}ms`;
          }
          
          // Create cooldown indicators
          let cooldownInfo = '';
          if (isPortfolioInCooldown) {
            cooldownInfo += ' [PORTFOLIO COOLDOWN]';
          }
          if (isServicesInCooldown) {
            cooldownInfo += ' [SERVICES COOLDOWN]';
          }
          
          // Log everything safely
          console.log(
            `Section: ${activeSection}${scrollInfo}, ` +
            `Device: ${isLikelyTrackpad ? 'trackpad' : 'mouse'}, ` + 
            `Delta: ${Math.round(e.deltaY)}, ` +
            `Threshold: ${threshold}, ` + 
            `Accumulated: ${Math.round(accumulatedDeltaRef.current)}${cooldownInfo}`
          );
        } catch (err) {
          // Silently fail if there are any errors in the debug logging
          console.log('Debug logging error, continuing navigation');
        }
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
      
      // Update timestamps for sections with cooldown periods
      if (activeSection === 'portfolio') {
        lastPortfolioNavigationTimeRef.current = timestamp;
      } else if (activeSection === 'services') {
        lastServicesNavigationTimeRef.current = timestamp;
      }
      
      // Add detailed debug logs
      if (isDebugMode) {
        // Get all section positions for debugging
        const portfolioElement = document.getElementById('portfolio');
        const aboutElement = document.getElementById('about');
        const servicesElement = document.getElementById('services');
        
        console.log(`Active section before navigation: ${activeSection}`);
        console.log(`Scroll position: ${document.documentElement.scrollTop}`);
        
        if (portfolioElement) {
          console.log(`Portfolio offsetTop: ${portfolioElement.offsetTop}`);
        }
        if (aboutElement) {
          console.log(`About offsetTop: ${aboutElement.offsetTop}`);
        }
        if (servicesElement) {
          console.log(`Services offsetTop: ${servicesElement.offsetTop}`);
        }
      }
      
      // Get references to portfolio and services sections for logic below
      const portfolioElement = document.getElementById('portfolio');
      const portfolioTop = portfolioElement ? portfolioElement.offsetTop : 0;
      
      if (e.deltaY > 0) {
        // Scrolling DOWN
        if (activeSection === 'portfolio') {
          // If we're in portfolio, ALWAYS go to services next
          window.scrollTo({ top: window.scrollY });
          scrollToSection('services');
        } else {
          // Otherwise, use normal navigation
          const nextSection = getNextSectionId(activeSection);
          if (nextSection) {
            window.scrollTo({ top: window.scrollY });
            scrollToSection(nextSection);
          } else {
            isScrollingRef.current = false;
          }
        }
      } else {
        // Scrolling UP
        if (activeSection === 'portfolio' || 
           (activeSection === 'services' && 
            document.documentElement.scrollTop <= portfolioTop + 50)) {
          // If we're in portfolio OR if we're in services but still near the portfolio area,
          // ALWAYS go to about
          window.scrollTo({ top: window.scrollY });
          scrollToSection('about');
        } else if (activeSection === 'services') {
          // If we're in services (and not near portfolio), go to portfolio
          window.scrollTo({ top: window.scrollY });
          scrollToSection('portfolio');
        } else {
          // For other sections, use normal navigation
          const prevSection = getPrevSectionId(activeSection);
          if (prevSection) {
            window.scrollTo({ top: window.scrollY });
            scrollToSection(prevSection);
          } else {
            isScrollingRef.current = false;
          }
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
  }, [disableForFirefox]);
}