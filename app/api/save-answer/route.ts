import { getUserFromClerkID } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { NextRequest } from "next/server";

// Force dynamic for API route using auth
export const dynamic = 'force-dynamic';

export const POST = async (req: NextRequest) => {
        try {

                const body = await req.json();
                console.log("heyyyyyyyy", body);
                const { selectedChoiceId, questionId, userExamId } = body;
                const user = await getUserFromClerkID();

                const userId = user.id;
                console.log(userId);
                const exam = await prisma.userExam.findFirst({
                        where: { userId, examId: userExamId },
                        select: { id: true, examId: true },
                });

                if (!questionId || !selectedChoiceId || !userExamId) {
                        return new Response(
                                JSON.stringify({ error: "Missing required fields" }),
                                { status: 400 }
                        );
                }

                const question = await prisma.examQuestion.findUnique({
                        where: { id: questionId },
                        select: { correctAnswer: true },
                });

                if (!question || !question.correctAnswer) {
                        return new Response(
                                JSON.stringify({ error: "No correct answer found for this question" }),
                                { status: 400 }
                        );
                }

                const selectedChoice = await prisma.questionchoice.findUnique({
                        where: { id: selectedChoiceId },
                        select: { identifier: true , id: true},
                });

                if (!selectedChoice || !selectedChoice.identifier) {
                        return new Response(
                                JSON.stringify({ error: "Invalid choice selected" }),
                                { status: 400 }
                        );
                }

                const isCorrect = question.correctAnswer === selectedChoice.identifier;

                if (!exam) {
                        return new Response(
                                JSON.stringify({ error: "User exam not found" }),
                                { status: 400 }
                        );
                }

                const userChoice = await prisma.userChoice.upsert({
                        where: {
                                userExamId_questionId: {
                                        userExamId: exam.id,
                                        questionId: questionId,
                                }
                        },
                        update: {
                                userchoice: selectedChoiceId,
                                isCorrect,
                        },
                        create: {
                                questionId,
                                examId: exam.examId,
                                userchoice: selectedChoiceId,
                                userExamId: exam.id,
                                isCorrect,
                        },
                });

                console.log(userChoice)

                return new Response(
                        JSON.stringify({ message: "Answer saved successfully", userChoice }),
                        { status: 200 }
                );
        } catch (error) {
                console.error("Error saving answer:", error);
                return new Response(JSON.stringify({ error: "Failed to save answer" }), {
                        status: 500,
                });
        }
};
