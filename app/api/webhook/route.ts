import { prisma } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  const reqBody = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig || !webhookSecret) {
    return NextResponse.json(
      { error: "Webhook secret or signature missing" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(reqBody, sig, webhookSecret);
  } catch (error) {
    console.error("Webhook signature verification failed:", error);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.user;
    const examId = session.metadata?.examId;

    if (!userId || !examId) {
      return NextResponse.json(
        { error: "Missing userId or examId in metadata" },
        { status: 400 }
      );
    }

    try {
      await prisma.userExam.update({
        where: {
          userId_examId: {
            userId,
            examId,
          },
        },
        data: {
          paid: true,
        },
      });

      console.log(
        `Updated userExam status for userId: ${userId}, examId: ${examId}`
      );
    } catch (error) {
      console.error("Error updating userExam paid status:", error);
      return NextResponse.json(
        { error: "Database update failed" },
        { status: 500 }
      );
    }
  } else {
    console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ message: "Event received" }, { status: 200 });
};
