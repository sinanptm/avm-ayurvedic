'use client';

import React, { useState } from 'react';
import { ButtonV2 } from './ButtonV2';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge'
import VideoCallModal from '../models/VideoCallModal';

type Appointment = {
  _id: string;
  patientName: string;
  startTime: Date;
};

const VideoButtonPatient = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [upcomingAppointments, setUpcomingAppointments] = useState<Appointment[]>([]);

    const handleClick = () => {
        const dummyAppointments: Appointment[] = [
            { _id: '1', patientName: 'John Doe', startTime: new Date(Date.now() + 30 * 60000) },
            { _id: '2', patientName: 'Jane Smith', startTime: new Date(Date.now() + 45 * 60000) },
        ];
        setUpcomingAppointments(dummyAppointments);
        setIsModalOpen(true);
    }

    return (
        <>
            <ButtonV2 variant="ghost" size="icon" className="relative" onClick={handleClick}>
                <Image
                    src="/assets/icons/utils/video.svg"
                    width={20}
                    height={20}
                    alt="Video Calls"
                    className="text-muted-foreground"
                />
                {upcomingAppointments.length > 0 && (
                    <Badge
                        variant="destructive"
                        className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
                    >
                        {upcomingAppointments.length}
                    </Badge>
                )}
                <span className="sr-only">View Upcoming Video Calls</span>
            </ButtonV2>
            <VideoCallModal
                open={isModalOpen}
                setOpen={setIsModalOpen}
                appointments={upcomingAppointments}
                link="/video-call" 
            />
        </>
    )
}

export default VideoButtonPatient