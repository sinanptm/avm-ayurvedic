import UserVideo from './UserVideo';
import ControlPanel from './ControlPanel';
import { IVideoSection } from '@/types/entities';

interface VideoChatProps {
  localStream: MediaStream | null;
  remoteStream: MediaStream | null; 
  handleEndCall: () => void;
  isCalling: boolean;
  isDoctor: boolean;
  selfAvatar:string;
  remoteAvatar:string;
}

export default function VideoChat({ localStream, remoteStream, handleEndCall, isCalling , remoteAvatar, selfAvatar}: VideoChatProps) {
  return (
    <div className="relative flex flex-col h-full">
      <div className="flex-grow">
        <UserVideo stream={remoteStream} isSelf={false} fullScreen avatarUrl={remoteAvatar} />
        <div className="absolute bottom-20 right-4 w-1/4 max-w-xs">
          <UserVideo stream={localStream} isSelf={true} avatarUrl={selfAvatar} />
        </div>
      </div>
      {isCalling && <ControlPanel onEndCall={handleEndCall} />}
    </div>
  );
}
