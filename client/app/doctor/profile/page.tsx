"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Clock, Video, Star } from "lucide-react";

export default function ConsultantProfilePage() {
   const [appointmentDate, setAppointmentDate] = useState("");
   const [appointmentTime, setAppointmentTime] = useState("");

   return (
      <div className="min-h-screen p-4 sm:p-6 md:p-8">
         <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
            <Card className="overflow-hidden">
               <div className="bg-green-600 p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                     <Image
                        src="/placeholder.svg?height=100&width=100"
                        alt="Consultant profile picture"
                        width={100}
                        height={100}
                        className="rounded-full border-4 border-gray-800"
                     />
                     <div className="text-center sm:text-left">
                        <h1 className="text-2xl font-bold text-white">Dr. Emily Johnson</h1>
                        <p className="text-gray-200 opacity-75">Psychologist, PhD</p>
                        <div className="flex items-center justify-center sm:justify-start mt-2">
                           {[1, 2, 3, 4, 5].map((star) => (
                              <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                           ))}
                           <span className="ml-2 text-white">(4.9)</span>
                        </div>
                     </div>
                  </div>
               </div>
               <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                     <Button variant="outline" className="flex-1">
                        Profile
                     </Button>
                     <Button variant="outline" className="flex-1">
                        Reviews
                     </Button>
                     <Button variant="outline" className="flex-1">
                        Availability
                     </Button>
                  </div>
               </CardContent>
            </Card>

            <Card>
               <CardContent className="p-4 sm:p-6">
                  <h2 className="text-xl font-semibold mb-4 text-green-400">About Me</h2>
                  <p className="text-gray-300 mb-4">
                     With over 15 years of experience, I specialize in cognitive behavioral therapy and
                     mindfulness-based approaches. I&apos;m passionate about helping individuals overcome anxiety,
                     depression, and stress-related issues.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     <div>
                        <p>
                           <span className="font-semibold text-green-400">Specializations:</span> Anxiety, Depression,
                           Stress Management
                        </p>
                        <p>
                           <span className="font-semibold text-green-400">Languages:</span> English, Spanish
                        </p>
                     </div>
                     <div>
                        <p>
                           <span className="font-semibold text-green-400">Experience:</span> 15+ years
                        </p>
                        <p>
                           <span className="font-semibold text-green-400">Session Duration:</span> 50 minutes
                        </p>
                     </div>
                  </div>
               </CardContent>
            </Card>

            <Card>
               <CardHeader>
                  <h2 className="text-xl font-semibold text-green-400">Upcoming Appointments</h2>
               </CardHeader>
               <CardContent>
                  <div className="space-y-4">
                     {[
                        { date: "May 15, 2023", time: "10:00 AM", client: "John D." },
                        { date: "May 17, 2023", time: "2:00 PM", client: "Sarah M." },
                        { date: "May 18, 2023", time: "11:30 AM", client: "Robert L." },
                     ].map((appointment, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
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
                              <span>{appointment.client}</span>
                           </div>
                        </div>
                     ))}
                  </div>
               </CardContent>
            </Card>

            <Card>
               <CardHeader>
                  <h2 className="text-xl font-semibold text-green-400">Book an Appointment</h2>
               </CardHeader>
               <CardContent>
                  <form className="space-y-4">
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                           <label htmlFor="date" className="block text-sm font-medium text-gray-300 mb-1">
                              Date
                           </label>
                           <Input
                              type="date"
                              id="date"
                              value={appointmentDate}
                              onChange={(e) => setAppointmentDate(e.target.value)}
                              className="w-full"
                           />
                        </div>
                        <div>
                           <label htmlFor="time" className="block text-sm font-medium text-gray-300 mb-1">
                              Time
                           </label>
                           <Input
                              type="time"
                              id="time"
                              value={appointmentTime}
                              onChange={(e) => setAppointmentTime(e.target.value)}
                              className="w-full"
                           />
                        </div>
                     </div>
                     <div>
                        <label htmlFor="notes" className="block text-sm font-medium text-gray-300 mb-1">
                           Notes (Optional)
                        </label>
                        <Textarea
                           id="notes"
                           placeholder="Any additional information you'd like to share..."
                           className="w-full"
                        />
                     </div>
                     <Button className="w-full bg-green-600 hover:bg-green-700 text-white">Book Consultation</Button>
                  </form>
               </CardContent>
            </Card>
         </div>
      </div>
   );
}
