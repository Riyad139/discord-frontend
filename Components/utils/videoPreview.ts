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

const getLocalStream = (callBack: any) => {
  const mode = store.getState().room.audioOnly;
  const constraint = mode ? audioOnlyConstraint : defaultConstraint;
  navigator.mediaDevices
    .getUserMedia(constraint)
    .then((stream) => {
      store.dispatch(setLocalStream(stream));
      if (callBack) callBack();
    })
    .catch((err) => console.log(err));
};

export default getLocalStream;
