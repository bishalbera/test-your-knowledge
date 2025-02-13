"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Modal from "../Modal/Modal";

const ProfileBody = ({ userData }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [examData, setExamData] = useState([]);

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

  useEffect(() => {
    if (isOpen) {
      fetch(`/api/get-userexams/${userData.id}`)
        .then((res) => res.json())
        .then((data) => setExamData(data))
        .catch((err) => console.log("Error fetching exam data", err));
    }
  }, [isOpen, userData.id]);

  if (!userData) return <p>No user data found.</p>;

  return (
    <div className="grid justify-center">
      <div className="grid grid-cols-2 gap-4 w-[600px] p-4">
        <div
          className="bg-[#13678A] cursor-pointer rounded-lg p-4 place-items-center"
          onClick={handleOnClick}
        >
          <div className="text-center">
            <div className="text-purple-500 mb-2">📄</div>
            <h3 className="text-gray/70">Exams</h3>
            <p className="text-2xl font-bold">{userData.exams}</p>
          </div>
        </div>
        <div
          className="bg-[#13678A] cursor-pointer rounded-lg p-4 place-items-center"
          onClick={handleScoreClick}
        >
          <div className="text-center">
            <div className="text-text-color mb=2">💯</div>
            <h3 className="text-gray/70">Score</h3>
            <p className="text-2xl font-bold">{userData.Score}</p>
          </div>
        </div>
      </div>
      <Modal isOpen={isOpen} closeModal={closeModal}>
        <h2 className="text-xl font-bold mb-4">Exam Scores</h2>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Exam</th>
              <th className="py-2 px-4 border-b">Score</th>
              <th className="py-2 px-4 border-b">Date Submitted</th>
            </tr>
          </thead>
          <tbody>
            {examData.map((exam) => (
              <tr key={exam.id}>
                <td className="py-2 px-4 border-b">{exam.examTitle}</td>
                <td className="py-2 px-4 border-b">{exam.Score}</td>
                <td className="py-2 px-4 border-b">
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
