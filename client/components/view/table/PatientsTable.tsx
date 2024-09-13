"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetPatientsAdmin } from "@/lib/hooks/admin/useAdminPatients";
import Pagination from "@/components/navigation/Pagination";
import { IPatient } from "@/types";
import AdminPatientProfileModel from "@/components/models/admin/PatientProfileModel";
import { useRouter } from "next/navigation";
import TableSkeleton from "@/components/skeletons/TableSkelton";

type Props = {
   page: number;
};

export default function PatientsTable({ page }: Props) {
   const [currentPage, setCurrentPage] = useState(page);
   const [isModelOpen, setModelOpen] = useState(false);
   const [selectedPatient, setSelectedPatient] = useState({});
   const router = useRouter();
   const { data, isLoading, refetch } = useGetPatientsAdmin(currentPage, 7);
   const columns = [
      { name: "Image", width: "w-[80px]" },
      { name: "Name", width: "" },
      { name: "Email", width: "" },
      { name: "Phone", width: "" },
      { name: "Blood Group", width: "" },
      { name: "Actions", width: "text-right pr-10" },
   ];

   const patients = data?.items!;

   const handlePageChange = (pageIndex: number) => {
      setCurrentPage(pageIndex);
      router.push(`/admin/patients?page=${pageIndex}`);
      refetch();
   };

   const handleViewProfile = (patient: IPatient) => {
      setSelectedPatient(patient);
      setModelOpen(true);
   };

   return (
      <main className="flex-1 space-y-1 p-x-4 md:p-x-8">
         <div className="flex min-h-screen w-full flex-col">
            {isLoading ? (
               <TableSkeleton
                  columns={columns}
                  headerDescription="A list of all patients including their details."
                  headerTitle="All Patients"
                  rows={7}
               />
            ) : (
               <>
                  <Card className="bg-card text-card-foreground">
                     <CardHeader>
                        <CardTitle>All Patients</CardTitle>
                        <CardDescription>A list of all patients including their details.</CardDescription>
                     </CardHeader>
                     <CardContent>
                        <Table>
                           <TableHeader>
                              <TableRow>
                                 {columns.map((column, i) => (
                                    <TableHead key={i} className={column.width}>
                                       {column.name}
                                    </TableHead>
                                 ))}
                              </TableRow>
                           </TableHeader>
                           <TableBody>
                              {patients.length >= 1 ? (
                                 patients.map((patient) => (
                                    <TableRow key={patient._id}>
                                       <TableCell>
                                          <div
                                             className={`relative w-16 h-16 rounded-full ${patient.isBlocked
                                                ? "border-4 border-destructive"
                                                : "border-4 border-primary"
                                                }`}
                                          >
                                             <Image
                                                src={patient.profile || "/placeholder.svg?height=64&width=64"}
                                                alt={patient.name || "Profile"}
                                                width={64}
                                                height={64}
                                                className="rounded-full object-cover"
                                             />
                                          </div>
                                       </TableCell>
                                       <TableCell className="font-medium">{patient.name}</TableCell>
                                       <TableCell>{patient.email}</TableCell>
                                       <TableCell>{patient.phone}</TableCell>
                                       <TableCell>{patient.bloodGroup}</TableCell>
                                       <TableCell className="text-right">
                                          <Button variant="link" size="sm" onClick={() => handleViewProfile(patient)}>
                                             View Profile
                                          </Button>
                                       </TableCell>
                                    </TableRow>
                                 ))
                              ) : (
                                 <TableRow>
                                    <TableCell colSpan={9} className="text-center">
                                       No Patients found.
                                    </TableCell>
                                 </TableRow>
                              )}
                           </TableBody>
                        </Table>
                     </CardContent>
                  </Card>
                  <Pagination
                     currentPage={currentPage}
                     handlePageChange={handlePageChange}
                     totalPages={data?.totalPages!}
                     className="mt-11"
                     hasNextPage={data?.hasNextPage!}
                     hasPrevPage={data?.hasPreviousPage!}
                  />
               </>
            )}
         </div>
         <AdminPatientProfileModel
            open={isModelOpen}
            setOpen={setModelOpen}
            patient={selectedPatient}
            refetch={refetch}
         />
      </main>
   );
}