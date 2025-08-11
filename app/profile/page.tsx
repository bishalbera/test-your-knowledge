import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

// Force dynamic rendering for this page since we use auth()
export const dynamic = 'force-dynamic';

const ProfileRedirect = async () => {
  const user = await auth();
  
  if (!user.userId) {
    // If user is not authenticated, redirect to sign-in
    redirect('/sign-in');
  }
  
  // Redirect to the user's specific profile page
  redirect(`/profile/${user.userId}`);
};

export default ProfileRedirect;
