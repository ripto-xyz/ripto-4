# Cloudflare Pages Setup Guide

## Build Configuration for Cloudflare Pages

### Required Settings in Cloudflare Pages Dashboard:

1. **Build command:** `node cloudflare-build.js`
2. **Build output directory:** `dist`
3. **Node.js version:** `18` or higher
4. **Environment variables:** None required for static deployment

### Alternative Build Commands (if needed):
- `npm run build` (uses default config)
- `node build-static.js` (also works)

## Troubleshooting the 404 Error

If you're getting "No webpage was found" error, check these settings:

### 1. Verify Build Output Directory
- Should be set to `dist` (not `dist/public`)
- The build creates `index.html` at `dist/index.html`

### 2. Check Build Command
Current recommended: `node cloudflare-build.js`

### 3. Verify Build Success
In Cloudflare Pages build logs, you should see:
```
✅ Cloudflare Pages build complete!
📁 Output directory: ./dist/
🌐 Ready for Cloudflare Pages deployment
```

### 4. Common Issues & Fixes

**Issue:** Build fails with missing dependencies
**Fix:** Ensure Node.js version is set to 18+ in Cloudflare Pages settings

**Issue:** 404 on deployment
**Fix:** Check that "Build output directory" is set to `dist` (not `public` or `dist/public`)

**Issue:** Assets not loading
**Fix:** Verify the `_redirects` file contains: `/* /index.html 200`

### 5. Manual Verification Steps

You can test the build locally:
```bash
# Run the build
node cloudflare-build.js

# Check the output
ls -la dist/
# Should show index.html at the root

# Test locally (optional)
npx serve dist
```

## Current Build Process

The updated `cloudflare-build.js` script:
1. Uses `vite.config.prod.ts` for correct output structure
2. Builds directly to `dist/` directory
3. Includes all necessary files for static hosting
4. Shows build verification in logs

## Files Structure After Build

```
dist/
├── index.html          # Main entry point
├── assets/             # JS, CSS, images, video
├── _headers           # Security headers
├── _redirects         # SPA routing
├── api/               # Static JSON files
├── favicon.ico
└── favicon.png
```

## Next Steps

1. Update your Cloudflare Pages build settings to use the new configuration
2. Trigger a new deployment
3. Check the build logs for the success message
4. Visit your site - it should now work correctly

If the issue persists, check the Cloudflare Pages build logs for specific error messages.