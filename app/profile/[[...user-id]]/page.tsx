import ProfileBody from "@/components/ProfileBody";
import { prisma } from "@/utils/db";
import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

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

  const cUser = await currentUser();
  const userData = await prisma.user.findUnique({
    where: {
      clerkId: cUser?.id,
    },
    select: {
      Score: true,
      exams: true,
      imageUrl: true,
    },
  });
  return (
    <div className=" bg-primary-color text-white min-h-screen w-screen">
      <nav>
        <ul className="flex flex-row   justify-between  p-4">
          <li className="my-4">
            <h1 className="text-3xl font-mono text-text-color">My Profile</h1>
          </li>
          <li className="font-serif ">
            <Link href="/">Home</Link>
          </li>
          <li className="font-serif">
            <Link href="/active-exams">Exams</Link>
          </li>
          <li className="font-serif">
            <Link href="/profile">Profile</Link>
          </li>
          <li>
            <UserButton />
          </li>
        </ul>
      </nav>
      <div className="mb-8 flex justify-center items-center h-[100px]">
        <img
          src={userData?.imageUrl ?? ""}
          alt="Profile"
          className="w-16 h-16 rounded-full object-cover"
        />
      </div>
      <ProfileBody userData={userData} />
    </div>
  );
};

export default ProfilePage;
