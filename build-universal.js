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
        id: "go-to-market-strategy",
        title: "Go-to-Market Rebrand Strategy",
        categories: "Strategy, Rebranding, Market Positioning",
        imageUrl: "https://images.unsplash.com/photo-1639762681057-408e52192e55?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Comprehensive go-to-market strategy and rebranding for Web3 projects entering new markets or repositioning their brand identity.",
        challenge: "Redefine brand positioning in a competitive Web3 landscape while maintaining core values and community trust during transition.",
        solution: "Developed a multi-phase rebranding strategy with market research, competitive analysis, and community-driven messaging framework.",
        results: "Successfully repositioned brand with 40% increase in market awareness, 60% growth in community engagement, and improved brand perception scores.",
        testimonial: {
          text: "Laurence's rebranding strategy transformed our market position. His strategic approach helped us stand out while staying true to our community values.",
          author: "Alex Chen, Founder"
        },
        technologies: ["Market Research", "Brand Strategy", "Community Feedback", "Competitive Analysis", "Positioning"]
      },
      {
        id: "native-web3-advertising",
        title: "Native Web3 Paid Advertising",
        categories: "Paid Media, Web3 Advertising, Performance Marketing",
        imageUrl: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Specialized Web3-native advertising campaigns across decentralized platforms and crypto-focused media channels.",
        challenge: "Navigate Web3 advertising restrictions while reaching crypto-native audiences through authentic, non-intrusive ad experiences.",
        solution: "Created native advertising campaigns across Web3 media, DeFi platforms, and crypto communities with performance tracking.",
        results: "Achieved 3.2x ROAS across Web3 channels, 45% lower CPA than traditional advertising, and 25% higher engagement rates.",
        testimonial: {
          text: "The Web3 advertising approach was game-changing. Laurence understood how to reach crypto audiences authentically without feeling like traditional ads.",
          author: "Maya Williams, CMO"
        },
        technologies: ["DeFi Pulse", "CoinGecko", "Web3 Media", "Crypto Twitter", "Native Advertising"]
      },
      {
        id: "content-marketing-socials",
        title: "Content Marketing & Socials",
        categories: "Content Strategy, Social Media, Community Engagement",
        imageUrl: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Comprehensive content strategy and social media management tailored for Web3 audiences across all major platforms.",
        challenge: "Create engaging, educational content that builds trust and authority while navigating complex Web3 topics for diverse audiences.",
        solution: "Developed content calendar with educational threads, community spotlights, technical explanations, and engagement-driven social strategies.",
        results: "Grew social following by 300%, increased engagement rates by 150%, and generated 500k+ monthly impressions across platforms.",
        testimonial: {
          text: "The content strategy transformed our social presence. Laurence created content that educated our community while building genuine engagement.",
          author: "Samantha Lee, Community Manager"
        },
        technologies: ["Twitter", "Discord", "Medium", "YouTube", "LinkedIn", "Content Planning"]
      },
      {
        id: "community-engagement",
        title: "Community Engagement",
        categories: "Community Management, Engagement, Growth Strategy",
        imageUrl: "https://images.unsplash.com/photo-1622630998477-20aa696ecb05?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Strategic community engagement and management services focused on creating engaged, loyal Web3 communities that drive organic growth.",
        challenge: "Build authentic Web3 communities that move beyond airdrop hunters to create genuine value and long-term engagement.",
        solution: "Implemented community frameworks with gamification, exclusive benefits, educational content, and member recognition programs.",
        results: "Built community of 25,000+ active members, achieved 80% monthly retention rate, and generated 200+ organic referrals monthly.",
        testimonial: {
          text: "Laurence built a community that feels like a family. The engagement and loyalty we achieved goes far beyond typical Web3 communities.",
          author: "David Park, Founder"
        },
        technologies: ["Discord", "Telegram", "Community Tools", "Gamification", "Member Analytics"]
      },
      {
        id: "press-releases-comarketing",
        title: "Press Releases & Collaborations",
        categories: "Public Relations, Partnership Marketing, Media Relations",
        imageUrl: "https://images.unsplash.com/photo-1639322537138-5e513100b36e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Professional press release distribution and strategic co-marketing partnerships to amplify brand reach and credibility.",
        challenge: "Generate mainstream and crypto media coverage while establishing credible co-marketing partnerships in the competitive Web3 space.",
        solution: "Created comprehensive media outreach strategy with targeted press releases, journalist relationships, and strategic partnership campaigns.",
        results: "Secured coverage in 50+ publications, established 15 co-marketing partnerships, and achieved 2M+ earned media impressions.",
        testimonial: {
          text: "The media coverage and partnerships Laurence secured gave us the credibility boost we needed. His relationships in crypto media are invaluable.",
          author: "Michael Rodriguez, Head of Marketing"
        },
        technologies: ["PR Distribution", "Media Outreach", "Partnership Tools", "Press Monitoring", "Co-marketing Platforms"]
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