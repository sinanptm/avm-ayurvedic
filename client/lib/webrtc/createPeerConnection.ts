import peerConfiguration from "@/config/webRTCStuntServer";
import connectSocketIO from "../socket.io/connectSocketIO";

const createPeerConnection = async (
  roomId: string,
  role: 'patient' | 'doctor',
  localStream: MediaStream
): Promise<{
  peerConnection: RTCPeerConnection,
  remoteStream: MediaStream
} | null> => {
  try {
    const socket = connectSocketIO({ role, namespace: 'video' });
    const peerConnection = new RTCPeerConnection(peerConfiguration);
    const remoteStream = new MediaStream();
    const candidateQueue: RTCIceCandidate[] = [];

    socket.emit('join-room', roomId);

    localStream.getTracks().forEach(track => {
      peerConnection.addTrack(track, localStream);
    });

    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit('ice-candidate', event.candidate, roomId);
      }
    };

    peerConnection.ontrack = (event) => {
      event.streams[0].getTracks().forEach(track => {
        remoteStream.addTrack(track);
      });
    };

    socket.on('ice-candidate', async (candidate) => {
      const iceCandidate = new RTCIceCandidate(candidate);
      if (peerConnection.signalingState === 'closed') return;

      if (peerConnection.remoteDescription) {
        try {
          await peerConnection.addIceCandidate(iceCandidate);
        } catch (error) {
          console.error('Error adding received ICE candidate:', error);
        }
      } else {
        candidateQueue.push(iceCandidate);
      }
    });

    const processIceCandidates = async () => {
      while (candidateQueue.length > 0 && peerConnection.signalingState !== 'closed') {
        const candidate = candidateQueue.shift();
        if (candidate) {
          await peerConnection.addIceCandidate(candidate);
        }
      }
    };

    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    socket.emit('offer', offer, roomId);

    socket.on('answer', async (answer) => {
      if (peerConnection.signalingState !== 'closed') {
        await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
        await processIceCandidates(); // Process queued candidates
      }
    });

    socket.on('offer', async (offer) => {
      if (peerConnection.signalingState === 'stable') {
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);
        socket.emit('answer', answer, roomId);
      } else {
        console.warn('Received an offer while in a non-stable state; ignoring.');
      }
    });

    return { peerConnection, remoteStream };

  } catch (error) {
    console.error('Error in createPeerConnection:', error);
    return null;
  }
};

export default createPeerConnection;
