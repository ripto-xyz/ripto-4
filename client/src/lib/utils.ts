import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Array of section IDs in order of appearance
export const sectionIds = ['home', 'about', 'portfolio', 'services', 'contact'];

// Function to get the next section ID
export function getNextSectionId(currentSectionId: string): string | null {
  const currentIndex = sectionIds.indexOf(currentSectionId);
  if (currentIndex === -1 || currentIndex === sectionIds.length - 1) {
    return null;
  }
  return sectionIds[currentIndex + 1];
}

// Function to get the previous section ID
export function getPrevSectionId(currentSectionId: string): string | null {
  const currentIndex = sectionIds.indexOf(currentSectionId);
  if (currentIndex <= 0) {
    return null;
  }
  return sectionIds[currentIndex - 1];
}

// Function to scroll to a section
export function scrollToSection(sectionId: string): void {
  // This function now has a completely rewritten approach for more reliability
  
  const element = document.getElementById(sectionId);
  if (!element) return;
  
  // Get the current active section
  const currentSection = sectionIds.find(id => {
    const el = document.getElementById(id);
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    // Consider a section active if it's near the top of the viewport
    return rect.top <= 120 && rect.bottom > 120;
  });
  
  console.log(`Scrolling from ${currentSection} to ${sectionId}`);
  
  // Handle different scroll transitions with special cases
  if (currentSection === 'about' && sectionId === 'home') {
    // Special case: only scroll from About to Home if we're really at the top
    const aboutEl = document.getElementById('about');
    if (aboutEl) {
      const rect = aboutEl.getBoundingClientRect();
      // Only allow going to home if we're in the very top of About (2%)
      if (rect.top > -(window.innerHeight * 0.02)) {
        console.log('Allowing About to Home transition');
        scrollToPosition(element.offsetTop - 100);
      } else {
        console.log('Prevented accidental About to Home transition');
      }
    }
  }
  else if (sectionId === 'about') {
    // Special handling for About section
    console.log('Using special About section handling');
    // Use extra offset to ensure we're fully in the About section
    scrollToPosition(element.offsetTop - 90);
  }
  else if (sectionId === 'contact') {
    // Special handling for Contact section
    console.log('Using special Contact section handling');
    // Use slightly different offset for Contact
    scrollToPosition(element.offsetTop - 95);
  }
  else {
    // Default handling for other sections
    scrollToPosition(element.offsetTop - 100);
  }
  
  // Helper function to perform the actual scroll with consistent behavior
  function scrollToPosition(position: number) {
    try {
      // First attempt - use smooth scrolling
      window.scrollTo({
        top: position,
        behavior: 'smooth'
      });
      
      // Backup to ensure the scroll happens even if smooth scroll fails
      setTimeout(() => {
        const currentPos = window.pageYOffset;
        // If we haven't moved to approximately the right position, force it
        if (Math.abs(currentPos - position) > 200) {
          console.log('Smooth scroll may have failed, using fallback');
          window.scrollTo(0, position);
        }
      }, 500);
    } catch (err) {
      // Fallback for browsers that don't support smooth scrolling
      console.error('Smooth scroll failed, using direct scroll', err);
      window.scrollTo(0, position);
    }
  }
}
