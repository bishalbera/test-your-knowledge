"use client";

import { useEffect, useState } from "react";

export const Testimonials = () => {
  const testimonials = [
    {
      name: "John Doe",
      feedback: "ExamEase made my exams so much easier!",
      image: "/uuu.avif",
    },
    {
      name: "Jane Smith",
      feedback: "I loved the real-time experience!",
      image: "/dd.jpg",
    },
    {
      name: "Alia Khan",
      feedback: "Highly recommend this platform for students.",
      image: "/dummy.jpg",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 2000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-12 bg-gray-800">
      <h2 className="text-3xl font-bold text-center text-white mb-8">
        What Our Users Say
      </h2>

      <div className="relative w-full max-w-2xl mx-auto overflow-hidden h-44">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className={`absolute inset-0 flex flex-col items-center bg-gray-600 p-6 rounded-lg shadow-xl transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-16 h-16 rounded-full mb-4 border-2 border-white"
            />
            <p className="text-lg text-white italic">
              "{testimonial.feedback}"
            </p>
            <h4 className="mt-2 text-white font-semibold">
              - {testimonial.name}
            </h4>
          </div>
        ))}
      </div>
    </section>
  );
};
