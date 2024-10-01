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
    const remoteStream = new MediaStream(); // Remote media stream to be populated
    const candidateQueue: RTCIceCandidate[] = [];
    let isNegotiating = false;  // Prevents duplicate negotiations
    let isOfferer = role === 'doctor';  // Assume 'doctor' initiates the offer

    // Emit joining room event
    socket.emit('join-room', roomId);

    // Add local tracks to the connection
    localStream.getTracks().forEach(track => {
      peerConnection.addTrack(track, localStream);
    });

    // Handle ICE candidate generation and send them via socket to remote peer
    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit('ice-candidate', event.candidate, roomId);
      }
    };

    // Handle incoming remote track and add it to the remoteStream
    peerConnection.ontrack = (event) => {
      console.log('Remote track received:', event);
      event.streams[0].getTracks().forEach(track => {
        remoteStream.addTrack(track); // Add remote track to the remote stream
      });
    };

    // Handle ICE candidates received from the server
    socket.on('ice-candidate', async (candidate) => {
      const iceCandidate = new RTCIceCandidate(candidate);
      if (peerConnection.signalingState === 'closed') return;

      if (peerConnection.remoteDescription) {
        try {
          await peerConnection.addIceCandidate(iceCandidate);
          console.log('Added ICE candidate:', iceCandidate);
        } catch (error) {
          console.error('Error adding received ICE candidate:', error);
        }
      } else {
        candidateQueue.push(iceCandidate);
        console.log('Queued ICE candidate:', iceCandidate);
      }
    });

    // Process queued ICE candidates after remote description is set
    const processIceCandidates = async () => {
      console.log('Processing queued ICE candidates...');
      while (candidateQueue.length > 0 && peerConnection.signalingState !== 'closed') {
        const candidate = candidateQueue.shift();
        if (candidate) {
          await peerConnection.addIceCandidate(candidate);
          console.log('Processed ICE candidate from queue:', candidate);
        }
      }
    };

    // Only the designated offerer (e.g., doctor) creates an offer
    peerConnection.onnegotiationneeded = async () => {
      if (isNegotiating || !isOfferer) return;  // Only allow one peer to create an offer
      isNegotiating = true;
      try {
        console.log('Negotiation needed, creating offer...');
        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);
        socket.emit('offer', offer, roomId);
        console.log('Sent offer:', offer);
      } catch (error) {
        console.error('Error during negotiation:', error);
      } finally {
        isNegotiating = false;
      }
    };

    // Listen for offer events
    socket.on('offer', async (offer) => {
      console.log('Received offer:', offer);
      if (isNegotiating) return;  // Prevent parallel negotiations
      isNegotiating = true;
      try {
        if (peerConnection.signalingState === 'stable' || peerConnection.signalingState === 'have-local-offer') {
          await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
          const answer = await peerConnection.createAnswer();
          await peerConnection.setLocalDescription(answer);
          socket.emit('answer', answer, roomId);
          console.log('Sent answer:', answer);
          await processIceCandidates();
        } else {
          console.warn('PeerConnection is not in a valid state to set remote description:', peerConnection.signalingState);
        }
      } catch (error) {
        console.error('Error processing offer:', error);
      } finally {
        isNegotiating = false;
      }
    });

    // Listen for answer events
    socket.on('answer', async (answer) => {
      console.log('Received answer:', answer);
      if (peerConnection.signalingState === 'have-local-offer') {
        try {
          await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
          console.log('Set remote description with answer');
          await processIceCandidates();
        } catch (error) {
          console.error('Error setting remote description with answer:', error);
        }
      } else {
        console.warn('Cannot set remote description in signaling state:', peerConnection.signalingState);
      }
    });

    // Returning both the peerConnection and the remoteStream for the frontend
    return { peerConnection, remoteStream };

  } catch (error) {
    console.error('Error in createPeerConnection:', error);
    return null;
  }
};

export default createPeerConnection;
