import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { Profile } from "@/lib/types";
import { httpClient } from "@/lib/axios-config";
import { useMediaSources } from "./use-media-sources";
export const useWidget = () => {
  console.log("useWidget : 🙏");
  const { user } = useUser();
  const [profile, setProfile] = useState<Profile | null>(null);
  const { fetchMediaResources, state } = useMediaSources();
  const fetchProfile = async (userId: string) => {
    const { data } = await httpClient.get(`/auth/${userId}`, {
        headers:{
            'Content-Type':'application/json',
        }
    });
    console.log("Data : 🙏",data);
    return data;
  };


  useEffect(() => {
    if (user && user.id) {
      fetchProfile(user.id).then((profile) => setProfile(profile));
      fetchMediaResources();
    }
  }, [user]);

  return { profile, state };
};
