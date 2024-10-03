import { IVideoSection } from "@/types/entities"
import { Video, Clock, InfoIcon } from "lucide-react"
import { notFound } from "next/navigation"
import { useEffect, useState } from "react"
import { format } from "date-fns"
import { ButtonV2 } from "@/components/button/ButtonV2"
import Link from "next/link"

interface JoinPageProps {
  onJoin: () => void
  section: IVideoSection
}

export default function JoinPage({ onJoin, section }: JoinPageProps) {
  const [canStartMeeting, setCanStartMeeting] = useState(true)
  const [timeRemaining, setTimeRemaining] = useState<string | null>(null)

  useEffect(() => {
    if (section) {
      const now = new Date()
      const checkMeetingTime = () => {
        const meetingTime = new Date(section.startTime!)
        const timeDiff = meetingTime.getTime() - now.getTime()
        const minutesDiff = Math.floor(timeDiff / (1000 * 60))
        setCanStartMeeting(minutesDiff <= 10 && minutesDiff >= 0)
        
        if (minutesDiff > 10) {
          const hours = Math.floor(minutesDiff / 60)
          const minutes = minutesDiff % 60
          setTimeRemaining(`${hours}h ${minutes}m`)
        } else {
          setTimeRemaining(null)
        }
      }

      if (section.startTime && section.startTime < new Date(now.getTime() - 1000 * 60 * 60)) {
        notFound()
      } else {
        setCanStartMeeting(true)
      }

      checkMeetingTime()
      const timer = setInterval(checkMeetingTime, 60000)

      return () => clearInterval(timer)
    } else {
      notFound()
    }
  }, [section])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="p-8">
          <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 rounded-full bg-gray-700">
            <Video className="w-10 h-10 text-green-500" />
          </div>
          {canStartMeeting ? (
            <>
              <h1 className="text-3xl font-bold text-center mb-4">Your Video Call is Ready</h1>
              <p className="text-center text-gray-400 mb-8">
                Click below to enter the meeting room and connect with your doctor.
              </p>
              <ButtonV2
                onClick={onJoin}
                size="lg"
                variant="expandIcon"
                iconPlacement="right"
                Icon={Video}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-md transition duration-300 ease-in-out transform hover:scale-105 mb-4"
              >
                Join Now
              </ButtonV2>
            </>
          ) : (
            <>
              <h1 className="text-3xl font-bold text-center mb-4">Meeting Starting Soon</h1>
              <p className="text-center text-gray-400 mb-4">
                The meeting will be available 10 minutes before the scheduled time.
              </p>
              <div className="flex items-center justify-center space-x-2 mb-6">
                <Clock className="w-5 h-5 text-blue-500" />
                <span className="text-lg font-semibold">
                  {format(section.startTime!, 'PPPp')}
                </span>
              </div>
              {timeRemaining && (
                <div className="text-center text-2xl font-bold text-blue-500 mb-6">
                  {timeRemaining}
                </div>
              )}
              <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden mb-6">
                <div
                  className="bg-blue-500 h-full rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${canStartMeeting ? 100 : 0}%` }}
                ></div>
              </div>
            </>
          )}
           <Link 
            href={`/doctor/appointments/${section?.appointmentId}`}
            className="block w-full"
          >
            <ButtonV2
              variant="gooeyLeft"
              size="sm"
              className="w-full text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white transition-colors duration-300"
            >
              <InfoIcon className="mr-2 h-4 w-4" />
              View Appointment Details
            </ButtonV2>
          </Link>
        </div>
      </div>
    </div>
  )
}