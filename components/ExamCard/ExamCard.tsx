"use client";

import React from "react";
import { Exam } from "@prisma/client";

interface ExamCardProps {
  exam: Exam;
  onButtonClick: (id: string) => void;
}

const ExamCard: React.FC<ExamCardProps> = ({ exam, onButtonClick }) => {
  return (
    <div className="p-4 bg-custom-dark rounded-[1.6rem] border border-white-transparent shadow-sm grid grid-rows-subgrid row-span-6">
      <h2 className="text-xl font-mono text-cus-white">{exam.title}</h2>
      <p className="text-cus-white font-mono">{exam.timeLimit} minutes</p>
      <p className="text-cus-white text-3xl font-[700] font-mono">
        INR {exam.cost}
      </p>
      <p className="text-cus-white font-mono">{exam.description}</p>
      <button
        onClick={() => onButtonClick(exam.id)}
        className=" bg-cus-white text-black px-4 py-2 rounded font-mono"
      >
        Take Exam
      </button>
    </div>
  );
};

export default ExamCard;
