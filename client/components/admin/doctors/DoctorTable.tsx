'use client'

import Image from "next/image";
import { PlusCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
import AddDoctorModel from "@/components/models/admin/AddDoctorModel";
import { useGetDoctorsAdmin } from "@/lib/hooks/admin/useAdminDoctor";
import { getDefault } from "@/lib/utils";



export default function DoctorsPage() {
  const [isAddModelOpen, setAddModelOpen] = useState(false);
  const { data, isLoading } = useGetDoctorsAdmin(0, 10);

  const doctors = data?.items || [];  

  return (
    <main className="flex-1 space-y-4 p-4 md:p-6">
      <div className="flex min-h-screen w-full flex-col bg-background">
        <div className="flex items-center justify-between">
          <div className="ml-auto flex items-center gap-2">
            <Button size="sm" className="h-8" onClick={() => setAddModelOpen(!isAddModelOpen)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Doctor
            </Button>
          </div>
        </div>
        
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
                          alt={getDefault(doctor.name, 'No Given')}
                          width={64}
                          height={64}
                          className="rounded-full object-cover"
                        />
                      </TableCell>
                      <TableCell className="font-medium">{getDefault(doctor.name, 'Unknown Name')}</TableCell>
                      <TableCell>{getDefault(doctor.phone, 'No phone')}</TableCell>
                      <TableCell>{getDefault(doctor.email, 'No email')}</TableCell>
                      <TableCell>
                        <Badge variant="default">
                          {getDefault(doctor.isVerified ? "Verified" : "Not Verified", 'Unknown')}
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
      <AddDoctorModel isOpen={isAddModelOpen} setIsOpen={setAddModelOpen} />
    </main>
  );
}
