"use client";

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
            <div
              key={exam.id}
              className="relative bg-custom-dark rounded-lg shadow-md p-6 border w-[800px] h-[250px] transition transform hover:scale-105 hover:shadow-lg"
            >
              <div className="items-center grid grid-cols-3 h-full">
                <div className="col-span-2 flex justify-center">
                  <img
                    src={exam.imageUrl}
                    alt="exam-image"
                    className=" w-full h-[200px] object-fit"
                  />
                </div>
                <div className="col-span-1 pl-4">
                  <h2 className="text-2xl font-semibold text-cus-white mb-4">
                    {exam.examTitle}
                  </h2>
                  {timeRemaining[exam.examId] ? (
                    <div className="flex space-x-2">
                      <div className="flex items-center">
                        <div className="bg-cus-white rounded shadow-lg text-2xl font-bold p-1">
                          {timeRemaining[exam.examId].days}
                        </div>
                        <span className="px-1 text-md font-medium text-white">
                          D
                        </span>
                      </div>
                      <div className="flex items-center">
                        <div className="bg-cus-white rounded shadow-lg text-2xl font-bold p-1">
                          {timeRemaining[exam.examId].hours}
                        </div>
                        <span className="px-1 text-md font-medium text-white">
                          H
                        </span>
                      </div>
                      <div className="flex items-center">
                        <div className="bg-cus-white rounded shadow-lg text-2xl font-bold p-1">
                          {timeRemaining[exam.examId].minutes}
                        </div>
                        <span className="px-1 text-md font-medium text-white">
                          M
                        </span>
                      </div>
                      <div className="flex items-center">
                        <div className="bg-cus-white rounded shadow-lg text-2xl font-bold p-1">
                          {timeRemaining[exam.examId].seconds}
                        </div>
                        <span className="px-1 text-md font-medium text-white">
                          S
                        </span>
                      </div>
                    </div>
                  ) : (
                    <p className="text-red-500">Exam has started</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScheduledExam;
