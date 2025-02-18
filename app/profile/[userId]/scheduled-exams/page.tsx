"use client";

import ScheduledExamCard from "@/components/ScheduledExamCard/ScheduledExamCard";
import Spinner from "@/components/Spinner/Spinner";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const formatTimeRemaining = (miliseconds: number) => {
  const totalSeconds = Math.floor(miliseconds / 1000);
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds };
};

const ScheduledExam = () => {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  console.log("userId:", userId);

  const [timeRemaining, setTimeRemaining] = useState<{ [key: string]: any }>(
    {}
  );

  const fetchUserExam = async (userId: string) => {
    const res = await fetch(`/api/get-userexams/${userId}`);
    console.log("resssssssss", res);
    if (!res.ok) {
      throw new Error("Failed to fetch user exam");
    }

    const data = await res.json();
    return data.length ? data : [];
  };

  const {
    data: userExams,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["userExams", userId],
    queryFn: () => fetchUserExam(userId!),
    enabled: !!userId,
  });

  useEffect(() => {
    const calculateTimeRemaining = (examId: string, scheduledTime: Date) => {
      const now = new Date().getTime();
      const examTime = new Date(scheduledTime).getTime();
      const timeLeft = examTime - now;

      setTimeRemaining((prev) => ({
        ...prev,
        [examId]: timeLeft > 0 ? formatTimeRemaining(timeLeft) : null,
      }));
    };

    if (userExams?.length) {
      const timeInterval = setInterval(() => {
        userExams.forEach((exam) =>
          calculateTimeRemaining(exam.examId, exam.scheduledDateTime)
        );
      }, 1000);

      return () => clearInterval(timeInterval);
    }
  }, [userExams]);

  if (isLoading) return <Spinner />;

  if (isError) return <p>Error loading exams</p>;
  if (!userExams?.length) return <p>No scheduled exams found</p>;

  const filteredExams = userExams.filter((exam) => exam.scheduledDateTime);

  return (
    <div className="min-h-screen mx-auto p-4 bg-primary-color">
      <h1 className="text-cus-white text-3xl p-4 font-mono">
        My Scheduled Exams
      </h1>
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="grid grid-cols-1 gap-10">
          {filteredExams.map((exam) => (
            <ScheduledExamCard
              key={exam.id}
              exam={exam}
              timeRemaining={timeRemaining[exam.examId]}
              isClickable={timeRemaining[exam.examId]?.minutes <= 3}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScheduledExam;
