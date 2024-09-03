"use client";

import Spinner from "@/components/Spinner/Spinner";
import { Exam } from "@prisma/client";
import { useState } from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Instruction = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [isAgreed, setIsAgreed] = useState(false);

  const { data: exam, error } = useSWR<Exam>(
    `/api/available-exams/${id}`,
    fetcher
  );
  if (error) return <div>Failed to get exam</div>;
  if (!exam) return <Spinner />;

  const handleCheckboxChange = () => {
    setIsAgreed(!isAgreed);
  };

  return (
    <div className="min-h-screen w-full bg-primary-color flex justify-center">
      <div className="flex flex-col justify-center  border rounded-lg bg-custom-dark w-[700px] h-[800px] mt-4">
        <h1 className="text-3xl text-cus-white text-center">{exam.title}</h1>
        <div className="px-4 py-4">
          <p className="text-lg font-[600] text-cus-white ">
            Cost: INR{exam.cost}
          </p>

          <p className="text-lg font-[600] text-cus-white ">
            Dutation: {exam.timeLimit} minutes
          </p>

          <p className="text-md  text-cus-white">
            Description: {exam.description}
          </p>
          <h2 className="text-xl  text-cus-white font-bold">Instructions</h2>
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
              className="mr-2"
            />
            I have read all the instructions
          </label>
          <button
            disabled={!isAgreed}
            className={`mt-4 px-6 py-2 text-cus-white text-lg font-bold rounded-lg ${
              isAgreed
                ? "bg-blue-700 hover:bg-blue-900 cursor-pointer"
                : "bg-gray-500/50 cursor-not-allowed"
            }`}
          >
            Start Exam
          </button>
        </div>
      </div>
    </div>
  );
};

export default Instruction;
