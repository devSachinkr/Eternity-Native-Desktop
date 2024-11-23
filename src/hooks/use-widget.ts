import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { Profile } from "@/lib/types";
import axios from "axios";
export const useWidget = () => {
  console.log("useWidget : 🙏");
  const { user } = useUser();
  const [profile, setProfile] = useState<Profile | null>(null);
  const httpClient = axios.create({
    baseURL: import.meta.env.VITE_HOST_URL,
  });
  const fetchProfile = async (userId: string) => {
    const {data} = await httpClient.get(`/auth/${userId}`,{
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
    }
  }, [user]);

  return { profile };
};
