import { getUserFromClerkID } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { getExam } from "@/utils/examUtils";
import { NextRequest, NextResponse } from "next/server";

// Force dynamic for API route using auth
export const dynamic = 'force-dynamic';

export const POST = async (req: NextRequest, props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
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
    const res = await getExam(id);

    const updatedUserExam = await prisma.userExam.create({
      data: {
        userId: user.id,
        examId: id,
        examTitle: res?.title,
        imageUrl: res?.imageUrl,
        scheduledDateTime: scheduledDateTime,
        dateSubmitted: new Date(),
      },
    });

    return NextResponse.json({
      message: "Exam scheduled successfully",
      data: updatedUserExam,
      status: 201,
    });
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
