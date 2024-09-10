"use client";

import Spinner from "@/components/Spinner/Spinner";
import { getUserExams } from "@/utils/examUtils";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
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
  const { userId } = useParams();
  const [timeRemaining, setTimeRemaining] = useState<{ [key: string]: any }>(
    {}
  );

  const fetchUserExam = async (userId: string) => {
    const res = await getUserExams(userId);

    if (res?.length === 0) {
      throw new Error("No scheduled exams found");
    }
    return res;
  };

  const {
    data: userExams,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["userExams", userId],
    queryFn: () => fetchUserExam(userId?.[0]),
  });

  if (isLoading) return <Spinner />;
  if (isError) return <p>Error loadind exams</p>;

  const filteredExams = userExams?.filter(
    (exam) => exam.scheduledDateTime && exam.paid
  );

  if (!filteredExams) return <p>No scheduled exams found</p>;

  useEffect(() => {

    const calculateTimeRemaining = (examId: string, scheduledTime: Date) => {

      const now = new Date().getTime()
      const examTime = new Date(scheduledTime).getTime()

      const timeLeft = examTime - now

      setTimeRemaining((prev) => ({

        ...prev,
        [examId]: timeLeft > 0 ? formatTimeRemaining(timeLeft) : null,


      }))


    }

    const timeInterval = setInterval(() => {

      filteredExams.forEach((exam) =>

        calculateTimeRemaining(exam.examId, exam.scheduledDateTime)


      )

    }, 1000)

    return () => clearInterval(timeInterval)

  }, [filteredExams]);



  return (

    <div>

      <h1>My Scheduled Exams</h1>


    </div>

  )
};

export default ScheduledExam;
