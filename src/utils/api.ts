/**
 * Utility for API fetching with fallback to static JSON files
 * when deployed to Cloudflare Pages without a backend
 */

// Check if we're in Cloudflare Pages environment (no backend)
const isStaticHosting = () => {
  // Check if we're in a production build
  if (import.meta.env.PROD) {
    // We can use more specific detection here if needed
    return true;
  }
  return false;
};

/**
 * Fetch data with fallback to static JSON
 * @param endpoint API endpoint path (e.g., '/api/about')
 */
export async function fetchWithFallback<T>(endpoint: string): Promise<T> {
  try {
    // First try the live API
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }
    return await response.json() as T;
  } catch (error) {
    console.log(`Falling back to static JSON for ${endpoint}`);
    
    // If running in static hosting, use the prepared JSON files
    if (isStaticHosting()) {
      // Convert /api/about to /api/about.json
      const staticPath = `${endpoint}.json`;
      const staticResponse = await fetch(staticPath);
      if (!staticResponse.ok) {
        throw new Error(`Static JSON fallback failed: ${staticResponse.status}`);
      }
      return await staticResponse.json() as T;
    }
    
    // Re-throw the error if we're not in static hosting
    throw error;
  }
}