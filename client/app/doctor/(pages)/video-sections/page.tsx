import VideoSectionsTable from "@/components/view/table/DoctorVideoSectionsTable";
import { Metadata } from "next";

export const metadata: Metadata = {
   title: "Video Sections",
   keywords: ["video call", "video sections", "doctor dashboard", "ayurvedic"],
};

const Page = () => {
   return <VideoSectionsTable />;
};

export default Page;
