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
  // Simple direct approach - get the element
  const element = document.getElementById(sectionId);
  if (!element) return;
  
  // Calculate the position to scroll to
  element.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
  
  // For accessibility
  setTimeout(() => {
    element.setAttribute('tabindex', '-1');
    element.focus({ preventScroll: true });
  }, 600);
}
