// Simplest possible Cloudflare build script
const { execSync } = require('child_process');

console.log('Building for Cloudflare Pages (simple version)...');

try {
  // Use npm run build which should use the default config
  execSync('npm run build', { stdio: 'inherit' });
  console.log('Build complete');
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}