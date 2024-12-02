import { Exam, User } from "@prisma/client";

interface ExamHeaderProps {
  exam: Exam;
  userData: User | null;
}

const ExamHeader = ({ exam, userData }: ExamHeaderProps) => {
  return (
    <div className="bg-cus-white h-10 w-screen flex-col">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-300">
          <img
            src={userData?.imageUrl || "/default-avatar.jpg"}
            alt="profile-pic"
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <h3 className="font-medium">Exam Title: {exam.title}</h3>
          <h3 className="font-medium">Candidate Name: {userData?.name}</h3>
        </div>
      </div>
    </div>
  );
};

export default ExamHeader;
