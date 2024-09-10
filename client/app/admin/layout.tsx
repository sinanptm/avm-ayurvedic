import { ReactNode, FC } from "react";
import { Metadata } from "next";
import Layout from "@/components/layout/AdminLayout";

interface AdminLayoutWrapperProps {
   children: ReactNode;
   signin:ReactNode;
}

export const metadata: Metadata = {
   title: {
      template: "Admin | %s",
      default: "Admin Dashboard"
   },
};

const AdminLayoutWrapper: FC<AdminLayoutWrapperProps> = ({ children , signin}) => {
   return <Layout signin={signin}>{children}</Layout>;
};

export default AdminLayoutWrapper;
