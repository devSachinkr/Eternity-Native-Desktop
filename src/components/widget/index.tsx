import { useWidget } from "@/hooks/use-widget";
import { ClerkLoading, SignedIn } from "@clerk/clerk-react";
import Spinner from "../global/spinner";
import MediaConfig from "./media-config";

const Widget = () => {
  const { profile ,state} = useWidget();
 
  
  return (
    <div className="p-5">
      <ClerkLoading>
        <div className="h-full flex justify-center items-center">
          <Spinner loading={true} />
        </div>
      </ClerkLoading>
      <SignedIn>
        {profile ? (
         <MediaConfig user={profile} state={state}/>
        ) : (
          <div className="w-full h-full flex justify-center items-center">
            <Spinner loading={true} />
          </div>
        )}
      </SignedIn>
    </div>
  );
};

export default Widget;
