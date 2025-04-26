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

// Function to scroll to a section - simplified version to avoid runtime errors
export function scrollToSection(sectionId: string): void {
  const element = document.getElementById(sectionId);
  if (!element) return;

  // Get the viewport height to help calculate position
  const viewportHeight = window.innerHeight;
  const documentHeight = document.body.scrollHeight;
  const elementRect = element.getBoundingClientRect();
  const elementHeight = elementRect.height;
  
  // Check which direction we're scrolling from
  const currentScroll = window.scrollY;
  const elementTop = element.offsetTop;
  const isScrollingDown = currentScroll < elementTop;
  
  // Custom positioning by section
  let targetPosition;
  
  switch(sectionId) {
    case 'home':
      // Always go to the very top for home
      targetPosition = 0;
      break;
      
    case 'about':
      // Standard offset for about
      targetPosition = elementTop - 100;
      break;
      
    case 'portfolio':
      // Standard offset for portfolio
      targetPosition = elementTop - 100;
      break;
      
    case 'services':
      // Make sure the services section is properly visible at the top of the viewport
      // with enough room to see the section title and first content items
      targetPosition = Math.max(0, elementTop - 90);
      
      // When scrolling down to services, ensure we don't scroll too far
      if (isScrollingDown) {
        // Force a slightly higher position to ensure the section heading is visible
        targetPosition = Math.max(0, elementTop - 90); 
      }
      break;
      
    case 'contact':
      // For contact section, ensure it stops at a good visible position without going too far
      const maxScroll = documentHeight - viewportHeight;
      
      // When scrolling down to contact, ensure we can see the top of the section
      // without scrolling all the way to the bottom of the page
      targetPosition = Math.max(0, elementTop - 90);
      
      // Absolute limit - never go beyond what the browser allows
      targetPosition = Math.min(targetPosition, maxScroll - 10);
      break;
      
    default:
      // Default behavior for any other sections
      targetPosition = elementTop - 100;
  }
  
  // Safety check - prevent scrolling beyond document limits
  targetPosition = Math.max(0, Math.min(targetPosition, documentHeight - viewportHeight));
  
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
