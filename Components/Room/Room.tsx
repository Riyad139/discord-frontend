import classNames from "classnames";
import { useState } from "react";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
export default function Room() {
  const [isMinimized, setMinimized] = useState(true);

  const miniMizedhandler = () => {
    setMinimized((value) => !value);
  };

  return (
    <div
      className={classNames(
        "bg-dark fixed z-10 flex items-center  flex-col-reverse",
        isMinimized
          ? "w-[40%] h-[60vh] bottom-0 right-0 "
          : "w-full left-0 h-[100vh] top-0 "
      )}
    >
      <div className="mb-9">
        {isMinimized && (
          <div className="cursor-pointer" onClick={miniMizedhandler}>
            <FullscreenIcon className="text-3xl" />
          </div>
        )}
        {!isMinimized && (
          <div className="cursor-pointer" onClick={miniMizedhandler}>
            <FullscreenExitIcon />
          </div>
        )}
      </div>
    </div>
  );
}
