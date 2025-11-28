'use client';

import FileUpload from "@/components/FileUpload/FileUpload";
import ProfileBody from "@/components/ProfileBody/ProfileBody";
import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const ProfilePage = () => {
  const { user } = useUser();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/get-user-profile");
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (!user) {
    return <p className="text-center text-red-500">User not found.</p>;
  }

  const isAdmin = user?.emailAddresses[0]?.emailAddress === process.env.NEXT_PUBLIC_ADMIN_EMAIL;

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
          src={user?.imageUrl ?? ""}
          alt="Profile"
          width={120}
          height={120}
          className="rounded-full border border-white/10 object-cover"
        />
      </div>
      <p className="flex justify-center text-lg font-bold">{user?.fullName}</p>
      <ProfileBody userData={userData} />
      {isAdmin && <FileUpload />}
    </div>
  );
};

export default ProfilePage;
