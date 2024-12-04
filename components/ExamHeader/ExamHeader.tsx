import { Exam, User } from "@prisma/client";

interface ExamHeaderProps {
  exam: Exam;
  userData: User | null;
  timeRemaining: string;
}

const ExamHeader = ({ exam, userData, timeRemaining }: ExamHeaderProps) => {
  return (
    <div className="bg-gray-900 text-gray-200 w-screen flex flex-col py-4">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-600 m-4">
          <img
            src={userData?.imageUrl || "/default-avatar.jpg"}
            alt="profile-pic"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h3 className="font-medium text-gray-300">
            Exam Title:{" "}
            <span className="text-blue-400 font-bold">{exam.title}</span>
          </h3>
          <h3 className="font-medium text-gray-300">
            Candidate Name:{" "}
            <span className="text-blue-400 font-bold">{userData?.name}</span>
          </h3>
        </div>
      </div>
      <div className="text-xl font-bold py-2 text-gray-200 bg-gray-800 rounded-lg mx-4 text-center">
        Remaining Time: {timeRemaining}
      </div>
    </div>
  );
};

export default ExamHeader;
