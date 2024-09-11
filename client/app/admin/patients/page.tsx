import PatientsTable from "@/components/table/PatientsTable";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
   title: "Patients",
};

const Page = ({ searchParams }: { searchParams: { page: number } }) => {
   const page = searchParams.page || 0;

   return (
      <main>
         <PatientsTable page={page} />
      </main>
   );
};

export default Page;