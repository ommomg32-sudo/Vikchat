import { Navbar } from "@/react-app/components/Navbar";
import { HeroSection } from "@/react-app/components/HeroSection";
import { FeaturesSection } from "@/react-app/components/FeaturesSection";
import { Footer } from "@/react-app/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  );
}
