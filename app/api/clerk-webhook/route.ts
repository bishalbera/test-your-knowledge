import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { prisma } from "@/utils/db";

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Get the headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the raw body for signature verification
  const body = await req.text();

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  // Safely parse after verification
  const payload = JSON.parse(body);

  const eventType = evt.type;
  const userId = payload?.data?.id as string | undefined;
  const email =
    payload?.data?.email_addresses?.[0]?.email_address ??
    payload?.data?.primary_email_address_id ??
    ""; // fallback if no email

  const first = payload?.data?.first_name ?? "";
  const last = payload?.data?.last_name ?? "";
  const imageUrl = payload?.data?.profile_image_url ?? null; // use correct field
  const name = `${first} ${last}`.trim();

  try {
    if (eventType === "user.created") {
      // Idempotent: if user exists, update; otherwise create
      await prisma.user.upsert({
        where: { clerkId: userId! },
        update: {
          email: email ?? undefined,
          name,
          imageUrl: imageUrl ?? undefined,
        },
        create: {
          clerkId: userId!,
          email: email ?? "",
          name,
          imageUrl: imageUrl ?? undefined,
        },
      });
    }

    if (eventType === "user.updated") {
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
  } catch (err) {
    console.error("Error processing Clerk webhook event:", err);
    // Still return 2xx so Clerk doesn't retry forever for non-retryable DB errors
    return new Response("", { status: 200 });
  }

  return new Response("", { status: 200 });
}
