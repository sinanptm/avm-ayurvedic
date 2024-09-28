'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useGetSectionByIdDoctor } from '@/lib/hooks/video/useDoctor'
import JoinPage from './Join-page'
import VideoChat from '@/components/page-components/video/VideoChat'

export default function VideoCallPage() {
  const { sectionId } = useParams()
  const [hasJoined, setHasJoined] = useState(false)
  const [localStream, setLocalStream] = useState<MediaStream | null>(null)
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null)
  const { data, isLoading } = useGetSectionByIdDoctor(sectionId as string)
  const section = data?.section

  useEffect(() => {
    if (hasJoined) {
      const timer = setTimeout(() => {
        setRemoteStream(new MediaStream())
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [hasJoined, sectionId])

  const handleJoin = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      setLocalStream(stream)
      setHasJoined(true)
    } catch (error) {
      console.error('Error accessing media devices:', error)
    }
  }

  const handleEndCall = () => {
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop())
    }
    setLocalStream(null)
    setRemoteStream(null)
    setHasJoined(false)
  }

  if (isLoading) return <div className="flex items-center justify-center h-screen">Loading...</div>

  if (!hasJoined) {
    return <JoinPage onJoin={handleJoin} section={section!} />
  }

  return (
    <VideoChat
      localStream={localStream}
      remoteStream={remoteStream}
      handleEndCall={handleEndCall}
      isDoctor={true}
      selfAvatar={section?.doctorProfile!}
      remoteAvatar={section?.patientProfile!}
    />
  )
}