import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      className="relative h-screen flex items-center justify-center text-center text-white bg-cover bg-center"
      style={{ backgroundImage: "url('/hero-image.png')" }} 
    >
      
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent"></div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 max-w-3xl p-6"
      >
        <h1 className="text-5xl font-extrabold">The Future of Online Exams</h1>
        <p className="text-lg mt-4 opacity-80">
          Secure, seamless, and stress-free examination experience
        </p>
        <Link href="/sign-up">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 transition rounded-lg text-lg font-semibold"
        >
          Get Started
        </motion.button>
        </Link>
      </motion.div>
    </section>
  );
}
