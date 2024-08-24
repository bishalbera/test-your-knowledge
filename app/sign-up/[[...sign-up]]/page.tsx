import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => {
  return <SignUp fallbackRedirectUrl="/profile" />;
};

export default SignUpPage;
