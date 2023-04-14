import { styled } from "@mui/material";
import { useEffect, useRef } from "react";

const VideoDiv = styled("video")({
  width: "100%",
  height: "100%",
});
export default function RemoteVideo(stream: any) {
  const videoRef = useRef<HTMLMediaElement>();
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = stream.stream;
      videoRef.current.onloadeddata = () => {
        videoRef.current?.play();
      };
    }
  }, [stream]);
  return (
    <div className="w-1/2 h-full">
      <VideoDiv
        //@ts-ignore
        ref={videoRef}
        autoPlay
        muted={false}
      />
    </div>
  );
}
