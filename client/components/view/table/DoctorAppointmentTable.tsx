"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetAppointmentsDoctor } from "@/lib/hooks/appointment/useAppointmentDoctor";
import { AppointmentStatus } from "@/types";
import TableSkeleton from "@/components/skeletons/TableSkelton";
import Pagination from "@/components/navigation/Pagination";
import AppointmentDetailsModelDoctor from "@/components/models/appointment/AppointmentDetailsDoctorModel";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import GetStatusBadge from "@/components/doctor/appointment/GetStatusBadge";
import { ButtonV2 } from "@/components/common/ButtonV2";

const columns = [
   { name: "Date", width: "w-1/5" },
   { name: "Type", width: "w-1/5" },
   { name: "Reason", width: "w-1/5" },
   { name: "Status", width: "w-1/5" },
   { name: "Actions", width: "w-1/5 text-right pr-10" },
];

type Props = {
   page: number;
};

export default function AppointmentTable({ page }: Props) {
   const [currentPage, setCurrentPage] = useState(page);
   const [isModelOpen, setModelOpen] = useState(false);
   const [appointmentId, setAppointmentId] = useState("");
   const [statusFilter, setStatusFilter] = useState<AppointmentStatus | "all">("all");
   const limit = 7;
   const { data, isLoading, error, refetch } = useGetAppointmentsDoctor(
      currentPage,
      limit,
      statusFilter === "all" ? undefined : statusFilter
   );
   const router = useRouter();

   const appointments = useMemo(() => data?.items || [], [data?.items]);

   const handlePageChange = (pageIndex: number) => {
      setCurrentPage(pageIndex);
      router.replace(`/doctor/appointments?page=${pageIndex}&status=${statusFilter}`);
      refetch();
   };

   const handleViewDetails = (appointmentId: string) => {
      setAppointmentId(appointmentId);
      setModelOpen(true);
      console.log(appointmentId);

   };

   const handleStatusChange = (status: AppointmentStatus | "all") => {
      setStatusFilter(status);
      setCurrentPage(0);
      router.replace(`/doctor/appointments?page=1&status=${status}`);
      refetch();
   };

   if (error) {
      return (
         <div className="flex items-center justify-center h-screen">
            <p className="text-red-500">Error loading appointments. Please try again later.</p>
         </div>
      );
   }

   return (
      <Card>
         <CardHeader>
            <div className="flex justify-between items-center">
               <div>
                  <CardTitle>Appointments</CardTitle>
                  <CardDescription>A list of appointments including date, type, reason, and status.</CardDescription>
               </div>
               <Select
                  value={statusFilter}
                  onValueChange={(value) => handleStatusChange(value as AppointmentStatus | "all")}
               >
                  <SelectTrigger className="w-[180px]">
                     <SelectValue>{statusFilter === "all" ? "Filter by status" : statusFilter}</SelectValue>
                  </SelectTrigger>
                  <SelectContent className="bg-black bg-opacity-75">
                     <SelectItem value="all">All Statuses</SelectItem>
                     {Object.values(AppointmentStatus).map((status) => (
                        <SelectItem key={status} value={status}>
                           {status.charAt(0).toUpperCase() + status.slice(1)}
                        </SelectItem>
                     ))}
                  </SelectContent>
               </Select>
            </div>
         </CardHeader>
         <CardContent>
            {isLoading ? (
               <TableSkeleton
                  columns={columns}
                  rows={limit}
                  showHeader={false}
                  headerTitle="Appointments"
                  headerDescription="A list of appointments including date, type, reason, and status."
               />
            ) : (
               <div className="overflow-x-auto">
                  <Table>
                     <TableHeader>
                        <TableRow>
                           {columns.map((column) => (
                              <TableHead key={column.name} className={column.width}>
                                 {column.name}
                              </TableHead>
                           ))}
                        </TableRow>
                     </TableHeader>
                     <TableBody>
                        {appointments.length >= 1 ? (
                           appointments.map((appointment) => (
                              <TableRow key={appointment._id}>
                                 <TableCell>
                                    {new Date(appointment.appointmentDate!).toLocaleString().split(",")[0]}
                                 </TableCell>
                                 <TableCell>{appointment.appointmentType}</TableCell>
                                 <TableCell>{appointment.reason}</TableCell>
                                 <TableCell>
                                    <GetStatusBadge status={appointment.status!} />
                                 </TableCell>
                                 <TableCell className="text-right">
                                    <ButtonV2
                                       variant="linkHover2"
                                       size="sm"
                                       onClick={() => handleViewDetails(appointment._id!)}
                                       aria-label={`View details of appointment for ${appointment.reason}`}
                                    >
                                       View Details
                                    </ButtonV2>
                                 </TableCell>
                              </TableRow>
                           ))
                        ) : (
                           <TableRow>
                              <TableCell colSpan={5} className="text-center">
                                 No appointments found.
                              </TableCell>
                           </TableRow>
                        )}
                     </TableBody>
                  </Table>
               </div>
            )}
            {data && (
               <Pagination
                  currentPage={currentPage}
                  handlePageChange={handlePageChange}
                  totalPages={data.totalPages}
                  className="mt-4"
                  hasNextPage={data.hasNextPage}
                  hasPrevPage={data.hasPreviousPage}
               />
            )}
         </CardContent>
         <AppointmentDetailsModelDoctor
            appointmentId={appointmentId}
            isOpen={isModelOpen}
            setIsOpen={setModelOpen}
            refetch={refetch}
         />
      </Card>
   );
}
