# Cloudflare Pages Build Command Fix

## Issue Resolved
The build was failing with "vite: not found" because Cloudflare Pages environment doesn't have vite globally installed. Fixed by using `npx vite` instead of `vite` directly.

## Fixed Build Scripts
Updated all build scripts to use proper Node.js module execution:
- `simple-cf-build.js`: Changed to `npx vite build --config vite.config.static.ts`
- `build-static.js`: Changed to `npx vite build --config vite.config.static.ts`  
- `build-universal.js`: Changed to `npx vite build --config vite.config.static.ts`

## Cloudflare Pages Configuration
**Use these settings in your dashboard:**

### Build Configuration
- **Framework preset**: None
- **Build command**: `node simple-cf-build.js`
- **Build output directory**: `dist`
- **Root directory**: (leave empty)

### Environment Variables
- `NODE_VERSION`: `18`

## Expected Result
Your next deployment should:
- ✅ Successfully run the build command
- ✅ Show `../dist/index.html` in build output
- ✅ Deploy without errors
- ✅ Load your site properly

The vite command error has been resolved by using npx for proper module execution in the Cloudflare environment.