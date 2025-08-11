"use client";

import ExamHeader from "@/components/ExamHeader/ExamHeader";
import Spinner from "@/components/Spinner/Spinner";
import {
  AlertDialog,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
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
import { Button } from "@/components/ui/button";

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

  const [userExam, setUserExam] = useState<{
    scheduledDateTime: string;
  } | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [markedForReview, setMarkedForReview] = useState<string[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (userData) {
      fetch(`/api/get-userexams/${userData?.id}`)
        .then((res) => res.json())
        .then((data) => setUserExam(data[0]))
        .catch((error) => console.error("Error fetching user exam", error));
    }
  }, [userData]);

  useEffect(() => {
    if (exam && userExam) {
      const scheduledDatetime = new Date(userExam.scheduledDateTime).getTime();
      const currentTime = new Date().getTime();
      const remainingTime =
        scheduledDatetime + exam.timeLimit * 60 * 1000 - currentTime;
      setTimeRemaining(remainingTime);
    }
  }, [exam, userExam]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining((prev) =>
        prev !== null ? Math.max(prev - 1000, 0) : null
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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
        router.push(`/profile/${userData?.clerkId}`);
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

  const formatTime = (ms: number | null) => {
    if (ms === null) return "00:00";
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
    <div className="flex h-screen flex-col">
      <ExamHeader
        exam={exam}
        userData={userData}
        timeRemaining={formatTime(timeRemaining)}
      />
      <div className="mt-16">
        <div className="flex flex-grow">
          <div className="w-1/4 bg-white/5 px-4 text-slate-200">
            <div className="mb-4 mt-2 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="mb-2 flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-sm text-white">
                  {notVisitedQuestions}
                </div>
                <span className="text-slate-300">Not Visited</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="mb-2 flex h-6 w-6 items-center justify-center rounded-full bg-fuchsia-500 text-sm text-white">
                  {markedForReviewCount}
                </div>
                <span className="text-slate-300">Marked for Review</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="mb-2 flex h-6 w-6 items-center justify-center rounded-full bg-rose-500 text-sm text-white">
                  {notAnsweredQuestions}
                </div>
                <span className="text-slate-300">Not Answered</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {exam.questions.map((question, index) => (
                <button
                  key={question.id}
                  className={`h-10 w-10 rounded-full border border-white/10 ${
                    answers[question.id]
                      ? "bg-emerald-500"
                      : markedForReview.includes(question.id)
                      ? "bg-fuchsia-500"
                      : "bg-white/10"
                  }`}
                  onClick={() => setCurrentQuestionIndex(index)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
          <div className="flex-grow px-6">
            <div className="text-lg font-semibold text-white">
              Question {currentQuestionIndex + 1}:
            </div>
            <div className="mb-4 font-mono font-semibold text-slate-200">
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
                    className="mr-2 accent-indigo-500"
                  />
                  <label htmlFor={choice.id} className="text-slate-200">
                    {choice.choiceAnswer}
                  </label>
                </div>
              ))}
            </div>
            <div className="mt-6 flex space-x-4">
              <Button
                variant="gradient"
                className="px-4 py-2"
                onClick={() => handleMarkForReview(currentQuestion.id)}
              >
                {markedForReview.includes(currentQuestion.id)
                  ? "Unmark for Review"
                  : "Mark for Review"}
              </Button>
              <Button
                variant="glass"
                className="px-4 py-2"
                onClick={handlePreviousQestion}
                disabled={currentQuestionIndex === 0}
              >
                Previous
              </Button>
              {currentQuestionIndex === exam.questions.length - 1 ? (
                <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" onClick={() => setShowDialog(true)}>
                      Submit
                    </Button>
                  </AlertDialogTrigger>
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
                    <AlertDialogContent className="relative max-w-md w-full rounded-lg border border-white/10 bg-white/5 p-6 text-white shadow-xl backdrop-blur">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-xl font-bold">
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription className="mt-2 text-sm text-slate-300">
                          This action cannot be undone. Once you submit, your
                          answers will be final.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter className="mt-4 flex justify-end space-x-4">
                        <AlertDialogCancel className="rounded-md border border-white/20 bg-white/5 px-4 py-2 text-white hover:bg-white/10">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          className="rounded-md bg-rose-500 px-4 py-2 text-white hover:bg-rose-600"
                          onClick={handleSubmitExam}
                        >
                          Submit
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </div>
                </AlertDialog>
              ) : (
                <Button variant="gradient" className="px-4 py-2" onClick={handleNextQuestion}>
                  Next
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      {isSubmitting && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="loader"></div>
        </div>
      )}
    </div>
  );
};

export default ExamView;
