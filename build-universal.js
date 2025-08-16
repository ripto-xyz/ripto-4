#!/usr/bin/env node

// Universal build script that works on any static hosting platform
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🚀 Building for universal static deployment...');

try {
  // Clean previous build
  if (fs.existsSync('dist')) {
    console.log('🧹 Cleaning previous build...');
    fs.rmSync('dist', { recursive: true, force: true });
  }

  // Build with static config
  console.log('📦 Building with static configuration...');
  execSync('npx vite build --config vite.config.static.ts', { stdio: 'inherit' });
  
  // Ensure index.html is in root (not in dist/public)
  const publicIndexPath = path.join('dist', 'public', 'index.html');
  const rootIndexPath = path.join('dist', 'index.html');
  
  if (fs.existsSync(publicIndexPath) && !fs.existsSync(rootIndexPath)) {
    console.log('📁 Moving index.html to root directory...');
    fs.renameSync(publicIndexPath, rootIndexPath);
    
    // Also move assets if they're in public
    const publicAssetsPath = path.join('dist', 'public', 'assets');
    const rootAssetsPath = path.join('dist', 'assets');
    
    if (fs.existsSync(publicAssetsPath) && !fs.existsSync(rootAssetsPath)) {
      fs.renameSync(publicAssetsPath, rootAssetsPath);
    }
    
    // Remove empty public directory
    const publicDir = path.join('dist', 'public');
    if (fs.existsSync(publicDir)) {
      fs.rmSync(publicDir, { recursive: true, force: true });
    }
  }

  // Ensure all static JSON files exist
  console.log('📄 Ensuring static JSON files exist...');
  
  const apiDir = path.join('dist', 'api');
  if (!fs.existsSync(apiDir)) {
    fs.mkdirSync(apiDir, { recursive: true });
  }

  // Create about.json if it doesn't exist
  const aboutPath = path.join(apiDir, 'about.json');
  if (!fs.existsSync(aboutPath)) {
    const aboutData = {
      stats: [
        { value: "50+", label: "Projects Launched" },
        { value: "$100M+", label: "Total Raised" },
        { value: "₿TC", label: "first purchased from an ATM..." },
        { value: "8 Years", label: "Web3 Experience" }
      ],
      technologies: ["Blockchain", "DeFi", "NFTs", "DAOs", "Metaverse", "Web3 Social"]
    };
    fs.writeFileSync(aboutPath, JSON.stringify(aboutData));
  }

  // Create portfolio.json if it doesn't exist
  const portfolioPath = path.join(apiDir, 'portfolio.json');
  if (!fs.existsSync(portfolioPath)) {
    const portfolioData = [
      {
        id: "defi-protocol-launch",
        title: "DeFi Protocol Launch",
        categories: "Strategy, Community, Fundraising",
        imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Led the go-to-market strategy for a new DeFi protocol, building community from 0 to 50,000+ members and raising $25M in seed funding through strategic partnerships and influencer collaborations."
      },
      {
        id: "dao-governance-design",
        title: "DAO Governance Design",
        categories: "Strategy, Governance Design, Content",
        imageUrl: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Designed governance framework and growth strategy for a DeFi DAO, resulting in a 5x increase in membership and successful implementation of three major protocol upgrades."
      },
      {
        id: "layer-2-solution",
        title: "Layer 2 Solution",
        categories: "Technical Marketing, Developer Relations",
        imageUrl: "https://images.unsplash.com/photo-1622630998477-20aa696ecb05?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Created technical education content and developer outreach program for a Layer 2 scaling solution, attracting over 200 new developers to build on the platform within 3 months."
      },
      {
        id: "dex-growth-campaign",
        title: "DEX Growth Campaign", 
        categories: "User Acquisition, Content, Analytics",
        imageUrl: "https://images.unsplash.com/photo-1639322537138-5e513100b36e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Implemented a data-driven user acquisition strategy for a decentralized exchange, resulting in 150% growth in trading volume and 240% increase in daily active users."
      },
      {
        id: "metaverse-integration",
        title: "Metaverse Integration",
        categories: "Brand Strategy, Partnerships, Events",
        imageUrl: "https://images.unsplash.com/photo-1621504450181-5fdb1eaeb4c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Helped a traditional brand enter the metaverse through strategic partnerships with existing Web3 projects, including virtual events that attracted over 50,000 unique participants."
      }
    ];
    fs.writeFileSync(portfolioPath, JSON.stringify(portfolioData));
  }

  // Verify critical files exist
  console.log('✅ Verifying build output...');
  
  const criticalFiles = [
    'dist/index.html',
    'dist/api/about.json',
    'dist/api/portfolio.json'
  ];

  for (const file of criticalFiles) {
    if (!fs.existsSync(file)) {
      throw new Error(`Critical file missing: ${file}`);
    }
  }

  console.log('📊 Build statistics:');
  execSync('find dist -type f | wc -l', { stdio: 'inherit' });
  
  console.log('\n🎉 Universal static build complete!');
  console.log('📁 Deploy the ./dist directory to any static hosting platform');
  console.log('✅ Compatible with: Netlify, Vercel, Cloudflare Pages, GitHub Pages');

} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}