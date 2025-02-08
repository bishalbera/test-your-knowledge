"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, use } from "react";

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
    <div className="min-h-screen w-full bg-primary-color flex justify-center">
      <div className="flex flex-col justify-center border rounded-lg bg-custom-dark w-[700px] h-[800px] mt-4">
        <div className="px-4 py-4">
          <h2 className="text-xl text-cus-white font-bold">Instructions</h2>
          <ul className="list-disc pl-5 py-2 text-cus-white">
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
        <div className="mt-4 flex flex-col items-center">
          <label className="flex items-center text-cus-white">
            <input
              type="checkbox"
              checked={isAgreed}
              onChange={handleCheckboxChange}
              disabled={timeRemaining > 180000}
              className="mr-2"
            />
            I have read all the instructions
          </label>
          {timeRemaining <= 0 && isAgreed ? (
            <p className="bg-custom-dark text-white text-center">
              Redirecting to exam..
            </p>
          ) : (
            <p className="bg-custom-dark text-white text-center">
              {timeRemaining > 0
                ? "Waiting for exam start time..."
                : "Exam has started"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Instruction;
