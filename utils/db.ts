import { currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export const addUserToDb = async () => {
  const user = await currentUser();
  if (!user) return;

  const matchedUser = await prisma.user.findUnique({
    where: {
      clerkId: user.id as string,
    },
  });

  if (!matchedUser) {
    await prisma.user.create({
      data: {
        clerkId: user.id as string,
        email: user.emailAddresses[0].emailAddress as string,
        imageUrl: user.imageUrl,
        name: user.fullName,
      },
    });
  }
};