import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Calendar, Clock, FileText, Video } from "lucide-react";
import React from "react";

const UpcomingAppointment = () => {
   return (
      <Card>
         <CardHeader>
            <h2 className="text-xl font-semibold text-green-500">Upcoming Appointments</h2>
         </CardHeader>
         <CardContent>
            <div className="space-y-4">
               {[
                  {
                     date: "May 20, 2023",
                     time: "10:00 AM",
                     doctor: "Dr. Emily Smith",
                     specialty: "General Practitioner",
                  },
                  { date: "May 25, 2023", time: "2:00 PM", doctor: "Dr. Michael Lee", specialty: "Cardiologist" },
               ].map((appointment, index) => (
                  <div
                     key={index}
                     className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 bg-gray-800 rounded-lg space-y-2 sm:space-y-0"
                  >
                     <div className="flex items-center space-x-3">
                        <Calendar className="w-5 h-5 text-green-500" />
                        <span>{appointment.date}</span>
                     </div>
                     <div className="flex items-center space-x-3">
                        <Clock className="w-5 h-5 text-green-500" />
                        <span>{appointment.time}</span>
                     </div>
                     <div className="flex items-center space-x-3">
                        <Video className="w-5 h-5 text-green-500" />
                        <span>{appointment.doctor}</span>
                     </div>
                     <div className="flex items-center space-x-3">
                        <FileText className="w-5 h-5 text-green-500" />
                        <span>{appointment.specialty}</span>
                     </div>
                  </div>
               ))}
            </div>
         </CardContent>
      </Card>
   );
};

export default UpcomingAppointment;
