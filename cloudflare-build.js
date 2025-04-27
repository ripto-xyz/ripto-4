// Script to build only the frontend for Cloudflare Pages
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Run the Vite build
console.log('Building frontend for Cloudflare Pages...');
execSync('vite build', { stdio: 'inherit' });

// Copy the output from dist/public to dist
console.log('Preparing output for Cloudflare Pages...');
fs.cpSync(path.resolve('./dist/public'), path.resolve('./dist'), { recursive: true });

console.log('Build complete! The output is in the ./dist directory');