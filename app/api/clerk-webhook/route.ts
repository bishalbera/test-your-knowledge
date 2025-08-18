import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
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
  let eventType = payload.type;
  const userId = payload?.data?.id as string | undefined;
  // Only access email_addresses if present (user events)
  const email =
    Array.isArray((payload.data as any).email_addresses) &&
    (payload.data as any).email_addresses.length > 0
      ? (payload.data as any).email_addresses[0].email_address
      : undefined;

  if (!email) {
    console.error(
      "No email found in Clerk webhook payload, skipping user upsert."
    );
    return new Response("No email in payload", { status: 200 });
  }

  try {
    if (eventType === "user.created" && "first_name" in payload.data) {
      const first_name = (payload.data as { first_name?: string }).first_name;
      const last_name = (payload.data as { last_name?: string }).last_name;
      const imageUrl = (payload.data as { profile_image_url?: string })
        .profile_image_url;
      const name = `${first_name ?? ""} ${last_name ?? ""}`.trim();
      // Idempotent: if user exists, update; otherwise create
      await prisma.user.upsert({
        where: { clerkId: userId },
        update: {
          email: email,
          name: name,
          imageUrl: imageUrl ?? undefined,
        },
        create: {
          clerkId: userId!,
          email: email,
          name: name,
          imageUrl: imageUrl ?? undefined,
        },
      });
    }

    if (eventType === "user.updated") {
      const first_name = (payload.data as { first_name?: string }).first_name;
      const last_name = (payload.data as { last_name?: string }).last_name;
      const imageUrl = (payload.data as { profile_image_url?: string })
        .profile_image_url;
      const name = `${first_name ?? ""} ${last_name ?? ""}`.trim();
      await prisma.user.update({
        where: { clerkId: userId! },
        data: {
          email: email ?? undefined,
          name,
          imageUrl: imageUrl ?? undefined,
        },
      });
    }

    if (eventType === "user.deleted") {
      // Safe delete even if user might already be removed
      await prisma.user.deleteMany({ where: { clerkId: userId } });
    }
  } catch (e) {
    console.error("Error processing Clerk webhook event:", e);
    // Still return 2xx so Clerk doesn't retry forever for non-retryable DB errors
    return new Response("", { status: 200 });
  }

  return  Response.json("", { status: 200 });
};
