# Cloudflare Pages Setup - Manual Configuration Required

## Issue Resolved
The wrangler.toml `[build]` section is not supported by Cloudflare Pages. The configuration must be set manually in the Cloudflare dashboard.

## Fixed wrangler.toml
Updated to only include supported settings:
```toml
name = "ripto-4"
compatibility_date = "2024-08-16"
pages_build_output_dir = "./dist"
```

## Manual Configuration Required

You must set these settings **manually in your Cloudflare Pages dashboard**:

### Build & Deployments Settings
1. Go to your Cloudflare Pages project
2. Navigate to Settings > Build & deployments
3. Set these exact values:

**Build Configuration:**
- Framework preset: `None`
- Build command: `node build-static.js`
- Build output directory: `dist`
- Root directory: (leave empty)

**Environment Variables:**
- Add variable: `NODE_VERSION` = `18`

### Alternative Build Commands (try in order):
1. `node build-static.js` (recommended)
2. `node build-universal.js`
3. `vite build --config vite.config.static.ts`

## Verification
After updating the dashboard settings and triggering a new deployment, you should see:
```
../dist/index.html                           0.54 kB
```

## Why Manual Configuration is Required
Cloudflare Pages doesn't support build commands in wrangler.toml for Pages projects - only for Workers. The build configuration must be set through the web dashboard.

This manual setup will resolve the deployment issues you've been experiencing.