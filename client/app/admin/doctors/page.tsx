import DoctorTable from "@/components/table/DoctorsTable";
import { Metadata } from "next";

export const metadata: Metadata = {
   title: "Doctors",
};


const Page = ({ searchParams }: { searchParams: { page: number } }) => {
   const page = searchParams.page || 0;

   return <DoctorTable page={page} />;
};

export default Page;
