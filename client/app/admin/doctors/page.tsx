import DoctorTable from "@/components/table/DoctorsTable";
import { Metadata } from "next";

export const metadata:Metadata = {
  title:"Doctors"
}

const DoctorsPage = () => {
   return <DoctorTable />;
};

export default DoctorsPage;
