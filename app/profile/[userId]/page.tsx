import FileUpload from "@/components/FileUpload/FileUpload";
import ProfileBody from "@/components/ProfileBody/ProfileBody";
import { prisma, addUserToDb } from "@/utils/db";
import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";

const ProfilePage = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  await addUserToDb();


  const cUser = await currentUser();
   if (!cUser) {
     return <p className="text-center text-red-500">User not found.</p>;
   }
  const userData = await prisma.user.findUnique({
    where: {
      clerkId: cUser.id,
    },
  });

  const isAdmin = userData?.email == process.env.ADMIN_EMAIL;

  return (
    <div className="min-h-screen w-screen text-white">
      <nav className="border-b border-white/10 bg-white/5 backdrop-blur">
        <ul className="mx-auto flex max-w-7xl flex-row justify-between p-4">
          <li className="my-2">
            <h1 className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-3xl font-bold text-transparent">My Profile</h1>
          </li>
          <li className="flex items-center gap-6 text-slate-200/80">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/available-exams" className="hover:text-white transition-colors">Exams</Link>
            <Link href="/profile" className="hover:text-white transition-colors">Profile</Link>
            <UserButton />
          </li>
        </ul>
      </nav>
      <div className="my-12 flex justify-center">
        <Image
          src={userData?.imageUrl ?? ""}
          alt="Profile"
          width={120}
          height={120}
          className="rounded-full border border-white/10 object-cover"
        />
      </div>
      <p className="flex justify-center text-lg font-bold">{userData?.name}</p>
      <ProfileBody userData={userData} />
      {isAdmin && <FileUpload />}
    </div>
  );
};

export default ProfilePage;
