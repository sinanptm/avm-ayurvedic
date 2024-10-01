import { useEffect, useState } from 'react';
import createPeerConnection from '@/lib/webrtc/createPeerConnection';

export const useVideoCall = (section: any, role: 'patient' | 'doctor') => {
  const [hasJoined, setHasJoined] = useState(false);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream>(new MediaStream());
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [peerConnection, setPeerConnection] = useState<RTCPeerConnection | null>(null);

  useEffect(() => {
    if (hasJoined && section?.roomId && localStream) {
      // Create the PeerConnection and set remote stream when joined
      createPeerConnection(section.roomId, role, localStream).then(connection => {
        if (connection) {
          setPeerConnection(connection.peerConnection);
          setRemoteStream(connection.remoteStream);
        }
      });
    }

    return () => {
      // Cleanup: close peer connection on component unmount or when leaving the room
      if (peerConnection) {
        peerConnection.close();
      }
    };
  }, [hasJoined, section, localStream, role, peerConnection]);

  const handleJoin = async () => {
    try {
      // Get user media (camera + mic)
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setLocalStream(stream);
      setHasJoined(true);
    } catch (error) {
      console.error('Error accessing media devices:', error);
    }
  };

  const handleEndCall = () => {
    // End the call, stop the streams and reset states
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
    }
    setLocalStream(null);
    setRemoteStream(new MediaStream());
    setHasJoined(false);
    if (peerConnection) {
      peerConnection.close();
      setPeerConnection(null);
    }
  };

  const toggleMute = () => {
    if (localStream) {
      localStream.getAudioTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsMuted(prev => !prev);
    }
  };

  const toggleVideo = () => {
    if (localStream) {
      localStream.getVideoTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsVideoOff(prev => !prev);
    }
  };

  return {
    hasJoined,
    localStream,
    remoteStream,
    isMuted,
    isVideoOff,
    handleJoin,
    handleEndCall,
    toggleMute,
    toggleVideo,
  };
};
