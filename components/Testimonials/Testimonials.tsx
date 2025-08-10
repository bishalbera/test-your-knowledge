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
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20">
      <h2 className="mb-10 text-center text-3xl font-bold md:text-4xl">
        What Our Users Say
      </h2>

      <div className="relative mx-auto h-56 w-full max-w-2xl overflow-hidden">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className={`absolute inset-0 mx-auto flex max-w-xl flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-6 text-center shadow-lg backdrop-blur transition-opacity duration-700 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="mb-4 h-16 w-16 rounded-full border-2 border-white/30 object-cover"
            />
            <p className="text-base italic text-slate-200">
              {`"`}
              {testimonial.feedback}
              {`"`}
            </p>
            <h4 className="mt-2 font-semibold text-white">- {testimonial.name}</h4>
          </div>
        ))}
        <div className="pointer-events-none absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-r from-indigo-500/10 to-fuchsia-500/10 blur-2xl" />
      </div>
    </section>
  );
};
