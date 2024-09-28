'use client'

import { useState, useEffect, useRef } from 'react'
import { Mic, MicOff, Video, VideoOff, PhoneOff } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface VideoChatProps {
  localStream: MediaStream | null
  remoteStream: MediaStream | null
  handleEndCall: () => void
  isDoctor: boolean
  selfAvatar: string
  remoteAvatar: string
}

export default function VideoChat({
  localStream,
  remoteStream,
  handleEndCall,
  isDoctor,
  selfAvatar,
  remoteAvatar
}: VideoChatProps) {
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const localVideoRef = useRef<HTMLVideoElement>(null)
  const remoteVideoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream
    }
  }, [localStream])

  useEffect(() => {
    if (remoteVideoRef.current && remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream
    }
  }, [remoteStream])

  const toggleMute = () => {
    if (localStream) {
      localStream.getAudioTracks().forEach(track => track.enabled = !track.enabled)
      setIsMuted(!isMuted)
    }
  }

  const toggleVideo = () => {
    if (localStream) {
      localStream.getVideoTracks().forEach(track => track.enabled = !track.enabled)
      setIsVideoOff(!isVideoOff)
    }
  }

  const toggleControls = () => {
    setShowControls(!showControls)
  }

  return (
    <div className="relative w-full h-screen bg-black" onClick={toggleControls}>
      <div className="absolute inset-0">
        {remoteStream ? (
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Avatar className="w-32 h-32">
              <AvatarImage src={remoteAvatar} alt="Remote user" />
              <AvatarFallback>{isDoctor ? 'P' : 'D'}</AvatarFallback>
            </Avatar>
          </div>
        )}
      </div>
      <div className="absolute top-4 right-4 w-32 h-24 overflow-hidden rounded-lg shadow-lg">
        {localStream ? (
          <video
            ref={localVideoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-800">
            <Avatar className="w-12 h-12">
              <AvatarImage src={selfAvatar} alt="You" />
              <AvatarFallback>{isDoctor ? 'D' : 'P'}</AvatarFallback>
            </Avatar>
          </div>
        )}
      </div>
      {showControls && (
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
          <div className="flex justify-center space-x-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={toggleMute}
                    variant={isMuted ? "destructive" : "secondary"}
                    size="icon"
                    className="rounded-full"
                  >
                    {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isMuted ? 'Unmute' : 'Mute'}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={toggleVideo}
                    variant={isVideoOff ? "destructive" : "secondary"}
                    size="icon"
                    className="rounded-full"
                  >
                    {isVideoOff ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isVideoOff ? 'Turn on video' : 'Turn off video'}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={handleEndCall}
                    variant="destructive"
                    size="icon"
                    className="rounded-full"
                  >
                    <PhoneOff className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>End call</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      )}
    </div>
  )
}