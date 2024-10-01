'use client'

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { VideoIcon, InfoIcon, ClockIcon } from "lucide-react"
import { ButtonV2 } from "@/components/button/ButtonV2"
import { IVideoSection } from "@/types/entities"
import Link from "next/link"
import { notFound } from "next/navigation"
import { format } from "date-fns"

export default function VideoCallPage({ handleStart, section }: { handleStart: () => void, section: IVideoSection }) {
  const [canStartMeeting, setCanStartMeeting] = useState(true)
  const [timeRemaining, setTimeRemaining] = useState<string | null>(null)

  useEffect(() => {
    const now = new Date()
    if (section) {
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
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gray-800 text-white shadow-xl rounded-xl overflow-hidden">
        <div className="p-8">
          <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 rounded-full bg-blue-500 bg-opacity-20">
            <VideoIcon className="w-10 h-10 text-blue-500" />
          </div>
          <h1 className="text-3xl font-bold mb-6 text-center">{section?.patientName}&apos;s Video Section</h1>
          {canStartMeeting ? (
            <>
              <ButtonV2
                onClick={handleStart}
                variant="gooeyLeft"
                size="lg"
                className="w-full mb-4 bg-blue-500 hover:bg-blue-600 transition-colors duration-300"
              >
                Start Meeting
              </ButtonV2>
              <p className="text-center text-sm text-gray-400 mb-6">
                Click to begin your video consultation with the patient.
              </p>
            </>
          ) : (
            <>
              <div className="flex items-center justify-center space-x-2 mb-4">
                <ClockIcon className="w-5 h-5 text-blue-500" />
                <span className="text-lg font-semibold">
                  {format(new Date(section.startTime!), "PPPp")}
                </span>
              </div>
              {timeRemaining && (
                <div className="text-center text-2xl font-bold text-blue-500 mb-4">
                  {timeRemaining} until meeting
                </div>
              )}
              <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden mb-6">
                <div
                  className="bg-blue-500 h-full rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${canStartMeeting ? 100 : 0}%` }}
                ></div>
              </div>
              <p className="text-center text-sm text-gray-400 mb-6">
                The meeting will be available 10 minutes before the scheduled time.
              </p>
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
      </Card>
    </div>
  )
}