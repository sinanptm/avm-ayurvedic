import { Button } from "@/components/ui/button"
import { IVideoSection } from "@/types/entities";
import { Video } from "lucide-react"

interface JoinPageProps {
  onJoin: () => void;
  section:IVideoSection
}

export default function JoinPage({ onJoin , section}: JoinPageProps) {
   // useEffect(() => {
    //     if (section) {
    //         const checkMeetingTime = () => {
    //             const now = new Date()
    //             const meetingTime = new Date(section.startTime!)
    //             const timeDiff = meetingTime.getTime() - now.getTime()
    //             const minutesDiff = Math.floor(timeDiff / (1000 * 60))
    //             setCanStartMeeting(minutesDiff <= 10 && minutesDiff >= 0)
    //         }

    //         checkMeetingTime()
    //         const timer = setInterval(checkMeetingTime, 60000)

    //         return () => clearInterval(timer)
    //     }
    // }, [section])


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Welcome to Your Video Call</h1>
        <p className="text-xl text-gray-400">Click the button below to join the room</p>
      </div>
      <Button onClick={onJoin} size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
        <Video className="mr-2 h-5 w-5" />
        Join Video Call
      </Button>
    </div>
  )
}