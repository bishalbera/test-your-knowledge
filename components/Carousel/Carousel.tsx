"use client";
import { useState } from "react";
import { motion } from "framer-motion";

interface CarouselItem {
  name: string;
  feedback: string;
  image: string;
}

interface CarouselProps {
  items: CarouselItem[];
}

export function Carousel({ items }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-lg shadow-lg">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index < currentIndex ? -100 : 100 }}
            animate={{ opacity: index === currentIndex ? 1 : 0, x: 0 }}
            exit={{ opacity: 0, x: index < currentIndex ? 100 : -100 }}
            transition={{ duration: 0.5 }}
            className={`absolute w-full ${
              index === currentIndex ? "block" : "hidden"
            }`}
          >
            <div className="flex flex-col items-center text-center p-6 bg-white">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 rounded-full mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-800">
                {item.name}
              </h3>
              <p className="text-gray-600">{item.feedback}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full hover:bg-gray-300"
        onClick={handlePrev}
      >
        &#8592;
      </button>
      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full hover:bg-gray-300"
        onClick={handleNext}
      >
        &#8594;
      </button>
    </div>
  );
}
