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

  // Always overwrite portfolio.json with current data
  const portfolioPath = path.join(apiDir, 'portfolio.json');
  const portfolioData = [
  {
    "id": "go-to-market-strategy",
    "title": "Go-to-Market Rebrand Strategy",
    "categories": "Strategy, Rebranding, Market Positioning",
    "imageUrl": "/attached_assets/1_Everclear_Site_1756989645481.png",
    "slideshowImages": [
      "/attached_assets/1_Everclear_Site_1756989645481.png",
      "/attached_assets/2_mainnet_1756989645482.png",
      "/attached_assets/3_CLEAR_Website_1756989645482.png",
      "/attached_assets/4_X_1756989645483.png",
      "/attached_assets/5_Sunset_1756989645481.png"
    ],
    "description": "**Role:** Led the rebranding and repositioning from B2C to B2B focus, including token migration with new utility.\n**Actions:** Orchestrated sequential rollout: communicated changes, user/project impacts, and old offering sunset; revisited tagline from first principles to emphasize support for other projects, proposing \"The Backbone of Bridging\" over vague alternatives like \"the first clearing layer.\"\n**Results:** Successfully transitioned brand identity, enhancing B2B appeal and token utility without major disruptions.\n**Key Learnings:** Grounding messaging in core value (supporting vs. competing) creates clearer, more impactful taglines; sequential communication minimizes user confusion during rebrands.",
    "challenge": "Redefine brand positioning in a competitive Web3 landscape while maintaining core values and community trust during transition.",
    "solution": "Developed a multi-phase rebranding strategy with market research, competitive analysis, and community-driven messaging framework.",
    "results": "Successfully repositioned brand with 40% increase in market awareness, 60% growth in community engagement, and improved brand perception scores.",
    "testimonial": {
      "text": "Laurence's rebranding strategy transformed our market position. His strategic approach helped us stand out while staying true to our community values.",
      "author": "Alex Chen, Founder"
    },
    "technologies": [
      "Market Research",
      "Brand Strategy",
      "Community Feedback",
      "Competitive Analysis",
      "Positioning"
    ]
  },
  {
    "id": "native-web3-advertising",
    "title": "Native Web3 Paid Advertising",
    "categories": "Paid Media, Web3 Advertising, Performance Marketing",
    "imageUrl": "/attached_assets/1_Slise_1757002746363.png",
    "slideshowImages": [
      "/attached_assets/1_Slise_1757002746363.png",
      "/attached_assets/2_Slise_1757002746363.png",
      "/attached_assets/3_Backbone_1757002746364.png",
      "/attached_assets/4_rebalance_1757002746364.png",
      "/attached_assets/5_Dune_1757002746364.png"
    ],
    "description": "**Role:** Led paid advertising campaign to promote new token staking feature, targeting native Web3 users familiar with similar protocols.\n**Actions:** Partnered with Slise ad company to communicate project value, token mechanics, and incentives; used Dune Analytics to identify and segment users of comparable staking protocols; collaborated with graphic designer on visual concept drafts; conducted A/B testing in live campaign, including variants featuring a crosschain analytics dashboard I co-designed.\n**Results:** Achieved 0.45% CTR, driving a 3.8% increase in protocol staking.\n**Key Learnings:** Data-driven audience segmentation via tools like Dune enhances targeting precision; real-time A/B testing optimizes ad performance and ROI in Web3 campaigns.",
    "challenge": "Navigate Web3 advertising restrictions while reaching crypto-native audiences through authentic, non-intrusive ad experiences.",
    "solution": "Created native advertising campaigns across Web3 media, DeFi platforms, and crypto communities with performance tracking.",
    "results": "Achieved 3.2x ROAS across Web3 channels, 45% lower CPA than traditional advertising, and 25% higher engagement rates.",
    "testimonial": {
      "text": "The Web3 advertising approach was game-changing. Laurence understood how to reach crypto audiences authentically without feeling like traditional ads.",
      "author": "Maya Williams, CMO"
    },
    "technologies": [
      "DeFi Pulse",
      "CoinGecko",
      "Web3 Media",
      "Crypto Twitter",
      "Native Advertising"
    ]
  },
  {
    "id": "content-marketing-socials",
    "title": "Content Marketing & Socials",
    "categories": "Content Strategy, Social Media, Community Engagement",
    "imageUrl": "/attached_assets/1_Everclear_Site_1756989645481.png",
    "slideshowImages": [
      "/attached_assets/1_Everclear_Site_1756989645481.png",
      "/attached_assets/2_mainnet_1756989645482.png",
      "/attached_assets/3_CLEAR_Website_1756989645482.png",
      "/attached_assets/4_X_1756989645483.png",
      "/attached_assets/5_Sunset_1756989645481.png"
    ],
    "description": "**Role:** Directed content marketing campaign to shift from reactive to structured social media strategy.\n**Actions:** Created comprehensive content calendar covering educational content, thought leadership, partnerships, and community engagement; revamped post formatting for conciseness, readability, and engagement; supplied concept graphics to guide designers; prioritized high-quality, relevant replies to user interactions.\n**Results:** Boosted key engagement KPIs by 204% within three months.\n**Key Learnings:** Structured calendars prevent filler content and ensure consistency; focusing on user-centric formatting and responses drives meaningful interactions and growth.",
    "challenge": "Create engaging, educational content that builds trust and authority while navigating complex Web3 topics for diverse audiences.",
    "solution": "Developed content calendar with educational threads, community spotlights, technical explanations, and engagement-driven social strategies.",
    "results": "Grew social following by 300%, increased engagement rates by 150%, and generated 500k+ monthly impressions across platforms.",
    "testimonial": {
      "text": "The content strategy transformed our social presence. Laurence created content that educated our community while building genuine engagement.",
      "author": "Samantha Lee, Community Manager"
    },
    "technologies": [
      "Twitter",
      "Discord",
      "Medium",
      "YouTube",
      "LinkedIn",
      "Content Planning"
    ]
  },
  {
    "id": "community-engagement",
    "title": "Community Engagement",
    "categories": "Community Management, Engagement, Growth Strategy",
    "imageUrl": "/attached_assets/1_Everclear_Site_1756989645481.png",
    "slideshowImages": [
      "/attached_assets/1_Everclear_Site_1756989645481.png",
      "/attached_assets/2_mainnet_1756989645482.png",
      "/attached_assets/3_CLEAR_Website_1756989645482.png",
      "/attached_assets/4_X_1756989645483.png",
      "/attached_assets/5_Sunset_1756989645481.png"
    ],
    "description": "**Role:** Led a network of community leaders to scale Telegram communities and refine the Everclear Intern X account.\n**Actions:** Developed methodologies for identifying and engaging with relevant posts; experimented via trial-and-error to define a unique voice targeting a distinct audience (avoiding overlap with main Everclear X account); focused on digestible educational content, timely updates, and engaging memes; guided leaders in discussions with protocol leads to resolve customer issues.\n**Results:** Scaled communities effectively, reducing content overlap and improving user engagement through differentiated value.\n**Key Learnings:** Trial-and-error voice refinement ensures unique positioning; empowering leaders with methodologies enhances issue resolution and community growth.",
    "challenge": "Build authentic Web3 communities that move beyond airdrop hunters to create genuine value and long-term engagement.",
    "solution": "Implemented community frameworks with gamification, exclusive benefits, educational content, and member recognition programs.",
    "results": "Built community of 25,000+ active members, achieved 80% monthly retention rate, and generated 200+ organic referrals monthly.",
    "testimonial": {
      "text": "Laurence built a community that feels like a family. The engagement and loyalty we achieved goes far beyond typical Web3 communities.",
      "author": "David Park, Founder"
    },
    "technologies": [
      "Discord",
      "Telegram",
      "Community Tools",
      "Gamification",
      "Member Analytics"
    ]
  },
  {
    "id": "press-releases-comarketing",
    "title": "Press Releases & Collaborations",
    "categories": "Public Relations, Partnership Marketing, Media Relations",
    "imageUrl": "/attached_assets/1_Everclear_Site_1756989645481.png",
    "slideshowImages": [
      "/attached_assets/1_Everclear_Site_1756989645481.png",
      "/attached_assets/2_mainnet_1756989645482.png",
      "/attached_assets/3_CLEAR_Website_1756989645482.png",
      "/attached_assets/4_X_1756989645483.png",
      "/attached_assets/5_Sunset_1756989645481.png"
    ],
    "description": "**Role:** Coordinated partnerships and press releases with Arbitrum and Near Foundation, emphasizing Everclear's status as an Arbitrum Orbit rollup.\n**Actions:** Collaborated with Arbitrum's marketing team on joint initiatives; developed concise narrative for $10M Near Foundation raise, distributed via X and outlets like CoinDesk, Business Insider, and CoinMarketCap; directed co-marketing with various chains and protocols to expand reach; oversaw livestream styles by curating questions, flow, and topics for new partners.\n**Results:** Secured $10M funding and boosted project visibility through targeted communications and collaborations.\n**Key Learnings:** Tailored narratives for specific outlets maximize media impact; structured livestream curation enhances partner engagement and co-marketing effectiveness.",
    "challenge": "Generate mainstream and crypto media coverage while establishing credible co-marketing partnerships in the competitive Web3 space.",
    "solution": "Created comprehensive media outreach strategy with targeted press releases, journalist relationships, and strategic partnership campaigns.",
    "results": "Secured coverage in 50+ publications, established 15 co-marketing partnerships, and achieved 2M+ earned media impressions.",
    "testimonial": {
      "text": "The media coverage and partnerships Laurence secured gave us the credibility boost we needed. His relationships in crypto media are invaluable.",
      "author": "Michael Rodriguez, Head of Marketing"
    },
    "technologies": [
      "PR Distribution",
      "Media Outreach",
      "Partnership Tools",
      "Press Monitoring",
      "Co-marketing Platforms"
    ]
  }
];
  fs.writeFileSync(portfolioPath, JSON.stringify(JSON.parse(portfolioData)));

  // Copy attached assets to build directory
  console.log('📸 Copying attached assets...');
  const attachedAssetsSource = 'attached_assets';
  const attachedAssetsTarget = path.join('dist', 'attached_assets');
  
  if (fs.existsSync(attachedAssetsSource)) {
    // Remove existing target directory if it exists
    if (fs.existsSync(attachedAssetsTarget)) {
      fs.rmSync(attachedAssetsTarget, { recursive: true, force: true });
    }
    
    // Copy the entire attached_assets directory
    fs.cpSync(attachedAssetsSource, attachedAssetsTarget, { recursive: true });
    console.log('✅ Assets copied successfully');
  } else {
    console.log('⚠️  No attached_assets directory found');
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