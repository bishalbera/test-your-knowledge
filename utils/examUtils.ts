import { prisma } from "./db";
import { v4 as uuidv4 } from "uuid";

interface Exam {
  id: string;
  title: string;
  description?: string | null;
  cost: number;
  timeLimit: number;
  questions?: ExamQuestion[];
}

interface ExamQuestion {
  id: string;
  examId: string;
  questionText: string;
  choices: QuestionChoice[];
  correctAnswer: string;
}

interface QuestionChoice {
  id: string;
  questionId: string;
  identifier: string;
  choiceAnswer: string;
}
export const getExamQuestions = async (): Promise<ExamQuestion[] | null> => {
  try {
    const questions = await prisma.examQuestion.findMany({
      include: {
        choices: true,
      },
    });
    return questions;
  } catch (error) {
    console.log("Failed to get questions", error);
    return null;
  }
};
export const getExams = async (): Promise<Exam[] | null> => {
  try {
    const exams = await prisma.exam.findMany();
    return exams;
  } catch (error) {
    console.log("Failed to get exams", error);
    return null;
  }
};

export const uploadExam = async (exam: Exam) => {
  try {
    const examRes = await prisma.exam.create({
      data: {
        id: exam.id,
        title: exam.title,
        description: exam.description,
        cost: exam.cost,
        timeLimit: exam.timeLimit,
        questions: {
          create: exam.questions?.map((question) => {
            const questionId = uuidv4();
            return {
              id: questionId,
              questionText: question.questionText,
              correctAnswer: question.correctAnswer,
              choices: {
                create: question.choices.map((choice) => {
                  const choiceId = uuidv4();
                  return {
                    id: choiceId,
                    identifier: choice.identifier,
                    choiceAnswer: choice.choiceAnswer,
                  };
                }),
              },
            };
          }),
        },
      },
    });
  } catch (error) {
    console.log("Failed to upload exam", error);
  }
};
