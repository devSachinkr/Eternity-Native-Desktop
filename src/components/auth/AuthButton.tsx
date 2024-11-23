import { SignInButton, SignedOut, SignUpButton } from "@clerk/clerk-react";
import { Button } from "../ui/button";
const AuthButton = () => {
  return (
    <SignedOut>
      <div className="flex gap-x-3  h-screen justify-center items-center">
        <SignInButton>
          <Button
            variant="outline"
            className="px-10 rounded-full hover:bg-demonGreen/80
                hover:text-white "
          >
            Sign In
          </Button>
        </SignInButton>
        <SignUpButton>
          <Button
            variant="outline"
            className="px-10 rounded-full text-white bg-demonGreen
                hover:bg-demonGreen/80"
          >
            Sign Up
          </Button>
        </SignUpButton>
      </div>
    </SignedOut>
  );
};

export default AuthButton;
