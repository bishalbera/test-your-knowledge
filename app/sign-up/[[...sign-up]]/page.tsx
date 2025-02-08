import { SignUp } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

const SignUpPage =  () => {

        const user =  auth()
        console.log(user)
        return <SignUp fallbackRedirectUrl={`/profile/${user.userId}`} />;
};

export default SignUpPage;
