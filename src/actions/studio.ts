import { httpClient } from "@/lib/axios-config";
import { v4 } from "uuid";
export const updateStudio = async ({
  id,
  screen,
  audio,
  preset,
}: {
  id: string;
  screen: string;
  audio: string;
  preset: "HD" | "SD";
}) => {
  try {
    const res = await httpClient.put(
      `/studio/${id}`,
      {
        screen,
        audio,
        preset,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (res.status === 200) {
      return res.data;
    }
    throw new Error("Failed to update studio");
  } catch (error) {
    console.log(error);
  }
};

export const hidePluginWindow = (state: boolean) => {
  window.ipcRenderer.send("hide-plugin", { state });
};
let videoTransferFileName: string | undefined;
let mediaRecorder: MediaRecorder | undefined;
export const startRecording = async ({
  screen,
  audio,
  id,
}: {
  screen: string;
  audio: string;
  id: string;
}) => {
  hidePluginWindow(true);
  try {
    videoTransferFileName = `${v4()}-${id.slice(0, 8)}.webm`;
    mediaRecorder?.start(1000);

  } catch (error) {
    console.log(error);
  }
};

export const stopRecording = () => {
  mediaRecorder?.stop();
};
