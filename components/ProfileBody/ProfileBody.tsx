"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Modal from "../Modal/Modal";
import GlassCard from "@/components/ui/GlassCard";

const ProfileBody = ({ userData }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleOnClick = () => {
    router.push(
      `/profile/${userData.clerkId}/scheduled-exams?userId=${userData.id}`
    );
  };

  const handleScoreClick = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  if (!userData) return <p>No user data found.</p>;

  return (
    <div className="grid justify-center">
      <div className="grid w-[600px] grid-cols-2 gap-4 p-4">
        <GlassCard
          className="cursor-pointer p-6 text-white transition-all hover:translate-y-[-2px]"
          onClick={handleOnClick}
        >
          <div className="text-center">
            <div className="mb-2 text-purple-400">📄</div>
            <h3 className="text-slate-300/80">Exams</h3>
            <p className="text-2xl font-bold">{userData.exams.length}</p>
          </div>
        </GlassCard>
        <GlassCard
          className="cursor-pointer p-6 text-white transition-all hover:translate-y-[-2px]"
          onClick={handleScoreClick}
        >
          <div className="text-center">
            <div className="mb=2 text-fuchsia-400">💯</div>
            <h3 className="text-slate-300/80">Score</h3>
            <p className="text-2xl font-bold">View Scores</p>
          </div>
        </GlassCard>
      </div>
      <Modal isOpen={isOpen} closeModal={closeModal}>
        <h2 className="mb-4 text-xl font-bold">Exam Scores</h2>
        <table className="min-w-full overflow-hidden rounded-lg border border-white/10 bg-white/5 text-slate-200">
          <thead className="bg-white/10">
            <tr>
              <th className="border-b border-white/10 py-2 px-4 text-left">Exam</th>
              <th className="border-b border-white/10 py-2 px-4 text-left">Score</th>
              <th className="border-b border-white/10 py-2 px-4 text-left">Date Submitted</th>
            </tr>
          </thead>
          <tbody>
            {userData.exams.map((exam) => (
              <tr key={exam.id}>
                <td className="border-b border-white/10 py-2 px-4">{exam.examTitle}</td>
                <td className="border-b border-white/10 py-2 px-4">{exam.Score}</td>
                <td className="border-b border-white/10 py-2 px-4">
                  {new Date(exam.dateSubmitted).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Modal>
    </div>
  );
};

export default ProfileBody;
