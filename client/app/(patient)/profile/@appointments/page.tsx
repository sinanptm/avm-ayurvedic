"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, Video, FileText } from "lucide-react";

export default function AppointmentsPage() {
   const [newAppointmentDate, setNewAppointmentDate] = useState("");
   const [newAppointmentTime, setNewAppointmentTime] = useState("");
   const [newAppointmentDoctor, setNewAppointmentDoctor] = useState("");
   const [newAppointmentNotes, setNewAppointmentNotes] = useState("");

   const upcomingAppointments = [
      { date: "May 20, 2023", time: "10:00 AM", doctor: "Dr. Emily Smith", specialty: "General Practitioner" },
      { date: "May 25, 2023", time: "2:00 PM", doctor: "Dr. Michael Lee", specialty: "Cardiologist" },
   ];

   const pastAppointments = [
      { date: "April 15, 2023", time: "11:30 AM", doctor: "Dr. Emily Smith", specialty: "General Practitioner" },
      { date: "March 3, 2023", time: "3:00 PM", doctor: "Dr. Sarah Johnson", specialty: "Dermatologist" },
   ];

   const handleBookAppointment = (e: React.FormEvent) => {
      e.preventDefault();
      // Here you would typically handle the appointment booking logic
      console.log("Booking appointment:", {
         newAppointmentDate,
         newAppointmentTime,
         newAppointmentDoctor,
         newAppointmentNotes,
      });
      // Reset form fields
      setNewAppointmentDate("");
      setNewAppointmentTime("");
      setNewAppointmentDoctor("");
      setNewAppointmentNotes("");
   };

   return (
      <div className="min-h-screen p-4 sm:p-6 md:p-8">
         <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
            <h1 className="text-3xl font-bold text-green-400 mb-6">My Appointments</h1>

            <Card>
               <CardHeader>
                  <h2 className="text-xl font-semibold text-green-400">Upcoming Appointments</h2>
               </CardHeader>
               <CardContent>
                  <div className="space-y-4">
                     {upcomingAppointments.map((appointment, index) => (
                        <div
                           key={index}
                           className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 bg-gray-800 rounded-lg space-y-2 sm:space-y-0"
                        >
                           <div className="flex items-center space-x-3">
                              <Calendar className="w-5 h-5 text-green-400" />
                              <span>{appointment.date}</span>
                           </div>
                           <div className="flex items-center space-x-3">
                              <Clock className="w-5 h-5 text-green-400" />
                              <span>{appointment.time}</span>
                           </div>
                           <div className="flex items-center space-x-3">
                              <Video className="w-5 h-5 text-green-400" />
                              <span>{appointment.doctor}</span>
                           </div>
                           <div className="flex items-center space-x-3">
                              <FileText className="w-5 h-5 text-green-400" />
                              <span>{appointment.specialty}</span>
                           </div>
                        </div>
                     ))}
                  </div>
               </CardContent>
            </Card>

            <Card>
               <CardHeader>
                  <h2 className="text-xl font-semibold text-green-400">Past Appointments</h2>
               </CardHeader>
               <CardContent>
                  <div className="space-y-4">
                     {pastAppointments.map((appointment, index) => (
                        <div
                           key={index}
                           className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 bg-gray-800 rounded-lg space-y-2 sm:space-y-0"
                        >
                           <div className="flex items-center space-x-3">
                              <Calendar className="w-5 h-5 text-green-400" />
                              <span>{appointment.date}</span>
                           </div>
                           <div className="flex items-center space-x-3">
                              <Clock className="w-5 h-5 text-green-400" />
                              <span>{appointment.time}</span>
                           </div>
                           <div className="flex items-center space-x-3">
                              <Video className="w-5 h-5 text-green-400" />
                              <span>{appointment.doctor}</span>
                           </div>
                           <div className="flex items-center space-x-3">
                              <FileText className="w-5 h-5 text-green-400" />
                              <span>{appointment.specialty}</span>
                           </div>
                        </div>
                     ))}
                  </div>
               </CardContent>
            </Card>

            <Card>
               <CardHeader>
                  <h2 className="text-xl font-semibold text-green-400">Book New Appointment</h2>
               </CardHeader>
               <CardContent>
                  <form onSubmit={handleBookAppointment} className="space-y-4">
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                           <label htmlFor="date" className="block text-sm font-medium text-gray-300 mb-1">
                              Date
                           </label>
                           <Input
                              type="date"
                              id="date"
                              value={newAppointmentDate}
                              onChange={(e) => setNewAppointmentDate(e.target.value)}
                              className="w-full"
                              required
                           />
                        </div>
                        <div>
                           <label htmlFor="time" className="block text-sm font-medium text-gray-300 mb-1">
                              Time
                           </label>
                           <Input
                              type="time"
                              id="time"
                              value={newAppointmentTime}
                              onChange={(e) => setNewAppointmentTime(e.target.value)}
                              className="w-full"
                              required
                           />
                        </div>
                     </div>
                     <div>
                        <label htmlFor="doctor" className="block text-sm font-medium text-gray-300 mb-1">
                           Doctor
                        </label>
                        <Select value={newAppointmentDoctor} onValueChange={setNewAppointmentDoctor} required>
                           <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a doctor" />
                           </SelectTrigger>
                           <SelectContent>
                              <SelectItem value="dr-smith">Dr. Emily Smith (General Practitioner)</SelectItem>
                              <SelectItem value="dr-lee">Dr. Michael Lee (Cardiologist)</SelectItem>
                              <SelectItem value="dr-johnson">Dr. Sarah Johnson (Dermatologist)</SelectItem>
                           </SelectContent>
                        </Select>
                     </div>
                     <div>
                        <label htmlFor="notes" className="block text-sm font-medium text-gray-300 mb-1">
                           Notes (Optional)
                        </label>
                        <Textarea
                           id="notes"
                           value={newAppointmentNotes}
                           onChange={(e) => setNewAppointmentNotes(e.target.value)}
                           placeholder="Any additional information you'd like to share..."
                           className="w-full"
                        />
                     </div>
                     <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white">
                        Book Appointment
                     </Button>
                  </form>
               </CardContent>
            </Card>
         </div>
      </div>
   );
}
