import { IState } from "@/@types/IState";
import { styled } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import UserWindow from "./UserWindow";
import RemoteVideo from "./RemoteVideo";

const widthSize = (length: number) => {
  if (length) return Math.floor(100 / length);
  return 100;
};
const heightSize = (length: number) => {
  return length / 4;
};

const VideoDiv = styled("video")({
  width: "100%",
  height: "100%",
});

export default function VideoSection() {
  const remoteStreams = useSelector(
    (state: IState) => state.room.remoteStreams
  );
  const localStream = useSelector((state: IState) => state.room.localStram);
  const isScreenShare = useSelector(
    (state: IState) => state.room.isScreensharingActive
  );
  const screenShareStream = useSelector(
    (state: IState) => state.room.screenSharingStream
  );
  const videoRef = useRef<HTMLMediaElement>();
  useEffect(() => {
    if (videoRef.current) {
      if (!isScreenShare) videoRef.current.srcObject = localStream;
      else videoRef.current.srcObject = screenShareStream;
      videoRef.current.onloadeddata = () => {
        videoRef.current?.play();
      };
    }
  }, [localStream, isScreenShare, screenShareStream]);

  return (
    <div className="h-[90%]  flex flex-col sm:flex-row sm:flex-wrap w-full">
      <div className="bg-gray-black  w-full sm:w-1/2 sm:h-full h-1/2 ">
        <VideoDiv
          //@ts-ignore
          ref={videoRef}
          autoPlay
          muted={true}
        />
      </div>
      {remoteStreams.map((it, i) => (
        <RemoteVideo key={"remoteStream___" + i} stream={it} />
      ))}
    </div>
  );
}
