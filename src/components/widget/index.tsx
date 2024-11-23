import { useWidget } from "@/hooks/use-widget";
import { ClerkLoading, SignedIn } from "@clerk/clerk-react";
import Spinner from "../global/spinner";
import { useMediaSources } from "@/hooks/use-media-sources";

const Widget = () => {
  const { profile } = useWidget();
  const {fetchMediaResources,state}=useMediaSources();
  console.log(profile)
  return (
    <div className="p-5">
      <ClerkLoading>
        <div className="h-full flex justify-center items-center">
          <Spinner loading={true} />
        </div>
      </ClerkLoading>
      <SignedIn>
        {profile ? (
         <MediaConfig/>
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
