import { useEffect, useRef } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface UserVideoProps {
  stream: MediaStream | null
  isSelf: boolean
  fullScreen?: boolean
}

export default function UserVideo({ stream, isSelf, fullScreen = false }: UserVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream
    }
  }, [stream])

  const videoClasses = fullScreen
    ? "absolute inset-0 w-full h-full object-cover"
    : "w-full h-full object-cover rounded-lg"

  return (
    <div className={`relative ${fullScreen ? 'h-full' : 'aspect-video'}`}>
      {stream ? (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted={isSelf}
          className={videoClasses}
        />
      ) : (
        <div className={`flex items-center justify-center bg-gray-800 ${videoClasses}`}>
          <Avatar className={fullScreen ? "w-40 h-40" : "w-16 h-16"}>
            <AvatarImage src={isSelf ? "/your-avatar.png" : "/remote-avatar.png"} />
            <AvatarFallback>{isSelf ? "You" : "Peer"}</AvatarFallback>
          </Avatar>
        </div>
      )}
      <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
        {isSelf ? 'You' : 'Remote User'}
      </div>
    </div>
  )
}