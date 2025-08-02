import { randomUUID } from "crypto";

interface VercelRequest {
  method?: string;
  query?: { [key: string]: string | string[] | undefined };
  body?: any;
}

interface VercelResponse {
  status: (code: number) => VercelResponse;
  json: (object: any) => VercelResponse;
  setHeader: (name: string, value: string) => void;
  end: () => void;
}

// Bot data structure
interface Bot {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  avatar: string | null;
  status: "live" | "development";
  rating: number | null;
  reviewCount: number;
  serverCount: number;
  uptime: number | null;
  features: string[];
  inviteUrl: string | null;
  voteUrl: string | null;
  topggId: string | null;
  createdAt: Date;
}

// Initialize bot data
const bots: Bot[] = [
  {
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
    createdAt: new Date()
  },
  {
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
    createdAt: new Date()
  },
  {
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
    createdAt: new Date()
  }
];

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    try {
      const { id } = req.query;
      
      if (id) {
        // Get specific bot
        const bot = bots.find(b => b.id === id);
        if (!bot) {
          return res.status(404).json({ message: "Bot not found" });
        }
        return res.json(bot);
      } else {
        // Get all bots
        return res.json(bots);
      }
    } catch (error) {
      return res.status(500).json({ message: "Failed to fetch bots" });
    }
  }

  res.status(405).json({ message: "Method not allowed" });
}