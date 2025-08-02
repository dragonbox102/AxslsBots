import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Bot, Review } from "@/lib/types";
import { 
  ArrowLeft, 
  Star, 
  Plus, 
  Heart, 
  Server, 
  Clock, 
  Users,
  MessageCircle,
  ExternalLink,
  Sprout,
  Bell,
  Smartphone,
  Egg,
  Settings,
  CloudRain,
  AlertCircle
} from "lucide-react";

export default function GardenBot() {
  const { data: bot, isLoading: botLoading, error: botError } = useQuery<Bot>({
    queryKey: ['/api/bots/garden'],
  });

  const { data: reviews, isLoading: reviewsLoading } = useQuery<Review[]>({
    queryKey: ['/api/bots/garden/reviews'],
  });

  const getFeatureIcon = (feature: string) => {
    const iconMap: Record<string, any> = {
      'Real-time stock tracking': Sprout,
      'Instant notifications': Bell,
      'Egg tracking': Egg,
      'Gear monitoring': Settings,
      'Seed updates': Sprout,
      'Event notifications': Star,
      'Weather tracking': CloudRain,
      'Mobile & desktop friendly': Smartphone,
    };
    
    return iconMap[feature] || Bell;
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-400'}`}
      />
    ));
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));

    if (days > 0) return `${days} days ago`;
    if (hours > 0) return `${hours} hours ago`;
    return `${minutes} minutes ago`;
  };

  if (botLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <Navigation />
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <Skeleton className="h-10 w-32 mb-8" />
          <Skeleton className="h-64 w-full mb-6" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  if (botError || !bot) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <Navigation />
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="text-center py-12">
            <AlertCircle className="h-12 w-12 mx-auto mb-4 text-red-400" />
            <h2 className="text-xl font-semibold mb-2">Bot Not Found</h2>
            <p className="text-discord-light mb-4">Unable to find the garden bot information.</p>
            <Button asChild variant="outline">
              <Link href="/">← Back to Home</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back Button */}
        <Button asChild variant="ghost" className="mb-8 text-discord-light hover:text-white">
          <Link href="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </Button>

        {/* Bot Header Card */}
        <Card className="mb-6 bg-discord-gray border-gray-700">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <img 
                src={bot.avatar!} 
                alt={`${bot.name} avatar`} 
                className="w-20 h-20 rounded-full border-2 border-discord flex-shrink-0"
              />
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                  <h1 className="text-2xl font-bold mb-2 sm:mb-0">{bot.name}</h1>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-500 text-black font-semibold text-xs">
                      LIVE
                    </Badge>
                    {bot.rating && (
                      <div className="flex items-center">
                        <Star className="text-yellow-400 w-4 h-4 fill-current" />
                        <span className="font-semibold ml-1">
                          {(bot.rating / 100).toFixed(1)}/5
                        </span>
                        <span className="text-discord-light ml-1 text-sm">
                          ({bot.reviewCount} reviews)
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                
                <p className="text-discord-light mb-6 leading-relaxed">{bot.longDescription}</p>
                
                <div className="flex flex-wrap gap-3">
                  {bot.inviteUrl && (
                    <Button asChild className="bg-discord hover:bg-discord-dark">
                      <a href={bot.inviteUrl} target="_blank" rel="noopener noreferrer">
                        <Plus className="w-4 h-4 mr-2" />
                        Invite to Server
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </a>
                    </Button>
                  )}
                  {bot.voteUrl && (
                    <Button asChild variant="outline" className="border-discord text-discord hover:bg-discord hover:text-white">
                      <a href={bot.voteUrl} target="_blank" rel="noopener noreferrer">
                        <Heart className="w-4 h-4 mr-2" />
                        Vote on Top.gg
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statistics Card */}
        <Card className="mb-6 bg-discord-gray border-gray-700">
          <CardHeader>
            <CardTitle>Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-800 rounded-lg p-4 text-center">
                <Server className="w-6 h-6 mx-auto mb-2 text-blue-400" />
                <div className="font-bold text-lg text-white">{bot.serverCount}+</div>
                <div className="text-xs text-gray-400">Servers</div>
              </div>
              <div className="bg-gray-800 rounded-lg p-4 text-center">
                <Clock className="w-6 h-6 mx-auto mb-2 text-green-400" />
                <div className="font-bold text-lg text-green-400">{bot.uptime || 0}%</div>
                <div className="text-xs text-gray-400">Uptime</div>
              </div>
              <div className="bg-gray-800 rounded-lg p-4 text-center">
                <Star className="w-6 h-6 mx-auto mb-2 text-yellow-400" />
                <div className="font-bold text-lg text-white">{bot.rating ? (bot.rating / 100).toFixed(1) : '0.0'}/5</div>
                <div className="text-xs text-gray-400">Rating</div>
              </div>
              <div className="bg-gray-800 rounded-lg p-4 text-center">
                <Users className="w-6 h-6 mx-auto mb-2 text-purple-400" />
                <div className="font-bold text-lg text-white">{bot.reviewCount}</div>
                <div className="text-xs text-gray-400">Reviews</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features Card */}
        <Card className="mb-6 bg-discord-gray border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="w-5 h-5 mr-2" />
              Features
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-3">
              {bot.features.map((feature, index) => {
                const IconComponent = getFeatureIcon(feature);
                return (
                  <div key={index} className="flex items-center space-x-3 bg-gray-800 p-3 rounded-lg">
                    <IconComponent className="text-discord w-5 h-5 flex-shrink-0" />
                    <span className="text-white text-sm">{feature}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Reviews Card */}
        <Card className="mb-6 bg-discord-gray border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageCircle className="w-5 h-5 mr-2" />
              User Reviews
            </CardTitle>
          </CardHeader>
          <CardContent>
            {reviewsLoading && (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex space-x-3">
                    <Skeleton className="w-10 h-10 rounded-full flex-shrink-0" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-1/4" />
                      <Skeleton className="h-16 w-full" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {reviews && reviews.length > 0 && (
              <div className="space-y-6">
                {reviews.map((review, index) => (
                  <div key={review.id}>
                    <div className="flex items-start space-x-3">
                      <img 
                        src={review.avatar} 
                        alt={`${review.username} avatar`} 
                        className="w-10 h-10 rounded-full flex-shrink-0"
                      />
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="font-semibold text-white">{review.username}</span>
                          <div className="flex">
                            {renderStars(review.rating)}
                          </div>
                          <span className="text-xs text-discord-light">
                            {formatDate(review.createdAt)}
                          </span>
                        </div>
                        <p className="text-discord-light text-sm">{review.content}</p>
                      </div>
                    </div>
                    {index < reviews.length - 1 && <Separator className="mt-6 bg-gray-700" />}
                  </div>
                ))}
              </div>
            )}

            {reviews && reviews.length === 0 && (
              <div className="text-center py-8 text-discord-light">
                <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No reviews yet. Be the first to review this bot!</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}