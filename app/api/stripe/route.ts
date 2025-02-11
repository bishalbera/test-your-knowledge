import { getUserFromClerkID } from "@/utils/auth";
import { getExam, getUserExam } from "@/utils/examUtils";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

type RequestData = {
  examTitle: string;
  cost: number;
  imageUrl: string;
  userId: string;
};

export const POST = async (req: NextRequest) => {
  try {
    const { examTitle, cost, imageUrl, userId }: RequestData = await req.json();

    if (!examTitle || !cost || !imageUrl || !userId) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const user = await getUserFromClerkID(); // Fixed incorrect parameter
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const origin =
      req.headers.get("origin") || process.env.NEXT_PUBLIC_BASE_URL;

    const userExam = await getUserExam(user.id);
    if (!userExam) {
      return NextResponse.json(
        { message: "User has no associated exam" },
        { status: 404 }
      );
    }

    const exam = await getExam(userExam.examId);
    if (!exam) {
      return NextResponse.json({ message: "Exam not found" }, { status: 404 });
    }

    const stripeSession: Stripe.Checkout.Session =
      await stripe.checkout.sessions.create({
        line_items: [
          {
            quantity: 1,
            price_data: {
              currency: "INR",
              product_data: {
                name: exam.title,
                images: [userExam.imageUrl || "/default-image.jpg"],
              },
              unit_amount: exam.cost * 100,
            },
          },
        ],
        mode: "payment",
        success_url: `${origin}/profile/${user.id}`,
        cancel_url: `${origin}/cancel`,
        payment_method_types: ["card"],
        metadata: {
          user: user.id,
          examCost: exam.cost,
          examId: exam.id,
        },
      });

    return NextResponse.json(stripeSession, {
      status: 200,
      statusText: "Payment session created",
    });
  } catch (error) {
    console.error("Payment failed", error);
    return NextResponse.json(
      { message: "Payment failed", error: (error as Error).message },
      { status: 500 }
    );
  }
};
