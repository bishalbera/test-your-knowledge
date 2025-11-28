"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ProfileRedirect = () => {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded) {
      if (!user) {
        // If user is not authenticated, redirect to sign-in
        router.push('/sign-in');
      } else {
        // Redirect to the user's specific profile page
        router.push(`/profile/${user.id}`);
      }
    }
  }, [isLoaded, user, router]);

  // Show loading state while redirecting
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <p>Redirecting...</p>
      </div>
    </div>
  );
};

export default ProfileRedirect;
