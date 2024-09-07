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

export const POST = async (req: NextRequest, res: NextResponse) => {
  const { examTitle, cost, imageUrl, userId }: RequestData = await req.json();

  if (!examTitle || !cost || !imageUrl || !userId) {
    return NextResponse.json(
      { message: "Please all fields are required" },
      { status: 400 }
    );
  }

  const user = await getUserFromClerkID();

  const origin = req.headers.get("origin");

  try {
    const userExam = await getUserExam(user.id);

    const examId = userExam?.examId;

    const exam = await getExam(examId!);

    const examTitle = exam?.title;
    const examCost = exam?.cost;

    console.log(userExam?.imageUrl);

    const stripeSession: Stripe.Checkout.Session =
      await stripe.checkout.sessions.create({
        line_items: [
          {
            quantity: 1,
            price_data: {
              currency: "INR",
              product_data: {
                name: examTitle,
                images: [userExam?.imageUrl],
              },
              unit_amount: examCost! * 100,
            },
          },
        ],
        mode: "payment",
        success_url: `${origin}/profile`,
        cancel_url: `${origin}/cancel`,
        payment_method_types: ["card"],
      });

    return NextResponse.json(stripeSession, {
      status: 200,
      statusText: "payment session created",
    });
  } catch (error) {
    console.error("payment failed", error);
    return NextResponse.json({ message: "payment failed" }, { status: 500 });
  }
};
