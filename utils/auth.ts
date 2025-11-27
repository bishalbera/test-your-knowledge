import { auth, User, currentUser } from "@clerk/nextjs/server";
import { prisma } from "./db";

// Custom light-weight auth error identifier used by API routes to map to 401
export class UnauthorizedError extends Error {
  constructor(message = "UNAUTHORIZED") {
    super(message);
    this.name = "UnauthorizedError";
  }
}

export const getUserFromClerkID = async (select = { id: true }) => {
  const { userId } = await auth();

  if (!userId) {
    // Ensure callers can reliably convert to a 401 response
    throw new UnauthorizedError();
  }

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      clerkId: userId,
    },
    select,
  });
  return user;
};

export const isAdminUser = async () => {
  const user = await currentUser();

  if (user && user.emailAddresses.length > 0) {
    const adminEmail = process.env.ADMIN_EMAIL;
    const userEmail = user.emailAddresses[0].emailAddress;

    return userEmail == adminEmail;
  }

  return false;
};


export const syncUser = async () => {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  const email = user.emailAddresses[0]?.emailAddress;
  const name = `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim();

  if (!email) {
    return null;
  }

  try {
    const dbUser = await prisma.user.upsert({
      where: { clerkId: user.id },
      update: {
        email,
        name,
        imageUrl: user.imageUrl,
      },
      create: {
        clerkId: user.id,
        email,
        name,
        imageUrl: user.imageUrl,
        exams: { create: [] },
      },
    });
    return dbUser;
  } catch (error) {
    console.error("Error syncing user:", error);
    return null;
  }
};
