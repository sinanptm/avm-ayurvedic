'use client'

import { useParams } from 'next/navigation'
import Image from 'next/image'
import { useGetAppointmentDetailsDoctor, useUpdateAppointmentStatusDoctor } from '@/lib/hooks/appointment/useAppointmentDoctor'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { AppointmentStatus } from "@/types/enum"
import { toast } from '@/components/ui/use-toast'
import GetStatusBadge from '@/components/page-components/doctor/appointment/GetStatusBadge'
import AppointmentCancellationModal from '@/components/models/appointment/ConfirmCancelAppointmentDoctor'
import { Calendar, Clock, FileText, Video, User, Phone, AlertCircle } from 'lucide-react'
import { format } from 'date-fns'
import { useState } from 'react'
import { ButtonV2 } from '@/components/button/ButtonV2'
import { BreadcrumbCollapsed } from '@/components/navigation/BreadCrumbs'

export default function AppointmentDetailsPage() {
  const params = useParams()
  const appointmentId = params.id as string
  const [isCancelModelOpen, setCancelModelOpen] = useState(false)
  const { data: appointment, isLoading, error, refetch } = useGetAppointmentDetailsDoctor(appointmentId)
  const { mutate: updateStatus, isPending } = useUpdateAppointmentStatusDoctor()

  const handleAcceptAppointment = () => {
    if (!appointmentId) return
    updateStatus(
      { appointmentId, status: AppointmentStatus.CONFIRMED },
      {
        onSuccess: () => {
          toast({
            title: "Appointment Confirmed",
            description: "The appointment has been successfully confirmed.",
            variant: "success",
          })
          refetch()
        },
        onError: (error) => {
          toast({
            title: "Failed to Accept Appointment",
            description: error?.response?.data?.message || "An error occurred. Please try again.",
            variant: "destructive",
          })
        },
      }
    )
  }

  const handleCancelAppointment = async () => {
    if (!appointmentId) return
    updateStatus(
      { appointmentId, status: AppointmentStatus.CANCELLED },
      {
        onSuccess: () => {
          toast({
            title: "Appointment Cancelled",
            description: "The appointment has been cancelled.",
            variant: "warning",
          })
          setCancelModelOpen(false)
          refetch()
        },
        onError: (error) => {
          toast({
            title: "Failed to Cancel Appointment",
            description: error?.response?.data?.message || "An error occurred. Please try again.",
            variant: "destructive",
          })
        },
      }
    )
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 space-y-8">
        <Skeleton className="h-12 w-64" />
        <Skeleton className="h-64 w-full" />
      </div>
    )
  }

  if (error || !appointment) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-2xl text-red-500">Error loading appointment details. Please try again.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-background">
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center">
        <h1 className="text-3xl font-bold mb-2 md:mb-0">Appointment Details</h1>
        <div className="flex items-center space-x-4">
          <GetStatusBadge status={appointment.status || AppointmentStatus.PENDING} />
          {appointment.status === AppointmentStatus.PENDING && (
            <>
              <ButtonV2 variant="secondary" onClick={handleAcceptAppointment} disabled={isPending}>
                Accept
              </ButtonV2>
              <ButtonV2 variant="destructive" onClick={() => setCancelModelOpen(true)}>
                Reject
              </ButtonV2>
            </>
          )}
          {appointment.status === AppointmentStatus.CONFIRMED && (
            <ButtonV2 variant="destructive" onClick={() => setCancelModelOpen(true)}>
              Cancel
            </ButtonV2>
          )}
        </div>
      </div>
      <div className="mb-6">
        <BreadcrumbCollapsed items={[{ href: '/doctor/appointments', label: 'Appointments' }, { href: '/doctor/appointments/' + appointment._id, label: 'Appointment Details' }]} />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-primary" />
              Appointment Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-primary" />
                <span>{format(new Date(appointment.appointmentDate!), "PPPP")}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-primary" />
                <span>{appointment.slot?.startTime || "N/A"} - {appointment.slot?.endTime || "N/A"}</span>
              </div>
              <div className="flex items-center space-x-2">
                {appointment.appointmentType === "video-consulting" ? (
                  <Video className="w-5 h-5 text-primary" />
                ) : (
                  <User className="w-5 h-5 text-primary" />
                )}
                <span className="capitalize">{appointment.appointmentType!}</span>
              </div>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-primary" />
                Reason for Appointment
              </h3>
              <p>{appointment.reason}</p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2 flex items-center">
                <AlertCircle className="w-5 h-5 mr-2 text-primary" />
                Additional Notes
              </h3>
              <p>{appointment.notes || "No additional notes provided"}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="w-5 h-5 mr-2 text-primary" />
              Patient Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden">
                <Image
                  src={appointment.patient?.profile || "/placeholder.svg?height=64&width=64"}
                  alt={appointment.patient?.name || "Patient"}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div>
                <h3 className="font-semibold">{appointment.patient?.name}</h3>
                <p className="text-sm text-muted-foreground">{appointment.patient?.email}</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-primary" />
                <span>{appointment.patient?.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4 text-primary" />
                <span>{appointment.patient?.gender}</span>
              </div>
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4 text-primary" />
                <span>Blood Group: {appointment.patient?.bloodGroup}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <AppointmentCancellationModal
        open={isCancelModelOpen}
        setOpen={setCancelModelOpen}
        handleCancelAppointment={handleCancelAppointment}
      />
    </div>
  )
}