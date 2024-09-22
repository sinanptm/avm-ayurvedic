"use client";

import Pagination from "@/components/navigation/Pagination";
import { useGetAppointmentsPatient } from "@/lib/hooks/appointment/useAppointmentPatient";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import GetStatusBadge from "@/components/doctor/appointment/GetStatusBadge";
import { Calendar, FileText, Video, User } from "lucide-react";
import { useState } from "react";
import { ButtonV2 } from "@/components/common/ButtonV2";

const AppointmentsPageSection = ({ searchParams }: { searchParams: { page: number } }) => {
   const page = searchParams.page || 0;
   const [currentPage, setCurrentPage] = useState(page);
   const { data } = useGetAppointmentsPatient(page, 4);
   const router = useRouter();

   const handlePageChange = (pageIndex: number) => {
      if (pageIndex > data?.totalPages!) return null;
      router.replace(`/profile?page=${pageIndex}`);
      setCurrentPage(pageIndex);
   };

   const handleViewDetails = (appointmentId: string) => {
      router.push(`/appointments/${appointmentId}`);
   };

   return (
      <div className="min-h-screen p-4 sm:p-6 md:p-8">
         <div className="max-w-4xl mx-auto space-y-4">
            <h1 className="text-3xl font-bold text-green-400 mb-6">My Appointments</h1>

            {data?.items.map((appointment) => (
               <Card
                  key={appointment._id}
                  className="mb-4 bg-dark-400 border-gray-400 shadow-md hover:shadow-lg transition-shadow duration-300"
               >
                  <CardHeader className="py-3 px-4 bg-gray-750 border-b border-gray-700">
                     <CardTitle className="flex justify-between items-center text-base">
                        <div className="flex items-center space-x-2">
                           <Calendar className="w-4 h-4 text-green-400" />
                           <span className="text-gray-100">
                              {format(new Date(appointment.appointmentDate!), "dd/MM/yy")}
                           </span>
                        </div>
                        <GetStatusBadge status={appointment.status!} />
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="py-3 px-4">
                     <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center space-x-2">
                           {appointment.appointmentType === "video-consulting" ? (
                              <Video className="w-4 h-4 text-blue-400" />
                           ) : (
                              <User className="w-4 h-4 text-blue-400" />
                           )}
                           <p className="text-gray-300">{appointment.appointmentType}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                           <FileText className="w-4 h-4 text-blue-400" />
                           <p className="text-gray-300 truncate">{appointment.reason}</p>
                        </div>
                     </div>
                  </CardContent>
                  <CardFooter className="py-2 px-4 bg-gray-750 border-t border-gray-700 flex justify-end">
                     <ButtonV2
                        variant="gooeyRight"
                        size="sm"
                        onClick={() => handleViewDetails(appointment._id!)}
                        className="text-green-400  border-green-500"
                     >
                        View Details
                     </ButtonV2>
                  </CardFooter>
               </Card>
            ))}

            <div className="mt-6">
               <Pagination
                  currentPage={currentPage}
                  handlePageChange={handlePageChange}
                  hasNextPage={data?.hasNextPage!}
                  hasPrevPage={data?.hasPreviousPage!}
                  totalPages={data?.totalPages!}
               />
            </div>
         </div>
      </div>
   );
};

export default AppointmentsPageSection;
