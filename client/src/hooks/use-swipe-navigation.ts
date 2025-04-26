import { useEffect, useState, useRef } from 'react';
import { getNextSectionId, getPrevSectionId, scrollToSection, sectionIds } from '@/lib/utils';
import { useScrollSpy } from './use-scroll-spy';

// Minimum distance (in pixels) required to register a swipe
const MIN_SWIPE_DISTANCE = 50;

// Cooldown period to prevent rapid consecutive swipes (in milliseconds)
const SWIPE_COOLDOWN = 800;

// Threshold for when the user is near a section boundary (in percentage of viewport height)
const SECTION_BOUNDARY_THRESHOLD = 0.15;

export function useSwipeNavigation() {
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [isOnCooldown, setIsOnCooldown] = useState(false);
  const lastScrollTime = useRef<number>(0);
  const activeSection = useScrollSpy({ sectionIds, offset: 100 });
  
  // A ref to track if we're currently in a wheel-based scroll transition
  const isScrollingToSection = useRef<boolean>(false);

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
      
      setTouchStartX(null);
      setTouchStartY(null);
    };

    // WHEEL NAVIGATION FOR DESKTOP
    const handleWheel = (e: WheelEvent) => {
      // Exit early if we're on cooldown or currently scrolling
      if (isOnCooldown || isScrollingToSection.current) return;
      
      // Get the current time to check for rapid wheel events
      const now = Date.now();
      
      // Detect fast scrolling patterns but allow short pauses
      if (now - lastScrollTime.current < 50 && Math.abs(e.deltaY) < 60) return;
      lastScrollTime.current = now;
      
      // Determine if this is a significant scroll action
      const isSignificantScroll = Math.abs(e.deltaY) > 35;
      
      if (!isSignificantScroll) return;
      
      // Check the current section's position
      const element = document.getElementById(activeSection);
      if (!element) return;
      
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // Calculate how far we are into the current section
      const elementTop = rect.top + scrollTop;
      const scrollPosition = scrollTop + viewportHeight / 2; // Middle of viewport
      const distanceFromTop = scrollPosition - elementTop;
      const percentThroughSection = (distanceFromTop / rect.height) * 100;
      
      if (e.deltaY > 0) { // Scrolling DOWN
        // If we're at least 15% through the section, go to the next section
        if (percentThroughSection > 15) {
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
        }
      } else { // Scrolling UP
        // If we're less than 85% through the section, go to the previous section
        if (percentThroughSection < 85 && percentThroughSection > 0) {
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
    };

    // Keyboard navigation (arrow keys)
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

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('wheel', handleWheel);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [touchStartX, touchStartY, activeSection, isOnCooldown]);

  return { activeSection };
}