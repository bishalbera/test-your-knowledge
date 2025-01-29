"use client";
import { motion } from "framer-motion";
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa6";
import { useState, useEffect } from "react";
import Features from "@/components/FeatureCard/FeatureCard";
import Hero from "@/components/Hero/Hero";

const testimonials = [
  {
    name: "John Doe",
    feedback: "ExamEase made my exams so much easier!",
    image: "/me.JPG",
  },
  {
    name: "Jane Smith",
    feedback: "I loved the real-time experience!",
    image: "/jane.jpg",
  },
  {
    name: "Ali Khan",
    feedback: "Highly recommend this platform for students.",
    image: "/ali.jpg",
  },
];

export default function Home() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-300">
      {/* Hero Section */}
     <Hero />

      {/* Features Section */}
     <Features />
      {/* Testimonials Carousel */}
      <section className="py-12 bg-gray-800 relative">
        <h2 className="text-3xl font-bold text-center text-white mb-8">
          What Our Users Say
        </h2>
        <div className="relative overflow-hidden max-w-2xl mx-auto">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center bg-gray-700 p-6 rounded-lg shadow-xl"
          >
            <img
              src={testimonials[current].image}
              alt={testimonials[current].name}
              className="w-16 h-16 rounded-full mb-4 border-2 border-white"
            />
            <p className="text-lg text-white italic">
              "{testimonials[current].feedback}"
            </p>
            <h4 className="mt-2 text-white font-semibold">
              - {testimonials[current].name}
            </h4>
          </motion.div>
        </div>
      </section>

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
