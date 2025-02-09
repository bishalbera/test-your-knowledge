"use client";

import ExamHeader from "@/components/ExamHeader/ExamHeader";
import Spinner from "@/components/Spinner/Spinner";
import {
  AlertDialog,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Exam, ExamQuestion, Questionchoice, User } from "@prisma/client";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@radix-ui/react-alert-dialog";
import { useRouter } from "next/navigation";
import { useEffect, useState, use } from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const ExamView = (props: { params: Promise<{ examId: string }> }) => {
  const params = use(props.params);
  const { examId } = params;
  const { data: exam, error } = useSWR<
    Exam & { questions: (ExamQuestion & { choices: Questionchoice[] })[] }
  >(`/api/get-exam/${examId}`, fetcher);

  const { data: userData, error: userError } = useSWR<User | null>(
    "/api/get-user",
    fetcher
  );

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [markedForReview, setMarkedForReview] = useState<string[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // useEffect(() => {
  //   const handleVisibilityChange = () => {
  //     if (document.visibilityState === "hidden") {
  //       alert(" Tab switched");
  //       //TODO: Add code to submit exam
  //     }
  //   };
  //   document.addEventListener("visibilitychange", handleVisibilityChange);
  //   return () => {
  //     document.removeEventListener("visibilitychange", handleVisibilityChange);
  //   };
  // }, []);

  // useEffect(() => {
  //   const tabId = Math.random().toString(36).substring(7);
  //   localStorage.setItem("currentExamTab", tabId);

  //   const checkTabs = () => {
  //     if (localStorage.getItem("currentExamTab") !== tabId) {
  //       alert(" Only one tab is allowed for the exam.");
  //       window.close();
  //     }
  //   };
  //   window.addEventListener("storage", checkTabs);

  //   return () => {
  //     window.removeEventListener("storage", checkTabs);
  //     localStorage.removeItem("currentExamTab");
  //   };
  // }, []);

  // useEffect(() => {
  //   const handleBlur = () => {
  //     alert("Minimizing or switiching windows is not allowed during the exam");
  //   };
  //   window.addEventListener("blur", handleBlur);
  //   return () => {
  //     window.removeEventListener("blur", handleBlur);
  //   };
  // }, []);

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
      const remainingTime =
        savedTime && parseInt(savedTime, 10) > 0
          ? parseInt(savedTime, 10)
          : exam.timeLimit * 60 * 1000;
      setTimeRemaining(remainingTime);
    }
  }, [exam]);

  const handleAnswer = async (questionId: string, selectedChoiceId: string) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedChoiceId,
    }));

    try {
      const userExamId = examId;

      const response = await fetch("/api/save-answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questionId,
          selectedChoiceId,
          userExamId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to save answer", errorData.error);
      }
    } catch (error) {
      console.error("Error saving answer", error);
    }
  };

  const handleSubmitExam = async () => {
    setIsSubmitting(true);
    try {
      const examId = exam?.id;
      const userId = userData?.id;
      console.log("Answers object:", answers);

      const res = await fetch("/api/submit-exam", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, examId }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Failed to submit the exam", errorData.error);
      } else {
        router.push(`/profile/${userData?.clerkId}`)
      }
    } catch (error) {
      console.error("Error submitting the exam", error);
    } finally {
      setIsSubmitting(false);
      setShowDialog(false);
    }
  };
  const handleMarkForReview = (questionId: string) => {
    setMarkedForReview((prevMarked) =>
      prevMarked.includes(questionId)
        ? prevMarked.filter((id) => id !== questionId)
        : [...prevMarked, questionId]
    );
  };

  const handleNextQuestion = () => {
    if (
      !exam ||
      !exam.questions ||
      currentQuestionIndex >= exam.questions.length - 1
    ) {
      return;
    }

    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
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
  if (error || userError) return <div>Failed to load data.</div>;
  if (!exam || !userData) return <Spinner />;

  const currentQuestion = exam.questions[currentQuestionIndex];
  const notVisitedQuestions =
    exam.questions.length -
    Object.keys(answers).length -
    markedForReview.length;
  const notAnsweredQuestions = exam.questions.filter(
    (question) => !answers[question.id]
  ).length;
  const markedForReviewCount = markedForReview.length;

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-gray-300">
      <ExamHeader
        exam={exam}
        userData={userData}
        timeRemaining={formatTime(timeRemaining)}
      />
      <div className="mt-16">
        <div className="flex-grow flex">
          <div className=" w-1/4 pl-4 pr-4 bg-gray-800 text-gray-300">
            {/* <div className="mb-4 mt-4">
            <div className="font-semibold">Remaining Time</div>
            <div className="text-xl font-bold">{formatTime(timeRemaining)}</div>
          </div> */}
            <div className="mt-2 mb-2 flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-sm text-white mb-2">
                  {notVisitedQuestions}
                </div>
                <span className="text-gray-300">Not Visited</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-purple-500  flex items-center justify-center text-sm text-white mb-2">
                  {markedForReviewCount}
                </div>
                <span className="text-gray-300">Marked for Review</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full flex items-center justify-center bg-red-500 text-sm text-white mb-2">
                  {notAnsweredQuestions}
                </div>
                <span className="text-gray-300">Not Answered</span>
              </div>
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
                      : "bg-gray-700"
                  }`}
                  onClick={() => setCurrentQuestionIndex(index)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
          <div className="flex-grow pl-6 pr-6 bg-gray-900 text-gray-200">
            <div className="text-lg font-semibold text-gray-100">
              Question {currentQuestionIndex + 1}:
            </div>
            <div className="text-gray-300 mb-4 font-mono font-semibold">
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
                    className="mr-2 accent-blue-500"
                  />
                  <label htmlFor={choice.id} className="text-gray-200">
                    {choice.choiceAnswer}
                  </label>
                </div>
              ))}
            </div>
            <div className="flex space-x-4 mt-6">
              <button
                className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded"
                onClick={() => handleMarkForReview(currentQuestion.id)}
              >
                {markedForReview.includes(currentQuestion.id)
                  ? "Unmark for Review"
                  : "Mark for Review"}
              </button>
              <button
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded transition-transform active:scale-95"
                onClick={handlePreviousQestion}
                disabled={currentQuestionIndex === 0}
              >
                Previous
              </button>
              {currentQuestionIndex === exam.questions.length - 1 ? (
                <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      onClick={() => setShowDialog(true)}
                    >
                      Submit
                    </Button>
                  </AlertDialogTrigger>
                  <div className="fixed  z-50  flex items-center justify-center bg-black bg-opacity-60">
                    <AlertDialogContent className="relative bg-white text-gray-900 rounded-lg p-6 w-full max-w-md shadow-lg">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-xl font-bold">
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription className="mt-2 text-sm">
                          This action cannot be undone. Once you submit, your
                          answers will be final.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter className="flex justify-end mt-4 space-x-4">
                        <AlertDialogCancel className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
                          onClick={handleSubmitExam}
                        >
                          Submit
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </div>
                </AlertDialog>
              ) : (
                <button
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded active:scale-95 transition-transform"
                  onClick={handleNextQuestion}
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      {isSubmitting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="loader"></div>
        </div>
      )}
    </div>
  );
};

export default ExamView;
