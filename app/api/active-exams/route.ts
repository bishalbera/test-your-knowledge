import { getExams } from "@/utils/examUtils";

export const GET = async () => {
    try {
        const exams = await getExams()
        return Response.json(exams)
  } catch (error) {
    Response.json({ error: "Failed to fetch exams" }, { status: 500 });
    console.log("Failed to get exams");
  }
};
