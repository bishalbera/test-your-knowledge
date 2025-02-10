import Link from "next/link";
const Header = () => {
  return (
    <header className="absolute top-0 left-0 w-full bg-gradient-to-b from-black/50 to-transparent px-4 py-2 z-20">
      <ul className="flex justify-between items-center">
        <Link href="/" className=" text-xl font-mono">
          <span className="text-[#DAFDBA]">Exam</span>
          <span className="text-green-400">Ease</span>
        </Link>
        <div className="flex gap-16">
          <Link href="/" className="text-white text-lg">
            Home
          </Link>
          <Link href="/available-exams" className="text-white text-lg">
            Exam
          </Link>
        </div>
        <Link
          href="/sign-up"
          className="text-white text-xl rounded-lg bg-button-color px-2 hover:bg-button-hover-color hover:rounded-2xl transition-all duration-300 font-semibold"
        >
          Get Started
        </Link>
      </ul>
    </header>
  );
};


export default Header;
