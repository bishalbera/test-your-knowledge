
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { userId } = await auth();

    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userData = await prisma.user.findUnique({
        where: {
            clerkId: userId,
        },
        include: {
            exams: true,
        },
    });

    return NextResponse.json(userData);
}
