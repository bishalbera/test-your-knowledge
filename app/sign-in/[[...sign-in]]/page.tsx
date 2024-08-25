import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
  return <SignIn fallbackRedirectUrl="/profile"/>;
};

export default SignInPage;
