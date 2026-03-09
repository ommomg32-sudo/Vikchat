import { Link } from "react-router-dom";
import { MessageSquare, Video, Globe, Users, Sparkles } from "lucide-react";
import { Button } from "@/react-app/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative min-h-screen pt-24 pb-16 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/15 rounded-full blur-3xl" />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                              linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
        
        {/* Flowing line */}
        <svg
          className="absolute bottom-0 left-0 w-full h-48 text-primary/30"
          viewBox="0 0 1440 200"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M0,100 C320,180 420,20 720,100 C1020,180 1120,20 1440,100"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M0,120 C360,200 460,40 760,120 C1060,200 1160,40 1440,120"
            stroke="currentColor"
            strokeWidth="1"
            strokeOpacity="0.5"
            fill="none"
          />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[calc(100vh-8rem)]">
          {/* Left content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Connect with anyone, anywhere</span>
            </div>
            
            <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-tight mb-6">
              Talk to strangers.
              <br />
              <span className="text-gradient">Make friends!</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8">
              Experience random chat to meet new people, share stories, and build 
              connections with strangers from all over the world.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <Link to="/chat">
                <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 text-lg glow">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Text Chat
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full sm:w-auto border-2 border-border hover:bg-secondary font-semibold px-8 py-6 text-lg"
                disabled
              >
                <Video className="w-5 h-5 mr-2" />
                Video Chat
                <span className="ml-2 text-xs bg-muted px-2 py-0.5 rounded-full">Soon</span>
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 justify-center lg:justify-start">
              <div className="text-center lg:text-left">
                <div className="font-display font-bold text-2xl text-foreground">10K+</div>
                <div className="text-sm text-muted-foreground">Active Users</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="font-display font-bold text-2xl text-foreground">50+</div>
                <div className="text-sm text-muted-foreground">Countries</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="font-display font-bold text-2xl text-foreground">1M+</div>
                <div className="text-sm text-muted-foreground">Chats Daily</div>
              </div>
            </div>
          </div>

          {/* Right content - Chat preview cards */}
          <div className="relative hidden lg:block">
            <div className="relative w-full h-[500px]">
              {/* Main chat card */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 bg-card rounded-2xl border border-border p-4 shadow-2xl glow">
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white font-bold">
                    S
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Stranger</div>
                    <div className="text-xs text-green-400 flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      Online
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-start">
                    <div className="bg-secondary rounded-2xl rounded-tl-sm px-4 py-2 text-sm max-w-[80%]">
                      Hey! Where are you from? 👋
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-primary text-primary-foreground rounded-2xl rounded-tr-sm px-4 py-2 text-sm max-w-[80%]">
                      Hi! I'm from Brazil 🇧🇷
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-secondary rounded-2xl rounded-tl-sm px-4 py-2 text-sm max-w-[80%]">
                      That's awesome! I've always wanted to visit!
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating notification card */}
              <div className="absolute top-8 right-0 bg-card rounded-xl border border-border p-3 shadow-lg flex items-center gap-3 animate-pulse">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <Users className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="text-xs font-medium text-foreground">New Match!</div>
                  <div className="text-xs text-muted-foreground">Someone wants to chat</div>
                </div>
              </div>

              {/* Country filter card */}
              <div className="absolute bottom-16 left-0 bg-card rounded-xl border border-border p-3 shadow-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Globe className="w-4 h-4 text-accent" />
                  <span className="text-xs font-medium text-foreground">Global Chat</span>
                </div>
                <div className="flex gap-1">
                  <span className="text-lg">🇺🇸</span>
                  <span className="text-lg">🇬🇧</span>
                  <span className="text-lg">🇯🇵</span>
                  <span className="text-lg">🇧🇷</span>
                  <span className="text-lg">🇩🇪</span>
                </div>
              </div>

              {/* Online users indicator */}
              <div className="absolute bottom-8 right-8 bg-card rounded-full border border-border px-4 py-2 shadow-lg flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-foreground">2,847 online</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
