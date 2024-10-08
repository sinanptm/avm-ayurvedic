'use client';

import React, { forwardRef, memo, useState } from 'react';
import { ButtonV2 } from './ButtonV2';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import VideoSectionsModel from '@/components/models/VideoSectionsModel';
import { useGetSectionsInOneDayDoctor } from '@/lib/hooks/video/useDoctor';

const VideoSectionButtonDoctor = forwardRef<HTMLButtonElement>((props, ref) => {
    const { data: upcomingSections } = useGetSectionsInOneDayDoctor();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleClick = () => {
        setIsModalOpen(true);
    };

    return (
        <>
            <ButtonV2 variant="ghost" size="icon" ref={ref} className="relative" onClick={handleClick}>
                <Image
                    src="/assets/icons/utils/video.svg"
                    width={20}
                    height={20}
                    alt="Video Calls"
                    className="text-muted-foreground"
                />
                {upcomingSections && upcomingSections!.length > 0 && (
                    <Badge
                        variant="destructive"
                        className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
                    >
                        {upcomingSections!.length}
                    </Badge>
                )}
                <span className="sr-only">View Upcoming Video Calls</span>
            </ButtonV2>
            <VideoSectionsModel
                open={isModalOpen}
                setOpen={setIsModalOpen}
                sections={upcomingSections && upcomingSections.length > 0 ? upcomingSections : []}
                link="/doctor/video-call"
                user="doctor"
            />
        </>
    );
});

VideoSectionButtonDoctor.displayName = 'VideoSectionButtonDoctor';

export default memo(VideoSectionButtonDoctor);
