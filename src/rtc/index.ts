import AgoraRTC, { IAgoraRTCClient, ICameraVideoTrack, ILocalVideoTrack } from "agora-rtc-sdk-ng";
import { join, publishVideo, publishPDF } from "./join";

export const RTCStore: {
  channel: string;
  client: IAgoraRTCClient;
  role: "publisher" | "subscriber";
  appId: string;
  pubToken: string;
  subToken: string;
  publisherId: number;
  subscriberId: number;
  currentUserId: number;
  localVideo?: ICameraVideoTrack | ILocalVideoTrack,
} = {
  channel: import.meta.env.VITE_CHANNEL_NAME as string || "",
  appId: import.meta.env.VITE_APP_ID as string || "",
  role: "subscriber",
  publisherId: +(import.meta.env.VITE_PUBLISHER_ID as string || -1),
  subscriberId: +(import.meta.env.VITE_SUBSCRIBER_ID as string || -1),
  currentUserId: -1,
  pubToken: import.meta.env.VITE_PUB_TOKEN as string || "",
  subToken: import.meta.env.VITE_SUB_TOKEN as string || "",
  client: AgoraRTC.createClient({
    mode:  "live",
    codec: "vp8",
    role: "audience",
  }),
}

console.log(">>>>>> Store: ", RTCStore);

export const intialize = async () => {
  AgoraRTC.setLogLevel(0);
  // const camera$ = document.querySelector("#app .publisher > .cameraBtn")!;
  const pdfBtn$ = document.querySelector("#app .publisher .publishPdf")!;
  RTCStore.currentUserId = await join(RTCStore.role);

  pdfBtn$.addEventListener("click", async (e) => {
    e.preventDefault();
    await publishPDF();
    return false;
  })
}
