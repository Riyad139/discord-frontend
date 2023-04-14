import classNames from "classnames";
import { useState } from "react";
import ControllerSection from "./ControllerSection";
import VideoSection from "./videoSection";

export default function Room() {
  const [isMinimized, setMinimized] = useState(true);

  return (
    <div
      className={classNames(
        "bg-dark fixed z-10 flex flex-col",
        isMinimized
          ? " w-full h-full sm:w-[40%] sm:h-[55vh] bottom-0 right-0 "
          : "w-full left-0 h-[100vh] top-0 "
      )}
    >
      <VideoSection />
      <ControllerSection miniMizedhandler={setMinimized} value={isMinimized} />
    </div>
  );
}
