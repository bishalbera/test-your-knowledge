import { auth, User, currentUser } from "@clerk/nextjs/server";
import { prisma } from "./db";

export const getUserFromClerkID = async (select = { id: true }) => {
  const { userId } = await auth();

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      clerkId: userId as string,
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


