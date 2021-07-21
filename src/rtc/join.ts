import AgoraRTC from "agora-rtc-sdk-ng";
import { RTCStore } from ".";

const bindEvents = (currentUserId: number) => {
  RTCStore.client.on("user-published", async (user, mediaType) => {
    const userId = +user.uid;
    const isARemoteUser = userId !== currentUserId;

    if (isARemoteUser) {
      await RTCStore.client.setStreamFallbackOption(userId, 2);
      await RTCStore.client.subscribe(user, mediaType);
      console.log("Received Subscribe Event: ", user.uid);
      const player$ = document.querySelector<HTMLElement>("#app .subscriber > .player")!;
      user.videoTrack?.play(player$);
    }
  });
};

export const join = async (role: "subscriber" | "publisher" = "subscriber") => {
  const {appId, channel, pubToken, subToken, publisherId, subscriberId} = RTCStore;
  let currentUserId: number;
  if (role === "subscriber") {
    RTCStore.client.join(appId, channel, null, subscriberId);
    currentUserId = subscriberId;
  } else {
    RTCStore.client.join(appId, channel, null, publisherId);
    currentUserId = publisherId;
  }
  bindEvents(currentUserId);

  RTCStore.client.enableDualStream();

  return currentUserId;
};

export const publishVideo = async () => {
  const [localVideo] = await Promise.all([AgoraRTC.createCameraVideoTrack({
    encoderConfig: "240p",
  }), RTCStore.client.setClientRole("host")]);
  RTCStore.localVideo = localVideo;
  await RTCStore.client.publish(RTCStore.localVideo);

  const player$ = document.querySelector<HTMLElement>("#app .publisher > .player")!;
  RTCStore.localVideo.play(player$);
}

export const publishPDF = async () => {
  const canvas$ = document.querySelector<HTMLCanvasElement>("#pdf > canvas")!;
  const stream = canvas$.captureStream(15);
  const [videoTrack] = stream.getVideoTracks();
  const [localVideo] = await Promise.all([AgoraRTC.createCustomVideoTrack({
    mediaStreamTrack: videoTrack,
  }), RTCStore.client.setClientRole("host")]);
  RTCStore.localVideo = localVideo;
  console.log("LocalVideo: ", localVideo);
  // await RTCStore.client.publish(RTCStore.localVideo);
}
