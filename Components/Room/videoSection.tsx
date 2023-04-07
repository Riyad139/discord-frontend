import { IState } from "@/@types/IState";
import { styled } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import UserWindow from "./UserWindow";

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
  const activeUsers = useSelector((state: IState) => state.room.activeRooms);
  const [width, setWidth] = useState(100);
  const thisUser = useSelector((state: IState) => state.Auth.user.email);
  const localStream = useSelector((state: IState) => state.room.localStram);
  const videoRef = useRef<HTMLMediaElement>();
  useEffect(() => {
    setWidth(widthSize(activeUsers.length));
    if (videoRef.current) {
      videoRef.current.srcObject = localStream;
      videoRef.current.onloadeddata = () => {
        videoRef.current?.play();
      };
    }
  }, [activeUsers, localStream]);

  return (
    <div className="h-[90%]  flex flex-wrap w-full">
      <div className="bg-gray-black w-1/2 h-full">
        <VideoDiv ref={videoRef} autoPlay muted={true} />
      </div>
      {activeUsers.map(
        (it) =>
          it.email !== thisUser && (
            <UserWindow width={activeUsers.length} name={it.username} />
          )
      )}
    </div>
  );
}
