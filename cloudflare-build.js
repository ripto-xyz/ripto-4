#!/usr/bin/env node

// Updated script for Cloudflare Pages deployment
import { execSync } from 'child_process';

console.log('🔧 Building for Cloudflare Pages...');

try {
  // Use the Cloudflare-specific config 
  console.log('📦 Building frontend with Cloudflare configuration...');
  execSync('vite build --config vite.config.cloudflare.js', { stdio: 'inherit' });
  
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