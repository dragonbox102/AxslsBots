import { type Bot, type InsertBot, type Review, type InsertReview } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Bot operations
  getBots(): Promise<Bot[]>;
  getBotById(id: string): Promise<Bot | undefined>;
  createBot(bot: InsertBot): Promise<Bot>;
  
  // Review operations
  getReviewsByBotId(botId: string): Promise<Review[]>;
  createReview(review: InsertReview): Promise<Review>;
}

export class MemStorage implements IStorage {
  private bots: Map<string, Bot>;
  private reviews: Map<string, Review>;

  constructor() {
    this.bots = new Map();
    this.reviews = new Map();
    this.initializeData();
  }

  private initializeData() {
    // Garden bot (live) with real data from Top.gg
    const gardenBot: Bot = {
      id: "garden",
      name: "Grow a Garden Stocks",
      description: "Real-time stock tracker for the Grow a Garden game. Track eggs, gears, seeds, and rare items with instant notifications.",
      longDescription: "🌿 This tool gives you free, real-time updates on everything in the Grow a Garden game. Whether you're farming for seeds, collecting eggs, or hunting down rare gears, our stock tracker bot keeps you instantly updated. It automatically checks for the latest stock changes and notifies you the moment something new appears. No payments, no premium plans — just fast, free info straight to your server or device.",
      avatar: "https://external-cdn.top.gg/discord/bots/1391400860944175125/fcdd835276c8dd55655e0d39cfd263e0.webp",
      status: "live",
      rating: 467, // 4.67 * 100
      reviewCount: 3,
      serverCount: 50,
      uptime: 90,
      features: [
        "Real-time stock tracking",
        "Instant notifications", 
        "Egg tracking",
        "Gear monitoring",
        "Seed updates",
        "Event notifications",
        "Weather tracking",
        "Mobile & desktop friendly"
      ],
      inviteUrl: "https://top.gg/bot/1391400860944175125/invite",
      voteUrl: "https://top.gg/bot/1391400860944175125/vote",
      topggId: "1391400860944175125",
      createdAt: new Date(),
    };

    // Moderation bot (in development)
    const moderationBot: Bot = {
      id: "moderation",
      name: "Moderation Bot",
      description: "Advanced moderation tools with auto-moderation, user management, and detailed logging. Coming soon!",
      longDescription: "Advanced moderation tools with auto-moderation, user management, and detailed logging. This bot will provide comprehensive server management capabilities completely free.",
      avatar: null,
      status: "development",
      rating: null,
      reviewCount: 0,
      serverCount: 0,
      uptime: null,
      features: [
        "Auto-moderation system",
        "User management tools",
        "Detailed audit logs",
        "Warning system",
        "Content filtering",
        "Moderation analytics"
      ],
      inviteUrl: null,
      voteUrl: null,
      topggId: null,
      createdAt: new Date(),
    };

    // Music bot (in development)
    const musicBot: Bot = {
      id: "music",
      name: "Music Bot",
      description: "High-quality music streaming with playlist support, queue management, and multiple source integration.",
      longDescription: "High-quality music streaming with playlist support, queue management, and multiple source integration. Enjoy your favorite music with your Discord community, completely free.",
      avatar: null,
      status: "development",
      rating: null,
      reviewCount: 0,
      serverCount: 0,
      uptime: null,
      features: [
        "High-quality streaming",
        "Playlist management",
        "Multiple music sources",
        "Shuffle & repeat",
        "Volume controls",
        "Smart search"
      ],
      inviteUrl: null,
      voteUrl: null,
      topggId: null,
      createdAt: new Date(),
    };

    this.bots.set("garden", gardenBot);
    this.bots.set("moderation", moderationBot);
    this.bots.set("music", musicBot);

    // Reviews for garden bot only (real data from Top.gg)
    const review1: Review = {
      id: randomUUID(),
      botId: "garden",
      username: "bicozine",
      avatar: "https://cdn.discordapp.com/avatars/763068297230417920/7bdc16089c076a54dd24234d8073220a.png",
      rating: 4,
      content: "bery bery bery cool bot its elegant and fancy the bot is professional and quick with responds . all the commands are fine and cool",
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    };

    const review2: Review = {
      id: randomUUID(),
      botId: "garden",
      username: "RaySullyPlays",
      avatar: "https://cdn.discordapp.com/avatars/903688978530697296/9d308cbfcb6f2c7a29662392b0e8da4e.png",
      rating: 5,
      content: "genuinely a really good gag bot and the dev is a really nice guy too",
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    };

    const review3: Review = {
      id: randomUUID(),
      botId: "garden",
      username: "oooirty",
      avatar: "https://cdn.discordapp.com/embed/avatars/0.png",
      rating: 5,
      content: "Very good bot fast response everything free some slash commands take long but thats okay",
      createdAt: new Date(Date.now() - 25 * 60 * 1000), // 25 minutes ago
    };

    this.reviews.set(review1.id, review1);
    this.reviews.set(review2.id, review2);
    this.reviews.set(review3.id, review3);
  }

  async getBots(): Promise<Bot[]> {
    return Array.from(this.bots.values());
  }

  async getBotById(id: string): Promise<Bot | undefined> {
    return this.bots.get(id);
  }

  async createBot(insertBot: InsertBot): Promise<Bot> {
    const bot: Bot = {
      ...insertBot,
      longDescription: insertBot.longDescription ?? null,
      avatar: insertBot.avatar ?? null,
      rating: insertBot.rating ?? null,
      reviewCount: insertBot.reviewCount ?? null,
      serverCount: insertBot.serverCount ?? null,
      uptime: insertBot.uptime ?? null,
      features: insertBot.features ?? [],
      inviteUrl: insertBot.inviteUrl ?? null,
      voteUrl: insertBot.voteUrl ?? null,
      topggId: insertBot.topggId ?? null,
      createdAt: new Date(),
    };
    this.bots.set(bot.id, bot);
    return bot;
  }

  async getReviewsByBotId(botId: string): Promise<Review[]> {
    return Array.from(this.reviews.values()).filter(review => review.botId === botId);
  }

  async createReview(insertReview: InsertReview): Promise<Review> {
    const id = randomUUID();
    const review: Review = {
      ...insertReview,
      avatar: insertReview.avatar ?? null,
      id,
      createdAt: new Date(),
    };
    this.reviews.set(id, review);
    return review;
  }
}

export const storage = new MemStorage();