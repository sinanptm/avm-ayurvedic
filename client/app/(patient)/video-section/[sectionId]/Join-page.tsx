import { IVideoSection } from "@/types/entities";
import { Video } from "lucide-react"
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { ButtonV2 } from "@/components/button/ButtonV2";

interface JoinPageProps {
  onJoin: () => void;
  section: IVideoSection
}

export default function JoinPage({ onJoin, section }: JoinPageProps) {
  const [canStartMeeting, setCanStartMeeting] = useState(false);

  useEffect(() => {
    if (section) {
      const now = new Date();
      const checkMeetingTime = () => {
        const meetingTime = new Date(section.startTime!);
        const timeDiff = meetingTime.getTime() - now.getTime();
        const minutesDiff = Math.floor(timeDiff / (1000 * 60));
        setCanStartMeeting(minutesDiff <= 10 && minutesDiff >= 0);
      };

      if (section.startTime && section.startTime < new Date(now.getTime() - 1000 * 60 * 60)) {
        setCanStartMeeting(true)
      } else {
        notFound()
      }

      checkMeetingTime();
      const timer = setInterval(checkMeetingTime, 60000);

      return () => clearInterval(timer);
    } else {
      notFound()
    }
  }, [section]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      {canStartMeeting ? (
        <>
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold mb-6">Your Video Call is Ready</h1>
            <p className="text-lg text-gray-300">
              Click below to enter the meeting room and connect with your doctor.
            </p>
          </div>
          <ButtonV2 onClick={onJoin} size="lg" variant={"expandIcon"} iconPlacement="right" Icon={Video} className="bg-green-600 text-white px-6 py-3">
            Join Now
          </ButtonV2>
        </>
      ) : (
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-6">Meeting Starting Soon</h1>
          <p className="text-lg text-gray-300">
            The meeting will be available 10 minutes before the scheduled time {format(section.startTime!, 'PPPp')}. Please be ready!
          </p>
        </div>
      )}
    </div>
  );
}
