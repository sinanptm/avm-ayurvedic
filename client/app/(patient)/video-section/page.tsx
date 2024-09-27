'use client'

import { Card } from "@/components/ui/card"
import { VideoIcon, PhoneIcon } from "lucide-react"
import VideoChat from '@/components/page-components/video/VideoChat'
import { ButtonV2 } from '@/components/button/ButtonV2'
import { useState } from "react"

export default function VideoCallPage() {
  const [isCalling, setIsCalling] = useState(false)
  const [localStream, setLocalStream] = useState<MediaStream | null>(null)

  const handleStartCall = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      setLocalStream(stream)
      setIsCalling(true)
      
    } catch (error) {
      console.error('Error accessing media devices:', error)
    }
  }

  const handleEndCall = () => {
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop())
    }
    setLocalStream(null)
    setIsCalling(false)
  }

  return (
    <div className="h-screen flex flex-col bg-gradient-to-b text-white">
      {isCalling ? (
        <VideoChat localStream={localStream} isCalling={isCalling} handleEndCall={handleEndCall} />
      ) : (
        <Card className="flex flex-col items-center justify-center flex-grow bg-transparent border-0 shadow-none">
          <VideoIcon className="w-24 h-24 mb-8 text-blue-500" />
          <h1 className="text-4xl font-bold mb-6 text-center">Start a Video Call</h1>
          <ButtonV2 onClick={handleStartCall} size="lg" className="bg-blue-500 hover:bg-blue-600" variant={'ringHover'}>
            <PhoneIcon className="mr-2 h-5 w-5" /> Start Call
          </ButtonV2>
        </Card>
      )}
    </div>
  )
}