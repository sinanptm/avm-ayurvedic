"use client";

import { memo, useCallback, useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Pagination from "@/components/navigation/Pagination";
import { useRouter } from "next/navigation";
import TableSkeleton from "@/components/skeletons/TableSkelton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetPatientsDoctor } from "@/lib/hooks/doctor/useDoctor";
import { ButtonV2, ButtonColorVariant } from "@/components/button/ButtonV2";

type Props = {
   page: number;
};

export default function DoctorPatientsTable({ page }: Props) {
   const [currentPage, setCurrentPage] = useState(page);
   const router = useRouter();
   const limit = 7;

   const { data, isLoading, refetch } = useGetPatientsDoctor(currentPage - 1, limit);

   const { items: patients = [], totalPages, hasNextPage, hasPreviousPage } = data || {};

   const columns = useMemo(() => [
      { name: "Image", width: "w-[80px]" },
      { name: "Name", width: "" },
      { name: "Email", width: "" },
      { name: "Phone", width: "" },
      { name: "Blood Group", width: "" },
      { name: "Actions", width: "text-right pr-10" },
   ], []);

   const handlePageChange = useCallback((pageIndex: number) => {
      if (pageIndex > totalPages! || pageIndex < 1) return;
      setCurrentPage(pageIndex);
      router.push(`/doctor/patients?page=${pageIndex}`);
      refetch();
   }, [totalPages, refetch, router]);

   const handleViewProfile = useCallback((patientId: string) => {
      router.push(`/doctor/patients/${patientId}`);
   }, [router]);

   return (
      <main className="flex-1 space-y-1 p-x-4 md:p-x-8">
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
                              {patients.length > 0 ? (
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
                                                <AvatarImage src={patient.profile || "/assets/icons/circle-user.svg"} alt={patient.name} />
                                                <AvatarFallback>{(patient.name || "P").charAt(0)}</AvatarFallback>
                                             </Avatar>
                                          </div>
                                       </TableCell>
                                       <TableCell className="font-medium">{patient.name}</TableCell>
                                       <TableCell>{patient.email}</TableCell>
                                       <TableCell>{patient.phone}</TableCell>
                                       <TableCell>{patient.bloodGroup}</TableCell>
                                       <TableCell className="text-right">
                                          <ButtonV2
                                             variant="linkHover2"
                                             color={"link" as ButtonColorVariant}
                                             size="sm"
                                             onClick={() => handleViewProfile(patient._id!)}
                                          >
                                             Medical History
                                          </ButtonV2>
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
                  {totalPages! > 1 && (
                     <Pagination
                        currentPage={currentPage}
                        handlePageChange={handlePageChange}
                        totalPages={totalPages!}
                        className="mt-11"
                        hasNextPage={hasNextPage!}
                        hasPrevPage={hasPreviousPage!}
                     />
                  )}
               </>
            )}
         </div>
      </main>
   );
}