import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import CloseIcon from "@mui/icons-material/Close";
import { Dispatch, SetStateAction, useState } from "react";
import { leaveRoomHandlerEmit } from "@/socketIOClient/connectWithSocketIo";
import { useDispatch } from "react-redux";
import { setMode } from "../app/roomSlice";
import getLocalStream from "../utils/videoPreview";

type IProps = {
  miniMizedhandler: Dispatch<SetStateAction<boolean>>;
  value: boolean;
};

export default function ControllerSection({ miniMizedhandler, value }: IProps) {
  const [isVideoEnable, setVideoEnable] = useState(true);
  const [isMicEnable, setMicEnable] = useState(true);
  const disPatch = useDispatch();

  const handlerVideo = () => {
    setVideoEnable((val) => !val);
    disPatch(setMode(!isVideoEnable));
    getLocalStream(undefined);
  };
  return (
    <div className="w-full h-[10%] gap-5 flex items-center justify-center bg-mediumBluish">
      <div>
        {isMicEnable && (
          <MicIcon
            className="cursor-pointer"
            onClick={() => setMicEnable((value) => !value)}
          />
        )}
        {!isMicEnable && (
          <MicOffIcon
            className="cursor-pointer"
            onClick={() => setMicEnable((value) => !value)}
          />
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
      <div className="">
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
