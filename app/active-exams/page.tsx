"use client";
import ExamCard from "@/components/ExamCard/ExamCard";
import Spinner from "@/components/Spinner/Spinner";

import { Exam } from "@prisma/client";
import { useEffect, useState } from "react";

const ActiveExams = () => {
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const res = await fetch("/api/active-exams", {
          method: "GET",
        });
        if (!res.ok) {
          throw new Error("Something went wrong");
        }
        const data: Exam[] = await res.json();
        setExams(data);
      } catch (error) {
        console.log("Failed to get exams", error);
      } finally {
        setLoading(false);
      }
    };
    fetchExams();
  }, []);

  if (loading) return <Spinner />;

  return (
    <div className="min-h-screen w-full bg-primary-color">
      <h1 className="font-mono text-text-color text-3xl p-4">Active Exams</h1>
      <div className=" w-full grid grid-cols-4 gap-4 p-4">
        {exams.map((exam) => (
          <ExamCard
            key={exam.id}
            exam={exam}
            onButtonClick={(id) => console.log(id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ActiveExams;
