import { Webhook } from "svix";
import { headers } from "next/headers";
import { UserJSON, WebhookEvent } from "@clerk/nextjs/server";
import { prisma } from "@/utils/db";

const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
if (!WEBHOOK_SECRET) {
  throw new Error(
    "Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
  );
}

const validateReqest = async (req: Request) => {
  const payloadString = await req.text();
  const headerPayload = await headers();

  const svixHeaders = {
    "svix-id": headerPayload.get("svix-id"),
    "svix-timestamp": headerPayload.get("svix-timestamp"),
    "svix-signature": headerPayload.get("svix-signature"),
  };

  const wh = new Webhook(WEBHOOK_SECRET);
  return wh.verify(payloadString, svixHeaders) as WebhookEvent;
};

export const POST = async (req: Request) => {
  const payload = await validateReqest(req);

  if (
    payload.type === "user.created" ||
    payload.type === "user.updated" ||
    payload.type === "user.deleted"
  ) {
    const user = payload.data as UserJSON;
    const userId = user.id;
    const email =
      Array.isArray(user.email_addresses) && user.email_addresses.length > 0
        ? user.email_addresses[0].email_address
        : undefined;
    const name = `${user.first_name ?? ""} ${user.last_name ?? ""}`.trim();
    const imageUrl = user.image_url ?? undefined;

    if (!email) {
      console.error(
        "No email found in Clerk webhook payload, skipping user upsert."
      );
      return new Response("No email in payload", { status: 200 });
    }

    try {
      if (payload.type === "user.created") {
        await prisma.user.upsert({
          where: { clerkId: userId },
          update: { email, name, imageUrl },
          create: { clerkId: userId, email, name, imageUrl },
        });
      }

      if (payload.type === "user.updated") {
        await prisma.user.update({
          where: { clerkId: userId },
          data: { email, name, imageUrl },
        });
      }

      if (payload.type === "user.deleted") {
        await prisma.user.deleteMany({ where: { clerkId: userId } });
      }
    } catch (e) {
      console.error("Error processing Clerk webhook event:", e);
      return new Response("", { status: 200 });
    }
  }

  return Response.json("", { status: 200 });
};
