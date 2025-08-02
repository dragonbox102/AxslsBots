import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Bot as BotType } from "@/lib/types";
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
        <div className="relative mb-6">
          {bot.avatar ? (
            <img 
              src={bot.avatar} 
              alt={`${bot.name} avatar`} 
              className="w-20 h-20 rounded-full mx-auto border-4 border-discord group-hover:border-discord-dark transition-colors"
            />
          ) : (
            <div className="w-20 h-20 rounded-full mx-auto border-4 border-discord bg-discord/20 flex items-center justify-center group-hover:border-discord-dark transition-colors">
              <IconComponent className="text-discord text-2xl" />
            </div>
          )}
          {bot.status === 'live' && (
            <div className="absolute -top-2 -right-2 bg-discord-success w-6 h-6 rounded-full flex items-center justify-center">
              <span className="text-black text-xs">✓</span>
            </div>
          )}
        </div>

        <h3 className="text-2xl font-bold text-center mb-2 text-white group-hover:text-discord transition-colors">
          {bot.name}
        </h3>
        
        <div className="flex justify-center items-center mb-4 gap-3">
          <Badge className={getStatusColor(bot.status)}>
            {getStatusText(bot.status)}
          </Badge>
          {bot.rating && (
            <div className="flex items-center">
              <Star className="text-yellow-400 w-4 h-4" fill="currentColor" />
              <span className="text-white font-semibold ml-1">
                {(bot.rating / 100).toFixed(2)}
              </span>
              <span className="text-discord-light ml-1">
                ({bot.reviewCount} reviews)
              </span>
            </div>
          )}
        </div>

        <p className="text-discord-light text-center mb-6 min-h-[3rem]">
          {bot.description}
        </p>

        <div className="space-y-3 mb-6">
          {bot.features.slice(0, 3).map((feature, index) => {
            const FeatureIcon = getFeatureIcon(feature);
            return (
              <div key={index} className="flex items-center text-sm">
                <FeatureIcon className="text-discord w-4 h-4 flex-shrink-0" />
                <span className="ml-2 text-discord-light">{feature}</span>
              </div>
            );
          })}
        </div>

        <div className="flex gap-3">
          {bot.status === 'live' && bot.inviteUrl ? (
            <Button asChild className="flex-1 bg-discord hover:bg-discord-dark">
              <a href={bot.inviteUrl} target="_blank" rel="noopener noreferrer">
                <Plus className="w-4 h-4 mr-2" />
                Invite Bot
              </a>
            </Button>
          ) : (
            <Button disabled className="flex-1 bg-gray-600 text-gray-400 cursor-not-allowed">
              <Clock className="w-4 h-4 mr-2" />
              Coming Soon
            </Button>
          )}
          
          <Button asChild variant="outline" className="flex-1 border-discord text-discord hover:bg-discord hover:text-white">
            <Link href={`/bot/${bot.id}`}>
              <Eye className="w-4 h-4 mr-2" />
              View Details
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
