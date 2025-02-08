import { SignUp } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

const SignUpPage =  async () => {

        const user =  await auth()
        console.log(user)
        return <SignUp fallbackRedirectUrl={`/profile/${user.userId}`} />;
};

export default SignUpPage;
