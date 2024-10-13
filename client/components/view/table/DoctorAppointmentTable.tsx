"use client";

import { useState, useMemo, useEffect, useCallback, memo } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetAppointmentsDoctor } from "@/lib/hooks/appointment/useAppointmentDoctor";
import { AppointmentStatus } from "@/types/enum";
import TableSkeleton from "@/components/skeletons/TableSkelton";
import Pagination from "@/components/navigation/Pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import GetStatusBadge from "@/components/page-components/doctor/appointment/GetStatusBadge";
import { ButtonV2 } from "@/components/button/ButtonV2";
import { format } from "date-fns";
import { toast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

type Props = {
   page: number;
};

export default function AppointmentTable({ page }: Props) {
   const [currentPage, setCurrentPage] = useState(page);
   const [statusFilter, setStatusFilter] = useState<AppointmentStatus | "all">("all");
   const limit = 7;
   const router = useRouter();

   const { data, isLoading, error, refetch } = useGetAppointmentsDoctor(
      currentPage - 1,
      limit,
      statusFilter === "all" ? undefined : statusFilter
   );

   const { data: response } = useGetAppointmentsDoctor(0, 100, AppointmentStatus.PENDING);
   const notAcceptedAppointments = response?.items?.length ?? 0;

   const columns = useMemo(
      () => [
         { name: "Date", width: "w-1/5" },
         { name: "Type", width: "w-1/5" },
         { name: "Reason", width: "w-1/5" },
         { name: "Status", width: "w-1/5" },
         { name: "Prescription", width: "w-1/5" },
         { name: "Actions", width: "w-1/5 text-right pr-10" },
      ],
      []
   );

   useEffect(() => {
      if (notAcceptedAppointments > 0) {
         setStatusFilter(AppointmentStatus.PENDING);
         toast({
            title: "Pending Appointments 🚨",
            description: `You have ${notAcceptedAppointments} appointments pending for confirmation.`,
            variant: "destructive",
         });
         router.replace(`/doctor/appointments?page=1&status=${AppointmentStatus.PENDING}`);
      }
   }, [notAcceptedAppointments, router]);

   const appointments = useMemo(() => data?.items || [], [data?.items]);

   const handlePageChange = useCallback(
      (pageIndex: number) => {
         if (pageIndex > data?.totalPages! || pageIndex < 1) return;
         setCurrentPage(pageIndex);
         router.replace(`/doctor/appointments?page=${pageIndex}&status=${statusFilter}`);
         refetch();
      },
      [data?.totalPages, statusFilter, refetch, router]
   );

   const handleViewDetails = useCallback(
      (appointmentId: string) => {
         router.push(`/doctor/appointments/${appointmentId}`);
      },
      [router]
   );

   const handleStatusChange = useCallback(
      (status: AppointmentStatus | "all") => {
         setStatusFilter(status);
         setCurrentPage(1);
         router.replace(`/doctor/appointments?page=1&status=${status}`);
         refetch();
      },
      [refetch, router]
   );

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
                        {appointments.length ? (
                           appointments.map((appointment) => (
                              <TableRow key={appointment._id}>
                                 <TableCell>{format(new Date(appointment.appointmentDate!), "PPPP")}</TableCell>
                                 <TableCell>{appointment.appointmentType}</TableCell>
                                 <TableCell>
                                    <ScrollArea
                                       className={`max-h-16 overflow-y-auto ${appointment.reason?.length! > 30 ? "h-16" : ""}`}
                                    >
                                       {appointment.reason}
                                    </ScrollArea>
                                 </TableCell>
                                 <TableCell>
                                    <GetStatusBadge status={appointment.status!} />
                                 </TableCell>
                                 <TableCell>
                                    <Badge variant={appointment.isPrescriptionAdded ? "success" : "warning"}>
                                       {appointment.isPrescriptionAdded ? "Added" : "Not Added"}
                                    </Badge>
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
                              <TableCell colSpan={6} className="text-center">
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
      </Card>
   );
}
