import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import { TooltipProvider } from "./components/ui/tooltip";
import NotFound from "./pages/not-found";
import Home from "./pages/home";
import GardenBot from "./pages/bot/garden";
import ModerationBot from "./pages/bot/moderation";
import MusicBot from "./pages/bot/music";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/bot/garden" component={GardenBot} />
      <Route path="/bot/moderation" component={ModerationBot} />
      <Route path="/bot/music" component={MusicBot} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;