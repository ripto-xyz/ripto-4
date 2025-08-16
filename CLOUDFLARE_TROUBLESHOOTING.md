# Cloudflare Pages Troubleshooting Guide

Since you're still getting a 404 error, let's work through the most common issues:

## 1. Try These Build Configurations

### Option A: Simple Build Command
In Cloudflare Pages settings, try:
- Build command: `npm run build`
- Output directory: `dist`

### Option B: Static Build Script
- Build command: `node build-static.js`
- Output directory: `dist`

### Option C: Updated Cloudflare Script
- Build command: `node cloudflare-build.js`
- Output directory: `dist`

## 2. Check Your Cloudflare Pages Build Logs

Look for these specific indicators in your Cloudflare build logs:

**SUCCESS indicators:**
- Build completes without errors
- Shows files like `index.html` being created
- No "command not found" errors

**FAILURE indicators:**
- Node.js version errors
- Missing dependencies
- Command not found errors

## 3. Most Common Issues & Solutions

### Issue: Node.js Version
**Solution:** Set Node.js to version 18 in Cloudflare Pages environment variables:
- Variable: `NODE_VERSION`
- Value: `18`

### Issue: Build Command Not Found
**Solution:** Use absolute paths or npm scripts:
```
npx vite build --config vite.config.prod.ts
```

### Issue: Wrong Output Directory
**Solution:** Double-check that "Build output directory" is exactly `dist` (no leading slash, no `./dist`)

## 4. Alternative: Try Manual Upload

If automated builds keep failing:
1. Run `node cloudflare-build.js` locally
2. Download the `dist` folder
3. Use Cloudflare Pages direct upload feature

## 5. Test the Simple Version

I created a test.html file. Try accessing:
`https://your-domain.pages.dev/test.html`

If the test page works but your main site doesn't, it's a React/SPA routing issue.

## 6. Check _redirects File

Your `_redirects` file should contain:
```
/* /index.html 200
```

## 7. Debug Steps for Build Logs

In your next Cloudflare build, look for:
1. Does `node cloudflare-build.js` run successfully?
2. Do you see "✅ Cloudflare Pages build complete!"?
3. Are files listed in the dist directory?
4. Any errors about missing files or permissions?

## Next Steps

Try Option A (npm run build) first as it's the simplest. If that doesn't work, share your Cloudflare build logs and I can help debug the specific error messages.