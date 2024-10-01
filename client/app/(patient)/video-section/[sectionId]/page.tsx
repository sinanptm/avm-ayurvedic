'use client'

import { useParams } from 'next/navigation';
import JoinPage from './Join-page';
import VideoChat from '@/components/page-components/video/VideoChat';
import { useGetSectionByIdPatient } from '@/lib/hooks/video/usePatient';
import { useVideoCall } from '@/lib/hooks/useVideoCall';

export default function PatientVideoCallPage() {
  const { sectionId } = useParams();
  const { data, isLoading } = useGetSectionByIdPatient(sectionId as string);
  const section = data?.section;

  const {
    hasJoined,
    localStream,
    remoteStream,
    isMuted,
    handleJoin,
    handleEndCall,
    isVideoOff,
    toggleMute,
    toggleVideo
  } = useVideoCall(section, 'patient');

  if (isLoading) return <div className="flex items-center justify-center h-screen">Loading...</div>;

  if (!hasJoined) {
    return <JoinPage onJoin={handleJoin} section={section!} />;
  }

  return (
    <VideoChat
      isMuted={isMuted}
      isVideoOff={isVideoOff}
      localStream={localStream}
      remoteStream={remoteStream}
      isDoctor={false}
      selfAvatar={section?.patientProfile!}
      remoteAvatar={section?.doctorProfile!}
      toggleMute={toggleMute}
      toggleVideo={toggleVideo}
      handleEndCall={handleEndCall}
    />
  );
}
