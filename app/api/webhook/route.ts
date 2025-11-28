import { prisma } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

// Disable body parsing for webhook route (Stripe requires raw body)
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  console.log("🔔 Webhook received!");

  const reqBody = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig || !webhookSecret) {
    console.error("❌ Webhook secret or signature missing");
    return NextResponse.json(
      { error: "Webhook secret or signature missing" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(reqBody, sig, webhookSecret);
    console.log("✅ Webhook signature verified successfully");
  } catch (error) {
    console.error("❌ Webhook signature verification failed:", error);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  console.log(`📦 Event type: ${event.type}`);

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.user;
    const examId = session.metadata?.examId;

    console.log("💳 Payment completed!");
    console.log("📋 Metadata:", { userId, examId });

    if (!userId || !examId) {
      console.error("❌ Missing userId or examId in metadata");
      return NextResponse.json(
        { error: "Missing userId or examId in metadata" },
        { status: 400 }
      );
    }

    try {
      const updatedUserExam = await prisma.userExam.update({
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
        `✅ Successfully updated userExam.paid to true for userId: ${userId}, examId: ${examId}`
      );
      console.log("Updated record:", updatedUserExam);
    } catch (error) {
      console.error("❌ Error updating userExam paid status:", error);
      console.error("Error details:", error);
      return NextResponse.json(
        { error: "Database update failed", details: String(error) },
        { status: 500 }
      );
    }
  } else {
    console.log(`ℹ️  Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ message: "Event received" }, { status: 200 });
};
