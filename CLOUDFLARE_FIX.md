# Cloudflare Pages: index.html Not Found - SOLUTION

## The Problem
Cloudflare Pages can't locate your index.html file even though it exists in the dist directory.

## Root Cause
This happens when Cloudflare Pages looks for files in the wrong directory or the build output path doesn't match the expected structure.

## EXACT SETTINGS FOR YOUR CLOUDFLARE DASHBOARD

### Build Configuration
```
Framework preset: None
Build command: npm run build
Build output directory: dist
Root directory: (leave empty)
Node.js version: 18
```

### Alternative Build Commands (try in this order)
1. `npm run build`
2. `npx vite build --config vite.config.prod.ts`
3. `node build-static.js`

## Verify Your Directory Structure

Your build creates this structure (which is correct):
```
dist/
├── index.html          ← This is what Cloudflare needs
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── [other assets]
├── _redirects
└── _headers
```

## Step-by-Step Fix

1. **In Cloudflare Pages Dashboard:**
   - Go to your project settings
   - Build & deployments section
   - Set "Build output directory" to exactly: `dist`
   - NO leading slash, NO ./dist, just: `dist`

2. **Environment Variables:**
   - Add `NODE_VERSION` = `18`

3. **Trigger New Build:**
   - Deploy from Git dashboard
   - Or retry deployment

## Common Mistakes That Cause This Error

❌ **Wrong:** Build output directory = `dist/public`
✅ **Right:** Build output directory = `dist`

❌ **Wrong:** Build output directory = `/dist`  
✅ **Right:** Build output directory = `dist`

❌ **Wrong:** Build output directory = `./dist`
✅ **Right:** Build output directory = `dist`

## Test Your Fix

After deployment, these should work:
- `https://your-domain.pages.dev/` (main site)
- `https://your-domain.pages.dev/test.html` (test page)
- `https://your-domain.pages.dev/build-success.txt` (build verification)

## If Still Not Working

Check your Cloudflare build logs for:
1. Does the build command complete successfully?
2. Do you see files being created in the dist directory?
3. Any "permission denied" or "file not found" errors?

The key is that Cloudflare Pages must be configured to look in the `dist` directory where your `index.html` actually exists.