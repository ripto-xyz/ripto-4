#!/usr/bin/env node

// Cloudflare Pages compatible build script
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('Building for Cloudflare Pages...');

try {
  // Clean dist directory
  if (fs.existsSync('dist')) {
    fs.rmSync('dist', { recursive: true, force: true });
  }

  // Run the static build
  execSync('vite build --config vite.config.static.ts', { stdio: 'inherit' });

  // Ensure static JSON files exist
  const apiDir = path.join('dist', 'api');
  if (!fs.existsSync(apiDir)) {
    fs.mkdirSync(apiDir, { recursive: true });
  }

  // Create about.json
  const aboutData = {
    stats: [
      { value: "50+", label: "Projects Launched" },
      { value: "$100M+", label: "Total Raised" },
      { value: "₿TC", label: "first purchased from an ATM..." },
      { value: "8 Years", label: "Web3 Experience" }
    ],
    technologies: ["Blockchain", "DeFi", "NFTs", "DAOs", "Metaverse", "Web3 Social"]
  };
  fs.writeFileSync(path.join(apiDir, 'about.json'), JSON.stringify(aboutData));

  // Create portfolio.json
  const portfolioData = [
    {
      id: "defi-protocol-launch",
      title: "DeFi Protocol Launch",
      categories: "Strategy, Community, Fundraising",
      imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Led the go-to-market strategy for a new DeFi protocol, building community from 0 to 50,000+ members and raising $25M in seed funding."
    },
    {
      id: "dao-governance-design",
      title: "DAO Governance Design",
      categories: "Strategy, Governance Design, Content",
      imageUrl: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Designed governance framework for a DeFi DAO, resulting in 5x membership increase and successful protocol upgrades."
    }
  ];
  fs.writeFileSync(path.join(apiDir, 'portfolio.json'), JSON.stringify(portfolioData));

  console.log('Cloudflare Pages build complete!');
  console.log('Output directory: ./dist');

} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}