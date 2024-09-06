import { NextRequest, NextResponse } from "next/server";
import { ImGift } from "react-icons/im";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
});

type RequestData = {
  examTitle: string;
  cost: number;
  imageUrl: string;
  userId: string;
};

export const POST = async (req: NextRequest, res: NextResponse) => {
  const { examTitle, cost, imageUrl, userId }: RequestData = await req.json();

  if (
    !examTitle ||
    !cost ||
    !imageUrl ||
    !userId 
  ) {
    return NextResponse.json({ message: "Please all fields are required" }, { status: 400 })
    
  }

  
  
};
