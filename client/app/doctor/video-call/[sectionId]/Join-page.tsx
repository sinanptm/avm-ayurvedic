'use client'

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { VideoIcon, InfoIcon } from "lucide-react"
import { ButtonV2 } from "@/components/button/ButtonV2"
import { IVideoSection } from "@/types/entities"
import Link from "next/link"
import { notFound } from "next/navigation"

export default function VideoCallPage({ handleStart, section }: { handleStart: () => void, section: IVideoSection }) {
  const [canStartMeeting, setCanStartMeeting] = useState(true)

  useEffect(() => {
    const now = new Date()
      if (section) {
          const checkMeetingTime = () => {
              const meetingTime = new Date(section.startTime!)
              const timeDiff = meetingTime.getTime() - now.getTime()
              const minutesDiff = Math.floor(timeDiff / (1000 * 60))
              setCanStartMeeting(minutesDiff <= 10 && minutesDiff >= 0)
          }

          if (section.startTime && section.startTime < new Date(now.getTime() - 1000 * 60 * 60)) {
            setCanStartMeeting(true)
          } else {
            notFound()
          }

          checkMeetingTime()
          const timer = setInterval(checkMeetingTime, 60000)

          return () => clearInterval(timer)
      }else{
        notFound()
      }

  }, [section])

  return (
    <Card className="flex flex-col items-center justify-center p-8 bg-gray-900 text-white">
      <VideoIcon className="w-24 h-24 mb-8 text-blue-500" />
      <h1 className="text-4xl font-bold mb-6 text-center">Video Call</h1>
      <ButtonV2
        onClick={handleStart}
        variant={'gooeyLeft'}
        size="lg"
        className={`mb-4 ${canStartMeeting
          ? "bg-blue-500 hover:bg-blue-600"
          : "bg-gray-500 cursor-not-allowed"
          }`}
        disabled={!canStartMeeting}
      >
        {canStartMeeting ? "Start Meeting" : "Meeting Not Ready"}
      </ButtonV2>
      <ButtonV2
        onClick={() => { }}
        variant="gooeyLeft"
        size="sm"
        className="text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white"
      >
        <InfoIcon className="mr-2 h-4 w-4" />
        <Link href={`/doctor/appointments/${section?.appointmentId}`}>
          View Appointment Details
        </Link>
      </ButtonV2>
      {!canStartMeeting && section && (
        <p className="mt-4 text-sm text-gray-400">
          Meeting will be available 10 minutes before the scheduled time.
        </p>
      )}
    </Card>
  )
}