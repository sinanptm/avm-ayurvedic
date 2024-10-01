import { useEffect, useState, useCallback, useRef } from 'react';
import Peer from 'simple-peer';
import { io, Socket } from 'socket.io-client';
import connectSocketIO from '@/lib/socket.io/connectSocketIO';

export const useVideoCall = (section: any, role: 'patient' | 'doctor') => {
  const [hasJoined, setHasJoined] = useState(false);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream>(new MediaStream());
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const peerRef = useRef<Peer.Instance | null>(null);
  const socketRef = useRef<Socket | null>(null);

  const connectSocket = useCallback(() => {
    const socket = connectSocketIO({ role, namespace: 'video' });
    socketRef.current = socket;

    // Listen for incoming signals from the server
    socket.on('signal', (signalData: any) => {
      console.log("Received signal from server:", signalData);
      if (peerRef.current) {
        peerRef.current.signal(signalData);
      }
    });
  }, [role]);

  const toggleMute = useCallback(() => {
    if (localStream) {
      localStream.getAudioTracks().forEach(track => (track.enabled = !track.enabled));
      setIsMuted(prev => !prev);
    }
  }, [localStream]);

  const toggleVideo = useCallback(() => {
    if (localStream) {
      localStream.getVideoTracks().forEach(track => (track.enabled = !track.enabled));
      setIsVideoOff(prev => !prev);
    }
  }, [localStream]);

  const handleJoin = useCallback(async () => {
    try {
      console.log("Connecting to socket");
      connectSocket();

      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setLocalStream(stream);

      const peer = new Peer({
        initiator: role === 'doctor', // Doctor sends offer, patient responds with answer
        stream,
        trickle: false,
      });

      peerRef.current = peer;

      // When the peer sends a signal (offer/answer), emit it to the server
      peer.on('signal', (signal) => {
        console.log("Sending signal to server:", signal);
        socketRef.current?.emit('signal', signal, section.roomId ?? "random");
      });

      // When receiving a remote stream, add it to the remoteStream state
      peer.on('stream', (remoteStream: MediaStream) => {
        console.log("Received remote stream:", remoteStream);
        setRemoteStream((prevStream) => {
          const updatedStream = new MediaStream(prevStream);
          remoteStream.getTracks().forEach(track => updatedStream.addTrack(track));
          return updatedStream;
        });
      });

      console.log("Joining room:", section.roomId ?? "random");

      socketRef.current?.emit('join-room', section.roomId ?? "random");
      setHasJoined(true);

    } catch (error) {
      console.error('Failed to join the room:', error);
    }
  }, [connectSocket, role, section]);

  const handleEndCall = useCallback(() => {
    if (peerRef.current) {
      peerRef.current.destroy();
      peerRef.current = null;
    }
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
      setLocalStream(null);
    }
    if (remoteStream) {
      remoteStream.getTracks().forEach(track => track.stop());
      setRemoteStream(new MediaStream());
    }

    if (socketRef.current) {
      socketRef.current.emit('leave-room', section.roomId ?? "random");
      socketRef.current.disconnect();
      socketRef.current = null;
    }

    setHasJoined(false);
  }, [localStream, remoteStream, section]);

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
