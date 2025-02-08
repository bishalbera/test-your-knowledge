export const Testimonials = () => {
  const testimonials = [
    {
      name: "John Doe",
      feedback: "ExamEase made my exams so much easier!",
      image: "/me.JPG",
    },
    {
      name: "Jane Smith",
      feedback: "I loved the real-time experience!",
      image: "/jane.jpg",
    },
    {
      name: "Ali Khan",
      feedback: "Highly recommend this platform for students.",
      image: "/ali.jpg",
    },
  ];

  return (
    <section className="py-12 bg-gray-800">
      <h2 className="text-3xl font-bold text-center text-white mb-8">
        What Our Users Say
      </h2>

      <div className="relative w-full max-w-2xl mx-auto overflow-hidden h-44">
        <div className="flex flex-col space-y-6 animate-[fade-in-out_12s_infinite]">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="absolute inset-0 opacity-0 animate-[fade-in-out_12s_infinite] flex flex-col items-center bg-green-400 p-6 rounded-lg shadow-xl"
              style={{
                animationDelay: `${index * 4}s`,
              }}
            >
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-16 h-16 rounded-full mb-4 border-2 border-white"
              />
              <p className="text-lg text-white italic">
                "{testimonial.feedback}"
              </p>
              <h4 className="mt-2 text-white font-semibold">
                - {testimonial.name}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
