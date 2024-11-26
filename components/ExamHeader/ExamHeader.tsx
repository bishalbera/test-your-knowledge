import { Exam } from "@prisma/client";

interface ExamHeaderProps {
  exam: Exam;
}

const ExamHeader = ({ exam }: ExamHeaderProps) => {

  return (
    <div className="bg-cus-white h-10 w-screen flex-col">
      <div className="flex items-center gap-4">

        <div>
          <h3 className="font-medium">Exam Title: {exam.title}</h3>
        </div>
      </div>
    </div>
  );
};

export default ExamHeader;
