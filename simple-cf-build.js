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
    title: "Press Releases & Co-marketing",
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

fs.writeFileSync(path.join(apiDir, 'about.json'), JSON.stringify(aboutData));
fs.writeFileSync(path.join(apiDir, 'portfolio.json'), JSON.stringify(portfolioData));

console.log('✅ Build complete! Deploy ./dist to any static hosting platform');