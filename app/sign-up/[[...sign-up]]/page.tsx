"use client";

import { SignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

const SignUpPage = () => {
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

        // For non-authenticated users, show sign up
        // Redirect is handled by NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL env var
        return <SignUp />;
};

export default SignUpPage;
