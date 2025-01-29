import { motion } from "framer-motion";
import {
  FaRegClock,
  FaShieldAlt,
  FaMoneyBillWave,
  FaChartLine,
} from "react-icons/fa";

const features = [
  {
    title: "Seamless Exam Scheduling",
    description:
      "Schedule exams effortlessly with our flexible time slot system.",
    icon: <FaRegClock size={40} className="text-blue-500" />,
  },
  {
    title: "Secure Online Payments",
    description:
      "Make transactions with confidence through our encrypted payment gateway.",
    icon: <FaMoneyBillWave size={40} className="text-green-500" />,
  },
  {
    title: "Real-Time Exam Experience",
    description: "Get a smooth and reliable online examination experience.",
    icon: <FaShieldAlt size={40} className="text-red-500" />,
  },
  {
    title: "Instant Results & Analytics",
    description:
      "Receive immediate feedback and performance insights post-exam.",
    icon: <FaChartLine size={40} className="text-purple-500" />,
  },
];

export default function Features() {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-gray-800 mb-8"
        >
          Why Choose Us?
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="relative bg-white shadow-lg rounded-2xl overflow-hidden p-6 flex flex-col items-center text-center space-y-4 transition-transform duration-300 hover:shadow-2xl"
            >
              <div className="bg-gray-100 p-4 rounded-full">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-700">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
