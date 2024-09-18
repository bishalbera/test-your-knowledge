import Link from "next/link";

const ScheduledExamCard = ({ exam, timeRemaining, isClickable }) => {
  return (
    <div
      key={exam.id}
      className="relative bg-custom-dark rounded-lg shadow-md p-6 border w-[800px] h-[250px] transition transform hover:scale-105 hover:shadow-lg"
    >
      {isClickable ? (
        <Link
          href={`/profile/${exam.userId}/instruction/${exam.examId}`}
          className="items-center grid grid-cols-3 h-full"
        >
          <div>
            <img
              src={exam.imageUrl}
              alt="exam-image"
              className="w-full h-[200px] object-fill"
            />
          </div>
          <div className="col-span-1 pl-4">
            <h2 className="text-2xl font-semibold text-cus-white mb-4">
              {exam.examTitle}
            </h2>
            {timeRemaining ? (
              <div className="flex space-x-2">
                <div className="flex items-center">
                  <div className="bg-cus-white rounded shadow-lg text-2xl font-bold p-1">
                    {timeRemaining.days}
                  </div>
                  <span className="px-1 text-md font-medium text-white">D</span>
                </div>
                <div className="flex items-center">
                  <div className="p-1 rounded shadow-lg text-2xl font-bold bg-cus-white">
                    {timeRemaining.hours}
                  </div>
                  <span className="px-1 text-md text-white font-medium">H</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-cus-white shadow-lg p-1 text-2xl font-bold rounded ">
                    {timeRemaining.minutes}
                  </div>
                  <span className="text-white px-1 text-md font-medium">M</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-cus-white rounded shadow-lg text-2xl font-bold p-1">
                    {timeRemaining.seconds}
                  </div>
                  <span className="px-1 text-md font-medium text-white">S</span>
                </div>
              </div>
            ) : (
              <p className="text-red-500">Exam has started</p>
            )}
          </div>
        </Link>
      ) : (
        <div className="grid items-center grid-cols-3 h-full">
          <div className="col-span-2 flex justify-center">
            <img
              className="w-full h-[200px] object-fill"
              src={exam.imageUrl}
              alt="exam-image"
            />
          </div>
          <div className="col-span-1 pl-4">
            <h2 className="text-2xl font-semibold text-cus-white mb-4">
              {exam.examTitle}
            </h2>
            {timeRemaining ? (
              <div className="flex space-x-2">
                <div className="flex items-center">
                  <div className="bg-cus-white rounded shadow-lg text-2xl font-bold p-1">
                    {timeRemaining.days}
                  </div>
                  <span className="text-white px-1 font-medium text-md">D</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-cus-white rounded shadow-lg text-2xl font-bold p-1">
                    {timeRemaining.hours}
                  </div>
                  <span className="text-white px-1 font-medium text-md">H</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-cus-white rounded shadow-lg text-2xl font-bold p-1">
                    {timeRemaining.minutes}
                  </div>
                  <span className="text-white px-1 font-medium text-md">M</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-cus-white rounded shadow-lg text-2xl font-bold p-1">
                    {timeRemaining.seconds}
                  </div>
                  <span className="text-white px-1 font-medium text-md">S</span>
                </div>
              </div>
            ) : (
              <p className="text-red-500">Exam has started</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduledExamCard;
