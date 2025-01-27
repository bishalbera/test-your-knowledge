import { submitExam } from "@/utils/examUtils";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json();
        const { userId, examId } = body;

        if (!userId || !examId ) {
          return Response.json(
            {
              error:
                "Invalid request. Ensure userId, examId are provided and valid.",
            },
            { status: 400 }
          );
        }

        await submitExam({ userId, examId });

        return Response.json(
          { message: "Exam submitted successfully" },
          { status: 200 }
        );
    } catch (error) {
        console.log("Error", error);
        return Response.json({ error: "Failed to submit exam" }, { status: 500 });   
    }
}