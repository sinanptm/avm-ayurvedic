"use client";

import { useState } from "react";
import Image from "next/image";
import { ListFilter, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
   DropdownMenu,
   DropdownMenuCheckboxItem,
   DropdownMenuContent,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetPatientsAdmin } from "@/lib/hooks/admin/useAdminPatients";
import PaginationComponent from "@/components/navigation/Pagination";
import { IPatient } from "@/types";
import AdminPatientProfileModel from "@/components/models/admin/AdminPatientProfileModel";

export default function PatientsTable() {
   const [currentPage, setCurrentPage] = useState(0);
   const itemsPerPage = 6;
   const [isModelOpen, setModelOpen] = useState(false);
   const [selectedPatient, setSelectedPatient] = useState({});

   const { data, isLoading, error,refetch } = useGetPatientsAdmin(currentPage, itemsPerPage);

   if (isLoading) return <h2 className="text-primary">Loading....</h2>;
   if (error) return <h2 className="text-destructive">Error loading patients.</h2>;

   const patients = data?.items!;
   const totalPages = data?.totalPages!;

   const handlePageChange = (pageIndex: number) => {
      setCurrentPage(pageIndex);
   };

   const handleViewProfile = (patient: IPatient) => {
      setSelectedPatient(patient);
      setModelOpen(true);
   };

   return (
      <main className="flex-1 space-y-4 p-4 md:p-6">
         <div className="flex min-h-screen w-full flex-col">
            <Tabs defaultValue="all" className="space-y-4">
               <div className="flex items-center justify-between">
                  <TabsList className="bg-background">
                     <TabsTrigger value="all">All Patients</TabsTrigger>
                     <TabsTrigger value="active">Active</TabsTrigger>
                     <TabsTrigger value="blocked">Blocked</TabsTrigger>
                  </TabsList>
                  <div className="ml-auto flex items-center gap-2">
                     <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                           <Button variant="outline" size="sm" className="h-8">
                              <ListFilter className="mr-2 h-4 w-4" />
                              Filter
                           </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                           align="end"
                           className="w-[150px] bg-green-700 bg-opacity-55 border-white cursor-pointer">
                           <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                           <DropdownMenuSeparator />
                           <DropdownMenuCheckboxItem>Active</DropdownMenuCheckboxItem>
                           <DropdownMenuCheckboxItem>On Leave</DropdownMenuCheckboxItem>
                           <DropdownMenuCheckboxItem>Inactive</DropdownMenuCheckboxItem>
                        </DropdownMenuContent>
                     </DropdownMenu>
                     <Button size="sm" className="h-8">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Patient
                     </Button>
                  </div>
               </div>
               <TabsContent value="all" className="space-y-4">
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
                                             patient.isBlocked
                                                ? "border-4 border-destructive"
                                                : "border-4 border-primary"
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
               </TabsContent>
            </Tabs>
            <PaginationComponent
               currentPage={currentPage}
               handlePageChange={handlePageChange}
               totalPages={totalPages}
               className="mt-11"
            />
         </div>
         <AdminPatientProfileModel open={isModelOpen} setOpen={setModelOpen} patient={selectedPatient} refetch={refetch} />
      </main>
   );
}
