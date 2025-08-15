# Deployment Guide

This project supports multiple deployment strategies depending on your hosting requirements.

## Quick Fix for Current Issue

The deployment error you encountered has been resolved. The issue was that the build was outputting files to `dist/public/index.html` instead of `dist/index.html`, which static hosting platforms expect.

**Solution Applied:**
- Created new build scripts that use the correct Vite configuration
- The production build now outputs directly to `dist/` directory
- `index.html` is now correctly located at `dist/index.html`

## Deployment Options

### 1. Static Deployment (Recommended for Frontend-Only)

For platforms like Netlify, Vercel, Cloudflare Pages, GitHub Pages:

```bash
# Build for static deployment
node build-static.js
```

**Output:** `./dist/` directory containing:
- `index.html` (main entry point)
- `assets/` (bundled CSS, JS, images)
- Other static assets

**Deploy Settings:**
- Build command: `node build-static.js`
- Publish directory: `dist`
- Node version: 18 or higher

### 2. Full-Stack Deployment

For platforms that support backend hosting (Railway, Render, Heroku):

```bash
# Build both frontend and backend
node build-deploy.js
```

**Output:** `./dist/` directory containing:
- Frontend files: `index.html`, `assets/`
- Backend file: `index.js` (Express server)

**Deploy Settings:**
- Build command: `node build-deploy.js`
- Start command: `npm start`
- Port: Auto-detected from environment

## File Structure After Build

```
dist/
├── index.html          # Main HTML file
├── assets/             # Bundled JS, CSS, images
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── [various assets]
├── index.js            # Backend server (full-stack only)
└── [other static files]
```

## Platform-Specific Instructions

### Netlify
1. Connect your repository
2. Build command: `node build-static.js`
3. Publish directory: `dist`

### Vercel
1. Import project from Git
2. Framework: Other
3. Build command: `node build-static.js`
4. Output directory: `dist`

### Cloudflare Pages
1. Connect repository
2. Build command: `node build-static.js`
3. Build output directory: `dist`

### Railway/Render (Full-Stack)
1. Connect repository
2. Build command: `node build-deploy.js`
3. Start command: `npm start`
4. Port: Environment variable `PORT`

## Troubleshooting

### Common Issues

1. **"index.html not found"**
   - Ensure you're using `build-static.js` for static deployment
   - Verify publish directory is set to `dist`

2. **Assets not loading**
   - Check if base URL is configured correctly
   - Ensure all assets are in the `dist/assets/` directory

3. **Build fails**
   - Run `npm install` to ensure dependencies are installed
   - Check Node.js version (requires 18+)

### Verification

After building, you can verify the output:

```bash
# Check build output
ls -la dist/

# Test locally (if you have a local server)
npx serve dist
```

## Legacy Scripts

- `cloudflare-build.js` - Deprecated, use `build-static.js` instead
- Default `npm run build` - Uses development config, not recommended for deployment

## Need Help?

If you encounter deployment issues:
1. Check that `index.html` exists in `dist/` directory
2. Verify your platform's build settings match the instructions above
3. Test the build locally before deploying