"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetDoctorsAdmin } from "@/lib/hooks/admin/useAdminDoctor";
import { getDefault } from "@/lib/utils";

export default function DoctorsPage() {
   const { data, isLoading } = useGetDoctorsAdmin(0, 10);

   const doctors = data?.items || [];

   return (
      <main className="flex-1 space-y-4 p-4 md:p-6">
         <div className="flex min-h-screen w-full flex-col bg-background">
            <Card>
               <CardHeader>
                  <CardTitle>All Doctors</CardTitle>
                  <CardDescription>
                     A list of all doctors including their status, specialty, qualifications, and more.
                  </CardDescription>
               </CardHeader>
               <CardContent>
                  <Table>
                     <TableHeader>
                        <TableRow>
                           <TableHead className="w-[80px]">Image</TableHead>
                           <TableHead>Name</TableHead>
                           <TableHead>Phone</TableHead>
                           <TableHead>Email</TableHead>
                           <TableHead>Status</TableHead>
                           <TableHead>Blocked</TableHead>
                           <TableHead className="text-right pr-10">Actions</TableHead>
                        </TableRow>
                     </TableHeader>
                     <TableBody>
                        {doctors.length > 0 ? (
                           doctors.map((doctor) => (
                              <TableRow key={doctor._id}>
                                 <TableCell>
                                    <Image
                                       src={getDefault(doctor.image, "/assets/images/admin.png")}
                                       alt={doctor.name!}
                                       width={64}
                                       height={64}
                                       className="rounded-full object-cover"
                                    />
                                 </TableCell>
                                 <TableCell className="font-medium">
                                    {doctor.name}
                                 </TableCell>
                                 <TableCell>{doctor.phone}</TableCell>
                                 <TableCell>{doctor.email}</TableCell>
                                 <TableCell>
                                    <Badge variant="default">
                                       {doctor.isVerified ? "Verified" : "Not Verified"}
                                    </Badge>
                                 </TableCell>
                                 <TableCell>{doctor.isBlocked ? "Yes" : "No"}</TableCell>
                                 <TableCell className="text-right">
                                    <Button variant="ghost" size="sm">
                                       View Profile
                                    </Button>
                                 </TableCell>
                              </TableRow>
                           ))
                        ) : (
                           <TableRow>
                              <TableCell colSpan={9} className="text-center">
                                 No doctors found.
                              </TableCell>
                           </TableRow>
                        )}
                     </TableBody>
                  </Table>
               </CardContent>
            </Card>
         </div>
      </main>
   );
}
