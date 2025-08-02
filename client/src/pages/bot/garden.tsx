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

  const { data: reviews, isLoading: reviewsLoading, error: reviewsError } = useQuery<Review[]>({
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
        <div className="max-w-6xl mx-auto px-4 py-8">
          <Skeleton className="h-10 w-32 mb-8" />
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Skeleton className="h-64 w-full mb-6" />
              <Skeleton className="h-32 w-full" />
            </div>
            <div>
              <Skeleton className="h-48 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (botError || !bot) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <Navigation />
        <div className="max-w-6xl mx-auto px-4 py-8">
          <Card className="bg-discord-gray border-red-500/50 max-w-md mx-auto">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-red-400 mb-4">
                <AlertCircle className="h-5 w-5" />
                <h3 className="font-semibold">Bot Not Found</h3>
              </div>
              <p className="text-discord-light text-sm mb-4">
                Unable to find the garden bot information.
              </p>
              <Button asChild variant="outline">
                <Link href="/">← Back to Home</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Button asChild variant="ghost" className="mb-8 text-discord-light hover:text-white">
          <Link href="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </Button>

        <div className="grid lg:grid-cols-3 gap-8 min-h-0">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Bot Header */}
            <Card className="bg-discord-gray border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-6">
                  <img 
                    src={bot.avatar!} 
                    alt={`${bot.name} avatar`} 
                    className="w-20 h-20 rounded-full border-4 border-discord"
                  />
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold mb-2">{bot.name}</h1>
                    <div className="flex items-center space-x-3">
                      <Badge className="bg-discord-success text-black font-semibold">
                        LIVE
                      </Badge>
                      {bot.rating && (
                        <div className="flex items-center">
                          <Star className="text-yellow-400 w-5 h-5 fill-current" />
                          <span className="font-semibold ml-1 text-lg">
                            {(bot.rating / 100).toFixed(2)}/5
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <p className="text-discord-light mb-6">{bot.longDescription}</p>

                <div className="flex gap-4">
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
              </CardContent>
            </Card>

            {/* Features */}
            <Card className="bg-discord-gray border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="w-5 h-5 mr-2" />
                  Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {bot.features.map((feature, index) => {
                    const IconComponent = getFeatureIcon(feature);
                    return (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg">
                        <IconComponent className="text-discord w-5 h-5 flex-shrink-0" />
                        <span className="text-white">{feature}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Reviews Section - ONLY for Garden Bot */}
            <Card className="bg-discord-gray border-gray-700">
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
                        <div className="flex-1 space-y-2 min-w-0">
                          <Skeleton className="h-4 w-1/4" />
                          <Skeleton className="h-16 w-full" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {reviewsError && (
                  <div className="text-red-400 text-center py-4">
                    <AlertCircle className="w-5 h-5 mx-auto mb-2" />
                    Failed to load reviews
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
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <span className="font-semibold text-white">{review.username}</span>
                              <div className="flex">
                                {renderStars(review.rating)}
                              </div>
                              <span className="text-xs text-discord-light">
                                {formatDate(review.createdAt)}
                              </span>
                            </div>
                            <p className="text-discord-light break-words">{review.content}</p>
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

          {/* Sidebar */}
          <div className="space-y-6 lg:sticky lg:top-20 lg:self-start">
            {/* Statistics */}
            <Card className="bg-discord-gray border-gray-700">
              <CardHeader>
                <CardTitle>Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Server className="w-4 h-4 mr-2 text-blue-400" />
                    <span className="text-discord-light">Servers:</span>
                  </div>
                  <span className="font-semibold">{bot.serverCount}+</span>
                </div>
                
                {bot.uptime && (
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-green-400" />
                      <span className="text-discord-light">Uptime:</span>
                    </div>
                    <span className="font-semibold text-green-400">{bot.uptime}%</span>
                  </div>
                )}
                
                {bot.rating && (
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 mr-2 text-yellow-400" />
                      <span className="text-discord-light">Rating:</span>
                    </div>
                    <span className="font-semibold">{(bot.rating / 100).toFixed(2)}/5</span>
                  </div>
                )}
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2 text-purple-400" />
                    <span className="text-discord-light">Reviews:</span>
                  </div>
                  <span className="font-semibold">{bot.reviewCount}</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-discord-gray border-gray-700">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {bot.inviteUrl && (
                  <Button asChild className="w-full bg-discord hover:bg-discord-dark">
                    <a href={bot.inviteUrl} target="_blank" rel="noopener noreferrer">
                      <Plus className="w-4 h-4 mr-2" />
                      Add to Server
                    </a>
                  </Button>
                )}
                {bot.voteUrl && (
                  <Button asChild variant="outline" className="w-full border-discord text-discord hover:bg-discord hover:text-white">
                    <a href={bot.voteUrl} target="_blank" rel="noopener noreferrer">
                      <Heart className="w-4 h-4 mr-2" />
                      Vote on Top.gg
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Support */}
            <Card className="bg-discord-gray border-gray-700">
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-discord-light text-sm mb-4">
                  Join our Discord server for support and updates!
                </p>
                <Button variant="outline" className="w-full">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Join Discord
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
