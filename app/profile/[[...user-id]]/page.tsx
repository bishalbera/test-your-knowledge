import ProfileBody from "@/components/ProfileBody";
import { prisma } from "@/utils/db";
import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { FaPlus } from "react-icons/fa6";

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
  });

  const isAdmin = userData?.email == process.env.ADMIN_EMAIL;
  
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
      <div className="my-16 flex justify-center h-[100px]">
        <Image
          src={userData?.imageUrl ?? ""}
          alt="Profile"
          width={100}
          height={100}
          className=" rounded-full object-cover"
        />
      </div>
      <p className="flex justify-center text-lg font-bold">{userData?.name}</p>
      <ProfileBody userData={userData} />
      {isAdmin && (
        <button className="bg-button-color text-white border border-white fixed bottom-4 right-4 p-4 rounded-full shadow-lg hover:bg-button-hover-color focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:bg-blue-700">
          <FaPlus className=" h-6 w-6" />
        </button>
      )}
    </div>
  );
};

export default ProfilePage;
