import { getUserFromClerkID } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const user = await getUserFromClerkID();
    const body = await req.json();

    console.log("Request Body:", body);
    const { scheduledDateTime } = body;

    if (!scheduledDateTime) {
      return NextResponse.json(
        { error: "ScheduledDateTime is required" },
        { status: 400 }
      );
    }

    const { id } = params;
    console.log("Exam ID:", id);

    const updatedUserExam = await prisma.userExam.create({
      data: {
        userId: user.id,
        examId: id,
        scheduledDateTime: scheduledDateTime,
        dateSubmitted: new Date(),
      },
    });


    return NextResponse.json(updatedUserExam);
  } catch (error) {
    console.error("Error scheduling exam:", error);
    return NextResponse.json(
      { error: "Failed to schedule exam" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
};
