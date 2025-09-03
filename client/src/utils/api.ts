/**
 * Utility for API fetching with fallback to static JSON files
 * when deployed to Cloudflare Pages without a backend
 */

// Check if we're in static hosting environment (no backend)
const isStaticHosting = () => {
  // Always try static files first in production
  if (import.meta.env.PROD) {
    return true;
  }
  
  // In development, check if we're on a static hosting domain
  const hostname = window.location.hostname;
  return hostname.includes('.pages.dev') || 
         hostname.includes('.netlify.app') || 
         hostname.includes('.vercel.app') ||
         hostname.includes('.github.io');
};

/**
 * Fetch data with fallback to static JSON
 * @param endpoint API endpoint path (e.g., '/api/about')
 */
export async function fetchWithFallback<T>(endpoint: string): Promise<T> {
  // In static hosting, go directly to JSON files
  if (isStaticHosting()) {
    console.log(`🔧 DEBUG: Using static JSON for ${endpoint}`);
    const staticPath = `${endpoint}.json`;
    console.log(`🔧 DEBUG: Fetching from ${staticPath}`);
    const staticResponse = await fetch(staticPath);
    console.log(`🔧 DEBUG: Response status: ${staticResponse.status}`);
    if (!staticResponse.ok) {
      throw new Error(`Static JSON file not found: ${staticPath}`);
    }
    const data = await staticResponse.json() as T;
    console.log(`🔧 DEBUG: Data received:`, data);
    return data;
  }
  
  // In development with backend, try API first
  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }
    return await response.json() as T;
  } catch (error) {
    console.log(`API failed, falling back to static JSON for ${endpoint}`);
    
    // Fallback to static JSON
    const staticPath = `${endpoint}.json`;
    const staticResponse = await fetch(staticPath);
    if (!staticResponse.ok) {
      throw new Error(`Both API and static JSON failed for ${endpoint}`);
    }
    return await staticResponse.json() as T;
  }
}