import UserVideo from './UserVideo'
import ControlPanel from './ControlPanel'
import { useEffect, useState } from 'react';

interface VideoChatProps {
  localStream: MediaStream | null;
  handleEndCall: () => void;
  isCalling: boolean;
}

export default function VideoChat({ localStream, handleEndCall, isCalling }: VideoChatProps) {
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null)

  // In a real WebRTC implementation, you would set up peer connection here
  useEffect(() => {
    // Simulating a remote stream after a delay
    const timer = setTimeout(() => {
      setRemoteStream(new MediaStream())
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative flex flex-col h-full">
      <div className="flex-grow">
        <UserVideo stream={remoteStream} isSelf={false} fullScreen />
        <div className="absolute bottom-20 right-4 w-1/4 max-w-xs">
          <UserVideo stream={localStream} isSelf={true} />
        </div>
      </div>
      {isCalling && <ControlPanel onEndCall={handleEndCall} />}
    </div>
  )
}