import { Link } from "wouter";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Bot as BotType } from "../lib/types";
import { 
  Star, 
  Plus, 
  Eye, 
  Clock, 
  Shield, 
  Music, 
  Sprout,
  Bell,
  Smartphone,
  Ban,
  Users,
  ClipboardList,
  Play,
  List,
  Cloud
} from "lucide-react";

interface BotCardProps {
  bot: BotType;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'live':
      return 'bg-discord-success text-black';
    case 'development':
      return 'bg-yellow-500 text-black';
    default:
      return 'bg-gray-500 text-white';
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'live':
      return 'LIVE';
    case 'development':
      return 'IN DEVELOPMENT';
    default:
      return 'UNKNOWN';
  }
};

const getBotIcon = (botId: string) => {
  switch (botId) {
    case 'garden':
      return Sprout;
    case 'moderation':
      return Shield;
    case 'music':
      return Music;
    default:
      return Sprout;
  }
};

const getFeatureIcon = (feature: string) => {
  const iconMap: Record<string, any> = {
    'Real-time stock tracking': Sprout,
    'Instant notifications': Bell,
    'Mobile & desktop friendly': Smartphone,
    'Auto-moderation system': Ban,
    'User management tools': Users,
    'Detailed audit logs': ClipboardList,
    'High-quality streaming': Play,
    'Playlist management': List,
    'Multiple music sources': Cloud,
  };
  
  return iconMap[feature] || Bell;
};

export default function BotCard({ bot }: BotCardProps) {
  const IconComponent = getBotIcon(bot.id);
  
  return (
    <Card className="bg-discord-gray border-gray-700 hover:shadow-2xl transition-all duration-300 hover:scale-105 group">
      <CardContent className="p-6">
        <div className="text-center mb-6">
          {bot.avatar ? (
            <img 
              src={bot.avatar} 
              alt={`${bot.name} avatar`} 
              className="w-16 h-16 rounded-full mx-auto mb-4 border-2 border-discord"
            />
          ) : (
            <div className="w-16 h-16 rounded-full mx-auto mb-4 border-2 border-discord bg-discord/20 flex items-center justify-center">
              <IconComponent className="text-discord text-xl" />
            </div>
          )}

          <h3 className="text-xl font-bold mb-2 text-white">
            {bot.name}
          </h3>
          
          <div className="flex justify-center items-center mb-3">
            <Badge className={`${getStatusColor(bot.status)} text-xs px-2 py-1`}>
              {getStatusText(bot.status)}
            </Badge>
            {bot.rating && (
              <div className="flex items-center ml-2">
                <Star className="text-yellow-400 w-4 h-4" fill="currentColor" />
                <span className="text-white font-semibold ml-1 text-sm">
                  {(bot.rating / 100).toFixed(2)}
                </span>
                <span className="text-discord-light ml-1 text-xs">
                  ({bot.reviewCount} reviews)
                </span>
              </div>
            )}
          </div>
        </div>

        <p className="text-discord-light text-center text-sm mb-4 h-10 overflow-hidden">
          {bot.description}
        </p>

        <div className="space-y-2 mb-6">
          {bot.features.slice(0, 3).map((feature, index) => {
            const FeatureIcon = getFeatureIcon(feature);
            return (
              <div key={index} className="flex items-center text-xs">
                <FeatureIcon className="text-discord w-3 h-3 flex-shrink-0" />
                <span className="ml-2 text-discord-light truncate">{feature}</span>
              </div>
            );
          })}
        </div>

        <div className="space-y-2">
          {bot.status === 'live' && bot.inviteUrl ? (
            <Button asChild className="w-full bg-discord hover:bg-discord-dark text-sm">
              <a href={bot.inviteUrl} target="_blank" rel="noopener noreferrer">
                <Plus className="w-4 h-4 mr-2" />
                Invite Bot
              </a>
            </Button>
          ) : (
            <Button disabled className="w-full bg-gray-600 text-gray-400 cursor-not-allowed text-sm">
              <Clock className="w-4 h-4 mr-2" />
              Coming Soon
            </Button>
          )}
          
          <Button asChild variant="outline" className="w-full border-discord text-black hover:bg-discord hover:text-white text-sm bg-white">
            <Link href={`/bot/${bot.id}`} className="text-black">
              <Eye className="w-4 h-4 mr-2 text-black" />
              View Details
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
