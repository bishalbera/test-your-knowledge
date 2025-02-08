import { FaShieldAlt } from "react-icons/fa";
import { FaRegClock, FaMoneyBillWave, FaChartLine } from "react-icons/fa6";

export function Features() {
  const features = [
    {
      title: "Seamless Exam Scheduling",
      description: "Schedule exams effortlessly.",
      icon: <FaRegClock size={40} className="text-blue-500" />,
    },
    {
      title: "Secure Online Payments",
      description: "Make secure transactions.",
      icon: <FaMoneyBillWave size={40} className="text-green-500" />,
    },
    {
      title: "Real-Time Exam Experience",
      description: "Smooth and reliable exams.",
      icon: <FaShieldAlt size={40} className="text-red-500" />,
    },
    {
      title: "Instant Results & Analytics",
      description: "Immediate feedback and insights.",
      icon: <FaChartLine size={40} className="text-purple-500" />,
    },
  ];

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 animate-fadeIn">
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative bg-white shadow-lg rounded-2xl overflow-hidden p-6 flex flex-col items-center text-center space-y-4 transition-transform duration-300 hover:scale-105 hover:shadow-2xl animate-slideIn"
            >
              <div className="bg-gray-100 p-4 rounded-full">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-700">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
