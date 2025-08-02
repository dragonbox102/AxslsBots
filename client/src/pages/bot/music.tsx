import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Bot } from "@/lib/types";
import { 
  ArrowLeft, 
  Music, 
  Play,
  List,
  Cloud,
  Shuffle,
  Volume2,
  Search,
  Info,
  AlertCircle,
  MessageCircle,
  Clock
} from "lucide-react";

export default function MusicBot() {
  const { data: bot, isLoading, error } = useQuery<Bot>({
    queryKey: ['/api/bots/music'],
  });

  const getFeatureIcon = (feature: string) => {
    const iconMap: Record<string, any> = {
      'High-quality streaming': Play,
      'Playlist management': List,
      'Multiple music sources': Cloud,
      'Shuffle & repeat': Shuffle,
      'Volume controls': Volume2,
      'Smart search': Search,
    };
    
    return iconMap[feature] || Music;
  };

  if (isLoading) {
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

  if (error || !bot) {
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
                Unable to find the music bot information.
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
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Button asChild variant="ghost" className="mb-8 text-discord-light hover:text-white">
          <Link href="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Bot Header */}
            <Card className="bg-discord-gray border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-20 h-20 rounded-full border-4 border-purple-500 bg-purple-500/20 flex items-center justify-center">
                    <Music className="text-purple-500 text-2xl" />
                  </div>
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold mb-2">{bot.name}</h1>
                    <Badge className="bg-purple-500 text-white font-semibold">
                      IN DEVELOPMENT
                    </Badge>
                  </div>
                </div>

                <p className="text-discord-light mb-6">{bot.longDescription}</p>

                <Button disabled className="bg-gray-600 text-gray-400 cursor-not-allowed">
                  <Clock className="w-4 h-4 mr-2" />
                  Coming Soon
                </Button>
              </CardContent>
            </Card>

            {/* Development Status */}
            <Card className="bg-purple-500/10 border-purple-500/30">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Info className="text-purple-500 mr-2 w-5 h-5" />
                  <span className="font-semibold text-purple-500">Development Status</span>
                </div>
                <p className="text-discord-light">
                  This music bot is currently in active development. We're building a comprehensive music solution that will bring high-quality audio streaming to your Discord server with support for multiple music sources and advanced playlist management. Join our Discord server for updates and beta testing opportunities!
                </p>
              </CardContent>
            </Card>

            {/* Planned Features */}
            <Card className="bg-discord-gray border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Music className="w-5 h-5 mr-2" />
                  Planned Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {bot.features.map((feature, index) => {
                    const IconComponent = getFeatureIcon(feature);
                    return (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg">
                        <IconComponent className="text-purple-500 w-5 h-5 flex-shrink-0" />
                        <span className="text-white">{feature}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Feature Details */}
            <Card className="bg-discord-gray border-gray-700">
              <CardHeader>
                <CardTitle>What to Expect</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-purple-500 mb-2">High-Quality Audio</h4>
                  <p className="text-discord-light">
                    Crystal clear audio streaming with support for high bitrate music to ensure the best listening experience for your community.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-purple-500 mb-2">Multiple Music Sources</h4>
                  <p className="text-discord-light">
                    Support for various music platforms and sources, giving you access to a vast library of songs and content.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-purple-500 mb-2">Advanced Playlist Management</h4>
                  <p className="text-discord-light">
                    Create, save, and share playlists with your community. Advanced queue management with shuffle, repeat, and skip functionality.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Development Info */}
            <Card className="bg-discord-gray border-gray-700">
              <CardHeader>
                <CardTitle>Development Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-discord-light">Status:</span>
                  <Badge className="bg-purple-500 text-white">In Development</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-discord-light">Expected Release:</span>
                  <span className="font-semibold">Coming Soon</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-discord-light">Pricing:</span>
                  <span className="font-semibold text-discord-success">100% Free</span>
                </div>
              </CardContent>
            </Card>

            {/* Beta Testing */}
            <Card className="bg-discord-gray border-gray-700">
              <CardHeader>
                <CardTitle>Beta Testing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-discord-light text-sm mb-4">
                  Want to be among the first to test the music bot? Join our Discord community for early access opportunities!
                </p>
                <Button variant="outline" className="w-full border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Join Beta Program
                </Button>
              </CardContent>
            </Card>

            {/* Updates */}
            <Card className="bg-discord-gray border-gray-700">
              <CardHeader>
                <CardTitle>Stay Updated</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-discord-light text-sm mb-4">
                  Get notified when the music bot becomes available and receive development updates.
                </p>
                <Button variant="outline" className="w-full">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Follow Updates
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
