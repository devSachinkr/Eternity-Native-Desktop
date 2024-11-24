export type Profile = {
  status: number;
  user:
    | ({
        subscription: {
          plan: "FREE" | "PRO";
        } | null;
        studio: {
          id: string;
          screen: string | null;
          mic: string | null;
          preset: "HD" | "SD";
          camera: string | null;
          userId: string | null;
        } | null;
      } & {
        id: string;
        email: string;
        firstname: string | null;
        lastname: string | null;
        createdAt: Date;
        clerkId: string;
      })
    | null;
} | null;

export type SourceDeviceState = {
  displays?: {
    appIcon: null;
    display_id: string;
    id: string;
    name: string;
    thumbnail: unknown[];
  }[];
  audioInput?: {
    deviceId: string;
    groupId: string;
    kind: string;
    label: string;
  }[];
  error?: string | null;
  isPending?: boolean;
};

export type DisplayDeviceAction = {
  type: "GET_DISPLAYS";
  payload: {
    displays: SourceDeviceState;
  };
};

export type MediaSource =
  | {
      screen: string;
      id: string;
      audio: string;
      preset: "HD" | "SD";
      plan: "FREE" | "PRO";
    }
  | undefined;
