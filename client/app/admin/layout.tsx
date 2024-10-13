import { ReactNode, FC } from "react";
import { Metadata } from "next";
import Layout from "@/components/layout/AdminLayout";
import { metadata as rootMeta } from "@/app/layout";

interface AdminLayoutWrapperProps {
   children: ReactNode;
   signin: ReactNode;
}

export const metadata: Metadata = {
   ...rootMeta,
   title: {
      template: "%s | Admin",
      default: "Admin Dashboard - Manage Hospital Operations | AVM Ayurvedic",
   },
};

const AdminLayoutWrapper: FC<AdminLayoutWrapperProps> = ({ children, signin }) => {
   return <Layout auth={signin}>{children}</Layout>;
};

export default AdminLayoutWrapper;
