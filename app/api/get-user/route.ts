import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const userId = auth();

    return NextResponse.json(userId);
  } catch (error) {
    return NextResponse.json(
      { message: "Faild to get usedId" },
      { status: 500, statusText: error as string }
    );
  }
};
