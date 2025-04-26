import { useEffect, useState, useRef } from 'react';
import { getNextSectionId, getPrevSectionId, scrollToSection, sectionIds } from '@/lib/utils';
import { useScrollSpy } from './use-scroll-spy';

// Simplified constants
const MIN_SWIPE_DISTANCE = 120;
const SWIPE_COOLDOWN = 1000; 
const SECTION_ARRIVAL_GRACE_PERIOD = 1000;
const WHEEL_DELTA_THRESHOLD = 450;
const WHEEL_TIMEOUT = 200;

export function useSwipeNavigation() {
  // State for touch tracking
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [isOnCooldown, setIsOnCooldown] = useState(false);
  
  // Refs for tracking
  const accumulatedWheelDelta = useRef<number>(0);
  const wheelTimeoutRef = useRef<number | null>(null);
  const isScrollingToSection = useRef<boolean>(false);
  const lastSectionChangeTime = useRef<number>(Date.now());
  
  // Get current active section
  const activeSection = useScrollSpy({ sectionIds, offset: 120 });

  // Helper to apply cooldown
  const applyCooldown = () => {
    setIsOnCooldown(true);
    lastSectionChangeTime.current = Date.now();
    setTimeout(() => setIsOnCooldown(false), SWIPE_COOLDOWN);
  };
  
  // Check if we're in grace period 
  const isInGracePeriod = () => {
    return (Date.now() - lastSectionChangeTime.current) < SECTION_ARRIVAL_GRACE_PERIOD;
  };

  useEffect(() => {
    // TOUCH NAVIGATION FOR MOBILE
    const handleTouchStart = (e: TouchEvent) => {
      setTouchStartX(e.touches[0].clientX);
      setTouchStartY(e.touches[0].clientY);
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (touchStartY === null || touchStartX === null || isOnCooldown || isScrollingToSection.current || isInGracePeriod()) return;
      
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const distanceX = touchStartX - touchEndX;
      const distanceY = touchStartY - touchEndY;
      
      // Only consider vertical swipes
      if (Math.abs(distanceY) > Math.abs(distanceX) && Math.abs(distanceY) > MIN_SWIPE_DISTANCE) {
        if (distanceY > 0) { // Swipe UP - go to next section
          const nextSection = getNextSectionId(activeSection);
          if (nextSection) {
            isScrollingToSection.current = true;
            scrollToSection(nextSection);
            applyCooldown();
            setTimeout(() => { isScrollingToSection.current = false; }, SWIPE_COOLDOWN);
          }
        } else { // Swipe DOWN - go to previous section
          // Special case: prevent going from About back to Home
          if (activeSection === 'about') {
            // Just stay in the About section
            return;
          }
          
          const prevSection = getPrevSectionId(activeSection);
          if (prevSection) {
            isScrollingToSection.current = true;
            scrollToSection(prevSection);
            applyCooldown();
            setTimeout(() => { isScrollingToSection.current = false; }, SWIPE_COOLDOWN);
          }
        }
      }
      
      // Reset touch tracking
      setTouchStartX(null);
      setTouchStartY(null);
    };

    // WHEEL NAVIGATION FOR DESKTOP
    const handleWheel = (e: WheelEvent) => {
      // Exit early if needed
      if (isOnCooldown || isScrollingToSection.current || isInGracePeriod()) return;
      
      // Manage wheel delta with timeout
      if (wheelTimeoutRef.current) {
        window.clearTimeout(wheelTimeoutRef.current);
      }
      
      accumulatedWheelDelta.current += e.deltaY;
      
      wheelTimeoutRef.current = window.setTimeout(() => {
        accumulatedWheelDelta.current = 0;
        wheelTimeoutRef.current = null;
      }, WHEEL_TIMEOUT);
      
      // Only proceed if delta exceeds threshold
      if (Math.abs(accumulatedWheelDelta.current) < WHEEL_DELTA_THRESHOLD) return;
      
      if (accumulatedWheelDelta.current > 0) { // Scrolling DOWN
        const nextSection = getNextSectionId(activeSection);
        if (nextSection) {
          isScrollingToSection.current = true;
          scrollToSection(nextSection);
          applyCooldown();
          accumulatedWheelDelta.current = 0;
          setTimeout(() => { isScrollingToSection.current = false; }, SWIPE_COOLDOWN);
        }
      } else { // Scrolling UP
        // Special case: prevent going from About back to Home
        if (activeSection === 'about') {
          // Just stay in About section
          return;
        }
        
        const prevSection = getPrevSectionId(activeSection);
        if (prevSection) {
          isScrollingToSection.current = true;
          scrollToSection(prevSection);
          applyCooldown();
          accumulatedWheelDelta.current = 0;
          setTimeout(() => { isScrollingToSection.current = false; }, SWIPE_COOLDOWN);
        }
      }
    };

    // KEYBOARD NAVIGATION
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isOnCooldown || isScrollingToSection.current || isInGracePeriod()) return;
      
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        const nextSection = getNextSectionId(activeSection);
        if (nextSection) {
          isScrollingToSection.current = true;
          scrollToSection(nextSection);
          applyCooldown();
          setTimeout(() => { isScrollingToSection.current = false; }, SWIPE_COOLDOWN);
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        // Special case: prevent going from About back to Home
        if (activeSection === 'about') {
          // Just stay in About section
          return;
        }
        
        const prevSection = getPrevSectionId(activeSection);
        if (prevSection) {
          isScrollingToSection.current = true;
          scrollToSection(prevSection);
          applyCooldown();
          setTimeout(() => { isScrollingToSection.current = false; }, SWIPE_COOLDOWN);
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
      
      if (wheelTimeoutRef.current) {
        window.clearTimeout(wheelTimeoutRef.current);
      }
    };
  }, [touchStartX, touchStartY, activeSection, isOnCooldown]);

  return { activeSection };
}