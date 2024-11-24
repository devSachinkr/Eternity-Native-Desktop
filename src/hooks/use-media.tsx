"use client";
import { useZodForm } from "./use-zod-form";
import { StudioSchema } from "@/lib/schema";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { updateStudio } from "@/actions/studio";
import { toast } from "sonner";

export const useMedia = () => {
  const getMediaResources = async () => {
    const displays = await window.ipcRenderer.invoke("getSources");
    const enumerateDevices =
      await window.navigator.mediaDevices.enumerateDevices();
    const audioInput = enumerateDevices.filter(
      (device) => device.kind === "audioinput"
    );
    console.log("Getting Sources", displays, audioInput);
    return { displays, audio: audioInput };
  };
  return { getMediaResources };
};

export const useStudio = ({
  id,
  screen,
  audio,
  preset,
  plan,
}: {
  id: string;
  screen?: string | null;
  audio?: string | null;
  preset?: "HD" | "SD";
  plan?: "FREE" | "PRO";
}) => {
  const [onPreset, setOnPreset] = useState<"HD" | "SD" | undefined>();
  const { register, handleSubmit, errors, reset, watch } = useZodForm(
    StudioSchema,
    {
      screen: screen ?? "",
      audio: audio ?? "",
      preset: preset ?? "HD",
    }
  );
  const { mutate, isPending } = useMutation({
    mutationKey: ["update-studio"],
    mutationFn: ({
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
      return updateStudio({ id, screen, audio, preset });
    },
    onSuccess: (data) => {
      toast.success(data.status === 200 ? "Success" : "Oops!", {
        description: data.message,
      });
    },
  });

  useEffect(() => {
    console.log("👋👋👋👋👋")
    if (screen && audio ) {
      window.ipcRenderer.send("media-sources", {
        screen,
        audio,
        preset,
        id,
        plan,
      });
    }
  }, [screen, audio]);
  useEffect(() => {
    const subscription = watch((value) => {
      setOnPreset(value.preset);
      mutate({
        id,
        screen: value.screen,
        audio: value.audio,
        preset: value.preset,
      });
      window.ipcRenderer.send("media-sources", {
        audio: value.audio,
        screen: value.screen,
        preset: value.preset,
        id,
        plan,
      });
    });
    return () => subscription.unsubscribe();
  }, [watch]);
  return {
    register,
    handleSubmit,
    errors,
    reset,
    isPending,
    onPreset,
  };
};
