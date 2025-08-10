import { Testimonials } from "@/components/Testimonials/Testimonials";
import { Features } from "@/components/FeatureCard/FeatureCard";
import Hero from "@/components/Hero/Hero";
import Header from "@/components/Header/Header";
import HowExamEaseWorks from "@/components/HowItWorks/HowItWorks";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 reveal-fade-in">
        {/* Hero Section */}
        <Hero />

        {/* How it Works */}
        <HowExamEaseWorks />

        {/* Features Section */}
        <Features />

        {/* Testimonials */}
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
