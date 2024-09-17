'use client'

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useGetAppointmentsDoctor } from "@/lib/hooks/appointment/useAppointment"
import IAppointment, { AppointmentStatus } from "@/types"
import TableSkeleton from "@/components/skeletons/TableSkelton"
import Pagination from "@/components/navigation/Pagination"
import { Button } from "@/components/ui/button"

const columns = [
  { name: "Date", width: "w-1/4" },
  { name: "Type", width: "w-1/4" },
  { name: "Reason", width: "w-1/4" },
  { name: "Status", width: "w-1/4" },
  { name: "Actions", width: "text-right pr-10" }
]

type Props = {
  page: number
}

export default function AppointmentTable({ page }: Props) {
  const [currentPage, setCurrentPage] = useState(page)
  const limit = 7;
  const { data, isLoading, error, refetch } = useGetAppointmentsDoctor(AppointmentStatus.PENDING, currentPage,limit)
  const router = useRouter()

  const appointments = useMemo(() => data?.items || [], [data])

  const handlePageChange = (pageIndex: number) => {
    setCurrentPage(pageIndex)
    router.replace(`/doctor/appointments?page=${pageIndex}`)
    refetch()
  }

  const handleViewDetails = (appointmentId:string)=>{
    console.log('clicked', appointmentId);
    
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">Error loading appointments. Please try again later.</p>
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Appointments</CardTitle>
        <CardDescription>
          A list of all pending appointments including date, type, reason, and status.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <TableSkeleton
            columns={columns}
            rows={limit}
            showHeader={false}
            headerTitle="Appointments"
            headerDescription="A list of all pending appointments including date, type, reason, and status."
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
                {appointments.length >= 1 ? (
                  appointments.map((appointment) => (
                    <TableRow key={appointment._id}>
                      <TableCell>{new Date(appointment.appointmentDate!).toLocaleString().split(",")[0]}</TableCell>
                      <TableCell>{appointment.appointmentType}</TableCell>
                      <TableCell>{appointment.reason}</TableCell>
                      <TableCell>
                        <Badge variant={appointment.status === AppointmentStatus.PENDING ? "warning" : "success"}>
                          {appointment.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="link" size="sm"
                          onClick={() => handleViewDetails(appointment._id!)}
                          aria-label={`View profile of ${appointment.reason}`}
                        >
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>

                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">
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
  )
}