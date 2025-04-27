# Deploying to Cloudflare Pages

This guide will help you deploy the static frontend portion of this application to Cloudflare Pages.

## Build Configuration

When setting up your project in Cloudflare Pages, use the following settings:

- **Build command**: `vite build`
- **Build output directory**: `dist/public`
- **Root directory**: (leave blank to use the repository root)

## Environment Variables

No specific environment variables are required for the frontend deployment.

## Pages Functions (Optional)

If you need API functionality, consider using Cloudflare Pages Functions to replace the Express backend. This would require additional configuration.

## Custom Domain Setup

After deployment, you can configure a custom domain in the Cloudflare Pages dashboard:

1. Go to your project in Cloudflare Pages
2. Navigate to the "Custom domains" tab
3. Click "Set up a custom domain"
4. Follow the instructions to add your domain

## Content Delivery

Cloudflare Pages automatically serves your content through Cloudflare's global CDN, providing:

- Global distribution
- DDoS protection
- SSL certificates
- Caching optimization

## Static Site Limitations

The deployed site on Cloudflare Pages will be a static version. The backend API functionality (contact form submission) will not work unless you implement Cloudflare Pages Functions or point the frontend to an external API endpoint.

## Testing Before Deployment

Before deploying, test the static build locally:

```bash
npm run build
npx serve dist/public
```

This will create a production build and serve it locally, allowing you to verify it works correctly without backend dependencies.