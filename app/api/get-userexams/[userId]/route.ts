import { getUserExams } from "@/utils/examUtils";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, props: { params: Promise<{ userId: string }> }) => {
  const params = await props.params;
  try {
    const { userId } = params;

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const userExams = await getUserExams(userId);

    return NextResponse.json(userExams, { status: 200 });
  } catch (error) {
    console.error("Couldn't get the user exams", error);
    return NextResponse.json(
      { error: "Failed to retrieve exams" },
      { status: 500 }
    );
  }
};
