"use client";

import { SignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

const SignInPage = () => {
  const router = useRouter();
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (isLoaded && user) {
      router.push(`/profile/${user.id}`);
    }
  }, [isLoaded, user, router]);

  if (!isLoaded) {
    return null;
  }

  if (user) {
    return null;
  }

  // For non-authenticated users, show sign in
  // Redirect is handled by NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL env var
  return <SignIn />;
};

export default SignInPage;
