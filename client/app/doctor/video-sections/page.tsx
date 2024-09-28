'use client'

import VideoSectionsTable from '@/components/view/table/DoctorVideoSectionsTable';
import { useGetAllSectionsDoctor } from '@/lib/hooks/video/useDoctor';

const Page = () => {
    const { data: sections, isLoading } = useGetAllSectionsDoctor();

    return (
        <VideoSectionsTable sections={sections!} isLoading={isLoading} />
    );
};

export default Page;
