'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { FileText, Video, User } from "lucide-react"
import { useGetAppointmentsPatient } from "@/lib/hooks/appointment/useAppointmentPatient"
import Pagination from "@/components/navigation/Pagination"
import GetStatusBadge from "@/components/page-components/doctor/appointment/GetStatusBadge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { ButtonV2 } from "@/components/button/ButtonV2"

export default function AppointmentsPageSection({ searchParams }: { searchParams: { page: number } }) {
  const page = searchParams.page || 1
  const [currentPage, setCurrentPage] = useState(page)
  const { data, isLoading } = useGetAppointmentsPatient(page - 1, 4)
  const router = useRouter()

  const handlePageChange = (pageIndex: number) => {
    if (pageIndex > data?.totalPages! || pageIndex < 1) return null
    router.replace(`/appointments?page=${pageIndex}`)
    setCurrentPage(pageIndex)
  }

  const handleViewDetails = (appointmentId: string) => {
    router.push(`/appointments/${appointmentId}`)
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8 text-primary">My Appointments</h1>
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
      ) : (
        <div className="space-y-6">
          {data?.items.map((appointment) => (
            <Card key={appointment._id} className="bg-card hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">
                  Appointment on {format(new Date(appointment.appointmentDate!), "MMMM d, yyyy")}
                </CardTitle>
                <GetStatusBadge status={appointment.status!} />
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    {appointment.appointmentType === "video-consulting" ? (
                      <Video className="h-4 w-4 text-primary" />
                    ) : (
                      <User className="h-4 w-4 text-primary" />
                    )}
                    <span className="text-sm text-muted-foreground capitalize">{appointment.appointmentType}</span>
                  </div>
                  <div className="flex items-center space-x-2 col-span-2">
                    <FileText className="h-4 w-4 text-primary" />
                    <span className="text-sm text-muted-foreground truncate">{appointment.reason}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <ButtonV2 onClick={() => handleViewDetails(appointment._id!)} variant="ringHover" className="w-full">
                  View Details
                </ButtonV2>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
      {!isLoading && (
        <div className="mt-8">
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
  )
}