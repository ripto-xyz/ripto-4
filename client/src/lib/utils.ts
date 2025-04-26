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

// Function to scroll to a section - improved version with better transition handling
export function scrollToSection(sectionId: string): void {
  const element = document.getElementById(sectionId);
  if (!element) return;

  // Simple offset mapping - increased offsets to ensure complete section transition
  const offsets: {[key: string]: number} = {
    'home': 0,     // Home should have no offset
    'about': 120,  // Increased to ensure hero disappears completely
    'portfolio': 120,
    'services': 120,
    'contact': 120,
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
  
  // Special handling for problematic transitions
  if ((currentSectionId === 'portfolio' && sectionId === 'services') || 
      (currentSectionId === 'services' && sectionId === 'portfolio')) {
    // First, cancel any existing animations by doing an immediate scroll to current position
    window.scrollTo({
      top: window.scrollY,
      behavior: 'auto'
    });
    
    // Then, after a brief delay, perform the smooth scroll
    setTimeout(() => {
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }, 50);
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
