import { useEffect, useState, useRef } from 'react';
import { getNextSectionId, getPrevSectionId, scrollToSection, sectionIds } from '@/lib/utils';
import { useScrollSpy } from './use-scroll-spy';

// Minimum distance (in pixels) required to register a swipe
const MIN_SWIPE_DISTANCE = 120; // Increased to require a longer, more deliberate swipe

// Cooldown period to prevent rapid consecutive swipes (in milliseconds)
const SWIPE_COOLDOWN = 1200; // Increased to prevent accidental double swipes

// Additional wait time required after arriving at a new section (in milliseconds)
const SECTION_ARRIVAL_GRACE_PERIOD = 1000; // Increased to prevent section skipping

// Threshold for wheel delta accumulation before triggering section change
const WHEEL_DELTA_THRESHOLD = 450; // Increased to require more deliberate scrolling

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
  const lastSectionChangeTime = useRef<number>(Date.now());
  
  // Get current active section using ScrollSpy with navbar offset
  const activeSection = useScrollSpy({ sectionIds, offset: 120 });

  // Helper to apply cooldown
  const applyCooldown = () => {
    setIsOnCooldown(true);
    lastSectionChangeTime.current = Date.now();
    setTimeout(() => setIsOnCooldown(false), SWIPE_COOLDOWN);
  };
  
  // Check if we're still in the grace period after changing sections
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
      
      // Only consider vertical swipes (when Y movement is greater than X movement)
      // and only when the swipe is long enough (MIN_SWIPE_DISTANCE)
      if (Math.abs(distanceY) > Math.abs(distanceX) && Math.abs(distanceY) > MIN_SWIPE_DISTANCE) {
        // Special handling for About section
        if (activeSection === 'about') {
          if (distanceY > 0) { // Swipe UP from About section
            // Require longer swipe to leave About section
            if (Math.abs(distanceY) > MIN_SWIPE_DISTANCE * 1.3) {
              const nextSection = getNextSectionId(activeSection);
              if (nextSection) {
                isScrollingToSection.current = true;
                scrollToSection(nextSection);
                applyCooldown();
                setTimeout(() => { isScrollingToSection.current = false; }, SWIPE_COOLDOWN + 200);
              }
            }
          } else { // Swipe DOWN from About section to Home
            // Require much longer swipe to go back to Home
            // This was 1.4, now 2.0 to make it much harder to go back to home
            if (Math.abs(distanceY) > MIN_SWIPE_DISTANCE * 2.0) {
              const prevSection = getPrevSectionId(activeSection);
              if (prevSection) {
                isScrollingToSection.current = true;
                scrollToSection(prevSection);
                applyCooldown();
                setTimeout(() => { isScrollingToSection.current = false; }, SWIPE_COOLDOWN + 200);
              }
            }
          }
        }
        // Special handling for Home to About transition
        else if (activeSection === 'home' && distanceY > 0) {
          // Require a more deliberate swipe to go from Home to About
          if (Math.abs(distanceY) > MIN_SWIPE_DISTANCE * 1.2) {
            const nextSection = getNextSectionId(activeSection);
            if (nextSection === 'about') {
              isScrollingToSection.current = true;
              scrollToSection(nextSection);
              applyCooldown();
              setTimeout(() => { isScrollingToSection.current = false; }, SWIPE_COOLDOWN + 300);
            }
          }
        }
        // Special handling for Contact section 
        else if (activeSection === 'contact' && distanceY < 0) {
          // Require a more deliberate swipe to leave Contact section
          if (Math.abs(distanceY) > MIN_SWIPE_DISTANCE * 1.3) {
            const prevSection = getPrevSectionId(activeSection);
            if (prevSection) {
              isScrollingToSection.current = true;
              scrollToSection(prevSection);
              applyCooldown();
              setTimeout(() => { isScrollingToSection.current = false; }, SWIPE_COOLDOWN + 200);
            }
          }
        }
        // Normal navigation for other sections
        else if (distanceY > 0) { // Swipe UP - go to next section
          const nextSection = getNextSectionId(activeSection);
          if (nextSection) {
            isScrollingToSection.current = true;
            scrollToSection(nextSection);
            applyCooldown();
            setTimeout(() => { isScrollingToSection.current = false; }, SWIPE_COOLDOWN);
          }
        } else { // Swipe DOWN - go to previous section
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
      // Exit early if we're on cooldown, scrolling, or in grace period
      if (isOnCooldown || isScrollingToSection.current || isInGracePeriod()) return;
      
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
      
      // Special handling for the About section which is having issues
      if (activeSection === 'about') {
        if (accumulatedWheelDelta.current > 0) { // Scrolling DOWN in About section
          // Use a higher threshold for leaving the About section to prevent bouncing
          if (percentThroughSection > 50) {
            const nextSection = getNextSectionId(activeSection);
            if (nextSection) {
              isScrollingToSection.current = true;
              scrollToSection(nextSection);
              applyCooldown();
              accumulatedWheelDelta.current = 0;
              setTimeout(() => { isScrollingToSection.current = false; }, SWIPE_COOLDOWN);
            }
          }
        } else { // Scrolling UP in About section
          // Significantly increase threshold to prevent unintended navigation back to home
          // This was 15% before, which was too low
          if (percentThroughSection < 5) {
            const prevSection = getPrevSectionId(activeSection);
            if (prevSection) {
              isScrollingToSection.current = true;
              scrollToSection(prevSection);
              applyCooldown();
              accumulatedWheelDelta.current = 0;
              setTimeout(() => { isScrollingToSection.current = false; }, SWIPE_COOLDOWN);
            }
          }
        }
      } 
      // Special handling for Contact section
      else if (activeSection === 'contact') {
        // Contact section needs special handling too
        if (accumulatedWheelDelta.current < 0) { // Scrolling UP from Contact
          if (percentThroughSection < 30) {
            const prevSection = getPrevSectionId(activeSection);
            if (prevSection) {
              isScrollingToSection.current = true;
              scrollToSection(prevSection);
              applyCooldown();
              accumulatedWheelDelta.current = 0;
              setTimeout(() => { isScrollingToSection.current = false; }, SWIPE_COOLDOWN);
            }
          }
        }
      }
      // For all other sections
      else if (accumulatedWheelDelta.current > 0) { // Scrolling DOWN
        // Only go to next section if we're at least 35% through the current section
        if (percentThroughSection > 35) {
          const nextSection = getNextSectionId(activeSection);
          if (nextSection) {
            // Extra check for home to about transition
            if (activeSection === 'home' && nextSection === 'about') {
              // Require more clear intent to go to about section from home
              if (percentThroughSection > 45) {
                isScrollingToSection.current = true;
                scrollToSection(nextSection);
                applyCooldown();
                accumulatedWheelDelta.current = 0;
                setTimeout(() => { isScrollingToSection.current = false; }, SWIPE_COOLDOWN);
              }
            } else {
              // Normal section transition
              isScrollingToSection.current = true;
              scrollToSection(nextSection);
              applyCooldown();
              accumulatedWheelDelta.current = 0;
              setTimeout(() => { isScrollingToSection.current = false; }, SWIPE_COOLDOWN);
            }
          }
        }
      } else { // Scrolling UP
        // Only go to previous section if we're in the top 25% of the current section
        if (percentThroughSection < 25 && percentThroughSection > 0) {
          const prevSection = getPrevSectionId(activeSection);
          if (prevSection) {
            isScrollingToSection.current = true;
            scrollToSection(prevSection);
            applyCooldown();
            accumulatedWheelDelta.current = 0;
            setTimeout(() => { isScrollingToSection.current = false; }, SWIPE_COOLDOWN);
          }
        }
      }
    };

    // KEYBOARD NAVIGATION (arrow keys and page up/down)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isOnCooldown || isScrollingToSection.current || isInGracePeriod()) return;
      
      // Special handling for About section
      if (activeSection === 'about') {
        if (e.key === 'ArrowDown' || e.key === 'PageDown') {
          // Extra protection for About section when using keyboard navigation
          const nextSection = getNextSectionId(activeSection);
          if (nextSection) {
            isScrollingToSection.current = true;
            scrollToSection(nextSection);
            applyCooldown();
            setTimeout(() => { isScrollingToSection.current = false; }, SWIPE_COOLDOWN + 200);
          }
        } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
          const prevSection = getPrevSectionId(activeSection);
          if (prevSection) {
            isScrollingToSection.current = true;
            scrollToSection(prevSection);
            applyCooldown();
            setTimeout(() => { isScrollingToSection.current = false; }, SWIPE_COOLDOWN + 200);
          }
        }
      }
      // Special handling for Home to About transition
      else if (activeSection === 'home' && (e.key === 'ArrowDown' || e.key === 'PageDown')) {
        const nextSection = getNextSectionId(activeSection);
        if (nextSection === 'about') {
          isScrollingToSection.current = true;
          scrollToSection(nextSection);
          applyCooldown();
          // Extended cooldown for home to about transition
          setTimeout(() => { isScrollingToSection.current = false; }, SWIPE_COOLDOWN + 300);
        }
      }
      // Special handling for Contact section
      else if (activeSection === 'contact') {
        if (e.key === 'ArrowUp' || e.key === 'PageUp') {
          const prevSection = getPrevSectionId(activeSection);
          if (prevSection) {
            isScrollingToSection.current = true;
            scrollToSection(prevSection);
            applyCooldown();
            setTimeout(() => { isScrollingToSection.current = false; }, SWIPE_COOLDOWN + 200);
          }
        }
      }
      // Normal keyboard navigation for other sections
      else if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        const nextSection = getNextSectionId(activeSection);
        if (nextSection) {
          isScrollingToSection.current = true;
          scrollToSection(nextSection);
          applyCooldown();
          setTimeout(() => { isScrollingToSection.current = false; }, SWIPE_COOLDOWN);
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
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
      
      // Clear any remaining timeout
      if (wheelTimeoutRef.current) {
        window.clearTimeout(wheelTimeoutRef.current);
      }
    };
  }, [touchStartX, touchStartY, activeSection, isOnCooldown]);

  return { activeSection };
}