import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all bots
  app.get("/api/bots", async (req, res) => {
    try {
      const bots = await storage.getBots();
      res.json(bots);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch bots" });
    }
  });

  // Get bot by ID
  app.get("/api/bots/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const bot = await storage.getBotById(id);
      
      if (!bot) {
        return res.status(404).json({ message: "Bot not found" });
      }
      
      res.json(bot);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch bot" });
    }
  });

  // Get reviews for a bot
  app.get("/api/bots/:id/reviews", async (req, res) => {
    try {
      const { id } = req.params;
      const reviews = await storage.getReviewsByBotId(id);
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch reviews" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
