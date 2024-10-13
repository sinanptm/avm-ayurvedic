import { ReactNode, FC } from "react";
import { Metadata } from "next";
import Layout from "@/components/layout/DoctorLayout";
import { metadata as rootMeta } from "@/app/layout";

interface AdminLayoutWrapperProps {
   children: ReactNode;
   auth: ReactNode;
}

export const metadata: Metadata = {
   ...rootMeta,
   title: {
      template: "%s | Doctor Dashboard | AVM Ayurvedic",
      default: "Doctor Dashboard - Manage Appointments and Consultations | AVM Ayurvedic",
   },
};
const AdminLayoutWrapper: FC<AdminLayoutWrapperProps> = ({ children, auth }) => {
   return <Layout auth={auth}>{children}</Layout>;
};

export default AdminLayoutWrapper;
