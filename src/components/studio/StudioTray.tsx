import { startRecording, stopRecording } from "@/actions/studio";
import { MediaSource } from "@/lib/types";
import { cn, videoRecordingTime } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

const StudioTray = () => {
  const intialTime = new Date();
  const [preview, setPreview] = useState(false);
  const [onSources, setSources] = useState<MediaSource>(undefined);
  const [count, setCount] = useState<number>(0);
  const [recording, setRecording] = useState<boolean>(false);
  const videoRefElement = useRef<HTMLVideoElement>(null);
  const [timer, setTimer] = useState<string>("00:00:00");
  const clearTime = () => {
    setCount(0);
    setTimer("00:00:00");
  };
  
  useEffect(() => {
    if (recording) {
      const recordingInterval = setInterval(() => {
        const time = count + (new Date().getTime() - intialTime.getTime());
        setCount(time);
        const { duration, minutes } = videoRecordingTime(time);
        if (onSources?.plan === "FREE" && minutes === 5) {
          setRecording(false);
          clearTime()
          stopRecording()
        }
        setTimer(duration);
        if (time <= 0) {
          setTimer("00:00:00");
          clearInterval(recordingInterval);
        }
      }, 1);
      return () => clearInterval(recordingInterval);
    }
  }, [recording]);
  window.ipcRenderer.on("profile-received", (event, profile) => {
    setSources(profile);
  });
  return !onSources ? (
    <></>
  ) : (
    <div className="flex flex-col justify-end gap-y-5 h-screen ">
      {/* <video
        ref={videoRefElement}
        autoPlay
        className={cn("w-6/12 border-2 self-end", preview ? "hidden" : "")}
      /> */}
      <div className="rounded-full flex justify-around items-center h-20 w-full border-2 bg-black  border-white/40 draggable">
        <div
          {...(onSources && {
            onClick: () => {
              setRecording(true);
              startRecording({
                screen: onSources.screen,
                audio: onSources.audio,
                id: onSources.id,
              });
            },
          })}
          className={cn(
            "non-draggable rounded-full cursor-pointer relative hover:opacity-80",
            recording ? "bg-red-500 w-6 h-6" : "bg-red-400 w-6 h-6"
          )}
        >
          {recording && (
            <span className="absolute -right-16 top-1/2 transform -translate-y-1/2 text-white">
              {timer}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudioTray;
