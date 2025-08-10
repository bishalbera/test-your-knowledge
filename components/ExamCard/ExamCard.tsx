"use client";

import React from "react";
import { Exam } from "@prisma/client";
import { Button } from "@/components/ui/button";

interface ExamCardProps {
  exam: Exam;
  onButtonClick: (id: string) => void;
}

const ExamCard: React.FC<ExamCardProps> = ({ exam, onButtonClick }) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur transition-all hover:translate-y-[-2px] hover:bg-white/10">
      <h2 className="text-xl font-semibold text-white">{exam.title}</h2>
      <p className="mt-1 text-slate-300/80">{exam.timeLimit} minutes</p>
      <p className="mt-4 text-3xl font-bold text-slate-100">INR {exam.cost}</p>
      <p className="mt-2 line-clamp-2 text-slate-300/80">{exam.description}</p>
      <Button
        onClick={() => onButtonClick(exam.id)}
        variant="gradient"
        className="mt-6 px-4 py-2 text-sm"
      >
        Schedule
      </Button>
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity group-hover:opacity-100">
        <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-indigo-500/20 to-fuchsia-500/20 blur-xl" />
      </div>
    </div>
  );
};

export default ExamCard;
