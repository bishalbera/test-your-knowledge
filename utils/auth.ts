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

