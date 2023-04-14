import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import CloseIcon from "@mui/icons-material/Close";
import { Dispatch, SetStateAction, useState } from "react";
import { leaveRoomHandlerEmit } from "@/socketIOClient/connectWithSocketIo";
import { useDispatch, useSelector } from "react-redux";

import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import StopScreenShareIcon from "@mui/icons-material/StopScreenShare";

import { IState } from "@/@types/IState";
import { setScreenShare } from "../app/roomSlice";
import { switchPeerTrack } from "../utils/PeerConnection";

type IProps = {
  miniMizedhandler: Dispatch<SetStateAction<boolean>>;
  value: boolean;
};

const constraint = {
  video: true,
  audio: false,
};

export default function ControllerSection({ miniMizedhandler, value }: IProps) {
  const [isVideoEnable, setVideoEnable] = useState(true);
  const [isMicEnable, setMicEnable] = useState(true);
  const screenShareStream = useSelector(
    (state: IState) => state.room.screenSharingStream
  );
  const isScreenShare = useSelector(
    (state: IState) => state.room.isScreensharingActive
  );
  const disPatch = useDispatch();
  const localStream = useSelector((state: IState) => state.room.localStram);
  const handlerVideo = () => {
    localStream.getVideoTracks()[0].enabled = isVideoEnable;
    setVideoEnable((val) => !val);
  };
  const handlerAudio = () => {
    setMicEnable((val) => !val);
    localStream.getAudioTracks()[0].enabled = !isMicEnable;
  };

  const handlerScreenShare = async () => {
    let stream = null;
    if (!isScreenShare) {
      try {
        stream = await navigator.mediaDevices.getDisplayMedia(constraint);
      } catch (error: any) {
        console.log(error);
      }
      if (stream) {
        disPatch(setScreenShare(stream));
        switchPeerTrack(stream);
      }
    } else {
      switchPeerTrack(localStream);
      if (screenShareStream)
        screenShareStream.getTracks().forEach((it: any) => {
          it.stop();
        });
      disPatch(setScreenShare(null));
    }
  };

  return (
    <div className="w-full h-[10%] gap-5 flex items-center justify-center bg-mediumBluish">
      <div>
        {isMicEnable && (
          <MicIcon className="cursor-pointer" onClick={handlerAudio} />
        )}
        {!isMicEnable && (
          <MicOffIcon className="cursor-pointer" onClick={handlerAudio} />
        )}
      </div>
      <div>
        {!isVideoEnable && (
          <VideocamIcon className="cursor-pointer" onClick={handlerVideo} />
        )}
        {isVideoEnable && (
          <VideocamOffIcon className="cursor-pointer" onClick={handlerVideo} />
        )}
      </div>
      <div>
        {!isScreenShare && <ScreenShareIcon onClick={handlerScreenShare} />}
        {isScreenShare && <StopScreenShareIcon onClick={handlerScreenShare} />}
      </div>
      <div className="sm:block hidden">
        {value && (
          <div
            className="cursor-pointer"
            onClick={() => miniMizedhandler(!value)}
          >
            <FullscreenIcon />
          </div>
        )}
        {!value && (
          <div
            className="cursor-pointer"
            onClick={() => miniMizedhandler(!value)}
          >
            <FullscreenExitIcon />
          </div>
        )}
      </div>
      <CloseIcon onClick={leaveRoomHandlerEmit} className="cursor-pointer" />
    </div>
  );
}
