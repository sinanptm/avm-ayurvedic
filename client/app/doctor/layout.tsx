import { ReactNode, FC } from "react";
import { Metadata } from "next";
import Layout from "@/components/layout/DoctorLayout";

interface AdminLayoutWrapperProps {
   children: ReactNode;
   auth: ReactNode;
}

export const metadata: Metadata = {
   title: {
      template: "%s | Doctor Dashboard | AVM Ayurvedic",
      default: "Doctor Dashboard - Manage Appointments and Consultations | AVM Ayurvedic",
   },
   description: "Access and manage your appointments, video consultations, and patient records efficiently through the Doctor Dashboard at AVM Ayurvedic Hospital.",
   keywords: [
      "doctor dashboard",
      "AVM Ayurvedic doctor portal",
      "manage appointments",
      "patient consultations",
      "video consultations",
      "Ayurveda hospital",
      "doctor appointment management",
      "healthcare dashboard"
   ]
};
const AdminLayoutWrapper: FC<AdminLayoutWrapperProps> = ({ children, auth }) => {
   return <Layout auth={auth}>{children}</Layout>;
};

export default AdminLayoutWrapper;
