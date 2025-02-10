import Link from "next/link";

const HowExamEaseWorks = () => {
  return (
    <section className="bg-black text-white py-16">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-4">How ExamEase Works</h2>
        <p className="text-lg text-gray-400 mb-12 font-mono">

          Get started with ExamEase in three simple steps
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="relative bg-gray-900 rounded-lg p-8 shadow-lg">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white text-xl font-bold w-12 h-12 flex items-center justify-center rounded-full">
              1
            </div>
            <div className="mt-8">
              <div className="text-blue-500 text-5xl mb-4">
                <i className="fas fa-user-plus"></i>
              </div>
              <h3 className="text-2xl font-semibold mb-2">Create Account</h3>
              <p className="text-gray-400 font-mono">
                Sign up and complete your profile to get started
              </p>
            </div>
          </div>

          <div className="relative bg-gray-900 rounded-lg p-8 shadow-lg">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white text-xl font-bold w-12 h-12 flex items-center justify-center rounded-full">
              2
            </div>
            <div className="mt-8">
              <div className="text-blue-500 text-5xl mb-4">
                <i className="fas fa-calendar-alt"></i>
              </div>
              <h3 className="text-2xl font-semibold mb-2">Schedule Exam</h3>
              <p className="text-gray-400 font-mono">
                Choose your exam and preferred time slot
              </p>
            </div>
          </div>

          <div className="relative bg-gray-900 rounded-lg p-8 shadow-lg">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white text-xl font-bold w-12 h-12 flex items-center justify-center rounded-full">
              3
            </div>
            <div className="mt-8">
              <div className="text-blue-500 text-5xl mb-4">
                <i className="fas fa-check-circle"></i>
              </div>
              <h3 className="text-2xl font-semibold mb-2">Take Exam</h3>
              <p className="text-gray-400 font-mono">
                Complete your exam and get instant results
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <Link href="/sign-up">
            <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-2xl hover:scale-105 transition-transform duration-500 text-lg font-mono">
              Start Your Journey Now
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowExamEaseWorks;
