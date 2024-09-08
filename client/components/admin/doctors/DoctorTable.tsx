'use client'

import Image from "next/image";
import { ListFilter, MoreHorizontal, PlusCircle, Search } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {DoctorList} from '@/constants'
import { useState } from "react";
import AddDoctorModel from "@/components/models/admin/AddDoctorModel";



export default function DoctorsPage() {
    const [isAddModelOpen,setAddModelOpen] = useState(false)
  return (
    <main className="flex-1 space-y-4 p-4 md:p-6">
      <div className="flex min-h-screen w-full flex-col bg-background">
        {/* <Tabs defaultValue="all" className="space-y-4"> */}
          <div className="flex items-center justify-between">
            {/* <TabsList>
              <TabsTrigger value="all">All Doctors</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="on-leave">On Leave</TabsTrigger>
              <TabsTrigger value="inactive">Inactive</TabsTrigger>
            </TabsList> */}
            <div className="ml-auto flex items-center gap-2">
              {/* <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8">
                    <ListFilter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[150px]">
                  <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem checked>Active</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>On Leave</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Inactive</DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu> */}
              <Button size="sm" className="h-8" onClick={()=>setAddModelOpen(!isAddModelOpen)}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Doctor
              </Button>
            </div>
          </div>
          {/* <TabsContent value="all" className="space-y-4"> */}
            <Card>
              <CardHeader>
                <CardTitle>All Doctors</CardTitle>
                <CardDescription>
                  A list of all doctors including their status, specialty, and number of patients.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[80px]">Image</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Specialty</TableHead>
                      <TableHead>Patients</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {DoctorList.map((doctor) => (
                      <TableRow key={doctor._id}>
                        <TableCell>
                          <Image
                            src={doctor.image}
                            alt={doctor.name}
                            width={64}
                            height={64}
                            className="rounded-full object-cover"
                          />
                        </TableCell>
                        <TableCell className="font-medium">{doctor.name}</TableCell>
                        <TableCell>
                          <Badge
                            variant={"default"}
                          >
                            {doctor.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{doctor.specialty}</TableCell>
                        <TableCell>{doctor.patients}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>View Profile</DropdownMenuItem>
                              <DropdownMenuItem>Edit Details</DropdownMenuItem>
                              <DropdownMenuItem>Manage Schedule</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">Deactivate</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Showing 5 of 10 doctors</p>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </CardFooter>
            </Card>
          {/* </TabsContent> */}
        {/* </Tabs> */}
      </div>
      <AddDoctorModel isOpen={isAddModelOpen} setIsOpen={setAddModelOpen} />
    </main>
  );
}