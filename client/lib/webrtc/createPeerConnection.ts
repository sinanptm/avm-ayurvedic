import connectSocketIO from "../socket.io/connectSocketIO";
import peerConfiguration from "./peerConfiguration";

const createPeerConnection = (roomId: string, role: 'patient' | 'doctor') => {
    try {
        const socket = connectSocketIO({ role, namespace: 'video' });
        const peerConnection = new RTCPeerConnection(peerConfiguration());

        const remoteStream = new MediaStream();

        peerConnection.onicecandidate = (event) => {
            if (event.candidate) {
                socket.emit('ice-candidate', event.candidate, roomId);
            }
        };

        peerConnection.ontrack = (event) => {
            event.streams[0].getTracks().forEach((track) => {
                remoteStream.addTrack(track);
            });
        };[]

        socket.on('ice-candidate', (candidate) => {
            peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
        });

        socket.on('offer', (offer) => {
            peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
            peerConnection.createAnswer().then((answer) => {
                peerConnection.setLocalDescription(answer);
                socket.emit('answer', answer, roomId);
            });
        });

        return { peerConnection, remoteStream };
    } catch (error) {
        console.error(error);
        return null;
    }
}

export default createPeerConnection;
