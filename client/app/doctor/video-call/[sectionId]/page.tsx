'use client'

import { useParams } from 'next/navigation';
import JoinPage from './Join-page';
import VideoChat from '@/components/page-components/video/VideoChat';
import { useGetSectionByIdDoctor } from '@/lib/hooks/video/useDoctor';
import { useVideoCall } from '@/lib/hooks/useVideoCall';

export default function DoctorVideoCallPage() {
  const { sectionId } = useParams();
  const { data, isLoading } = useGetSectionByIdDoctor(sectionId as string);
  const section = data?.section;

  const {
    hasJoined,
    localStream,
    remoteStream,
    handleJoin,
    handleEndCall,
    isMuted,
    isVideoOff,
    toggleMute,
    toggleVideo
  } = useVideoCall(section, 'doctor');

  if (isLoading) return <div className="flex items-center justify-center h-screen">Loading...</div>;

  if (!hasJoined) {
    return <JoinPage handleStart={handleJoin} section={section!} />;
  }

  return (
    <VideoChat
      isMuted={isMuted}
      isVideoOff={isVideoOff}
      toggleMute={toggleMute}
      toggleVideo={toggleVideo}
      localStream={localStream}
      remoteStream={remoteStream}
      handleEndCall={handleEndCall}
      isDoctor={true}
      selfAvatar={section?.doctorProfile!}
      remoteAvatar={section?.patientProfile!}
    />
  );
}
