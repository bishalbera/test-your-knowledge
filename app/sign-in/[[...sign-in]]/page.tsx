import { SignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

// Force dynamic rendering for this page since we use auth()
export const dynamic = 'force-dynamic';

const SignInPage = async () => {
  const user = await auth();
  
  // If user is already authenticated, redirect them to their profile
  if (user.userId) {
    redirect(`/profile/${user.userId}`);
  }
  
  // For non-authenticated users, show sign in
  // Redirect is handled by NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL env var
  return <SignIn />;
};
export default SignInPage;
