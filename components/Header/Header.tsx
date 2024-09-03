import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-primary-color pt-2 px-2">
      <ul className=" flex flex-nowrap justify-between">
        <Link href="/" className="text-[#DAFDBA] text-xl font-mono">
          Test Your Knowledge
        </Link>
        <Link href="/" className="text-white text-lg">
          Home
        </Link>
        <Link href="/available-exams" className="text-white text-lg">
          Exam
        </Link>
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
