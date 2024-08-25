import { prisma } from "@/utils/db";
import { currentUser } from "@clerk/nextjs/server";

const addUserToDb = async () => {
  const user = await currentUser();

  const matchedUser = await prisma.user.findUnique({
    where: {
      clerkId: user?.id as string,
    },
  });

  if (!matchedUser) {
    await prisma.user.create({
      data: {
        clerkId: user?.id as string,
        email: user?.emailAddresses[0].emailAddress as string,
        imageUrl: user?.imageUrl,
        name: user?.fullName,
      },
    });
  }
};

const ProfilePage = async () => {
  await addUserToDb();
  return (
    <div className="bg-black text-white h-screen w-screen">
      <h1 className="text-xl">My Profile</h1>
    </div>
  );
};

export default ProfilePage;
