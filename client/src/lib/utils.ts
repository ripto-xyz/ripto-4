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
  if (element) {
    // Custom smooth scrolling with a consistent experience
    // This helps ensure transitions between sections are more reliable
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset;
    
    // Use a custom duration based on distance (faster for short distances, slower for long ones)
    const distance = Math.abs(window.pageYOffset - offsetPosition);
    const duration = Math.min(Math.max(distance / 4, 600), 1000); // Between 600ms and 1000ms
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
    
    // Force focus on the section for better accessibility
    setTimeout(() => {
      element.setAttribute('tabindex', '-1');
      element.focus({ preventScroll: true });
    }, duration / 2);
  }
}
