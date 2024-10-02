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
import { Calendar, Clock, FileText, Video, User, Phone, AlertCircle, Pill } from 'lucide-react'
import { format } from 'date-fns'
import { useCallback, useState } from 'react'
import { ButtonV2, ButtonColorVariant } from '@/components/button/ButtonV2'
import { BreadcrumbCollapsed } from '@/components/navigation/BreadCrumbs'
import PrescriptionModel from '@/components/models/doctor/PrescriptionModel'
import { Separator } from '@/components/ui/separator'

export default function AppointmentDetailsPage() {
  const params = useParams();
  const appointmentId = params.id as string;
  const [isCancelModelOpen, setCancelModelOpen] = useState(false);
  const [isPrescriptionModelOpen, setPrescriptionModelOpen] = useState(false);
  const { data: appointment, isLoading, error, refetch } = useGetAppointmentDetailsDoctor(appointmentId);
  const { mutate: updateStatus, isPending } = useUpdateAppointmentStatusDoctor();

  const handleAcceptAppointment = useCallback(() => {
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
  }, [appointmentId, updateStatus, refetch]);

  const handleCancelAppointment = useCallback(async () => {
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
  }, [appointmentId, updateStatus, refetch]);

  const handlePrescriptionClick = useCallback(() => setPrescriptionModelOpen(true), []);

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
          {appointment.status === AppointmentStatus.PENDING ? (
            <>
              <ButtonV2 variant="secondary" onClick={handleAcceptAppointment} disabled={isPending}>
                Accept
              </ButtonV2>
              <ButtonV2 variant="destructive" onClick={() => setCancelModelOpen(true)}>
                Reject
              </ButtonV2>
            </>
          ) : (
            !appointment.prescription && (
              <ButtonV2 variant="gooeyLeft" color={'teal' as ButtonColorVariant} onClick={handlePrescriptionClick}>
                Prescription
              </ButtonV2>
            )
          )}
          {appointment.status === AppointmentStatus.CONFIRMED && (
            <ButtonV2 variant="gooeyRight" color={'danger' as ButtonColorVariant} onClick={() => setCancelModelOpen(true)}>
              Cancel
            </ButtonV2>
          )}
        </div>
      </div>
      <div className="mb-6">
        <BreadcrumbCollapsed items={[{ href: '/doctor/appointments', label: 'Appointments' }, { href: '/doctor/appointments/' + appointment._id, label: 'Appointment Details' }]} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="md:col-span-2">
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
                  src={appointment.patient?.profile || "/assets/icons/circle-user.svg?height=64&width=64"}
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

        {appointment.prescription && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Pill className="w-5 h-5 mr-2 text-primary" />
                Prescription
              </CardTitle>
            </CardHeader>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <Pill className="w-5 h-5 mr-2 text-primary" />
                      Medications
                    </h3>
                    {appointment.prescription?.medications!.map((med, index) => (
                      <div key={index} className="bg-muted p-4 rounded-lg mb-4 last:mb-0">
                        <h4 className="text-md font-medium mb-2">{med.name}</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                            <span className="text-muted-foreground">Dosage: {med.dosage}</span>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                            <span className="text-muted-foreground">Frequency: {med.frequency}</span>
                          </div>
                          <div className="flex items-center sm:col-span-2">
                            <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                            <span className="text-muted-foreground">Duration: {med.duration}</span>
                          </div>
                        </div>
                        {med.additionalInstructions && med.additionalInstructions.length > 0 && (
                          <div className="mt-2 flex items-start">
                            <AlertCircle className="w-4 h-4 mr-2 text-muted-foreground shrink-0 mt-1" />
                            <p className="text-sm text-muted-foreground">
                              Additional Instructions: {med.additionalInstructions}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {appointment.prescription.notes && (
                    <>
                      <Separator />
                      <div>
                        <h3 className="text-lg font-semibold mb-4 flex items-center">
                          <FileText className="w-5 h-5 mr-2 text-primary" />
                          Notes
                        </h3>
                        <div className="bg-muted p-4 rounded-lg">
                          <p className="text-sm text-muted-foreground">{appointment.prescription.notes}</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </Card>
        )}
      </div>

      <PrescriptionModel
        isOpen={isPrescriptionModelOpen}
        setOpen={setPrescriptionModelOpen}
        appointmentId={appointment._id!}
        refetch={refetch}
        patientId={appointment.patientId!}
      />

      <AppointmentCancellationModal
        open={isCancelModelOpen}
        setOpen={setCancelModelOpen}
        handleCancelAppointment={handleCancelAppointment}
      />
    </div>
  )
}