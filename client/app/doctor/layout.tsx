import { ReactNode, FC } from "react";
import { Metadata } from "next";
import Layout from "@/components/doctor/Layout";

interface AdminLayoutWrapperProps {
   children: ReactNode;
   signin: ReactNode;
}

export const metadata: Metadata = {
   title: {
      template: "Doctor | %s",
      default: "Doctor Dashboard"
   },
};
const AdminLayoutWrapper: FC<AdminLayoutWrapperProps> = ({ children, signin }) => {
   return <Layout signin={signin}>{children}</Layout>;
};

export default AdminLayoutWrapper;
