import Peer, { Instance } from "simple-peer";
import store from "../app/store";
import { sendPeerSignal } from "@/socketIOClient/connectWithSocketIo";
import { setLocalStream, setRemoteStream, setSendData } from "../app/roomSlice";
import { object } from "yup";
import { Stream } from "stream";

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
  const locarStream = store.getState().room.sendStreamData;
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
    sendPeerSignal(signalData);
  });

  peer[connUserSoc].on("stream", (stream) => {
    const remoteStream = store.getState().room.remoteStreams;
    //@ts-ignore
    stream.connUserSocId = connUserSoc;
    const newRemoteStream = [...remoteStream, stream];
    store.dispatch(setRemoteStream(newRemoteStream));
  });
};

export const handleInCommingSignalingData = (data: any) => {
  const { signal, connUserSoc } = data;
  if (peer[connUserSoc]) peer[connUserSoc].signal(signal);
};

export const stopAllPeerConnection = () => {
  Object.entries(peer).forEach((value) => {
    const connUser = value[0];
    if (peer[connUser]) {
      peer[connUser].destroy();
      delete peer[connUser];
    }
  });
};

export const removeSinglePeerConnection = (conUserSoc: string) => {
  const remoteStream = store.getState().room.remoteStreams;
  const updatedSteam = remoteStream.filter(
    (id) => id.connUserSocId !== conUserSoc
  );

  peer[conUserSoc].destroy();
  delete peer[conUserSoc];
  store.dispatch(setRemoteStream(updatedSteam));
};

export const switchPeerTrack = (stream: any) => {
  store.dispatch(setSendData(stream));
  for (let socketId in peer) {
    for (let index in peer[socketId].streams[0].getTracks()) {
      for (let index2 in stream.getTracks()) {
        console.log(
          peer[socketId].streams[0].getTracks()[index].kind,
          stream.getTracks()[index2].kind
        );
        if (
          peer[socketId].streams[0].getTracks()[index].kind ===
          stream.getTracks()[index2].kind
        ) {
          peer[socketId].replaceTrack(
            peer[socketId].streams[0].getTracks()[index],
            stream.getTracks()[index2],
            peer[socketId].streams[0]
          );

          break;
        }
      }
    }
  }
};

export default getPeerSocketPrepare;
