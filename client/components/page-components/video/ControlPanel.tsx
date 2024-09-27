import { Button } from "@/components/ui/button"
import { Mic, MicOff, Video, VideoOff, PhoneOff } from 'lucide-react'
import { useState } from "react"

interface ControlPanelProps {
  onEndCall: () => void
}

export default function ControlPanel({ onEndCall }: ControlPanelProps) {
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)

  const toggleMute = () => {
    setIsMuted(!isMuted)
    // Here you would actually mute/unmute the WebRTC audio track
  }

  const toggleVideo = () => {
    setIsVideoOff(!isVideoOff)
    // Here you would actually enable/disable the WebRTC video track
  }

  return (
    <div className="bg-gray-800 border-t border-gray-700 p-4">
      <div className="flex justify-center space-x-4 max-w-md mx-auto">
        <Button
          onClick={toggleMute}
          variant={isMuted ? "destructive" : "secondary"}
          size="icon"
          className="rounded-full"
        >
          {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
        </Button>
        <Button
          onClick={toggleVideo}
          variant={isVideoOff ? "destructive" : "secondary"}
          size="icon"
          className="rounded-full"
        >
          {isVideoOff ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
        </Button>
        <Button
          onClick={onEndCall}
          variant="destructive"
          size="icon"
          className="rounded-full"
        >
          <PhoneOff className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}