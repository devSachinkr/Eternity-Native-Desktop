import { DisplayDeviceAction, SourceDeviceState } from "@/lib/types";
import { useReducer } from "react";
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
    try {
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
    } catch (error) {
      console.log("Error fetching media resources 🔴: 🙏", error);
    }
  };
  return { state, fetchMediaResources };
};
