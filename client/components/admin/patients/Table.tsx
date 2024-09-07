"use client";

import { useState } from "react";
import Image from "next/image";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetPatientsAdmin } from "@/lib/hooks/admin/useAdminPatients";
import PaginationComponent from "@/components/navigation/Pagination";
import { IPatient } from "@/types";
import AdminPatientProfileModel from "@/components/models/admin/AdminPatientProfileModel";
import { useRouter } from "next/navigation";

type Props = {
   page:number;
}

export default function PatientsTable({page}:Props) {
   const [currentPage, setCurrentPage] = useState(page);
   const itemsPerPage = 7;
   const [isModelOpen, setModelOpen] = useState(false);
   const [selectedPatient, setSelectedPatient] = useState({});
   const router = useRouter();
   const { data, isLoading, error, refetch } = useGetPatientsAdmin(currentPage, itemsPerPage);

   if (isLoading) return <h2 className="text-primary">Loading....</h2>;
   if (error) return <h2 className="text-destructive">Error loading patients.</h2>;

   const patients = data?.items!;
   const totalPages = data?.totalPages!;

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
            <Card className="bg-card text-card-foreground">
               <CardHeader>
                  <CardTitle>All Patients</CardTitle>
                  <CardDescription>A list of all patients including their details.</CardDescription>
               </CardHeader>
               <CardContent>
                  <Table>
                     <TableHeader>
                        <TableRow>
                           <TableHead className="w-[80px]">Image</TableHead>
                           {["Name", "Email", "Phone", "Blood Group"].map((head, i) => (
                              <TableHead key={i}>{head}</TableHead>
                           ))}
                           <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                     </TableHeader>
                     <TableBody>
                        {patients.map((patient) => (
                           <TableRow key={patient._id}>
                              <TableCell>
                                 <div
                                    className={`relative w-16 h-16 rounded-full ${
                                       patient.isBlocked ? "border-4 border-destructive" : "border-4 border-primary"
                                    }`}>
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
                        ))}
                     </TableBody>
                  </Table>
               </CardContent>
            </Card>
            <PaginationComponent
               currentPage={currentPage}
               handlePageChange={handlePageChange}
               totalPages={totalPages}
               className="mt-11"
            />
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
