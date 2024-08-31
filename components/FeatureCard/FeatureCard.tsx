import { FaRegClock, FaLock, FaLaptopCode, FaChartLine } from "react-icons/fa6";

const FeatureCard = () => {
  return (
    <div className="grid grid-cols-2 gap-6 p-8">
      <div className="bg-[#13678A] text-white rounded-lg p-6 shadow-lg">
        <FaRegClock className="text-4xl text-blue-500 mb-4 mx-auto " />
        <h3 className="text-xl font-semibold mb-4">Seamless Exam Scheduling</h3>
        <p>
          Choose your preferred time slot and take the exam at your convenience.
          Our flexible scheduling ensures you can focus when you're at your
          best.
        </p>
      </div>
      <div className="bg-[#13678A] text-grey/70 rounded-lg p-6 shadow-lg ">
        <FaLock className="text-4xl text-blue-500 mb-4 mx-auto" />
        <h3 className="text-xl font-semibold mb-4">Secure Online Payments</h3>
        <p>
          Pay securely through our platform to unlock access to the exam. We
          prioritize your safety with trusted payment gateways.
        </p>
      </div>
      <div className="bg-[#13678A] text-grey/70 rounded-lg p-6 shadow-lg ">
        <FaLaptopCode className="text-4xl text-blue-500 mb-4 mx-auto" />
        <h3 className="text-xl font-semibold mb-4">
          Real-Time Exam Experience
        </h3>
        <p>
          Experience a real-time, fully online exam with a user-friendly
          interface. Our platform mimics the environment of competitive exams.
        </p>
      </div>
      <div className="bg-[#13678A] text-grey/70 rounded-lg p-6 shadow-lg ">
        <FaChartLine className="text-4xl text-blue-500 mb-4 mx-auto" />
        <h3 className="text-xl font-semibold mb-4">
          Instant Results and Analytics
        </h3>
        <p>
          Get your results immediately after submitting your exam. Analyze your
          performance with detailed insights and improve your preparation.
        </p>
      </div>
    </div>
  );
};

export default FeatureCard;
