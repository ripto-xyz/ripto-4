# Overview

This is a personal portfolio website for Laurence (ripto.eth), showcasing Web3 marketing and growth services. The site is built as a modern single-page application with a video background, smooth scrolling between sections, and a focus on blockchain/cryptocurrency projects. The application features a full-stack architecture with React frontend and Express backend, designed to handle both development and static deployment scenarios.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for build tooling
- **Styling**: Tailwind CSS with custom design system using shadcn/ui components
- **State Management**: TanStack Query for server state management
- **Navigation**: Single-page application with smooth scrolling between sections and wheel/trackpad navigation
- **Responsive Design**: Mobile-first approach with custom breakpoints and adaptive layouts

## Backend Architecture
- **Server**: Express.js with TypeScript running on Node.js
- **API Structure**: RESTful endpoints with JSON responses
- **Session Management**: Express sessions with PostgreSQL storage via connect-pg-simple
- **File Serving**: Static asset serving for images, videos, and fonts
- **Database**: Drizzle ORM with PostgreSQL for data persistence

## Data Storage
- **Primary Database**: PostgreSQL with Drizzle ORM for schema management
- **Tables**: Users table for authentication and contacts table for form submissions
- **Migrations**: Drizzle Kit handles database schema migrations
- **Fallback Storage**: In-memory storage implementation for development/testing

## Build System
- **Development**: Vite dev server with HMR and React Fast Refresh
- **Production**: Multiple build configurations for different deployment scenarios
  - `vite.config.ts`: Development build (outputs to `dist/public`)
  - `vite.config.static.ts`: Universal static deployment build (outputs to `dist`)
  - `vite.config.prod.ts`: Production build (outputs to `dist` for deployment)
- **Static Deployment**: Use `build-universal.js` script for universal static hosting
- **Full-Stack Deployment**: Use `build-deploy.js` script for complete application
- **Asset Handling**: Video compression and optimization for web delivery

## Deployment Scripts
- **build-universal.js**: Universal static build for all hosting platforms (Recommended)
- **build-static.js**: Frontend-only build for static hosting
- **build-deploy.js**: Full-stack build including backend server
- **cloudflare-build.js**: Legacy Cloudflare Pages build (deprecated)

## Static Hosting Fix (August 2025)
- **Issue**: External hosting platforms (Cloudflare Pages, Netlify) couldn't locate files
- **Root Cause**: Backend API dependencies and incorrect build configuration
- **Solution**: Created universal static build with proper fallback system
- **Status**: Fixed - now compatible with all major static hosting platforms

## Deployment Strategies
- **Full-Stack**: Traditional hosting with both frontend and backend
- **Static Only**: Cloudflare Pages deployment with fallback to static JSON files
- **Environment Detection**: Automatic fallback to static assets when backend is unavailable

# External Dependencies

## Core Technologies
- **@neondatabase/serverless**: PostgreSQL database connection for serverless environments
- **drizzle-orm & drizzle-kit**: Type-safe SQL ORM and migration tooling
- **@tanstack/react-query**: Server state management and caching
- **express**: Web application framework for the backend API

## UI Components
- **@radix-ui/***: Comprehensive set of unstyled, accessible React components
- **@tailwindcss/vite**: Tailwind CSS integration with Vite
- **shadcn/ui**: Pre-built component library built on Radix UI primitives
- **lucide-react**: Icon library for consistent iconography

## Development Tools
- **tsx**: TypeScript execution for development server
- **@replit/vite-plugin-***: Replit-specific development plugins for enhanced DX
- **@vitejs/plugin-react**: React support for Vite with Fast Refresh

## Media & Assets
- **Video Background**: Spyro-themed video content for immersive experience
- **Custom Fonts**: Lithograph Bold font for branding elements
- **Static Assets**: Portfolio images, character graphics, and brand assets

## Form Handling
- **react-hook-form**: Form state management and validation
- **@hookform/resolvers**: Schema validation integration
- **zod**: Runtime type validation for form data and API responses

## Third-Party Services
- **Cloudflare Pages**: Static hosting with global CDN distribution
- **Unsplash**: Portfolio placeholder images via API integration
- **Google Fonts**: Web font loading for Inter and Poppins typefaces