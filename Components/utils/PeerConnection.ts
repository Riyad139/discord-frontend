import Peer, { Instance } from "simple-peer";
import store from "../app/store";
import { sendPeerSignal } from "@/socketIOClient/connectWithSocketIo";
import { setRemoteStream } from "../app/roomSlice";

const getConfig = () => {
  const turnIceServers = null;
  if (turnIceServers) {
  } else {
    console.warn("using turn server");
    return {
      iceServers: [
        {
          urls: `stun:stun.1.google.com:19302`,
        },
      ],
    };
  }
};

let peer: { [key: string]: Instance } = {};

const getPeerSocketPrepare = (connUserSoc: string, isInitatior: boolean) => {
  const locarStream = store.getState().room.localStram;
  if (isInitatior) {
    console.log("preparing connection as initiator");
  } else {
    console.log("preparing connection as not initiator");
  }

  peer[connUserSoc] = new Peer({
    initiator: isInitatior,
    config: getConfig(),
    stream: locarStream,
  });

  peer[connUserSoc].on("signal", (data) => {
    const signalData = {
      signal: data,
      connUserSoc,
    };
    console.log(signalData);
    sendPeerSignal(signalData);
  });

  peer[connUserSoc].on("stream", (stream) => {
    const remoteStream = store.getState().room.remoteStreams;
    const newRemoteStream = [...remoteStream, stream];
    store.dispatch(setRemoteStream(newRemoteStream));
  });
};

export const handleInCommingSignalingData = (data: any) => {
  const { signal, connUserSoc } = data;
  if (peer[connUserSoc]) peer[connUserSoc].signal(signal);
};

export default getPeerSocketPrepare;
