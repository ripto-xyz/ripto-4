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
      setTouchStartY(e.touches[0].clientY);
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (touchStartY === null || isOnCooldown || isScrollingToSection.current) return;
      
      const touchEndY = e.changedTouches[0].clientY;
      const distance = touchStartY - touchEndY;
      
      // If the distance is significant enough to register as a swipe
      if (Math.abs(distance) > MIN_SWIPE_DISTANCE) {
        if (distance > 0) {
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
      
      setTouchStartY(null);
    };

    // WHEEL NAVIGATION FOR DESKTOP
    const handleWheel = (e: WheelEvent) => {
      // Exit early if we're on cooldown, currently scrolling, or the wheel movement is too small
      if (isOnCooldown || isScrollingToSection.current || Math.abs(e.deltaY) < 40) return;
      
      // Get the current time to check for rapid wheel events
      const now = Date.now();
      
      // If the wheel event is happening too soon after the last one, we'll ignore it to improve detection
      if (now - lastScrollTime.current < 50) return;
      lastScrollTime.current = now;
      
      // Check if we're near the boundary of a section (15% from top or bottom of viewport)
      const element = document.getElementById(activeSection);
      if (element) {
        const rect = element.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        // Are we near the top or bottom boundary of the current section?
        const isNearTop = rect.top > -viewportHeight * SECTION_BOUNDARY_THRESHOLD;
        const isNearBottom = rect.bottom < viewportHeight * (1 + SECTION_BOUNDARY_THRESHOLD);
        
        if (e.deltaY > 0 && isNearBottom) {
          // Scrolling down and near bottom - go to next section
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
        } else if (e.deltaY < 0 && isNearTop) {
          // Scrolling up and near top - go to previous section
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
  }, [touchStartY, activeSection, isOnCooldown]);

  return { activeSection };
}