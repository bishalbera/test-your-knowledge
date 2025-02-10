import Link from "next/link";

export default function Hero() {
  return (
    <section
      className="relative h-screen flex items-center justify-center text-center text-white bg-cover bg-center"
      style={{ backgroundImage: "url('/hero-image.png')" }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent"></div>

      <div className="relative z-10 max-w-3xl p-6">
        <h1 className="text-5xl font-extrabold">The Future of Online Exams</h1>
        <p className="text-lg mt-4 opacity-80">
          Secure, seamless, and stress-free examination experience
        </p>

        <div className="flex gap-4 justify-center">
        <Link href="/sign-up">
          <button className="mt-6 px-8 py-3 rounded-lg text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg shadow-blue-500/30 transition-all duration-300 transform hover:scale-105 hover:shadow-purple-500/50">
            Get Started
          </button>
        </Link>

        <Link href="/available-exams">
          <button className="mt-6 px-8 py-3 rounded-lg text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg shadow-blue-500/30 transition-all duration-300 transform hover:scale-105 hover:shadow-purple-500/50">
            Exam
          </button>
        </Link>
        </div>
      </div>
    </section>
  );
}
