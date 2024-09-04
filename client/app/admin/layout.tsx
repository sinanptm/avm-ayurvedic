import { ReactNode, FC } from "react";
import { Metadata } from "next";
import Layout from "@/components/admin/dashboard/Layout";

interface AdminLayoutWrapperProps {
   children: ReactNode;
   signin:ReactNode;
}

export const metadata: Metadata = {
   title: "Admin Dashboard",
};

const AdminLayoutWrapper: FC<AdminLayoutWrapperProps> = ({ children , signin}) => {
   return <Layout signin={signin}>{children}</Layout>;
};

export default AdminLayoutWrapper;
