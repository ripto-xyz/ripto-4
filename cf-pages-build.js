#!/usr/bin/env node

// Cloudflare Pages build script with explicit file verification
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('Starting Cloudflare Pages build...');

try {
  // Clean dist directory
  if (fs.existsSync('dist')) {
    console.log('Cleaning previous build...');
    fs.rmSync('dist', { recursive: true, force: true });
  }

  // Run the build
  console.log('Running build command...');
  execSync('npx vite build --config vite.config.prod.ts', { stdio: 'inherit' });

  // Verify index.html exists
  const indexPath = path.join('dist', 'index.html');
  if (!fs.existsSync(indexPath)) {
    throw new Error('index.html not found in dist directory after build');
  }

  console.log('Build successful!');
  console.log('Files in dist directory:');
  execSync('ls -la dist/', { stdio: 'inherit' });

  // Create a simple verification file
  fs.writeFileSync(path.join('dist', 'build-success.txt'), `Build completed at ${new Date().toISOString()}`);

} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}