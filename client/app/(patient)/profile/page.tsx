import Image from 'next/image'
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Video, FileText, AlertCircle } from 'lucide-react'
import PersonalInformation from '@/components/profile/PersonalInformation'
import MedicalNotes from '@/components/profile/MedicalNotes'

export default function PatientProfilePage() {

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
        <Card className="overflow-hidden">
          <div className="bg-green-600 p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Image
                src="/assets/images/admin.png"
                alt="Patient profile picture"
                width={100}
                height={100}
                className="rounded-full border-4 border-gray-800"
              />
              <div className="text-center sm:text-left">
                <h1 className="text-2xl font-bold ">Sarah Johnson</h1>
                <p className="text-gray-200 opacity-75">Patient ID: 12345678</p>
              </div>
            </div>
          </div>
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <Button variant="outline" className="flex-1">Profile</Button>
              <Button variant="outline" className="flex-1">Appointments</Button>
              <Button variant="outline" className="flex-1">Medical Records</Button>
            </div>
          </CardContent>
        </Card>

      <PersonalInformation />
      <MedicalNotes />

        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-green-500">Upcoming Appointments</h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { date: 'May 20, 2023', time: '10:00 AM', doctor: 'Dr. Emily Smith', specialty: 'General Practitioner' },
                { date: 'May 25, 2023', time: '2:00 PM', doctor: 'Dr. Michael Lee', specialty: 'Cardiologist' },
              ].map((appointment, index) => (
                <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 bg-gray-800 rounded-lg space-y-2 sm:space-y-0">
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

        <Card>
          <CardHeader className="flex flex-row items-center space-x-2">
            <AlertCircle className="w-6 h-6 text-yellow-400" />
            <h2 className="text-xl font-semibold text-yellow-400">Allergies and Conditions</h2>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              <li>Penicillin allergy</li>
              <li>Asthma</li>
              <li>Hypertension</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}