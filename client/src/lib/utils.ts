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

// Function for animation step that works in ES5 strict mode
function animateScrollStep(currentTime: number, startTime: number, startPosition: number, distance: number, duration: number) {
  const elapsed = currentTime - startTime;
  const progress = Math.min(elapsed / duration, 1);
  
  // Ease out cubic function for smoother stop
  const easeProgress = 1 - Math.pow(1 - progress, 3);
  
  window.scrollTo(0, startPosition + distance * easeProgress);
  
  if (progress < 1) {
    requestAnimationFrame((timestamp) => {
      animateScrollStep(timestamp, startTime, startPosition, distance, duration);
    });
  }
}

// Function to scroll to a section - improved version with better transition handling
export function scrollToSection(sectionId: string): void {
  const element = document.getElementById(sectionId);
  if (!element) return;

  // Offset mapping - adjusted for optimal section positioning
  const offsets: {[key: string]: number} = {
    'home': 0,     // Home should have no offset
    'about': 120,  // Increased to ensure hero disappears completely
    'portfolio': 120,
    'services': 120,
    'contact': 80,  // Reduced offset for contact to make it appear sooner
    'default': 120
  };
  
  // Get offset with fallback to default
  const offset = offsets[sectionId] || offsets.default;
  
  // Calculate the target position
  const targetPosition = element.offsetTop - offset;
  
  // Find current active section for special handling
  const currentPosition = window.scrollY;
  let currentSectionId = '';
  
  // Find which section we're currently in
  for (const id of sectionIds) {
    const section = document.getElementById(id);
    if (!section) continue;
    
    if (currentPosition >= section.offsetTop - 150 && 
        currentPosition < section.offsetTop + section.clientHeight - 150) {
      currentSectionId = id;
      break;
    }
  }

  // Detect Firefox for browser-specific handling
  const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
  
  // Firefox-specific scrolling behavior
  if (isFirefox) {
    // Cancel any existing animations with immediate scroll
    window.scrollTo({
      top: window.scrollY,
      behavior: 'auto'
    });
    
    // Use a simpler approach for Firefox
    const scrollDuration = 600; // Duration in ms
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    
    // Use our animation function defined outside the block
    requestAnimationFrame((timestamp) => {
      animateScrollStep(timestamp, timestamp, startPosition, distance, scrollDuration);
    });
    
    return;
  }
  
  // Special handling for problematic transitions in other browsers
  if ((currentSectionId === 'portfolio' && sectionId === 'services') || 
      (currentSectionId === 'services' && sectionId === 'portfolio') ||
      sectionId === 'contact') { // Always use special handling for contact section
    
    // First, cancel any existing animations by doing an immediate scroll to current position
    window.scrollTo({
      top: window.scrollY,
      behavior: 'auto'
    });
    
    // Special case for contact section - ensure we scroll all the way 
    if (sectionId === 'contact') {
      // For contact section, we want to ensure we scroll to the maximum position
      // that allows the section to be fully visible
      const htmlHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const contactEl = document.getElementById('contact');
      
      if (contactEl) {
        // For full visibility of contact, scroll enough to show the full section
        setTimeout(() => {
          const maxScroll = htmlHeight - windowHeight;
          // Scroll a bit beyond the normal position to ensure contact is fully visible
          const scrollPos = Math.min(maxScroll, targetPosition + 50);
          
          window.scrollTo({
            top: scrollPos, 
            behavior: 'smooth'
          });
        }, 50);
      } else {
        // Fallback to normal scrolling if contact section isn't found
        setTimeout(() => {
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }, 50);
      }
    } else {
      // For other problematic sections, use the original approach
      setTimeout(() => {
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }, 50);
    }
    
    return;
  }
  
  // Normal scrolling for other cases
  try {
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  } catch (err) {
    // Fallback for older browsers
    window.scrollTo(0, targetPosition);
  }
}
