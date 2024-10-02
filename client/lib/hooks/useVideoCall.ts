import { useState, useCallback, useRef } from 'react';
import Peer from 'simple-peer';
import { Socket } from 'socket.io-client';
import connectSocketIO from '@/lib/socket.io/connectSocketIO';
import { toast } from '@/components/ui/use-toast';
import config from '@/config/webRTCStuntServer';

export const useVideoCall = (section: any, role: 'patient' | 'doctor') => {
  const [hasJoined, setHasJoined] = useState(false);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream>(new MediaStream());
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const peerRef = useRef<Peer.Instance | null>(null);
  const socketRef = useRef<Socket | null>(null);

  const connectSocket = useCallback(() => {
    const socket = connectSocketIO({ namespace: 'video', role: role });
    socketRef.current = socket;

    socket.on('signal', (signalData: any) => {
      console.log('signal ', signalData);
      
      if (peerRef.current) {
        peerRef.current.signal(signalData);
      }
    });

    socket.on('leave-room', () => {
      if(role === 'doctor'){
        toast({
          title: 'Patient has left the room',
          variant: 'destructive',
          description: 'Patient has left the room. you can end the call now or wait for the patient to join again'
        });
      }
      else{
        toast({
          title: 'Doctor has left the room',
          variant: 'destructive',
          description: 'Doctor has left the room. you can end the call now or wait for the doctor to join again',
        });
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
      connectSocket();

      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setLocalStream(stream);

      const peer = new Peer({
        initiator: true,  
        stream,
        trickle: false, 
        // config
      });

      peerRef.current = peer;
      

      peer.on('signal', (signal) => {
        socketRef.current?.emit('signal', signal, section.roomId ?? "random");
      });

      peer.on('error', (err) => {
        if(err.message.includes("User-Initiated Abort")){
          console.log('user left the room')
        }
        else{
          console.error('Peer connection error:', err)
        }
      });
      
      peer.on('stream', (remoteStream: MediaStream) => {
        setRemoteStream((prevStream) => {
          const updatedStream = new MediaStream(prevStream);
          remoteStream.getTracks().forEach(track => updatedStream.addTrack(track));
          return updatedStream;
        });
      });


      socketRef.current?.emit('join-room', section.roomId ?? "random");
      setHasJoined(true);

    } catch (error) {
      console.error('Failed to join the room:', error);
    }
  }, [connectSocket, section]);

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
