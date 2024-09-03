"use client";
import ExamCard from "@/components/ExamCard/ExamCard";
import Spinner from "@/components/Spinner/Spinner";
import { Exam } from "@prisma/client";
import { useRouter } from "next/navigation";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const ActiveExams = () => {
  const { data: exams, error } = useSWR<Exam[]>(
    "/api/available-exams",
    fetcher,
    { refreshInterval: 10000 }
  );
  const router = useRouter();

  if (error) return <div>Failed to load exams</div>;
  if (!exams) return <Spinner />;

  return (
    <div className="min-h-screen w-full bg-primary-color">
      <h1 className="font-mono text-text-color text-3xl p-4">
        Available Exams
      </h1>
      <div className=" w-full grid grid-cols-4  gap-4 p-4">
        {exams.map((exam) => (
          <ExamCard
            key={exam.id}
            exam={exam}
            onButtonClick={(id) =>
              router.push(`/available-exams/${id}/instruction`)
            }
          />
        ))}
      </div>
    </div>
  );
};

export default ActiveExams;
