import Link from "next/link";
import GlassCard from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";

const HowExamEaseWorks = () => {
  return (
    <section className="py-20 text-white reveal-on-scroll">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <h2 className="text-4xl font-bold md:text-5xl">
          How ExamEase Works
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-lg text-slate-300/80">
          Get started with ExamEase in three simple steps
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {[1, 2, 3].map((step) => (
            <GlassCard key={step} className="group relative p-8 text-left transition-all hover:translate-y-[-2px]">
              {/* hover aura */}
              <div className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity group-hover:opacity-100">
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-brand-indigo/20 to-brand-fuchsia/20 blur-xl" />
              </div>
              {/* Step badge placed inside card to avoid clipping */}
              <div className="absolute left-1/2 top-4 h-10 w-10 -translate-x-1/2 rounded-full bg-gradient-to-r from-brand-indigo to-brand-fuchsia text-white ring-1 ring-white/20 shadow-md">
                <div className="flex h-full w-full items-center justify-center text-base font-bold">
                  {step}
                </div>
              </div>
              <div className="mt-6">
                <div className="mb-4 text-5xl text-brand-indigo">
                  {step === 1 ? "👤" : step === 2 ? "🗓️" : "✅"}
                </div>
                <h3 className="text-2xl font-semibold mb-1">
                  {step === 1 ? "Create Account" : step === 2 ? "Schedule Exam" : "Take Exam"}
                </h3>
                <p className="text-slate-300/80">
                  {step === 1
                    ? "Sign up and complete your profile to get started"
                    : step === 2
                    ? "Choose your exam and preferred time slot"
                    : "Complete your exam and get instant results"}
                </p>
              </div>
            </GlassCard>
          ))}
        </div>

        <div className="mt-12">
          <Link href="/sign-up">
            <Button variant="gradient" className="px-8 py-6 text-lg">
              Start Your Journey Now
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowExamEaseWorks;
