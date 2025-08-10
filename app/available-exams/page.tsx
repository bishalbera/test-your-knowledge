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
    { refreshInterval: 3600000 }
  );
  const router = useRouter();

  if (error) return <div>Failed to load exams</div>;
  if (!exams) return <Spinner />;

  return (
    <div className="min-h-screen w-full">
      <div className="mx-auto max-w-7xl px-4 py-20">
        <h1 className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent text-3xl md:text-4xl font-bold">
          Available Exams
        </h1>
        <p className="mt-2 text-slate-300/80">Pick an exam to schedule your slot.</p>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {exams.map((exam) => (
            <ExamCard
              key={exam.id}
              exam={exam}
              onButtonClick={(id) =>
                router.push(`/available-exams/${id}/schedule-exam`)
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActiveExams;
