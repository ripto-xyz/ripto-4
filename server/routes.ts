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
        title: "DeFi Protocol Launch",
        categories: "Strategy, Community Building, Social Media",
        imageUrl: "https://images.unsplash.com/photo-1639762681057-408e52192e55?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      },
      {
        title: "NFT Collection Launch",
        categories: "Content Creation, Community Management",
        imageUrl: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      },
      {
        title: "DAO Structure & Growth",
        categories: "Strategy, Governance Design, Content",
        imageUrl: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      },
      {
        title: "Layer 2 Solution",
        categories: "Technical Marketing, Developer Relations",
        imageUrl: "https://images.unsplash.com/photo-1622630998477-20aa696ecb05?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      },
      {
        title: "DEX Growth Campaign",
        categories: "User Acquisition, Content, Analytics",
        imageUrl: "https://images.unsplash.com/photo-1639322537138-5e513100b36e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      },
      {
        title: "Metaverse Integration",
        categories: "Brand Strategy, Partnerships, Events",
        imageUrl: "https://images.unsplash.com/photo-1621504450181-5fdb1eaeb4c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      }
    ]);
  });
  
  // Get about data
  app.get("/api/about", (req, res) => {
    return res.json({
      stats: [
        { value: "50+", label: "Projects Launched" },
        { value: "$100M+", label: "Total Raised" },
        { value: "250K+", label: "Community Members" },
        { value: "5 Years", label: "Web3 Experience" }
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
