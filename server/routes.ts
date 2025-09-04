import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import fs from "fs";
import path from "path";
import { contactSchema } from "@shared/schema";
import express from "express";

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve static files including the optimized video
  app.use('/static', express.static(path.join(import.meta.dirname, '..', 'public')));
  
  // Serve attached assets (images, etc.)
  app.use('/attached_assets', express.static(path.join(import.meta.dirname, '..', 'attached_assets')));
  
  // Serve the video file
  app.get("/api/video", (req, res) => {
    const videoPath = path.join(import.meta.dirname, "..", "attached_assets", "spyro short.mov");
    
    if (fs.existsSync(videoPath)) {
      const stat = fs.statSync(videoPath);
      const fileSize = stat.size;
      const range = req.headers.range;
      
      if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        const chunksize = end - start + 1;
        const file = fs.createReadStream(videoPath, { start, end });
        
        res.writeHead(206, {
          'Content-Range': `bytes ${start}-${end}/${fileSize}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunksize,
          'Content-Type': 'video/quicktime'
        });
        
        file.pipe(res);
      } else {
        res.writeHead(200, {
          'Content-Length': fileSize,
          'Content-Type': 'video/quicktime'
        });
        
        fs.createReadStream(videoPath).pipe(res);
      }
    } else {
      res.status(404).send("Video not found");
    }
  });
  
  // Get portfolio items
  app.get("/api/portfolio", (req, res) => {
    return res.json([
      {
        id: "go-to-market-strategy",
        title: "Go-to-Market Rebrand Strategy",
        categories: "Strategy, Rebranding, Market Positioning",
        imageUrl: "https://picsum.photos/800/450?random=1001",
        slideshowImages: [
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzM3YWI3Ci8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2UgMTwvdGV4dD48L3N2Zz4=",
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNDI4NWY0Ci8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2UgMjwvdGV4dD48L3N2Zz4=",
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZWY0NDQ0Ci8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2UgMzwvdGV4dD48L3N2Zz4=",
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMTBiOTgxCi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2UgNDwvdGV4dD48L3N2Zz4=",
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjOGI1Y2Y2Ci8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2UgNTwvdGV4dD48L3N2Zz4="
        ],
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
        imageUrl: "https://picsum.photos/800/450?random=1002",
        slideshowImages: [
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzM3YWI3Ci8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2UgMTwvdGV4dD48L3N2Zz4=",
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNDI4NWY0Ci8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2UgMjwvdGV4dD48L3N2Zz4=",
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZWY0NDQ0Ci8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2UgMzwvdGV4dD48L3N2Zz4=",
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMTBiOTgxCi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2UgNDwvdGV4dD48L3N2Zz4=",
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjOGI1Y2Y2Ci8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2UgNTwvdGV4dD48L3N2Zz4="
        ],
        description: "To promote Everclear's new token staking feature, we targeted a native Web3 audience familiar with similar protocols, clearly communicating the project's value, token mechanics, and incentives through a partnership with ad company Slise. I leveraged Dune Analytics to identify and segment users of comparable staking protocols. Collaborating with a graphic designer, I developed concept drafts for visuals and conducted A/B testing within the live ad campaign—including variants featuring an ad for a crosschain analytics dashboard that I helped design—achieving a 0.45% CTR that resulted in a 3.8% increase in protocol staking.",
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
        imageUrl: "https://picsum.photos/800/450?random=1003",
        slideshowImages: [
          "https://picsum.photos/800/450?random=21",
          "https://picsum.photos/800/450?random=22",
          "https://picsum.photos/800/450?random=23",
          "https://picsum.photos/800/450?random=24",
          "https://picsum.photos/800/450?random=25"
        ],
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
        imageUrl: "https://picsum.photos/800/450?random=1004",
        slideshowImages: [
          "https://picsum.photos/800/450?random=31",
          "https://picsum.photos/800/450?random=32",
          "https://picsum.photos/800/450?random=33",
          "https://picsum.photos/800/450?random=34",
          "https://picsum.photos/800/450?random=35"
        ],
        description: "I led a network of community leaders to scale Everclear's Telegram communities, developing methodologies to assist them in identifying and engaging with relevant posts on the Everclear Intern X account. Through trial-and-error experimentation, we refined the account's voice to ensure it offered unique value—targeting a distinct audience from the main Everclear X account, which had previously led to overlap. This was achieved via digestible educational content, timely updates, and engaging memes. I also guided leaders in navigating discussions with protocol leads to resolve customer issues effectively.",
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
        imageUrl: "https://picsum.photos/800/450?random=1005",
        slideshowImages: [
          "https://picsum.photos/800/450?random=41",
          "https://picsum.photos/800/450?random=42",
          "https://picsum.photos/800/450?random=43",
          "https://picsum.photos/800/450?random=44",
          "https://picsum.photos/800/450?random=45"
        ],
        description: "I coordinated partnerships with Arbitrum and the Near Foundation, highlighting Everclear's Arbitrum Orbit rollup status in all communications. This included collaborating with Arbitrum's marketing team on joint initiatives. For the $10 million Near Foundation raise, I developed a concise narrative for X and Web3 outlets like CoinDesk, Business Insider, and CoinMarketCap. Simultaneously, I directed co-marketing with various chains and protocols to boost reach, while overseeing livestream styles—curating questions, flow, and topics for new partners.",
        challenge: "Generate mainstream and crypto media coverage while establishing credible co-marketing partnerships in the competitive Web3 space.",
        solution: "Created comprehensive media outreach strategy with targeted press releases, journalist relationships, and strategic partnership campaigns.",
        results: "Secured coverage in 50+ publications, established 15 co-marketing partnerships, and achieved 2M+ earned media impressions.",
        testimonial: {
          text: "The media coverage and partnerships Laurence secured gave us the credibility boost we needed. His relationships in crypto media are invaluable.",
          author: "Michael Rodriguez, Head of Marketing"
        },
        technologies: ["PR Distribution", "Media Outreach", "Partnership Tools", "Press Monitoring", "Co-marketing Platforms"]
      }
    ]);
  });
  
  // Get specific portfolio item by ID  
  app.get("/api/portfolio/:id", (req, res) => {
    const portfolioItems = [
      {
        id: "go-to-market-strategy",
        title: "Go-to-Market Rebrand Strategy",
        categories: "Strategy, Rebranding, Market Positioning",
        imageUrl: "https://picsum.photos/800/450?random=1001",
        slideshowImages: [
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzM3YWI3Ci8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2UgMTwvdGV4dD48L3N2Zz4=",
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNDI4NWY0Ci8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2UgMjwvdGV4dD48L3N2Zz4=",
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZWY0NDQ0Ci8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2UgMzwvdGV4dD48L3N2Zz4=",
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMTBiOTgxCi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2UgNDwvdGV4dD48L3N2Zz4=",
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjOGI1Y2Y2Ci8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2UgNTwvdGV4dD48L3N2Zz4="
        ],
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
        imageUrl: "https://picsum.photos/800/450?random=1002",
        slideshowImages: [
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzM3YWI3Ci8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2UgMTwvdGV4dD48L3N2Zz4=",
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNDI4NWY0Ci8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2UgMjwvdGV4dD48L3N2Zz4=",
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZWY0NDQ0Ci8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2UgMzwvdGV4dD48L3N2Zz4=",
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMTBiOTgxCi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2UgNDwvdGV4dD48L3N2Zz4=",
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjOGI1Y2Y2Ci8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2UgNTwvdGV4dD48L3N2Zz4="
        ],
        description: "To promote Everclear's new token staking feature, we targeted a native Web3 audience familiar with similar protocols, clearly communicating the project's value, token mechanics, and incentives through a partnership with ad company Slise. I leveraged Dune Analytics to identify and segment users of comparable staking protocols. Collaborating with a graphic designer, I developed concept drafts for visuals and conducted A/B testing within the live ad campaign—including variants featuring an ad for a crosschain analytics dashboard that I helped design—achieving a 0.45% CTR that resulted in a 3.8% increase in protocol staking.",
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
        imageUrl: "https://picsum.photos/800/450?random=1003",
        slideshowImages: [
          "https://picsum.photos/800/450?random=21",
          "https://picsum.photos/800/450?random=22",
          "https://picsum.photos/800/450?random=23",
          "https://picsum.photos/800/450?random=24",
          "https://picsum.photos/800/450?random=25"
        ],
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
        imageUrl: "https://picsum.photos/800/450?random=1004",
        slideshowImages: [
          "https://picsum.photos/800/450?random=31",
          "https://picsum.photos/800/450?random=32",
          "https://picsum.photos/800/450?random=33",
          "https://picsum.photos/800/450?random=34",
          "https://picsum.photos/800/450?random=35"
        ],
        description: "I led a network of community leaders to scale Everclear's Telegram communities, developing methodologies to assist them in identifying and engaging with relevant posts on the Everclear Intern X account. Through trial-and-error experimentation, we refined the account's voice to ensure it offered unique value—targeting a distinct audience from the main Everclear X account, which had previously led to overlap. This was achieved via digestible educational content, timely updates, and engaging memes. I also guided leaders in navigating discussions with protocol leads to resolve customer issues effectively.",
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
        imageUrl: "https://picsum.photos/800/450?random=1005",
        slideshowImages: [
          "https://picsum.photos/800/450?random=41",
          "https://picsum.photos/800/450?random=42",
          "https://picsum.photos/800/450?random=43",
          "https://picsum.photos/800/450?random=44",
          "https://picsum.photos/800/450?random=45"
        ],
        description: "I coordinated partnerships with Arbitrum and the Near Foundation, highlighting Everclear's Arbitrum Orbit rollup status in all communications. This included collaborating with Arbitrum's marketing team on joint initiatives. For the $10 million Near Foundation raise, I developed a concise narrative for X and Web3 outlets like CoinDesk, Business Insider, and CoinMarketCap. Simultaneously, I directed co-marketing with various chains and protocols to boost reach, while overseeing livestream styles—curating questions, flow, and topics for new partners.",
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
    
    const portfolioItem = portfolioItems.find(item => item.id === req.params.id);
    
    if (portfolioItem) {
      return res.json(portfolioItem);
    } else {
      return res.status(404).json({ message: "Case study not found" });
    }
  });
  
  // Get about data
  app.get("/api/about", (req, res) => {
    return res.json({
      stats: [
        { value: "50+", label: "Projects Launched" },
        { value: "$100M+", label: "Total Raised" },
        { value: "₿TC", label: "first purchased from an ATM..." },
        { value: "8 Years", label: "Web3 Experience" }
      ],
      technologies: [
        "Blockchain", "DeFi", "NFTs", "DAOs", "Metaverse", "Web3 Social"
      ]
    });
  });
  
  // Process contact form submissions
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = contactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      res.status(201).json(contact);
    } catch (error) {
      res.status(400).json({ message: "Invalid form data" });
    }
  });
  
  const httpServer = createServer(app);
  return httpServer;
}
