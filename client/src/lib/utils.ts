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

// Function to scroll to a section - simplified to fix the portfolio-services transition
export function scrollToSection(sectionId: string): void {
  const element = document.getElementById(sectionId);
  if (!element) return;

  // Simple offset mapping
  const offsets: {[key: string]: number} = {
    'home': 0,     // Home should have no offset
    'about': 120,  // Offset for other sections
    'portfolio': 120,
    'services': 120,
    'contact': 120,
    'default': 120
  };
  
  // Get offset with fallback to default
  const offset = offsets[sectionId] || offsets.default;
  
  // Calculate the target position
  const targetPosition = element.offsetTop - offset;
  
  // Simple scroll with no special handling - just direct smooth scroll
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
