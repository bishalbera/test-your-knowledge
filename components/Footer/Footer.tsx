import Link from "next/link";
import { FaGithub, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="mt-16 border-t border-white/10">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-8">
        <Link href="/" className="text-white font-semibold">
          TYK
        </Link>
        <div className="flex items-center gap-4">
          <a href="https://github.com/bishalbera" target="_blank" rel="noreferrer">
            <FaGithub className="text-xl text-slate-300 hover:text-white transition-colors" />
          </a>
          <a href="https://x.com/BiplabBera20814" target="_blank" rel="noreferrer">
            <FaXTwitter className="text-xl text-slate-300 hover:text-white transition-colors" />
          </a>
        </div>
        <p>
          <small className="text-sm text-slate-400">
            © 2024 Biplab Bera. All rights reserved
          </small>
        </p>
      </div>
      <p className="pb-8 text-center font-mono text-slate-400">— Made with 🖤 by Bishal —</p>
    </footer>
  );
};

export default Footer;
