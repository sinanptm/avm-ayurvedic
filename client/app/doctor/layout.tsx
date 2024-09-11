import { ReactNode, FC } from "react";
import { Metadata } from "next";
import Layout from "@/components/layout/DoctorLayout";

interface AdminLayoutWrapperProps {
   children: ReactNode;
   auth: ReactNode;
}

export const metadata: Metadata = {
   title: {
      template: "Doctor | %s",
      default: "Doctor Dashboard",
   },
};
const AdminLayoutWrapper: FC<AdminLayoutWrapperProps> = ({ children, auth }) => {
   return <Layout auth={auth}>{children}</Layout>;
};

export default AdminLayoutWrapper;
