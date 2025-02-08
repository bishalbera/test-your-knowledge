import { SignIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

const SignInPage = async () => {
  const user =  await auth();
  return <SignIn fallbackRedirectUrl={`/profile/${user.userId}`} />;
};
export default SignInPage;
