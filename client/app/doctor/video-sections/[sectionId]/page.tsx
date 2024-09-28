'use client'

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { VideoIcon, InfoIcon } from "lucide-react"
import { useGetSectionByIdDoctor } from "@/lib/hooks/video/useDoctor"
import { ButtonV2 } from "@/components/button/ButtonV2"

export default function VideoCallPage() {
    const [canStartMeeting, setCanStartMeeting] = useState(true)
    const router = useRouter()
    const { sectionId } = useParams()
    const { data, isLoading } = useGetSectionByIdDoctor(sectionId as string)
    const section = data?.section

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

    const handleStartMeeting = () => {
        router.push(`/doctor/video-call/${sectionId}`)
    }

    const handleViewDetails = () => {
        router.push(`/doctor/appointments/${section?.appointmentId}`)
    }

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <Card className="flex flex-col items-center justify-center p-8 bg-gray-900 text-white">
            <VideoIcon className="w-24 h-24 mb-8 text-blue-500" />
            <h1 className="text-4xl font-bold mb-6 text-center">Video Call</h1>
            <ButtonV2
                onClick={handleStartMeeting}
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
                onClick={handleViewDetails}
                variant="gooeyLeft"
                size="sm"
                className="text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white"
            >
                <InfoIcon className="mr-2 h-4 w-4" /> View Appointment Details
            </ButtonV2>
            {!canStartMeeting && section && (
                <p className="mt-4 text-sm text-gray-400">
                    Meeting will be available 10 minutes before the scheduled time.
                </p>
            )}
        </Card>
    )
}