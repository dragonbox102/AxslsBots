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

interface Review {
  id: string;
  botId: string;
  username: string;
  avatar: string;
  rating: number;
  content: string;
  createdAt: Date;
}

// Initialize review data
const reviews: Review[] = [
  {
    id: randomUUID(),
    botId: "garden",
    username: "bicozine",
    avatar: "https://cdn.discordapp.com/avatars/763068297230417920/7bdc16089c076a54dd24234d8073220a.png",
    rating: 4,
    content: "bery bery bery cool bot its elegant and fancy the bot is professional and quick with responds . all the commands are fine and cool",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3 days ago
  },
  {
    id: randomUUID(),
    botId: "garden",
    username: "RaySullyPlays",
    avatar: "https://cdn.discordapp.com/avatars/903688978530697296/9d308cbfcb6f2c7a29662392b0e8da4e.png",
    rating: 5,
    content: "genuinely a really good gag bot and the dev is a really nice guy too",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3 days ago
  },
  {
    id: randomUUID(),
    botId: "garden",
    username: "oooirty",
    avatar: "https://cdn.discordapp.com/embed/avatars/0.png",
    rating: 5,
    content: "Very good bot fast response everything free some slash commands take long but thats okay",
    createdAt: new Date(Date.now() - 25 * 60 * 1000) // 25 minutes ago
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
      const { botId } = req.query;
      
      if (botId) {
        // Get reviews for specific bot
        const botReviews = reviews.filter(r => r.botId === botId);
        return res.json(botReviews);
      } else {
        // Get all reviews
        return res.json(reviews);
      }
    } catch (error) {
      return res.status(500).json({ message: "Failed to fetch reviews" });
    }
  }

  res.status(405).json({ message: "Method not allowed" });
}