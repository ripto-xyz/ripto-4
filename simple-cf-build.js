#!/usr/bin/env node

// Simple Cloudflare Pages build - no config files needed
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🚀 Building for Cloudflare Pages...');

// Clean and build
if (fs.existsSync('dist')) fs.rmSync('dist', { recursive: true, force: true });
execSync('npx vite build --config vite.config.static.ts', { stdio: 'inherit' });

// Create required API files
const apiDir = path.join('dist', 'api');
fs.mkdirSync(apiDir, { recursive: true });

const aboutData = {
  stats: [
    { value: "50+", label: "Projects Launched" },
    { value: "$100M+", label: "Total Raised" },
    { value: "₿TC", label: "first purchased from an ATM..." },
    { value: "8 Years", label: "Web3 Experience" }
  ],
  technologies: ["Blockchain", "DeFi", "NFTs", "DAOs", "Metaverse", "Web3 Social"]
};

const portfolioData = [
  {
    id: "defi-protocol-launch",
    title: "DeFi Protocol Launch",
    categories: "Strategy, Community, Fundraising",
    imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Led go-to-market strategy for DeFi protocol, building 50K+ community and raising $25M."
  }
];

fs.writeFileSync(path.join(apiDir, 'about.json'), JSON.stringify(aboutData));
fs.writeFileSync(path.join(apiDir, 'portfolio.json'), JSON.stringify(portfolioData));

console.log('✅ Build complete! Deploy ./dist to any static hosting platform');