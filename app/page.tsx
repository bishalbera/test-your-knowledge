import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa6";
import { Testimonials } from "@/components/Testimonials/Testimonials";
import { Features } from "@/components/FeatureCard/FeatureCard";
import Hero from "@/components/Hero/Hero";


export default function Home() {
  

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-300">
      {/* Hero Section */}
     <Hero />

      {/* Features Section */}
     <Features />
      {/* Testimonials Carousel */}
     <Testimonials />

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8 text-center">
        <p>© 2024 ExamEase. All rights reserved.</p>
        <div className="flex justify-center gap-4 mt-4">
          <FaFacebook className="text-blue-600 hover:text-white" size={24} />
          <FaTwitter className="text-blue-400 hover:text-white" size={24} />
          <FaLinkedin className="text-blue-700 hover:text-white" size={24} />
        </div>
      </footer>
    </div>
  );
}