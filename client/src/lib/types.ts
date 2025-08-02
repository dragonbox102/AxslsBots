export interface Bot {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  avatar?: string;
  status: 'live' | 'development';
  rating?: number; // out of 500 (4.67 * 100 = 467)
  reviewCount: number;
  serverCount: number;
  uptime?: number; // percentage
  features: string[];
  inviteUrl?: string;
  voteUrl?: string;
  topggId?: string;
  createdAt: Date;
}

export interface Review {
  id: string;
  botId: string;
  username: string;
  avatar?: string;
  rating: number; // 1-5 stars
  content: string;
  createdAt: Date;
}
