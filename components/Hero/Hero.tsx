import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section
      className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-cover bg-center text-center text-white reveal-fade-in bg-[radial-gradient(1000px_600px_at_20%_20%,rgba(99,102,241,0.15),transparent),radial-gradient(900px_500px_at_80%_25%,rgba(217,70,239,0.12),transparent),radial-gradient(900px_600px_at_50%_90%,rgba(16,185,129,0.10),transparent)]"
    >
      {/* Dark gradient veil */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b1220]/80 via-[#0b1220]/60 to-transparent" />
      {/* Decorative gradient glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-20%] top-1/3 h-80 w-80 -translate-y-1/2 rounded-full bg-gradient-to-tr from-brand-indigo/20 to-brand-fuchsia/10 blur-[100px]" />
        <div className="absolute right-[-20%] bottom-0 h-96 w-96 rounded-full bg-gradient-to-tr from-brand-emerald/20 to-brand-cyan/10 blur-[110px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6">
        <h1 className="bg-gradient-to-r from-white via-slate-200 to-slate-300 bg-clip-text text-5xl font-extrabold leading-tight text-transparent md:text-6xl">
          The Future of Online Exams
        </h1>
        <p className="mt-4 text-lg text-slate-200/80">
          Secure, seamless, and stress-free examination experience
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link href="/sign-up">
            <Button variant="gradient" className="px-8 py-6 text-lg">
              Get Started
            </Button>
          </Link>
          <Link href="/available-exams">
            <Button variant="glass" className="px-8 py-6 text-lg">
              Browse Exams
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
