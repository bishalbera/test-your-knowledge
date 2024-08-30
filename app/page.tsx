import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export default function Home() {
  const { userId } = auth();

  var href = userId ? "/profile" : "/sign-up";
  return (
    <div className="min-h-screen flex flex-col bg-primary-color text-white p-2">
      <Header />
      <div className=" flex flex-grow justify-center items-center">
        <div className="w-full mx-auto max-w-[600px]">
          <h1 className="text-6xl my-5 text-nowrap font-mono">
            Test Your Knowledge
          </h1>
          <p className=" text-2xl mb-6 text-white/60 p-1">
            Welcome to TYK, an online platform for those who want to brush up
            their knowledge. Sign up, choose your preferred time slot, and take
            a 2-hour MCQ exam. Practice, track your progress, and excel in your
            preparation with our real-world exam experience.
          </p>
          <Link href={href}>
            <button className="rounded-lg px-4 bg-button-color py-2 hover:bg-button-hover-color focus:outline-none active:bg-blue-800">
              Get Started
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
