import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Array of section IDs in order of appearance
export const sectionIds = ['home', 'about', 'services', 'portfolio', 'contact'];

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
  const element = document.getElementById(sectionId);
  if (!element) return;
  
  // Get position of the element
  const elementRect = element.getBoundingClientRect();
  const offsetPosition = elementRect.top + window.pageYOffset;
  
  // Simple scroll for all sections
  if (sectionId === 'portfolio') {
    // For portfolio, use direct JavaScript animation for more control
    const startPosition = window.pageYOffset;
    const distance = offsetPosition - startPosition;
    const duration = 500; // Faster, more direct scroll
    
    // Prepare all sections for smooth transition
    sectionIds.forEach(id => {
      const section = document.getElementById(id);
      if (section && id !== sectionId) {
        // Make other sections more transparent during transition
        section.style.opacity = '0.7';
      }
    });
    
    // Make sure portfolio section is visible
    element.style.opacity = '1';
    element.style.willChange = 'transform';
    
    // Create a safer animation approach
    let startTime = 0;
    
    // Define our animation step
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const timeElapsed = timestamp - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      
      // Ease-out curve for smoother stop
      const ease = 1 - Math.pow(1 - progress, 3);
      window.scrollTo(0, startPosition + distance * ease);
      
      if (timeElapsed < duration) {
        requestAnimationFrame(step);
      } else {
        // End of animation, reset any properties
        sectionIds.forEach(id => {
          const section = document.getElementById(id);
          if (section) {
            section.style.opacity = '';
            section.style.willChange = '';
          }
        });
        
        // Focus the target element (already checked above that element exists)
        if (element) {
          element.setAttribute('tabindex', '-1');
          element.focus({ preventScroll: true });
        }
      }
    };
    
    // Start the animation
    requestAnimationFrame(step);
  } else {
    // For other sections, use standard smooth scrolling
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
    
    // Focus element after scroll completes (already checked above that element exists)
    setTimeout(() => {
      if (element) {
        element.setAttribute('tabindex', '-1');
        element.focus({ preventScroll: true });
      }
    }, 600);
  }
}
