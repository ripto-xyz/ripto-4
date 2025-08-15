#!/usr/bin/env node

// Build script for static deployment (frontend only)
import { execSync } from 'child_process';

console.log('Building for static deployment...');

try {
  // Build frontend only using the production config that outputs to dist/
  console.log('Building frontend for static deployment...');
  execSync('vite build --config vite.config.prod.ts', { stdio: 'inherit' });
  
  console.log('✅ Static build complete!');
  console.log('📁 Output directory: ./dist/');
  console.log('📁 Files: index.html and assets ready for static hosting');
  console.log('🚀 You can now deploy the ./dist directory to any static hosting service');
  
} catch (error) {
  console.error('❌ Static build failed:', error.message);
  process.exit(1);
}