import { Navbar } from "@/react-app/components/Navbar";
import { Footer } from "@/react-app/components/Footer";
import { Users, Shield, Globe, Zap, Heart, MessageCircle } from "lucide-react";

const values = [
  {
    icon: Users,
    title: "Human Connection",
    description: "We believe in the power of authentic conversations between strangers who might never have met otherwise.",
  },
  {
    icon: Shield,
    title: "Safety First",
    description: "Your privacy and security are paramount. Chat anonymously with peace of mind.",
  },
  {
    icon: Globe,
    title: "Global Community",
    description: "Connect with people from every corner of the world and experience diverse perspectives.",
  },
  {
    icon: Zap,
    title: "Instant Connections",
    description: "No sign-ups, no delays. Start chatting with a stranger in seconds.",
  },
];

const stats = [
  { value: "10M+", label: "Conversations" },
  { value: "150+", label: "Countries" },
  { value: "24/7", label: "Available" },
  { value: "100%", label: "Anonymous" },
];

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Heart className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">Our Story</span>
            </div>
            
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              Bringing <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Strangers</span> Together
            </h1>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              VikChat was born from a simple idea: everyone deserves a space to have genuine, 
              unfiltered conversations. In a world of curated social media personas, we created 
              a place where you can just be yourself and meet fascinating people from around the globe.
            </p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 text-center"
              >
                <div className="font-display text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Mission Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-gradient-to-br from-card via-card to-primary/5 border border-border rounded-3xl p-8 md:p-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                Our Mission
              </h2>
            </div>
            
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              We're on a mission to break down the barriers that separate us. Whether you're looking 
              for a quick chat to brighten your day, seeking advice from an unbiased stranger, or 
              simply curious about life in another country — VikChat makes it happen.
            </p>
            
            <p className="text-muted-foreground text-lg leading-relaxed">
              Every conversation is a chance to learn something new, share a laugh, or make an 
              unexpected friend. We've built VikChat to be fast, safe, and completely free — because 
              everyone deserves access to human connection.
            </p>
          </div>
        </section>

        {/* Values Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              What We Stand For
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our core values guide everything we do at VikChat
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="group bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 hover:border-primary/50 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0 group-hover:from-primary/30 group-hover:to-accent/30 transition-all">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-lg mb-2">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
