'use client'

import { useGetAppointmentsDoctor } from "@/lib/hooks/appointment/useAppointment"
import { AppointmentStatus } from "@/types"

const AppointmentTabContent = () => {
  const {data,isLoading} = useGetAppointmentsDoctor(AppointmentStatus.PENDING,0,10);
  console.log(data);
  
  return (
    <div>AppointmentTabContent {}</div>
  )
}

export default AppointmentTabContent