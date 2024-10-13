"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { FileText, Video, User, Calendar, PlusCircle, InfoIcon } from "lucide-react";
import { useGetAppointmentsPatient } from "@/lib/hooks/appointment/useAppointmentPatient";
import Pagination from "@/components/navigation/Pagination";
import GetStatusBadge from "@/components/page-components/doctor/appointment/GetStatusBadge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ButtonV2 } from "@/components/button/ButtonV2";
import useRedirect from "@/lib/hooks/useRedirect";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function AppointmentsPageSection({ searchParams }: { searchParams: { page: number } }) {
   const page = +searchParams.page || 1;
   const [currentPage, setCurrentPage] = useState(page);
   const { data, isLoading } = useGetAppointmentsPatient(page - 1, 4);
   const router = useRouter();
   const redirect = useRedirect();

   const handlePageChange = (pageIndex: number) => {
      if (pageIndex > data?.totalPages! || pageIndex < 1) return null;
      router.replace(`/appointments?page=${pageIndex}`);
      setCurrentPage(pageIndex);
   };

   useEffect(() => {
      setCurrentPage(page);
   }, [page]);

   const handleViewDetails = (appointmentId: string) => {
      router.push(`/appointments/${appointmentId}`);
   };

   return (
      <div className="container mx-auto py-6 sm:py-10 px-4 sm:px-6 lg:px-8">
         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4 sm:gap-0">
            <h1 className="text-3xl sm:text-4xl font-bold text-primary">My Appointments</h1>
            <ButtonV2
               onClick={() => redirect()}
               variant="shine"
               className="flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-start"
            >
               <PlusCircle className="h-5 w-5" />
               New Appointment
            </ButtonV2>
         </div>

         <Alert className="mb-6">
            <InfoIcon className="h-4 w-4" />
            <AlertTitle>Important Note</AlertTitle>
            <AlertDescription>
               Your appointments may not be approved by the doctor yet. Please check the status of each appointment for
               the most up-to-date information.
            </AlertDescription>
         </Alert>

         {isLoading ? (
            <div className="space-y-4">
               {[...Array(4)].map((_, index) => (
                  <Card key={index} className="bg-card">
                     <CardHeader>
                        <Skeleton className="h-6 w-1/3" />
                     </CardHeader>
                     <CardContent>
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-2/3" />
                     </CardContent>
                     <CardFooter>
                        <Skeleton className="h-10 w-28" />
                     </CardFooter>
                  </Card>
               ))}
            </div>
         ) : data?.items.length === 0 ? (
            <Card className="bg-card p-6 text-center md:mb-36 mb-7">
               <div className="flex flex-col items-center gap-4">
                  <Calendar className="h-16 w-16 text-primary" />
                  <h2 className="text-xl sm:text-2xl font-semibold">No Appointments Yet</h2>
                  <p className="text-sm sm:text-base text-muted-foreground mb-4">
                     You haven&apos;t scheduled any appointments. Why not book one now?
                  </p>
                  <ButtonV2
                     onClick={() => redirect()}
                     variant="default"
                     className="flex items-center gap-2 w-full sm:w-auto justify-center"
                  >
                     <PlusCircle className="h-5 w-5" />
                     Schedule Your First Appointment
                  </ButtonV2>
               </div>
            </Card>
         ) : (
            <div className="space-y-4 sm:space-y-6">
               {data?.items.map((appointment) => (
                  <Card key={appointment._id} className="bg-card hover:shadow-lg transition-shadow duration-300">
                     <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0 pb-2">
                        <CardTitle className="text-base sm:text-lg font-medium">
                           Appointment on {format(new Date(appointment.appointmentDate!), "MMMM d, yyyy")}
                        </CardTitle>
                        <GetStatusBadge status={appointment.status!} />
                     </CardHeader>
                     <CardContent>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                           <div className="flex items-center space-x-2">
                              {appointment.appointmentType === "video-consulting" ? (
                                 <Video className="h-4 w-4 text-primary" />
                              ) : (
                                 <User className="h-4 w-4 text-primary" />
                              )}
                              <span className="text-sm text-muted-foreground capitalize">
                                 {appointment.appointmentType}
                              </span>
                           </div>
                           <div className="flex items-center space-x-2 sm:col-span-2">
                              <FileText className="h-4 w-4 text-primary flex-shrink-0" />
                              <span className="text-sm text-muted-foreground truncate">{appointment.reason}</span>
                           </div>
                        </div>
                     </CardContent>
                     <CardFooter>
                        <ButtonV2
                           onClick={() => handleViewDetails(appointment._id!)}
                           variant="ringHover"
                           className="w-full"
                        >
                           View Details
                        </ButtonV2>
                     </CardFooter>
                  </Card>
               ))}
            </div>
         )}
         {!isLoading && data?.items.length! > 0 && (
            <div className="mt-6 sm:mt-8">
               <Pagination
                  currentPage={currentPage}
                  handlePageChange={handlePageChange}
                  hasNextPage={data?.hasNextPage!}
                  hasPrevPage={data?.hasPreviousPage!}
                  totalPages={data?.totalPages!}
               />
            </div>
         )}
      </div>
   );
}
