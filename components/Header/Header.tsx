import Link from "next/link";
import { Button } from "@/components/ui/button";
const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-30 bg-[#0b1220] border-b border-slate-200/10 reveal-fade-in">
      <div className="mx-auto max-w-7xl px-4">
        <ul className="flex h-16 items-center justify-between">
          <Link href="/" className="text-xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_6px_rgba(34,211,238,0.45)]">Exam</span>
            <span className="bg-gradient-to-r from-indigo-400 to-fuchsia-400 bg-clip-text text-transparent drop-shadow-[0_0_6px_rgba(217,70,239,0.45)]">Ease</span>
          </Link>
          <nav className="hidden md:flex items-center gap-10 text-slate-200/80">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/available-exams" className="hover:text-white transition-colors">Exam</Link>
          </nav>
          <Link href="/sign-up">
            <Button variant="gradient" size="sm">Get Started</Button>
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
