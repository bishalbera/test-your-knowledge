import { submitExam } from "@/utils/examUtils";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        await submitExam()
    } catch (error) {
        console.log("Error", error);
        return Response.json({ error: "Failed to submit exam" }, { status: 500 });   
    }
}