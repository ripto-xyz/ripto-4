import { useEffect, useRef } from 'react';
import { scrollToSection } from '@/lib/utils';

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
  
  // Manual section mapping (to bypass detection issues)
  const SECTION_ORDER = ['home', 'about', 'portfolio', 'services', 'contact'];

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
      
      // Get all section positions
      const homeEl = document.getElementById('home');
      const aboutEl = document.getElementById('about');
      const portfolioEl = document.getElementById('portfolio');
      const servicesEl = document.getElementById('services');
      const contactEl = document.getElementById('contact');
      
      // Get their positions
      const currentScroll = document.documentElement.scrollTop;
      const homeTop = homeEl ? homeEl.offsetTop : 0;
      const aboutTop = aboutEl ? aboutEl.offsetTop : 800;
      const portfolioTop = portfolioEl ? portfolioEl.offsetTop : 1700;
      const servicesTop = servicesEl ? servicesEl.offsetTop : 3800;
      const contactTop = contactEl ? contactEl.offsetTop : 5000;
      
      // Determine where we are based on scroll position
      let currentSectionIndex = 0;
      let currentSection = 'home';
      
      if (currentScroll < aboutTop - 100) {
        currentSectionIndex = 0; // home
        currentSection = 'home';
      } else if (currentScroll < portfolioTop - 100) {
        currentSectionIndex = 1; // about  
        currentSection = 'about';
      } else if (currentScroll < servicesTop - 100) {
        currentSectionIndex = 2; // portfolio
        currentSection = 'portfolio';
      } else if (currentScroll < contactTop - 100) {
        currentSectionIndex = 3; // services
        currentSection = 'services';
      } else {
        currentSectionIndex = 4; // contact
        currentSection = 'contact';
      }
      
      // Check if the portfolio section is in its cooldown period
      let isPortfolioInCooldown = false;
      if (currentSection === 'portfolio') {
        const PORTFOLIO_COOLDOWN_MS = 3000; // 3-second cooldown for portfolio section
        const timeSinceLastNavigation = timestamp - lastPortfolioNavigationTimeRef.current;
        isPortfolioInCooldown = timeSinceLastNavigation < PORTFOLIO_COOLDOWN_MS;
        
        if (isPortfolioInCooldown && isDebugMode) {
          console.log(`Portfolio in cooldown! ${Math.round((PORTFOLIO_COOLDOWN_MS - timeSinceLastNavigation)/1000)}s remaining`);
        }
      }
      
      // Check if the services section is in its cooldown period
      let isServicesInCooldown = false;
      if (currentSection === 'services') {
        const SERVICES_COOLDOWN_MS = 3000; // 3-second cooldown for services section
        const timeSinceLastNavigation = timestamp - lastServicesNavigationTimeRef.current;
        isServicesInCooldown = timeSinceLastNavigation < SERVICES_COOLDOWN_MS;
        
        if (isServicesInCooldown && isDebugMode) {
          console.log(`Services in cooldown! ${Math.round((SERVICES_COOLDOWN_MS - timeSinceLastNavigation)/1000)}s remaining`);
        }
      }
      
      // Set appropriate threshold based on section and cooldown status
      let threshold;
      if (currentSection === 'portfolio') {
        if (isPortfolioInCooldown) {
          // Much higher threshold during the cooldown period
          threshold = isLikelyTrackpad ? 600 : 350; // Increased for less sensitivity
        } else {
          // Standard threshold for portfolio without cooldown
          threshold = isLikelyTrackpad ? 350 : 200; // Increased for less sensitivity
        }
      } else if (currentSection === 'services') {
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
      
      // Debug logging
      if (isDebugMode) {
        console.log(
          `Position-based section: ${currentSection} (index ${currentSectionIndex}), ` +
          `Device: ${isLikelyTrackpad ? 'trackpad' : 'mouse'}, ` + 
          `Delta: ${Math.round(e.deltaY)}, ` +
          `Threshold: ${threshold}, ` + 
          `Accumulated: ${Math.round(accumulatedDeltaRef.current)}`
        );
        console.log(`Current scroll: ${currentScroll}, aboutTop: ${aboutTop}, portfolioTop: ${portfolioTop}`);
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
      if (currentSection === 'portfolio') {
        lastPortfolioNavigationTimeRef.current = timestamp;
      } else if (currentSection === 'services') {
        lastServicesNavigationTimeRef.current = timestamp;
      }
      
      // Now use direct section mapping
      if (e.deltaY > 0) {
        // Scrolling DOWN - go to next section
        if (currentSectionIndex < SECTION_ORDER.length - 1) {
          const nextSection = SECTION_ORDER[currentSectionIndex + 1];
          
          window.scrollTo({ top: window.scrollY });
          scrollToSection(nextSection);
        } else {
          isScrollingRef.current = false;
        }
      } else {
        // Scrolling UP - go to previous section
        
        // SPECIAL OVERRIDE: If scrolling from portfolio, ALWAYS go to about
        if (currentSection === 'portfolio') {
          window.scrollTo({ top: window.scrollY });
          scrollToSection('about');
        }
        // If in between portfolio and services
        else if (currentScroll >= portfolioTop && currentScroll < servicesTop) {
          window.scrollTo({ top: window.scrollY }); 
          scrollToSection('about');
        }
        else if (currentSectionIndex > 0) {
          const prevSection = SECTION_ORDER[currentSectionIndex - 1];
          
          window.scrollTo({ top: window.scrollY });
          scrollToSection(prevSection);
        } else {
          isScrollingRef.current = false;
        }
      }
      
      // Reset scrolling state after animation completes
      let cooldownTime;
      if (currentSection === 'portfolio') {
        cooldownTime = 1000; // Longer cooldown for portfolio
      } else if (currentSection === 'services') {
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