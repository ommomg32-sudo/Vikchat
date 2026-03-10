import { Navbar } from "@/react-app/components/Navbar";
import { Footer } from "@/react-app/components/Footer";
import { Link } from "react-router-dom";
import { 
  HelpCircle, 
  Shield, 
  MessageCircle, 
  AlertTriangle, 
  Users, 
  Zap,
  ChevronDown,
  Mail
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/react-app/components/ui/button";

const faqs = [
  {
    question: "How does VikChat work?",
    answer: "VikChat connects you with random strangers for text-based conversations. Simply click 'Start Chatting' and you'll be matched with someone looking to chat. If you want to talk to someone else, hit 'Skip' to find a new partner.",
  },
  {
    question: "Is VikChat free to use?",
    answer: "Yes! VikChat is completely free. No subscriptions, no hidden fees, no premium features locked behind a paywall. Everyone gets the same great experience.",
  },
  {
    question: "Do I need to create an account?",
    answer: "No account needed! VikChat is designed for instant, anonymous conversations. Just click 'Start Chatting' and you're ready to go. Your privacy is our priority.",
  },
  {
    question: "Is my conversation private?",
    answer: "Your conversations are anonymous — your chat partner doesn't know who you are. However, please don't share personal information like your full name, address, or financial details with strangers.",
  },
  {
    question: "What should I do if someone is being inappropriate?",
    answer: "If you encounter inappropriate behavior, simply click 'Skip' to end the conversation and find a new partner. You can also close the chat entirely. We're working on reporting features for future updates.",
  },
  {
    question: "Can I reconnect with someone I chatted with?",
    answer: "Currently, VikChat doesn't have a friend or reconnect feature — each conversation is a unique, random encounter. This keeps things spontaneous and fun!",
  },
  {
    question: "Why am I waiting a long time to find a match?",
    answer: "Match times depend on how many people are online. During peak hours, you'll find matches instantly. During quieter times, it may take a bit longer. Hang tight — someone will be there soon!",
  },
  {
    question: "Does VikChat work on mobile?",
    answer: "Yes! VikChat is fully responsive and works great on smartphones and tablets. Just open it in your mobile browser — no app download required.",
  },
];

const tips = [
  {
    icon: Shield,
    title: "Stay Anonymous",
    description: "Never share personal information like your real name, address, phone number, or social media accounts.",
  },
  {
    icon: Users,
    title: "Be Respectful",
    description: "Treat others how you'd want to be treated. Harassment, hate speech, and inappropriate content aren't tolerated.",
  },
  {
    icon: AlertTriangle,
    title: "Trust Your Instincts",
    description: "If something feels off, use the Skip button. You're never obligated to continue a conversation.",
  },
  {
    icon: Zap,
    title: "Have Fun",
    description: "VikChat is about making connections and having interesting conversations. Relax, be yourself, and enjoy!",
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left bg-card/50 hover:bg-card/80 transition-colors"
      >
        <span className="font-medium text-foreground pr-4">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="p-5 pt-0 bg-card/30">
          <p className="text-muted-foreground pt-4 border-t border-border/50">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function Support() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <HelpCircle className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">Help Center</span>
            </div>
            
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              How Can We <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Help</span>?
            </h1>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              Find answers to common questions, learn safety tips, or get in touch with us.
            </p>
          </div>
        </section>

        {/* Safety Tips */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-10">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
              Safety Tips
            </h2>
            <p className="text-muted-foreground">Stay safe while meeting new people</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {tips.map((tip) => (
              <div
                key={tip.title}
                className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-5"
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4">
                  <tip.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{tip.title}</h3>
                <p className="text-muted-foreground text-sm">{tip.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-10">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground">Quick answers to common questions</p>
          </div>
          
          <div className="space-y-3">
            {faqs.map((faq) => (
              <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-gradient-to-br from-card via-card to-primary/5 border border-border rounded-3xl p-8 md:p-12 text-center">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-6">
              <Mail className="w-7 h-7 text-white" />
            </div>
            
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
              Still Need Help?
            </h2>
            
            <p className="text-muted-foreground max-w-lg mx-auto mb-6">
              Can't find what you're looking for? We're here to help. Reach out and we'll get back to you as soon as possible.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:support@vikchat.com">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-6">
                  <Mail className="w-4 h-4 mr-2" />
                  Contact Support
                </Button>
              </a>
              <Link to="/chat">
                <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary/10">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Start Chatting
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
