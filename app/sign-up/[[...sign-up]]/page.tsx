import { SignUp } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

// Force dynamic rendering for this page since we use auth()
export const dynamic = 'force-dynamic';

const SignUpPage = async () => {
        const user = await auth();
        
        // If user is already authenticated, redirect them to their profile
        if (user.userId) {
                redirect(`/profile/${user.userId}`);
        }
        
        // For non-authenticated users, show sign up
        // Redirect is handled by NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL env var
        return <SignUp />;
};

export default SignUpPage;
