'use client'
import VideoSectionsTable from '@/components/view/table/DoctorVideoSectionsTable';
import { useGetAllSectionsDoctor } from '@/lib/hooks/video/useDoctor';
const page = () => {
    const {data:sections,isLoading} = useGetAllSectionsDoctor();
    console.log(JSON.stringify(sections));
  return (
    <VideoSectionsTable sections={sections!} isLoading={isLoading} />
  )
}

export default page