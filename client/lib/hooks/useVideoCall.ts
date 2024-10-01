import { useEffect, useRef, useState } from 'react';
import createPeerConnection from '@/lib/webrtc/createPeerConnection';

export const useVideoCall = (section: any, role: 'patient' | 'doctor') => {
  const [hasJoined, setHasJoined] = useState(false);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream>(new MediaStream()); 
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  useEffect(() => {
    let peerConnection: RTCPeerConnection | null = null;

    if (hasJoined && section?.roomId && localStream) {
      createPeerConnection(section.roomId, role, localStream).then(connection => {
        if (connection) {
          peerConnection = connection.peerConnection;
          setRemoteStream(connection.remoteStream);
        }
      });
    }

    return () => {
      if (peerConnection) {
        peerConnection.close();
      }
    };
  }, [hasJoined, section, localStream, role]);

  const handleJoin = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setLocalStream(stream);
      setHasJoined(true);
    } catch (error) {
      console.error('Error accessing media devices:', error);
    }
  };

  const handleEndCall = () => {
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
    }
    setLocalStream(null);
    setRemoteStream(new MediaStream()); 
    setHasJoined(false);
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
