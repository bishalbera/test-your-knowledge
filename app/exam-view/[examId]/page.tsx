"use client";

import ExamHeader from "@/components/ExamHeader/ExamHeader";
import Spinner from "@/components/Spinner/Spinner";
import { Exam, ExamQuestion, Questionchoice } from "@prisma/client";
import { useEffect, useState } from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const ExamView = ({ params }: { params: { examId: string } }) => {
  const { examId } = params;
  const { data: exam, error } = useSWR<
    Exam & { questions: (ExamQuestion & { choices: Questionchoice[] })[] }
  >(`/api/get-exam/${examId}`, fetcher);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [markedForReview, setMarkedForReview] = useState<string[]>([]);

  useEffect(() => {
    if (exam) {
      setTimeRemaining(exam.timeLimit * 60 * 1000);
    }
  }, [exam]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining((prev) => Math.max(prev - 1000, 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (examId) {
      window.addEventListener("beforeunload", () => {
        localStorage.setItem(
          `exam-${examId}-remaining-time`,
          timeRemaining.toString()
        );
      });
    }
    return () => {
      window.removeEventListener("beforeunload", () => {
        localStorage.setItem(
          `exam-${examId}-remaining-time`,
          timeRemaining.toString()
        );
      });
    };
  }, [timeRemaining, examId]);


  useEffect(() => {
    if (exam) {
      const savedTime = localStorage.getItem(`exam-${exam.id}-remaining-time`);
      setTimeRemaining(
        savedTime ? parseInt(savedTime, 10) : exam.timeLimit * 60 * 1000
      );
    }
  }, [exam]);


  const handleAnswer = (questionId: string, selectedChoiceId: string) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedChoiceId,
    }));
  };

  const handleMarkForReview = (questionId: string) => {
    setMarkedForReview((prevMarked) =>
      prevMarked.includes(questionId)
        ? prevMarked.filter((id) => id !== questionId)
        : [...prevMarked, questionId]
    );
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => {
      const newIndex = prevIndex + 1;
      return newIndex < (exam?.questions.length || 0) ? newIndex : prevIndex;
    });
  };

  const handlePreviousQestion = () => {
    setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0));
  };

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };
  if (error) return <div>Failed to load exam.</div>;
  if (!exam) return <Spinner />;

  const currentQuestion = exam.questions[currentQuestionIndex];

  return (
    <div className="flex flex-col h-screen">
      <ExamHeader exam={exam} />
      <div className="flex-grow flex">
        <div className="w-1/4 p-4 border-r border-gray-200">
          <div className="mb-4">
            <div className="font-semibold">Remaining Time</div>
            <div className="text-xl font-bold">{formatTime(timeRemaining)}</div>
          </div>
          <div>
            {exam.questions.map((question, index) => (
              <button
                key={question.id}
                className={`w-10 h-10 rounded-full border ${
                  answers[question.id]
                    ? "bg-green-500"
                    : markedForReview.includes(question.id)
                    ? "bg-purple-500"
                    : "bg-gray-200"
                }`}
                onClick={() => setCurrentQuestionIndex(index)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
        <div className="flex-grow p-8">
          <div className="text-lg font-semibold">
            Question {currentQuestionIndex + 1}:
          </div>
          <div className="text-gray-800 mb-4 ">
            {" "}
            {currentQuestion?.questionText}
          </div>
          <div className="space-y-4">
            {currentQuestion?.choices.map((choice) => (
              <div key={choice.id} className="flex items-center">
                <input
                  type="radio"
                  id={choice.id}
                  name={`question-${currentQuestion.id}`}
                  checked={answers[currentQuestion.id] === choice.id}
                  onChange={() => handleAnswer(currentQuestion.id, choice.id)}
                  className="mr-2"
                />
                <label htmlFor={choice.id}>{choice.choiceAnswer}</label>
              </div>
            ))}
          </div>
          <div className="flex space-x-4 mt-6">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() => handleMarkForReview(currentQuestion.id)}
            >
              {markedForReview.includes(currentQuestion.id)
                ? "Unmark for Review"
                : "Mark for Review"}
            </button>
            <button
              className="px-4 py-2 bg-gray-500 text-white rounded"
              onClick={handlePreviousQestion}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded"
              onClick={handleNextQuestion}
              disabled={currentQuestionIndex === exam.questions.length - 1}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamView;
