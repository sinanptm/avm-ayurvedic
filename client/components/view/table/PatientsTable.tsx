"use client";

import { useState, useMemo, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetPatientsAdmin } from "@/lib/hooks/admin/useAdminPatients";
import Pagination from "@/components/navigation/Pagination";
import { IPatient } from "@/types/entities";
import AdminPatientProfileModel from "@/components/models/admin/PatientProfileModel";
import { useRouter } from "next/navigation";
import TableSkeleton from "@/components/skeletons/TableSkelton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ButtonColorVariant, ButtonV2 } from "@/components/button/ButtonV2";

type Props = {
   page: number;
};

export default function PatientsTable({ page }: Props) {
   const [currentPage, setCurrentPage] = useState(page);
   const [isModelOpen, setModelOpen] = useState(false);
   const [selectedPatient, setSelectedPatient] = useState<IPatient | null>(null);
   const router = useRouter();
   const limit = 7;

   const { data, isLoading, refetch } = useGetPatientsAdmin(currentPage - 1, limit);

   const patients = useMemo(() => data?.items || [], [data]);

   const columns = useMemo(
      () => [
         { name: "Image", width: "w-[80px]" },
         { name: "Name", width: "" },
         { name: "Email", width: "" },
         { name: "Phone", width: "" },
         { name: "Blood Group", width: "" },
         { name: "Actions", width: "text-right pr-10" },
      ],
      []
   );

   const handlePageChange = useCallback(
      (pageIndex: number) => {
         if (pageIndex > (data?.totalPages || 0) || pageIndex < 1) return;
         setCurrentPage(pageIndex);
         router.push(`/admin/patients?page=${pageIndex}`);
         refetch();
      },
      [data?.totalPages, refetch, router]
   );

   const handleViewProfile = useCallback((patient: IPatient) => {
      setSelectedPatient(patient);
      setModelOpen(true);
   }, []);

   return (
      <main className="flex-1 space-y-1 px-4 md:px-8">
         <div className="flex min-h-screen w-full flex-col">
            {isLoading ? (
               <TableSkeleton
                  columns={columns}
                  showHeader={false}
                  headerDescription="A list of all patients including their details."
                  headerTitle="All Patients"
                  rows={limit}
               />
            ) : (
               <>
                  <Card className="bg-card text-card-foreground">
                     <CardHeader>
                        <CardTitle>All Patients</CardTitle>
                        <CardDescription>A list of all patients including their details.</CardDescription>
                     </CardHeader>
                     <CardContent>
                        <div className="overflow-x-auto">
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
                                 {patients.length ? (
                                    patients.map((patient) => (
                                       <TableRow key={patient._id}>
                                          <TableCell>
                                             <div
                                                className={`relative w-13 h-13 rounded-full ${patient.isBlocked
                                                   ? "border-4 border-destructive"
                                                   : "border-4 border-primary"
                                                   }`}
                                             >
                                                <Avatar className="w-full h-full">
                                                   <AvatarImage
                                                      src={patient.profile || "/assets/icons/circle-user.svg"}
                                                      alt={patient.name || "Patient"}
                                                   />
                                                   <AvatarFallback>
                                                      {(patient.name || "P").charAt(0)}
                                                   </AvatarFallback>
                                                </Avatar>
                                             </div>
                                          </TableCell>
                                          <TableCell className="font-medium">{patient.name}</TableCell>
                                          <TableCell>{patient.email}</TableCell>
                                          <TableCell>{patient.phone}</TableCell>
                                          <TableCell>{patient.bloodGroup}</TableCell>
                                          <TableCell className="text-right">
                                             <ButtonV2
                                                size="sm"
                                                variant="linkHover2"
                                                color={"link" as ButtonColorVariant}
                                                onClick={() => handleViewProfile(patient)}
                                             >
                                                View Profile
                                             </ButtonV2>
                                          </TableCell>
                                       </TableRow>
                                    ))
                                 ) : (
                                    <TableRow>
                                       <TableCell colSpan={6} className="text-center">
                                          No Patients found.
                                       </TableCell>
                                    </TableRow>
                                 )}
                              </TableBody>
                           </Table>
                        </div>
                     </CardContent>
                  </Card>
                  <Pagination
                     currentPage={currentPage}
                     handlePageChange={handlePageChange}
                     totalPages={data?.totalPages || 0}
                     className="mt-11"
                     hasNextPage={data?.hasNextPage || false}
                     hasPrevPage={data?.hasPreviousPage || false}
                  />
               </>
            )}
         </div>
         {selectedPatient && (
            <AdminPatientProfileModel
               open={isModelOpen}
               setOpen={setModelOpen}
               patient={selectedPatient}
               refetch={refetch}
            />
         )}
      </main>
   );
}
