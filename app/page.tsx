import Link from "next/link";

export default function Home() {
  return (
    <div className="w-screen h-screen bg-black flex justify-center items-center text-white">
      <div className="w-full max-w-[600px] mx-auto">
        <h1 className="text-6xl mb-5 text-nowrap font-mono">
          Test Your Knowledge
        </h1>
        <p className="text-2xl mb-6 text-white/60 p-1">
          Welcome to TYK, an online platform for those who want to brush up
          their knowledge. Sign up, choose your preferred time slot, and take a
          2-hour MCQ exam . Practice, track your progress, and excel in your
          preparation with our real-world exam experience.
        </p>
        <Link href="/signup">
          <button
            className="rounded-lg px-4 py-2 bg-blue-700 text-xl hover:bg-blue-800 active:bg-blue-800
         focus:outline-none focus:ring-blue-400"
          >
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
}
