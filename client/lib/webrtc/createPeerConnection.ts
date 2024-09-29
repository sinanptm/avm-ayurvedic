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

    // Join the room
    socket.emit('join-room', roomId);
    
    // Add local stream tracks to peer connection
    localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));

    // Handle onicecandidate event
    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit('ice-candidate', event.candidate, roomId);
      }
    };

    // Handle incoming remote stream
    peerConnection.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        remoteStream.addTrack(track);
      });
    };

    // Listen for ice candidates from server
    socket.on('ice-candidate', (candidate) => {
      peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
    });

    if (role === 'doctor') {
      // Doctor creates and sends offer
      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);
      socket.emit('offer', offer, roomId);
    }

    // Handle offer and send answer if patient
    if (role === 'patient') {
      socket.on('offer', async (offer) => {
        await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);
        socket.emit('answer', answer, roomId);
      });
    }

    // Handle answer if doctor
    socket.on('answer', async (answer) => {
      await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
    });

    return { peerConnection, remoteStream };
  } catch (error) {
    console.error('Error in createPeerConnection:', error);
    return null;
  }
};

export default createPeerConnection;
