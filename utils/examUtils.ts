import { prisma } from "./db";
import { v4 as uuidv4 } from "uuid";

interface Exam {
  id: string;
  title: string;
  imageUrl?: string | null;
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

interface UserExam {
  id: string;
  userId: string;
  examTitle?: string | null;
  imageUrl?: string | null;
  totalQuestions?: number | null;
  examId: string;
  scheduledDateTime: Date;
  paid: boolean;
  dateSubmitted: Date;
}

type ExamWithQuestions = Exam & {
  questions: (ExamQuestion & {
    choices: QuestionChoice[];
  })[];
};

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

export const getExam = async (
  id: string
): Promise<ExamWithQuestions | null> => {
  try {
    const exam = await prisma.exam.findUniqueOrThrow({
      where: {
        id: id,
      },
      include: {
        questions: {
          include: {
            choices: true,
          },
        },
      },
    });
    return exam;
  } catch (error) {
    console.log(`Failed to get exam with id ${id}:`, error);
    return null;
  }
};

export const getUserExam = async (userId: string): Promise<UserExam | null> => {
  try {
    const userExam = await prisma.userExam.findFirst({
      where: {
        userId: userId,
      },
    });
    return userExam;
  } catch (error) {
    console.log(`Failed to get user exam with userId ${userId}:`, error);
    return null;
  }
};
export const getUserExams = async (
  userId: string
): Promise<UserExam[] | null> => {
  try {
    const userExams = await prisma.userExam.findMany({
      where: {
        userId: userId,
      },
    });
    return userExams;
  } catch (error) {
    console.log(`Failed to get user exam with userId ${userId}:`, error);
    return null;
  }
};

interface SubmitExamProps {
  userId: string;
  examId: string;
}
export const submitExam = async ({ userId, examId }: SubmitExamProps) => {
  try {
    const examQuestions = await prisma.examQuestion.findMany({
      where: {
        examId: examId,
      },
    });

    let correctAnswers = 0;
    let wrongAnswers = 0;

    let totalQuestions = examQuestions.length;
    const choices = await prisma.userChoice.findMany({
      where: {
        examId: examId,
      },
    });

    for (const choice of choices) {
      if (choice.isCorrect) {
        correctAnswers += 1;
      } else {
        wrongAnswers += 1;
      }
    }

    const score = correctAnswers * 4 - wrongAnswers;

    console.log("Final Results: ", {
      correctAnswers,
      wrongAnswers,
      score,
    });

    await prisma.userExam.update({
      where: {
        userId_examId: {
          userId,
          examId,
        },
      },
      data: {
        Score: score,
        totalQuestions: totalQuestions,
      },
    });

    return {
      message: "Exam submitted successfully!",
      score,
    };
  } catch (error) {
    console.log("Error submitting the exam", error);
    throw new Error("Failed to submit the exam. Please try again.");
  }
};

export const uploadExam = async (exam: Exam) => {
  try {
    const examRes = await prisma.exam.create({
      data: {
        id: exam.id,
        title: exam.title,
        imageUrl: exam.imageUrl || "/default-image.jpg",
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
