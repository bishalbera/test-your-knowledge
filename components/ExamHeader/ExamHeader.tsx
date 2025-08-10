import { Exam, User } from "@prisma/client";

interface ExamHeaderProps {
  exam: Exam;
  userData: User | null;
  timeRemaining: string;
}

const ExamHeader = ({ exam, userData, timeRemaining }: ExamHeaderProps) => {
  return (
    <div className="w-screen flex flex-col py-4 border-b border-white/10 bg-white/5 backdrop-blur">
      <div className="flex items-center gap-4">
        <div className="m-4 h-16 w-16 overflow-hidden rounded-full border border-white/10">
          <img
            src={userData?.imageUrl || "/default-avatar.jpg"}
            alt="profile-pic"
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <h3 className="font-medium text-slate-200">
            Exam Title: <span className="font-bold text-indigo-300">{exam.title}</span>
          </h3>
          <h3 className="font-medium text-slate-200">
            Candidate Name: <span className="font-bold text-indigo-300">{userData?.name}</span>
          </h3>
        </div>
      </div>
      <div className="mx-4 rounded-lg bg-white/10 py-2 text-center text-xl font-bold text-slate-100">
        Remaining Time: {timeRemaining}
      </div>
    </div>
  );
};

export default ExamHeader;
