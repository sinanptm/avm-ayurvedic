import DoctorTable from "@/components/admin/doctors/DoctorTable";
import { Metadata } from "next";

const metadata:Metadata = {
  title:"Doctors"
}

const DoctorsPage = () => {
   return <DoctorTable />;
};

export default DoctorsPage;
