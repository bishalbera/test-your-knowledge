import FeatureCard from "@/components/FeatureCard/FeatureCard";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";

export default function Home() {

  return (
    <div className="min-h-screen flex flex-col bg-primary-color text-white p-2">
      <Header />
      <div className=" flex flex-grow ">
        <div className="w-full mx-auto max-w-[800px]  mt-32 scroll-wrapper ">
          <h1 className="supports-no-scroll-driven-animations:animate-none text-[4rem] my-5  font-mono animate-fade-out-down [animation-timeline:scroll()] [animation-range:0px_300px]">
            Test Your Knowledge
          </h1>
          <p className=" text-xl mb-6 text-white/60 p-1  fancy-text">
            Welcome to TYK, an online platform for those who want to brush up
            their knowledge. Sign up, choose your preferred time slot, and take
            a 2-hour MCQ exam. Practice, track your progress, and excel in your
            preparation with our real-world exam experience.
          </p>
        </div>
      </div>
      <h2 className="pl-8 font-bold font-mono text-lg">Features</h2>
      <FeatureCard />
      <Footer />
    </div>
  );
}
