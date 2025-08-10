import { FaShieldAlt } from "react-icons/fa";
import { FaRegClock, FaMoneyBillWave, FaChartLine } from "react-icons/fa6";
import GlassCard from "@/components/ui/GlassCard";

export function Features() {
  const features = [
    {
      title: "Seamless Exam Scheduling",
      description: "Schedule exams effortlessly.",
      icon: <FaRegClock size={40} className="text-indigo-400" />,
    },
    {
      title: "Secure Online Payments",
      description: "Make secure transactions.",
      icon: <FaMoneyBillWave size={40} className="text-emerald-400" />,
    },
    {
      title: "Real-Time Exam Experience",
      description: "Smooth and reliable exams.",
      icon: <FaShieldAlt size={40} className="text-rose-400" />,
    },
    {
      title: "Instant Results & Analytics",
      description: "Immediate feedback and insights.",
      icon: <FaChartLine size={40} className="text-fuchsia-400" />,
    },
  ];

  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <h2 className="mb-12 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <GlassCard key={index} className="group relative overflow-hidden p-6 text-left transition-all hover:translate-y-[-2px]">
              <div className="mb-4 inline-flex rounded-full bg-white/10 p-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-white">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-slate-300/80">
                {feature.description}
              </p>
              <div className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity group-hover:opacity-100">
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-indigo-500/20 to-fuchsia-500/20 blur-xl" />
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
