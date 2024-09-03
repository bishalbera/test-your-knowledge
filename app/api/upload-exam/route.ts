import { uploadExam } from "@/utils/examUtils";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    if (file instanceof File) {
      const fileContent = await file.text();
      const exam = JSON.parse(fileContent);
      console.log("parsed exam", exam);
      await uploadExam(exam);
      return Response.json(
        { message: "Exam uploaded successfully" },
        { status: 201 }
      );
    } else {
      return Response.json(
        { error: "No file uploaded or invalid file" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.log("Error", error);
    return Response.json({ error: "Failed to upload exam" }, { status: 500 });
  }
};
