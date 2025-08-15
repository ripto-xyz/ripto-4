#!/usr/bin/env node

// Build script for deployment that outputs to dist/ instead of dist/public/
import { execSync } from 'child_process';

console.log('Building for deployment...');

try {
  // Build frontend using the production config that outputs to dist/
  console.log('Building frontend with production config...');
  execSync('vite build --config vite.config.prod.ts', { stdio: 'inherit' });
  
  // Build backend
  console.log('Building backend...');
  execSync('esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist', { stdio: 'inherit' });
  
  console.log('✅ Build complete! Output is in ./dist directory');
  console.log('📁 Frontend files: ./dist/index.html and assets');
  console.log('📁 Backend files: ./dist/index.js');
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}