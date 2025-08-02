import { Link } from "wouter";
import { Bot, MessageCircle, Mail, Book } from "lucide-react";
import { FaDiscord } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-discord-gray py-12 px-4 border-t border-gray-700">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-discord rounded-full flex items-center justify-center">
                <Bot className="text-white" size={16} />
              </div>
              <span className="text-lg font-bold">Axsls Discord Bots</span>
            </div>
            <p className="text-discord-light">
              Professional Discord bots that are completely free forever. No premium plans, no hidden costs.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <Link href="/" className="block text-discord-light hover:text-white transition-colors">
                Home
              </Link>
              <a href="/#bots" className="block text-discord-light hover:text-white transition-colors">
                Bot Collection
              </a>
              <a href="/#support" className="block text-discord-light hover:text-white transition-colors">
                Support
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <div className="space-y-2">
              <a href="#" className="block text-discord-light hover:text-white transition-colors flex items-center">
                <FaDiscord className="mr-2" />
                Discord Server
              </a>
              <a href="#" className="block text-discord-light hover:text-white transition-colors flex items-center">
                <Mail className="mr-2 w-4 h-4" />
                Contact Us
              </a>
              <a href="#" className="block text-discord-light hover:text-white transition-colors flex items-center">
                <Book className="mr-2 w-4 h-4" />
                Documentation
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-discord-light">
          <p>&copy; 2024 Axsls Discord Bots. All rights reserved. Fully free forever.</p>
        </div>
      </div>
    </footer>
  );
}
