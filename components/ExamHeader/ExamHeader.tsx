import { prisma } from "@/utils/db";
import { currentUser } from "@clerk/nextjs/server";
import { Exam } from "@prisma/client";

const ExamHeader = async (exam: Exam) => {
  const cUser = await currentUser();
  const userData = await prisma.user.findUnique({
    where: {
      clerkId: cUser?.id,
    },
  });

  return (
    <div className="bg-cus-white h-10 w-screen flex-col">
      <div className="flex">
        <div className="w-24 h-24 rounded-full overflow-hidden border-2">
          <img
            src={userData?.imageUrl}
            alt="Profile-pic"
            className="h-full w-full object-cover"

          />
        </div>
        <h3>Candidate Name: `{userData?.name}`</h3>
        <h3>Exam Title: `{exam?.title}`</h3>
      </div>
    </div>
  );
};

export default ExamHeader;
