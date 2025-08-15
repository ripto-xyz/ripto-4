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
        id: "defi-protocol-launch",
        title: "DeFi Protocol Launch",
        categories: "Strategy, Community Building, Social Media",
        imageUrl: "https://images.unsplash.com/photo-1639762681057-408e52192e55?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Comprehensive marketing strategy for a new DeFi protocol, focusing on community growth and user acquisition.",
        challenge: "Launch a new DeFi protocol in a crowded market with established competitors while building trust and security awareness.",
        solution: "Developed a multi-phase marketing strategy focused on education, community building, and strategic partnerships with influencers.",
        results: "Successfully onboarded 50,000+ users within 3 months, secured $25M in TVL, and established a thriving Discord community of 35,000 members.",
        testimonial: {
          text: "The marketing strategy Laurence developed was crucial to our successful launch. His expertise in Web3 community building helped us stand out in a crowded market.",
          author: "Alex Chen, Founder"
        },
        technologies: ["Discord", "Twitter", "Telegram", "Medium", "Community DAO"]
      },
      {
        id: "nft-collection-launch",
        title: "NFT Collection Launch",
        categories: "Content Creation, Community Management",
        imageUrl: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Created and executed a full-scale marketing campaign for a 10,000 piece generative NFT art collection.",
        challenge: "Generate excitement and demand for a new NFT collection in a competitive market without an established brand or community.",
        solution: "Created an immersive storytelling experience across social platforms, exclusive Discord community, and targeted influencer partnerships.",
        results: "Sold out all 10,000 NFTs within 48 hours, generated over $4M in primary sales, and built a sustainable secondary market with 15% royalties.",
        testimonial: {
          text: "Working with Laurence transformed our NFT launch from a simple collection drop to a cultural moment. His strategic approach to community building created real lasting value.",
          author: "Maya Williams, Creative Director"
        },
        technologies: ["Discord", "Twitter", "OpenSea", "Ethereum", "Collaborative NFT Drops"]
      },
      {
        id: "dao-structure-growth",
        title: "DAO Structure & Growth",
        categories: "Strategy, Governance Design, Content",
        imageUrl: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Designed and implemented a governance structure for a new DAO, helping establish sustainable growth patterns.",
        challenge: "Create an effective governance framework that balances decentralization with efficient decision-making for a new community DAO.",
        solution: "Developed a multi-tiered governance model with specialized working groups, transparent proposal processes, and token-weighted voting mechanisms.",
        results: "Successfully scaled to 10,000+ DAO members, processed over 75 governance proposals, and distributed $2M in grants to community projects.",
        testimonial: {
          text: "Laurence's guidance on DAO structure was invaluable. He helped us navigate complex governance challenges while maintaining our community-first values.",
          author: "Samantha Lee, Head of Operations"
        },
        technologies: ["Snapshot", "Discord", "GitcoinDAO", "Tally", "Aragon"]
      },
      {
        id: "layer-2-solution",
        title: "Layer 2 Solution",
        categories: "Technical Marketing, Developer Relations",
        imageUrl: "https://images.unsplash.com/photo-1622630998477-20aa696ecb05?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Led developer marketing initiatives for a new Ethereum Layer 2 scaling solution to drive adoption and integration.",
        challenge: "Drive developer adoption of a new Layer 2 scaling solution in a technically complex ecosystem with multiple competing solutions.",
        solution: "Created comprehensive technical documentation, educational content series, developer workshops, and a grants program for early adopters.",
        results: "Attracted 250+ projects to build on the platform, achieved 150% quarter-over-quarter growth in TVL, and built an active developer community.",
        testimonial: {
          text: "The developer relations program Laurence built was key to our ecosystem growth. His ability to translate complex technical concepts into clear value propositions accelerated our adoption curve.",
          author: "David Park, CTO"
        },
        technologies: ["GitHub", "Developer DAO", "ETHGlobal", "Solidity", "Technical Documentation"]
      },
      {
        id: "dex-growth-campaign",
        title: "DEX Growth Campaign",
        categories: "User Acquisition, Content, Analytics",
        imageUrl: "https://images.unsplash.com/photo-1639322537138-5e513100b36e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Executed a comprehensive growth strategy for a decentralized exchange, focusing on user acquisition and liquidity growth.",
        challenge: "Increase trading volume and liquidity for a DEX in a highly competitive market dominated by established players.",
        solution: "Implemented a liquidity mining program, strategic token partnerships, educational content series, and community incentives for platform engagement.",
        results: "Increased trading volume by 300% in 6 months, secured $75M in liquidity across key trading pairs, and built a community of 65,000+ active traders.",
        testimonial: {
          text: "Laurence's growth strategy revolutionized our user acquisition approach. His data-driven methods and deep understanding of DeFi user psychology delivered exceptional results.",
          author: "Michael Rodriguez, Growth Lead"
        },
        technologies: ["Dune Analytics", "Twitter", "Discord", "Uniswap", "Liquidity Mining"]
      },
      {
        id: "metaverse-integration",
        title: "Metaverse Integration",
        categories: "Brand Strategy, Partnerships, Events",
        imageUrl: "https://images.unsplash.com/photo-1621504450181-5fdb1eaeb4c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Developed and executed a brand strategy for a traditional company's expansion into the metaverse.",
        challenge: "Help an established retail brand transition into the metaverse with authentic experiences that resonate with both existing customers and Web3 natives.",
        solution: "Created a phased metaverse strategy including virtual storefronts, digital collectibles, immersive events, and a virtual-to-physical rewards program.",
        results: "Launched in 3 major metaverse platforms, sold 25,000+ digital collectibles, and increased brand engagement with 18-35 demographic by 40%.",
        testimonial: {
          text: "Our metaverse strategy developed with Laurence opened entirely new revenue streams and audience segments. His creative approach to bridging physical and digital experiences set us apart from competitors.",
          author: "Jennifer Torres, Marketing Director"
        },
        technologies: ["Decentraland", "The Sandbox", "Spatial", "3D Design", "Digital Wearables"]
      }
    ]);
  });
  
  // Get specific portfolio item by ID  
  app.get("/api/portfolio/:id", (req, res) => {
    const portfolioItems = [
      {
        id: "defi-protocol-launch",
        title: "DeFi Protocol Launch",
        categories: "Strategy, Community Building, Social Media",
        imageUrl: "https://images.unsplash.com/photo-1639762681057-408e52192e55?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Comprehensive marketing strategy for a new DeFi protocol, focusing on community growth and user acquisition.",
        challenge: "Launch a new DeFi protocol in a crowded market with established competitors while building trust and security awareness.",
        solution: "Developed a multi-phase marketing strategy focused on education, community building, and strategic partnerships with influencers.",
        results: "Successfully onboarded 50,000+ users within 3 months, secured $25M in TVL, and established a thriving Discord community of 35,000 members.",
        testimonial: {
          text: "The marketing strategy Laurence developed was crucial to our successful launch. His expertise in Web3 community building helped us stand out in a crowded market.",
          author: "Alex Chen, Founder"
        },
        technologies: ["Discord", "Twitter", "Telegram", "Medium", "Community DAO"]
      },
      {
        id: "nft-collection-launch",
        title: "NFT Collection Launch",
        categories: "Content Creation, Community Management",
        imageUrl: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Created and executed a full-scale marketing campaign for a 10,000 piece generative NFT art collection.",
        challenge: "Generate excitement and demand for a new NFT collection in a competitive market without an established brand or community.",
        solution: "Created an immersive storytelling experience across social platforms, exclusive Discord community, and targeted influencer partnerships.",
        results: "Sold out all 10,000 NFTs within 48 hours, generated over $4M in primary sales, and built a sustainable secondary market with 15% royalties.",
        testimonial: {
          text: "Working with Laurence transformed our NFT launch from a simple collection drop to a cultural moment. His strategic approach to community building created real lasting value.",
          author: "Maya Williams, Creative Director"
        },
        technologies: ["Discord", "Twitter", "OpenSea", "Ethereum", "Collaborative NFT Drops"]
      },
      {
        id: "dao-structure-growth",
        title: "DAO Structure & Growth",
        categories: "Strategy, Governance Design, Content",
        imageUrl: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Designed and implemented a governance structure for a new DAO, helping establish sustainable growth patterns.",
        challenge: "Create an effective governance framework that balances decentralization with efficient decision-making for a new community DAO.",
        solution: "Developed a multi-tiered governance model with specialized working groups, transparent proposal processes, and token-weighted voting mechanisms.",
        results: "Successfully scaled to 10,000+ DAO members, processed over 75 governance proposals, and distributed $2M in grants to community projects.",
        testimonial: {
          text: "Laurence's guidance on DAO structure was invaluable. He helped us navigate complex governance challenges while maintaining our community-first values.",
          author: "Samantha Lee, Head of Operations"
        },
        technologies: ["Snapshot", "Discord", "GitcoinDAO", "Tally", "Aragon"]
      },
      {
        id: "layer-2-solution",
        title: "Layer 2 Solution",
        categories: "Technical Marketing, Developer Relations",
        imageUrl: "https://images.unsplash.com/photo-1622630998477-20aa696ecb05?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Led developer marketing initiatives for a new Ethereum Layer 2 scaling solution to drive adoption and integration.",
        challenge: "Drive developer adoption of a new Layer 2 scaling solution in a technically complex ecosystem with multiple competing solutions.",
        solution: "Created comprehensive technical documentation, educational content series, developer workshops, and a grants program for early adopters.",
        results: "Attracted 250+ projects to build on the platform, achieved 150% quarter-over-quarter growth in TVL, and built an active developer community.",
        testimonial: {
          text: "The developer relations program Laurence built was key to our ecosystem growth. His ability to translate complex technical concepts into clear value propositions accelerated our adoption curve.",
          author: "David Park, CTO"
        },
        technologies: ["GitHub", "Developer DAO", "ETHGlobal", "Solidity", "Technical Documentation"]
      },
      {
        id: "dex-growth-campaign",
        title: "DEX Growth Campaign",
        categories: "User Acquisition, Content, Analytics",
        imageUrl: "https://images.unsplash.com/photo-1639322537138-5e513100b36e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Executed a comprehensive growth strategy for a decentralized exchange, focusing on user acquisition and liquidity growth.",
        challenge: "Increase trading volume and liquidity for a DEX in a highly competitive market dominated by established players.",
        solution: "Implemented a liquidity mining program, strategic token partnerships, educational content series, and community incentives for platform engagement.",
        results: "Increased trading volume by 300% in 6 months, secured $75M in liquidity across key trading pairs, and built a community of 65,000+ active traders.",
        testimonial: {
          text: "Laurence's growth strategy revolutionized our user acquisition approach. His data-driven methods and deep understanding of DeFi user psychology delivered exceptional results.",
          author: "Michael Rodriguez, Growth Lead"
        },
        technologies: ["Dune Analytics", "Twitter", "Discord", "Uniswap", "Liquidity Mining"]
      },
      {
        id: "metaverse-integration",
        title: "Metaverse Integration",
        categories: "Brand Strategy, Partnerships, Events",
        imageUrl: "https://images.unsplash.com/photo-1621504450181-5fdb1eaeb4c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Developed and executed a brand strategy for a traditional company's expansion into the metaverse.",
        challenge: "Help an established retail brand transition into the metaverse with authentic experiences that resonate with both existing customers and Web3 natives.",
        solution: "Created a phased metaverse strategy including virtual storefronts, digital collectibles, immersive events, and a virtual-to-physical rewards program.",
        results: "Launched in 3 major metaverse platforms, sold 25,000+ digital collectibles, and increased brand engagement with 18-35 demographic by 40%.",
        testimonial: {
          text: "Our metaverse strategy developed with Laurence opened entirely new revenue streams and audience segments. His creative approach to bridging physical and digital experiences set us apart from competitors.",
          author: "Jennifer Torres, Marketing Director"
        },
        technologies: ["Decentraland", "The Sandbox", "Spatial", "3D Design", "Digital Wearables"]
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
        { value: "2017", label: "BTC first purchased from an ATM" },
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
