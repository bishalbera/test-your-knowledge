"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, use } from "react";
import GlassCard from "@/components/ui/GlassCard";

const Instruction = (props: {
  params: Promise<{ userId: string; examId: string }>;
}) => {
  const params = use(props.params);
  const { userId, examId } = params;
  const [isAgreed, setIsAgreed] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [showExam, setShowExam] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchExamTime = async () => {
      const res = await fetch(`/api/get-userexams/${userId}`);
      const userExams = await res.json();
      const userExam = userExams.find((exam) => exam.examId === examId);
      if (userExam) {
        const now = new Date().getTime();
        const examTime = new Date(userExam.scheduledDateTime).getTime();
        const timeLeft = examTime - now;
        setTimeRemaining(timeLeft);
      }
    };

    fetchExamTime();

    const timer = setInterval(() => {
      setTimeRemaining((prev) => prev - 1000);
    }, 1000);

    return () => clearInterval(timer);
  }, [userId, examId]);

  useEffect(() => {
    if (isAgreed && timeRemaining <= 0) {
      setShowExam(true);
    }
  }, [timeRemaining, isAgreed]);

  useEffect(() => {
    if (showExam) {
      router.push(`/exam-view/${examId}`);
    }
  }, [showExam, router, examId]);

  const handleCheckboxChange = (e) => {
    setIsAgreed(e.target.checked);
  };

  return (
    <div className="min-h-screen w-full flex justify-center px-4">
      <GlassCard className="mt-6 flex h-[800px] w-[700px] flex-col justify-center">
        <div className="px-6 py-6">
          <h2 className="text-xl font-bold text-white">Instructions</h2>
          <ul className="list-disc pl-5 py-2 text-slate-200">
            <li>This exam must be taken in full-screen mode.</li>
            <li>
              You will be prompted to enter full-screen mode before the exam
              starts.
            </li>
            <li>
              If you exit full-screen mode during the exam, you will be prompted
              to return to full-screen.
            </li>
            <li>
              Failure to return to full-screen mode will result in automatic
              submission of your exam.
            </li>
            <li>
              Changing tabs or windows during the exam will result in automatic
              submission.
            </li>
            <li>
              Ensure you have a stable internet connection before starting the
              exam.
            </li>
            <li>
              Once you start the exam, the timer will begin and cannot be
              paused.
            </li>
          </ul>
        </div>
        <div className="mt-4 flex flex-col items-center gap-2">
          <label className="flex items-center text-slate-200">
            <input
              type="checkbox"
              checked={isAgreed}
              onChange={handleCheckboxChange}
              disabled={timeRemaining > 180000}
              className="mr-2 accent-indigo-500"
            />
            I have read all the instructions
          </label>
          {timeRemaining <= 0 && isAgreed ? (
            <p className="text-center text-slate-200">Redirecting to exam..</p>
          ) : (
            <p className="text-center text-slate-200">
              {timeRemaining > 0
                ? "Waiting for exam start time..."
                : "Exam has started"}
            </p>
          )}
        </div>
      </GlassCard>
    </div>
  );
};

export default Instruction;
