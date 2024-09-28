'use client'
import VideoChat from '@/components/page-components/video/VideoChat';
import { useGetSectionByIdDoctor } from '@/lib/hooks/video/useDoctor';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const VideoCallPage = () => {
    const { sectionId } = useParams();
    const [isCalling, setIsCalling] = useState(false);
    const [localStream, setLocalStream] = useState<MediaStream | null>(null);
    const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
    const { data, isLoading } = useGetSectionByIdDoctor(sectionId as string);
    const section = data?.section
    useEffect(() => {
        const timer = setTimeout(() => {
            setRemoteStream(new MediaStream());
        }, 2000);

        return () => clearTimeout(timer);
    }, [sectionId]);

    const handleStartCall = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            setLocalStream(stream);
            setIsCalling(true);
        } catch (error) {
            console.error('Error accessing media devices:', error);
        }
    };

    const handleEndCall = () => {
        if (localStream) {
            localStream.getTracks().forEach(track => track.stop());
        }
        setLocalStream(null);
        setRemoteStream(null);
        setIsCalling(false);
    };

    if (isLoading) return <div>Loading...</div>; 

    return (
        <VideoChat
          localStream={localStream}
          remoteStream={remoteStream}
          handleEndCall={handleEndCall}
          isCalling={isCalling}
          isDoctor={true} 
          selfAvatar={section?.doctorProfile!}
          remoteAvatar={section?.patientProfile!}
        />
    );
}

export default VideoCallPage;
