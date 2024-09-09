import FileUpload from "@/components/FileUpload/FileUpload";
import ProfileBody from "@/components/ProfileBody/ProfileBody";
import { prisma, addUserToDb } from "@/utils/db";
import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";

const ProfilePage = async ({params}: {params:{id: string}}) => {
  await addUserToDb();

  const { id } = params
 
  

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
            <Link href="/available-exams">Exams</Link>
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
      {isAdmin && <FileUpload />}
    </div>
  );
};

export default ProfilePage;
