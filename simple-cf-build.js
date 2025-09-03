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
    description: "For Everclear's rebrand from Connext, I led the repositioning from a B2C to B2B focus, coupled with a token migration introducing new utility. Our approach ensured a sequential rollout: communicating changes in order, their impact on users and the project, and the sunsetting of the old offering. When the initial tagline fell short, I revisited it from first principles—emphasizing our shift from competing with projects to supporting them—and proposed \"The Backbone of Bridging,\" a self-explanatory alternative to vague phrases like \"the first clearing layer.\"",
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
    description: "To promote Everclear's new token staking feature, we targeted a native Web3 audience familiar with similar protocols, clearly communicating the project's value, token mechanics, and incentives through a partnership with ad company Slise. I leveraged Dune Analytics to identify and segment users of comparable staking protocols. Collaborating with a graphic designer, I developed concept drafts for visuals and conducted A/B testing within the live ad campaign, achieving a 0.45% CTR that resulted in a 3.8% increase in protocol staking.",
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
    description: "Previously, content creation felt reactive, often resulting in filler posts due to a lack of structured ideas. To address this, I established a comprehensive content calendar, ensuring a consistent flow of high-quality topics across categories like educational content, thought leadership, partnerships, and community engagement. I also revamped post formatting for greater appeal—making them concise, readable, and engaging—while providing concept graphics to guide the designer and emphasizing high-quality, appropriate replies to user interactions. By directing this content marketing campaign, I elevated key engagement KPIs by 204% within three months.",
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

fs.writeFileSync(path.join(apiDir, 'about.json'), JSON.stringify(aboutData));
fs.writeFileSync(path.join(apiDir, 'portfolio.json'), JSON.stringify(portfolioData));

console.log('✅ Build complete! Deploy ./dist to any static hosting platform');