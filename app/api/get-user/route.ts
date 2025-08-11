import { prisma } from "@/utils/db";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Force dynamic for API route using currentUser
export const dynamic = 'force-dynamic';

export const GET = async () => {
  try {
    const cUser = await currentUser();

    if (!cUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: cUser.id },
    });

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500, statusText: error as string }
    );
  }
};
