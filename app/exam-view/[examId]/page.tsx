"use client";

import Spinner from "@/components/Spinner/Spinner";
import { Exam } from "@prisma/client";
import { useEffect, useState } from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const ExamView = ({ params }: { params: { examId: string } }) => {
  const { examId } = params;
  const { data: exam, error } = useSWR<Exam>(
    `/api/get-exam/${examId}`,
    fetcher
  );

  if (error) return <div>Failed to load exam.</div>;
  if (!exam) return <Spinner />;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(
    exam.timeLimit * 60 * 1000
  );
  const [markedForReview, setMarkedForReview] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining((prev) => prev - 1000);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAnswer = (questionId, selectedOption) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedOption,
    }));
  };

  const handleMarkForReview = (questionId) => {
    setMarkedForReview((prevMarked) => {
      if (prevMarked.includes(questionId)) {
        return prevMarked.filter((id) => id !== questionId);
      } else {
        return [...prevMarked, questionId];
      }
    });
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => {
      const newIndex = prevIndex + 1;
      if (newIndex >= exam.questions.length) {
        return prevIndex;
      }
      return newIndex;
    });
  };
};

export default ExamView;
