import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Rocket, Server, Clock, CheckCircle } from "lucide-react";

export default function HeroSection() {
  const scrollToBots = () => {
    const botsSection = document.getElementById('bots');
    if (botsSection) {
      botsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Discord-themed abstract background */}
      <div className="absolute inset-0 discord-gradient opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-gray-900/50 to-gray-800"></div>
      
      <div className="relative max-w-6xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 discord-gradient bg-clip-text text-transparent animate-float">
          Axsls Discord Bots
        </h1>
        <p className="text-xl md:text-2xl text-discord-light mb-8 max-w-3xl mx-auto">
          Professional Discord bots to enhance your server experience - completely free, no premium plans, no hidden costs
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Badge variant="secondary" className="bg-discord-success/20 text-discord-success px-4 py-2 text-sm font-semibold">
            <CheckCircle className="w-4 h-4 mr-2" />
            100% Free Forever
          </Badge>
          <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 px-4 py-2 text-sm font-semibold">
            <Server className="w-4 h-4 mr-2" />
            50+ Servers
          </Badge>
          <Badge variant="secondary" className="bg-green-500/20 text-green-400 px-4 py-2 text-sm font-semibold">
            <Clock className="w-4 h-4 mr-2" />
            90% Uptime
          </Badge>
        </div>
        
        <Button 
          onClick={scrollToBots}
          className="bg-discord hover:bg-discord-dark text-white px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105"
        >
          <Rocket className="w-5 h-5 mr-2" />
          Explore Our Bots
        </Button>
      </div>
    </section>
  );
}
