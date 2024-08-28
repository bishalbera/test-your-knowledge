const Header = () => {
  return (
    <header className="bg-primary-color pt-2 px-2">
      <ul className=" flex flex-nowrap justify-between">
        <li className="text-[#EBD3F8] text-xl font-mono">
          Test Your Knowledge
        </li>
        <li className="text-white text-lg">Home</li>
        <li className="text-white text-lg">Exam</li>
        <li className="text-white text-xl rounded-lg bg-button-color px-2 hover:bg-button-hover-color hover:rounded-2xl transition-all duration-300 font-semibold">
          Get Started
        </li>
      </ul>
    </header>
  );
};

export default Header;
