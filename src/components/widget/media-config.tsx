import { useStudio } from "@/hooks/use-media";
import { Profile, SourceDeviceState } from "@/lib/types";
import Spinner from "../global/spinner";
import { Mic, Monitor, Settings } from "lucide-react";

type Props = {
  state: SourceDeviceState;
  user: Profile;
};
const MediaConfig = ({ state, user }: Props) => {
  const activeScreen = state.displays?.find(
    (d) => d.id === user?.user?.studio?.screen
  );
  const activeAudio = state.audioInput?.find(
    (a) => a.deviceId === user?.user?.studio?.mic
  );

  const { onPreset, isPending, register } = useStudio({
    id: user!.user!.id,
    plan: user?.user?.subscription?.plan,
    screen: user?.user?.studio?.screen || state.displays?.[0]?.id,
    audio: user?.user?.studio?.mic || state.audioInput?.[0]?.deviceId,
    preset: user?.user?.studio?.preset,
  });
  return (
    <form className="flex h-full flex-col relative gap-y-5 w-full">
      {isPending && (
        <div className="fixed z-50 w-full top-0 left-0 right-0 bottom-0 rounded-2xl h-full bg-black/80 flex justify-center items-center">
          <Spinner loading={true} />
        </div>
      )}
      <div className="flex gap-x-5 justify-center items-center">
        <Monitor fill="#575655" color="#575655" size={36} />
        <select
          {...register("screen")}
          className="outline-none cursor-pointer px-5 py-2 rounded-xl border-2 text-white border-[#575655] bg-transparent w-full"
        >
          {state.displays?.map((dis, key) => (
            <option
              selected={activeScreen && activeScreen.id === dis.id}
              key={key}
              value={dis.id}
              className="bg-[#171717] cursor-pointer "
            >
              {dis.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex gap-x-5 justify-center items-center">
        <Mic fill="#575655" color="#575655" size={36} />
        <select
          {...register("audio")}
          className="outline-none cursor-pointer px-5 py-2 rounded-xl border-2 text-white border-[#575655] bg-transparent w-full"
        >
          {state.audioInput?.map((audio, key) => (
            <option
              selected={activeAudio && activeAudio.deviceId === audio.deviceId}
              key={key}
              value={audio.deviceId}
              className="bg-[#171717] cursor-pointer"
            >
              {audio.label}
            </option>
          ))}
        </select>
      </div>
      <div className="flex gap-x-5 justify-center items-center">
        <Settings fill="#575655" color="#575655" size={36} />
        <select
          {...register("preset")}
          className="outline-none cursor-pointer px-5 py-2 rounded-xl border-2 text-white border-[#575655] bg-transparent w-full"
        >
          <option
            selected={onPreset === "HD" || user?.user?.studio?.preset === "HD"}
            disabled={user?.user?.subscription?.plan === "FREE"}
            value="HD"
            className="bg-[#171717] cursor-pointer"
          >
            1080p
            {user?.user?.subscription?.plan === "FREE" && " (Upgrade to Pro)"}
          </option>
          <option
            selected={onPreset === "SD" || user?.user?.studio?.preset === "SD"}
            value="SD"
            className="bg-[#171717] cursor-pointer"
          >
            720p
          </option>
        </select>
      </div>
    </form>
  );
};

export default MediaConfig;
