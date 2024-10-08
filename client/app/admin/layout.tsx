import { ReactNode, FC } from "react";
import { Metadata } from "next";
import Layout from "@/components/layout/AdminLayout";

interface AdminLayoutWrapperProps {
   children: ReactNode;
   signin: ReactNode;
}

export const metadata: Metadata = {
   title: {
      template: "%s | Admin",
      default: "Admin Dashboard - Manage Hospital Operations | AVM Ayurvedic",
   },
   description: "Admin Dashboard for managing AVM Ayurvedic Hospital operations, including doctor management, patient management, and appointment tracking.",
   keywords: [
      "admin dashboard",
      "hospital management",
      "AVM Ayurvedic admin",
      "appointment tracking",
      "manage doctors",
      "manage patients",
      "Ayurveda hospital",
      "admin portal",
      "hospital operations"
   ],
};

const AdminLayoutWrapper: FC<AdminLayoutWrapperProps> = ({ children, signin }) => {
   return <Layout auth={signin}>{children}</Layout>;
};

export default AdminLayoutWrapper;
