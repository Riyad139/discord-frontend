import { setLocalStream, setMode } from "../app/roomSlice";
import store from "../app/store";

const audioOnlyConstraint = {
  audio: true,
  video: false,
};
const defaultConstraint = {
  audio: true,
  video: true,
};

const getLocalStream = async (callBack: any) => {
  let resPonse = null;
  let success = false;
  try {
    resPonse = await navigator.mediaDevices.getUserMedia(defaultConstraint);
    success = true;
    resPonse.getVideoTracks()[0].enabled = false;
  } catch (err: any) {}

  if (!success) {
    try {
      resPonse = await navigator.mediaDevices.getUserMedia(audioOnlyConstraint);
      success = true;
    } catch (error: any) {}
  }
  if (resPonse && success) {
    store.dispatch(setLocalStream(resPonse));
    if (callBack) callBack();
  }
};

export default getLocalStream;
