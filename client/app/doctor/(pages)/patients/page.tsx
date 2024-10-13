import DoctorPatientsTable from "@/components/view/table/DoctorPatientsTable";
import { Metadata } from "next";

export const metadata: Metadata = {
   title: "Patients",
   description: "Medical records of patient ",
   keywords: "medical record, patients, appointments",
};
const page = ({ searchParams }: { searchParams: { page: number } }) => {
   const page = searchParams.page || 1;
   return <DoctorPatientsTable page={page} />;
};

export default page;
