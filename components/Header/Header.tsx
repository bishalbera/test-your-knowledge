import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-primary-color pt-2 px-2">
      <ul className=" flex flex-nowrap justify-between">
        <Link href="/" className="text-[#EBD3F8] text-xl font-mono">Test Your Knowledge</Link>
        <Link href="/" className="text-white text-lg">Home</Link>
        <Link href="/active-exam" className="text-white text-lg">Exam</Link>
        <Link href="/sign-up" className="text-white text-xl rounded-lg bg-button-color px-2 hover:bg-button-hover-color hover:rounded-2xl transition-all duration-300 font-semibold">
          Get Started
        </Link>
      </ul>
    </header>
  );
};

export default Header;
