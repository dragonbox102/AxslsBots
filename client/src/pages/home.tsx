import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import BotCard from "@/components/bot-card";
import Footer from "@/components/footer";
import { Bot } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";

export default function Home() {
  const { data: bots, isLoading, error } = useQuery<Bot[]>({
    queryKey: ['/api/bots'],
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navigation />
      <HeroSection />
      
      {/* Bots Section */}
      <section id="bots" className="py-20 px-4 bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Bot Collection</h2>
            <p className="text-discord-light text-lg max-w-2xl mx-auto">
              Each bot is designed with care to provide unique functionality for your Discord server
            </p>
          </div>

          {isLoading && (
            <div className="grid md:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="bg-discord-gray border-gray-700">
                  <CardContent className="p-6">
                    <Skeleton className="w-20 h-20 rounded-full mx-auto mb-6" />
                    <Skeleton className="h-6 w-3/4 mx-auto mb-2" />
                    <Skeleton className="h-4 w-1/2 mx-auto mb-4" />
                    <Skeleton className="h-16 w-full mb-6" />
                    <div className="space-y-2 mb-6">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                    <div className="flex gap-3">
                      <Skeleton className="h-10 flex-1" />
                      <Skeleton className="h-10 flex-1" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {error && (
            <Card className="bg-discord-gray border-red-500/50 max-w-md mx-auto">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 text-red-400 mb-4">
                  <AlertCircle className="h-5 w-5" />
                  <h3 className="font-semibold">Failed to Load Bots</h3>
                </div>
                <p className="text-discord-light text-sm">
                  Unable to fetch bot information. Please try refreshing the page.
                </p>
              </CardContent>
            </Card>
          )}

          {bots && (
            <div className="grid md:grid-cols-3 gap-8">
              {bots.map((bot) => (
                <BotCard key={bot.id} bot={bot} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
