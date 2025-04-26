import { useEffect, useState } from 'react';
import { getNextSectionId, getPrevSectionId, scrollToSection, sectionIds } from '@/lib/utils';
import { useScrollSpy } from './use-scroll-spy';

// Minimum distance (in pixels) required to register a swipe
const MIN_SWIPE_DISTANCE = 50;

// Cooldown period to prevent rapid consecutive swipes (in milliseconds)
const SWIPE_COOLDOWN = 800;

export function useSwipeNavigation() {
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [isOnCooldown, setIsOnCooldown] = useState(false);
  const activeSection = useScrollSpy({ sectionIds, offset: 100 });

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      setTouchStartY(e.touches[0].clientY);
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (touchStartY === null || isOnCooldown) return;
      
      const touchEndY = e.changedTouches[0].clientY;
      const distance = touchStartY - touchEndY;
      
      // If the distance is significant enough to register as a swipe
      if (Math.abs(distance) > MIN_SWIPE_DISTANCE) {
        if (distance > 0) {
          // Swipe up - go to next section
          const nextSection = getNextSectionId(activeSection);
          if (nextSection) {
            scrollToSection(nextSection);
            setIsOnCooldown(true);
            setTimeout(() => setIsOnCooldown(false), SWIPE_COOLDOWN);
          }
        } else {
          // Swipe down - go to previous section
          const prevSection = getPrevSectionId(activeSection);
          if (prevSection) {
            scrollToSection(prevSection);
            setIsOnCooldown(true);
            setTimeout(() => setIsOnCooldown(false), SWIPE_COOLDOWN);
          }
        }
      }
      
      setTouchStartY(null);
    };

    // Handle wheel events for desktop
    const handleWheel = (e: WheelEvent) => {
      if (isOnCooldown || Math.abs(e.deltaY) < 30) return;
      
      // Check if the user has stopped scrolling
      if (e.deltaY > 0) {
        // Scrolling down - go to next section
        const nextSection = getNextSectionId(activeSection);
        if (nextSection) {
          e.preventDefault();
          scrollToSection(nextSection);
          setIsOnCooldown(true);
          setTimeout(() => setIsOnCooldown(false), SWIPE_COOLDOWN);
        }
      } else {
        // Scrolling up - go to previous section
        const prevSection = getPrevSectionId(activeSection);
        if (prevSection) {
          e.preventDefault();
          scrollToSection(prevSection);
          setIsOnCooldown(true);
          setTimeout(() => setIsOnCooldown(false), SWIPE_COOLDOWN);
        }
      }
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });
    // Note: Using { passive: false } would allow preventDefault, but modern browsers discourage this for scroll events
    document.addEventListener('wheel', handleWheel, { passive: true });

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('wheel', handleWheel);
    };
  }, [touchStartY, activeSection, isOnCooldown]);

  return { activeSection };
}