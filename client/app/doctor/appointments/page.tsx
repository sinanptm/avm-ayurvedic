import AppointmentTable from "@/components/view/table/DoctorAppointmentTable";
import { Metadata } from "next";

export const metadata: Metadata = {
   title: "Appointments",
};

const Appointments = ({ searchParams }: { searchParams: { page: number } }) => {
   const page = searchParams.page || 0;

   return <AppointmentTable page={page} />;
};

export default Appointments;
