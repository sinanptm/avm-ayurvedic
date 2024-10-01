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

    socket.on('offer', async (offer) => {
      console.log('Received offer:', offer);
      console.log('Current signaling state before setting remote description:', peerConnection.signalingState);
      
      if (peerConnection.signalingState === 'stable' || peerConnection.signalingState === 'have-local-offer') {
        try {
          await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
          const answer = await peerConnection.createAnswer();
          await peerConnection.setLocalDescription(answer);
          socket.emit('answer', answer, roomId);
          console.log('Sent answer:', answer);
        } catch (error) {
          console.error('Error handling the offer:', error);
        }
      } else {
        console.warn('PeerConnection is not in a valid state to process the offer:', peerConnection.signalingState);
      }
    });
    
    socket.on('answer', async (answer) => {
      console.log('Received answer:', answer);
      console.log('Current signaling state before setting remote description:', peerConnection.signalingState);
      
      if (peerConnection.signalingState === 'have-local-offer') {
        try {
          await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
          console.log('Set remote description with answer');
        } catch (error) {
          console.error('Error setting remote description with answer:', error);
        }
      } else {
        console.warn('Cannot set remote description in signaling state:', peerConnection.signalingState);
      }
    });

    
    processIceCandidates();

    return { peerConnection, remoteStream };

  } catch (error) {
    console.error('Error in createPeerConnection:', error);
    return null;
  }
};

export default createPeerConnection;
