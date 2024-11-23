import { useReducer } from "react";
import { reducer } from "./use-toast";
import { DisplayDeviceAction, SourceDeviceState } from "@/lib/types";
import { useMedia } from "./use-media";

export const useMediaSources = () => {
  const { getMediaResources } = useMedia();
  const [state, action] = useReducer(
    (state: SourceDeviceState, action: DisplayDeviceAction) => {
      switch (action.type) {
        case "GET_DISPLAYS":
          return {
            ...state,
            ...action.payload.displays,
          };
        default:
          return state;
      }
    },
    {
      displays: [],
      audioInput: [],
      error: null,
      isPending: false,
    }
  );

  const fetchMediaResources = async () => {
    action({
      type: "GET_DISPLAYS",
      payload: {
        displays: {
          isPending: true,
        },
      },
    });
    const { displays, audio } = await getMediaResources();
    action({
      type: "GET_DISPLAYS",
      payload: {
        displays: {
          displays,
          audioInput: audio,
          isPending: false,
        },
      },
    });
  };
  return { state, fetchMediaResources };
};
