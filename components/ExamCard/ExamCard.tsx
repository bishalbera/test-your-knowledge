"use client"

import React from "react";
import { Exam } from "@prisma/client";

interface ExamCardProps {
  exam: Exam;
  onButtonClick: (id: string) => void;
}

const ExamCard: React.FC<ExamCardProps> = ({ exam, onButtonClick }) => {
  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h2 className="text-xl font-bold">{exam.title}</h2>
      <p>{exam.description}</p>
      <p>Cost: ${exam.cost}</p>
      <p>Time Limit: {exam.timeLimit} minutes</p>
      <button
        onClick={() => onButtonClick(exam.id)}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Take Exam
      </button>
    </div>
  );
};

export default ExamCard;
