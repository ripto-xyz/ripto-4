import { useEffect, useRef } from 'react';
import { getNextSectionId, getPrevSectionId, scrollToSection, sectionIds } from '@/lib/utils';

/**
 * A simple but robust hook for section-to-section navigation using mouse wheel or trackpad.
 * Handles both devices by accounting for their different scroll characteristics.
 * Features reduced sensitivity for portfolio and services sections to allow better reading.
 */
/**
 * IMPORTANT: Wheel navigation has been completely disabled based on user feedback.
 * We now use manual navigation through navbar and buttons only.
 * This improves the reading experience in content-heavy sections (portfolio, services).
 */
export function useWheelNav() {
  // This hook no longer adds wheel-based section navigation
  // It's kept as a placeholder to avoid breaking existing code
  
  useEffect(() => {
    // No-op implementation - we've intentionally disabled wheel-based navigation
    console.log('Wheel navigation is disabled - using navbar and manual navigation only');
    
    // We no longer add any wheel event listeners
    
    return () => {
      // No cleanup needed
    };
  }, []);
}