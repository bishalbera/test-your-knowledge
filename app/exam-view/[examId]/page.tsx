"use client";

import ExamHeader from "@/components/ExamHeader/ExamHeader";
import Spinner from "@/components/Spinner/Spinner";
import { Exam, ExamQuestion } from "@prisma/client";
import { useEffect, useState } from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const ExamView = ({ params }: { params: { examId: string } }) => {
        const { examId } = params;
        const { data: exam, error } = useSWR<Exam & { questions: ExamQuestion[] }>(
                `/api/get-exam/${examId}`,
                fetcher
        );

        const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
        const [answers, setAnswers] = useState<Record<string, string>>({});
        const [timeRemaining, setTimeRemaining] = useState(0);
        const [markedForReview, setMarkedForReview] = useState<string[]>([]);

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

        const handleAnswer = (questionId: string, selectedOption: string) => {
                setAnswers((prevAnswers) => ({
                        ...prevAnswers,
                        [questionId]: selectedOption,
                }));
        };

        const handleMarkForReview = (questionId: string) => {
                setMarkedForReview((prevMarked) =>
                        prevMarked.includes(questionId)
                                ? prevMarked.filter((id) => id !== questionId)
                                : [...prevMarked, questionId]
                );
        };

        const handleNextQuestion = () => {
                setCurrentQuestionIndex((prevIndex) => {
                        const newIndex = prevIndex + 1;
                        return newIndex < (exam?.questions.length || 0) ? newIndex : prevIndex;
                });
        };

        const handlePreviousQestion = () => {
                setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0));
        };

        if (error) return <div>Failed to load exam.</div>;
        if (!exam) return <Spinner />;

        return (
                <div className="flex flex-col h-screen">
                        <ExamHeader exam={exam} />
                </div>

        );
};

export default ExamView;
