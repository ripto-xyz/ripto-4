#!/usr/bin/env node

// Updated script for Cloudflare Pages deployment
import { execSync } from 'child_process';

console.log('🔧 Building for Cloudflare Pages...');

try {
  // Use the production config that outputs directly to dist/
  console.log('📦 Building frontend with production configuration...');
  execSync('vite build --config vite.config.prod.ts', { stdio: 'inherit' });
  
  console.log('✅ Cloudflare Pages build complete!');
  console.log('📁 Output directory: ./dist/');
  console.log('🌐 Ready for Cloudflare Pages deployment');
  
  // Log the contents for verification
  console.log('\n📋 Build output contents:');
  execSync('ls -la dist/', { stdio: 'inherit' });
  
} catch (error) {
  console.error('❌ Cloudflare Pages build failed:', error.message);
  process.exit(1);
}