import { SignIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

const SignInPage = () => {
  const user = auth();
  return <SignIn fallbackRedirectUrl={`/profile/${user.userId}`} />;
};
export default SignInPage;
