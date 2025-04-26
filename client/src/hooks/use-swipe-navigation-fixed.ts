import { useEffect, useState, useRef } from 'react';
import { getNextSectionId, getPrevSectionId, scrollToSection, sectionIds } from '@/lib/utils';
import { useScrollSpy } from './use-scroll-spy';

// Minimum distance (in pixels) required to register a swipe
const MIN_SWIPE_DISTANCE = 100; // Increased to require a longer, more deliberate swipe

// Cooldown period to prevent rapid consecutive swipes (in milliseconds)
const SWIPE_COOLDOWN = 800;

// Threshold for wheel delta accumulation before triggering section change
const WHEEL_DELTA_THRESHOLD = 300; 

// Timeout to reset wheel accumulation if scrolling pauses
const WHEEL_TIMEOUT = 200;

export function useSwipeNavigation() {
  // State for touch tracking
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [isOnCooldown, setIsOnCooldown] = useState(false);
  
  // Refs for tracking various interactions
  const lastScrollTime = useRef<number>(0);
  const accumulatedWheelDelta = useRef<number>(0);
  const wheelTimeoutRef = useRef<number | null>(null);
  const isScrollingToSection = useRef<boolean>(false);
  
  // Get current active section using ScrollSpy
  const activeSection = useScrollSpy({ sectionIds, offset: 100 });

  // Helper to apply cooldown
  const applyCooldown = () => {
    setIsOnCooldown(true);
    setTimeout(() => setIsOnCooldown(false), SWIPE_COOLDOWN);
  };

  useEffect(() => {
    // TOUCH NAVIGATION FOR MOBILE
    const handleTouchStart = (e: TouchEvent) => {
      setTouchStartX(e.touches[0].clientX);
      setTouchStartY(e.touches[0].clientY);
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (touchStartY === null || touchStartX === null || isOnCooldown || isScrollingToSection.current) return;
      
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const distanceX = touchStartX - touchEndX;
      const distanceY = touchStartY - touchEndY;
      
      // Only consider vertical swipes (when Y movement is greater than X movement)
      // and only when the swipe is long enough (MIN_SWIPE_DISTANCE)
      if (Math.abs(distanceY) > Math.abs(distanceX) && Math.abs(distanceY) > MIN_SWIPE_DISTANCE) {
        if (distanceY > 0) {
          // Swipe up - go to next section
          const nextSection = getNextSectionId(activeSection);
          if (nextSection) {
            isScrollingToSection.current = true;
            scrollToSection(nextSection);
            applyCooldown();
            
            // Reset scrolling flag after animation completes
            setTimeout(() => { 
              isScrollingToSection.current = false;
            }, SWIPE_COOLDOWN);
          }
        } else {
          // Swipe down - go to previous section
          const prevSection = getPrevSectionId(activeSection);
          if (prevSection) {
            isScrollingToSection.current = true;
            scrollToSection(prevSection);
            applyCooldown();
            
            // Reset scrolling flag after animation completes
            setTimeout(() => { 
              isScrollingToSection.current = false;
            }, SWIPE_COOLDOWN);
          }
        }
      }
      
      // Reset touch tracking
      setTouchStartX(null);
      setTouchStartY(null);
    };

    // WHEEL NAVIGATION FOR DESKTOP
    const handleWheel = (e: WheelEvent) => {
      // Exit early if we're on cooldown or currently scrolling
      if (isOnCooldown || isScrollingToSection.current) return;
      
      // Clear any existing timeout to reset accumulated delta
      if (wheelTimeoutRef.current) {
        window.clearTimeout(wheelTimeoutRef.current);
      }
      
      // Accumulate the wheel delta (keep sign for direction)
      accumulatedWheelDelta.current += e.deltaY;
      
      // Set timeout to reset accumulated delta if user pauses scrolling
      wheelTimeoutRef.current = window.setTimeout(() => {
        accumulatedWheelDelta.current = 0;
        wheelTimeoutRef.current = null;
      }, WHEEL_TIMEOUT);
      
      // Only proceed if accumulated delta exceeds threshold in either direction
      if (Math.abs(accumulatedWheelDelta.current) < WHEEL_DELTA_THRESHOLD) return;
      
      // Get element for the current section
      const element = document.getElementById(activeSection);
      if (!element) return;
      
      // Get positioning information
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // Calculate how far we are into the current section
      const elementTop = rect.top + scrollTop;
      const scrollPosition = scrollTop + viewportHeight / 2; // Middle of viewport
      const distanceFromTop = scrollPosition - elementTop;
      const percentThroughSection = (distanceFromTop / rect.height) * 100;
      
      if (accumulatedWheelDelta.current > 0) { // Scrolling DOWN
        // Only go to next section if we're not just starting the current section
        if (percentThroughSection > 20) {
          const nextSection = getNextSectionId(activeSection);
          if (nextSection) {
            isScrollingToSection.current = true;
            scrollToSection(nextSection);
            applyCooldown();
            
            // Reset accumulation after triggering navigation
            accumulatedWheelDelta.current = 0;
            
            // Reset scrolling flag after animation completes
            setTimeout(() => { 
              isScrollingToSection.current = false;
            }, SWIPE_COOLDOWN);
          }
        }
      } else { // Scrolling UP
        // Only go to previous section if we're not at the bottom of the current section
        if (percentThroughSection < 80 && percentThroughSection > 0) {
          const prevSection = getPrevSectionId(activeSection);
          if (prevSection) {
            isScrollingToSection.current = true;
            scrollToSection(prevSection);
            applyCooldown();
            
            // Reset accumulation after triggering navigation
            accumulatedWheelDelta.current = 0;
            
            // Reset scrolling flag after animation completes
            setTimeout(() => { 
              isScrollingToSection.current = false;
            }, SWIPE_COOLDOWN);
          }
        }
      }
    };

    // KEYBOARD NAVIGATION (arrow keys and page up/down)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isOnCooldown || isScrollingToSection.current) return;
      
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        const nextSection = getNextSectionId(activeSection);
        if (nextSection) {
          isScrollingToSection.current = true;
          scrollToSection(nextSection);
          applyCooldown();
          
          setTimeout(() => { 
            isScrollingToSection.current = false;
          }, SWIPE_COOLDOWN);
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        const prevSection = getPrevSectionId(activeSection);
        if (prevSection) {
          isScrollingToSection.current = true;
          scrollToSection(prevSection);
          applyCooldown();
          
          setTimeout(() => { 
            isScrollingToSection.current = false;
          }, SWIPE_COOLDOWN);
        }
      }
    };

    // Register event listeners
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });
    document.addEventListener('wheel', handleWheel, { passive: true });
    document.addEventListener('keydown', handleKeyDown);

    // Clean up event listeners
    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('wheel', handleWheel);
      document.removeEventListener('keydown', handleKeyDown);
      
      // Clear any remaining timeout
      if (wheelTimeoutRef.current) {
        window.clearTimeout(wheelTimeoutRef.current);
      }
    };
  }, [touchStartX, touchStartY, activeSection, isOnCooldown]);

  return { activeSection };
}