import Link from "next/link";
import { FaGithub, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer>
      <div className="mx-auto px-4 flex justify-between">
        <Link href="/" className=" text-white font-semibold">
          TYK
        </Link>
        <div className="flex gap-4 items-center">
          <a href="https://github.com/bishalbera" type="_blank">
            <FaGithub className="text-white text-xl hover:text-gray-300" />
          </a>
          <a href="https://x.com/BiplabBera20814" type="_blank">
            <FaXTwitter className="text-white text-xl hover:text-gray-300" />
          </a>
        </div>
        <p>
          <small className="text-sm">
            © 2024 Biplab Bera. All rights reserved
          </small>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
