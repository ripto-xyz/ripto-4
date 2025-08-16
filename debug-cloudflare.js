#!/usr/bin/env node

// Debug script to help troubleshoot Cloudflare Pages deployment
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🔍 Debugging Cloudflare Pages deployment...\n');

try {
  // Clean previous build
  if (fs.existsSync('./dist')) {
    console.log('🧹 Cleaning previous build...');
    fs.rmSync('./dist', { recursive: true, force: true });
  }

  // Build with production config
  console.log('📦 Building with production config...');
  execSync('vite build --config vite.config.prod.ts', { stdio: 'inherit' });
  
  console.log('\n📋 Verifying build output structure:');
  
  // Check if dist directory exists
  if (!fs.existsSync('./dist')) {
    console.error('❌ ERROR: dist directory not found!');
    process.exit(1);
  }
  
  // Check if index.html exists
  const indexPath = './dist/index.html';
  if (!fs.existsSync(indexPath)) {
    console.error('❌ ERROR: index.html not found in dist directory!');
    process.exit(1);
  }
  
  console.log('✅ index.html found at correct location');
  
  // Show directory structure
  console.log('\n📁 Complete directory structure:');
  execSync('find dist -type f | head -20', { stdio: 'inherit' });
  
  // Check index.html content
  console.log('\n📄 Index.html first few lines:');
  execSync('head -10 dist/index.html', { stdio: 'inherit' });
  
  // Check file sizes
  console.log('\n📊 File sizes:');
  execSync('du -h dist/index.html dist/assets/* | head -10', { stdio: 'inherit' });
  
  // Create a simple test HTML file
  console.log('\n🧪 Creating test page...');
  const testHtml = `<!DOCTYPE html>
<html>
<head>
    <title>Cloudflare Test</title>
</head>
<body>
    <h1>Cloudflare Pages Test</h1>
    <p>If you see this, the basic deployment is working.</p>
    <p>Timestamp: ${new Date().toISOString()}</p>
</body>
</html>`;
  
  fs.writeFileSync('./dist/test.html', testHtml);
  console.log('✅ Created test.html - try accessing /test.html on your Cloudflare site');
  
  console.log('\n🎯 Cloudflare Pages Configuration Check:');
  console.log('Build command should be: node cloudflare-build.js');
  console.log('Output directory should be: dist');
  console.log('Node version should be: 18 or higher');
  
  console.log('\n✅ Debug complete. Check the structure above and test.html');
  
} catch (error) {
  console.error('❌ Debug failed:', error.message);
  process.exit(1);
}