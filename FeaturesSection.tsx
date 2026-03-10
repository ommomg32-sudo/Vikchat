import { Shield, Zap, Globe, Lock, MessageCircle, Users } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Instant Matching",
    description: "Get connected with a random stranger in seconds. No waiting, no queues.",
    color: "text-yellow-400",
    bg: "bg-yellow-400/10",
  },
  {
    icon: Shield,
    title: "Safe & Anonymous",
    description: "Chat anonymously without sharing personal info. Your privacy is our priority.",
    color: "text-green-400",
    bg: "bg-green-400/10",
  },
  {
    icon: Globe,
    title: "Worldwide Connections",
    description: "Meet people from over 50 countries. Break barriers and make global friends.",
    color: "text-blue-400",
    bg: "bg-blue-400/10",
  },
  {
    icon: Lock,
    title: "No Registration",
    description: "Jump straight into chatting. No sign-ups, no emails, no hassle.",
    color: "text-purple-400",
    bg: "bg-purple-400/10",
  },
  {
    icon: MessageCircle,
    title: "Text & Video",
    description: "Choose your preferred way to connect - text chat now, video chat coming soon.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Users,
    title: "Active Community",
    description: "Join thousands of users looking for genuine conversations every day.",
    color: "text-accent",
    bg: "bg-accent/10",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 relative">
      {/* Background accent */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl mb-4">
            Why choose <span className="text-gradient">VikChat</span>?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We've built the best random chat experience with features that matter.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative bg-card border border-border rounded-2xl p-6 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center mb-4`}>
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className="font-display font-semibold text-xl text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
